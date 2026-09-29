#!/usr/bin/env python3
"""
Post to Twitter/X via v2 API using OAuth 1.0a (user context — required for tweets).
Reads credentials from env:
  TWITTER_API_KEY, TWITTER_API_SECRET
  TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
Reads post data from stdin as JSON: {text, image_url?}
Prints JSON result to stdout: {success, tweet_id?, error?}
"""
import os, sys, json, hmac, hashlib, base64, time, uuid
import urllib.request, urllib.error, urllib.parse


def _oauth1_header(method: str, url: str, consumer_key: str, consumer_secret: str,
                   token: str, token_secret: str) -> str:
    nonce = uuid.uuid4().hex
    ts = str(int(time.time()))

    oauth_params = {
        "oauth_consumer_key": consumer_key,
        "oauth_nonce": nonce,
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": ts,
        "oauth_token": token,
        "oauth_version": "1.0",
    }

    param_string = urllib.parse.urlencode(sorted(oauth_params.items()))
    base_string = "&".join([
        method.upper(),
        urllib.parse.quote(url, safe=""),
        urllib.parse.quote(param_string, safe=""),
    ])
    signing_key = f"{urllib.parse.quote(consumer_secret, safe='')}&{urllib.parse.quote(token_secret, safe='')}"
    sig = base64.b64encode(
        hmac.new(signing_key.encode(), base_string.encode(), hashlib.sha1).digest()
    ).decode()

    oauth_params["oauth_signature"] = sig
    header = "OAuth " + ", ".join(
        f'{k}="{urllib.parse.quote(str(v), safe="")}"'
        for k, v in sorted(oauth_params.items())
    )
    return header


def upload_image_twitter(api_key: str, api_secret: str,
                          access_token: str, access_secret: str,
                          image_url: str) -> str | None:
    """Download image and upload to Twitter media endpoint, return media_id."""
    try:
        with urllib.request.urlopen(image_url, timeout=20) as r:
            image_bytes = r.read()
        # Upload via v1.1 media/upload
        upload_url = "https://upload.twitter.com/1.1/media/upload.json"
        # multipart not trivial without requests lib; use base64 approach
        b64_data = base64.b64encode(image_bytes).decode()
        body = urllib.parse.urlencode({"media_data": b64_data}).encode()
        auth = _oauth1_header("POST", upload_url, api_key, api_secret, access_token, access_secret)
        req = urllib.request.Request(
            upload_url, data=body,
            headers={"Authorization": auth, "Content-Type": "application/x-www-form-urlencoded"}
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read())
            return str(result["media_id"])
    except Exception as e:
        print(f"[twitter] Image upload failed: {e}", file=sys.stderr)
        return None


def post_twitter(text: str, image_url: str | None = None,
                 credentials: dict | None = None) -> dict:
    creds = credentials or {}
    api_key      = creds.get("api_key")      or os.environ.get("TWITTER_API_KEY")
    api_secret   = creds.get("api_secret")   or os.environ.get("TWITTER_API_SECRET")
    access_token = creds.get("access_token") or os.environ.get("TWITTER_ACCESS_TOKEN")
    access_secret= creds.get("access_secret")or os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")

    missing = [k for k, v in {
        "TWITTER_API_KEY": api_key, "TWITTER_API_SECRET": api_secret,
        "TWITTER_ACCESS_TOKEN": access_token, "TWITTER_ACCESS_TOKEN_SECRET": access_secret
    }.items() if not v]
    if missing:
        return {"success": False, "error": f"Missing env vars: {', '.join(missing)}"}

    url = "https://api.twitter.com/2/tweets"

    payload: dict = {"text": text}

    if image_url:
        media_id = upload_image_twitter(api_key, api_secret, access_token, access_secret, image_url)
        if media_id:
            payload["media"] = {"media_ids": [media_id]}

    body = json.dumps(payload).encode()
    auth = _oauth1_header("POST", url, api_key, api_secret, access_token, access_secret)

    req = urllib.request.Request(
        url, data=body,
        headers={"Authorization": auth, "Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read())
            tweet_id = result.get("data", {}).get("id", "")
            return {"success": True, "tweet_id": tweet_id}
    except urllib.error.HTTPError as e:
        body_text = e.read().decode(errors="replace")[:300]
        return {"success": False, "error": f"HTTP {e.code}: {body_text}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    result = post_twitter(data["text"], data.get("image_url"), data.get("credentials"))
    print(json.dumps(result))
