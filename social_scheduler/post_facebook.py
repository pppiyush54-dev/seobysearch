#!/usr/bin/env python3
"""
Post to a Facebook Page via Graph API v18.
Reads from stdin JSON:
  {text, image_url?, credentials: {page_token, page_id}}
Prints JSON: {success, post_id?, error?}
"""
import sys, json, urllib.request, urllib.error, urllib.parse


def post_facebook(text: str, image_url: str | None, page_token: str, page_id: str) -> dict:
    base = f"https://graph.facebook.com/v18.0/{page_id}"

    if image_url:
        # Post as photo with caption
        params = urllib.parse.urlencode({
            "url": image_url,
            "caption": text,
            "access_token": page_token,
        }).encode()
        endpoint = f"{base}/photos"
    else:
        params = urllib.parse.urlencode({
            "message": text,
            "access_token": page_token,
        }).encode()
        endpoint = f"{base}/feed"

    req = urllib.request.Request(endpoint, data=params)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read())
            post_id = result.get("id", result.get("post_id", ""))
            return {"success": True, "post_id": post_id}
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:300]
        return {"success": False, "error": f"HTTP {e.code}: {body}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    creds = data.get("credentials", {})
    result = post_facebook(
        data["text"],
        data.get("image_url"),
        creds.get("page_token", ""),
        creds.get("page_id", ""),
    )
    print(json.dumps(result))
