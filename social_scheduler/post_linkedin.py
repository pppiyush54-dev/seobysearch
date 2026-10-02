#!/usr/bin/env python3
"""
Post to LinkedIn via UGC API v2.
Reads credentials from env: LINKEDIN_ACCESS_TOKEN, LINKEDIN_PERSON_URN
Reads post data from stdin as JSON: {text, image_url?}
Prints JSON result to stdout: {success, post_id?, error?}
"""
import os, sys, json, urllib.request, urllib.error


def upload_image(token: str, person_urn: str, image_url: str) -> str | None:
    """Download image from URL, upload to LinkedIn, return asset URN."""
    try:
        # Download image
        with urllib.request.urlopen(image_url, timeout=20) as r:
            image_bytes = r.read()
            content_type = r.headers.get("Content-Type", "image/jpeg")

        # Register upload
        reg_body = json.dumps({
            "registerUploadRequest": {
                "owner": person_urn,
                "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                "serviceRelationships": [{
                    "identifier": "urn:li:userGeneratedContent",
                    "relationshipType": "OWNER"
                }]
            }
        }).encode()
        reg_req = urllib.request.Request(
            "https://api.linkedin.com/v2/assets?action=registerUpload",
            data=reg_body,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "X-Restli-Protocol-Version": "2.0.0"
            }
        )
        with urllib.request.urlopen(reg_req, timeout=20) as r:
            reg_result = json.loads(r.read())

        upload_url = reg_result["value"]["uploadMechanism"][
            "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]["uploadUrl"]
        asset_urn = reg_result["value"]["asset"]

        # Upload image bytes
        put_req = urllib.request.Request(
            upload_url,
            data=image_bytes,
            headers={"Authorization": f"Bearer {token}", "Content-Type": content_type},
            method="PUT"
        )
        urllib.request.urlopen(put_req, timeout=30)
        return asset_urn
    except Exception as e:
        print(f"[linkedin] Image upload failed: {e}", file=sys.stderr)
        return None


def post_linkedin(text: str, image_url: str | None = None,
                  credentials: dict | None = None) -> dict:
    creds = credentials or {}
    token = creds.get("access_token") or os.environ.get("LINKEDIN_ACCESS_TOKEN")
    person_urn = creds.get("person_urn") or os.environ.get("LINKEDIN_PERSON_URN")

    if not token:
        return {"success": False, "error": "LINKEDIN_ACCESS_TOKEN env var not set"}
    if not person_urn:
        return {"success": False, "error": "LINKEDIN_PERSON_URN env var not set"}

    share_content: dict = {
        "shareCommentary": {"text": text},
        "shareMediaCategory": "NONE"
    }

    if image_url:
        asset_urn = upload_image(token, person_urn, image_url)
        if asset_urn:
            share_content["shareMediaCategory"] = "IMAGE"
            share_content["media"] = [{
                "status": "READY",
                "description": {"text": ""},
                "media": asset_urn,
                "title": {"text": ""}
            }]

    body = json.dumps({
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": share_content
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }).encode()

    req = urllib.request.Request(
        "https://api.linkedin.com/v2/ugcPosts",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read())
            return {"success": True, "post_id": result.get("id", "")}
    except urllib.error.HTTPError as e:
        body_text = e.read().decode(errors="replace")[:300]
        return {"success": False, "error": f"HTTP {e.code}: {body_text}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    result = post_linkedin(data["text"], data.get("image_url"), data.get("credentials"))
    print(json.dumps(result))
