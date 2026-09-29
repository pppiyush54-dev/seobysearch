#!/usr/bin/env python3
"""
Post to Instagram via Facebook Graph API v18 (Instagram Graph API).
NOTE: Instagram feed posts REQUIRE an image — text-only posts are not
      supported by the API. If no image is provided the post is skipped.

Reads from stdin JSON:
  {text, image_url?, credentials: {ig_user_id, page_token}}
Prints JSON: {success, post_id?, error?, skipped?}
"""
import sys, json, urllib.request, urllib.error, urllib.parse


def post_instagram(text: str, image_url: str | None, ig_user_id: str, page_token: str) -> dict:
    if not image_url:
        return {"success": False, "skipped": True,
                "error": "Instagram feed posts require an image — skipped (no image provided)"}

    base = f"https://graph.facebook.com/v18.0/{ig_user_id}"

    # Step 1: create media container
    params1 = urllib.parse.urlencode({
        "image_url": image_url,
        "caption": text,
        "access_token": page_token,
    }).encode()
    req1 = urllib.request.Request(f"{base}/media", data=params1)
    try:
        with urllib.request.urlopen(req1, timeout=30) as r:
            result1 = json.loads(r.read())
        creation_id = result1.get("id")
        if not creation_id:
            return {"success": False, "error": f"No creation_id returned: {result1}"}
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:300]
        return {"success": False, "error": f"Media create HTTP {e.code}: {body}"}
    except Exception as e:
        return {"success": False, "error": f"Media create error: {e}"}

    # Step 2: publish the container
    params2 = urllib.parse.urlencode({
        "creation_id": creation_id,
        "access_token": page_token,
    }).encode()
    req2 = urllib.request.Request(f"{base}/media_publish", data=params2)
    try:
        with urllib.request.urlopen(req2, timeout=30) as r:
            result2 = json.loads(r.read())
        return {"success": True, "post_id": result2.get("id", "")}
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:300]
        return {"success": False, "error": f"Publish HTTP {e.code}: {body}"}
    except Exception as e:
        return {"success": False, "error": f"Publish error: {e}"}


if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    creds = data.get("credentials", {})
    result = post_instagram(
        data["text"],
        data.get("image_url"),
        creds.get("ig_user_id", ""),
        creds.get("page_token", ""),
    )
    print(json.dumps(result))
