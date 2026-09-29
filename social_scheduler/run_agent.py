#!/usr/bin/env python3
"""
Social media posting agent — multi-client, multi-platform helper.

Called by the Claude Code Routine in --post mode.
Stdin JSON: {"post": {...}, "doc_id": "...", "client_slug": "..."}

Credential env var convention (SLUG uppercased, e.g. client slug "acme"):
  LinkedIn:   ACME_LINKEDIN_ACCESS_TOKEN, ACME_LINKEDIN_PERSON_URN
  Twitter/X:  ACME_TWITTER_API_KEY, ACME_TWITTER_API_SECRET,
              ACME_TWITTER_ACCESS_TOKEN, ACME_TWITTER_ACCESS_TOKEN_SECRET
  Facebook:   ACME_FB_PAGE_TOKEN, ACME_FB_PAGE_ID
  Instagram:  ACME_IG_USER_ID, ACME_FB_PAGE_TOKEN (same FB token)

Fallback (single-client): env vars without prefix (e.g. LINKEDIN_ACCESS_TOKEN).
"""
import os, sys, json, subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

PLATFORM_SCRIPTS = {
    "li": "post_linkedin.py",
    "x":  "post_twitter.py",
    "fb": "post_facebook.py",
    "ig": "post_instagram.py",
}


def get_creds(slug: str) -> dict:
    """Build credentials dict from env vars, trying prefixed then un-prefixed."""
    pfx = (slug.upper().replace("-", "_").replace(" ", "_") + "_") if slug else ""

    def env(key):
        return os.environ.get(pfx + key) or os.environ.get(key, "")

    return {
        "linkedin": {
            "access_token": env("LINKEDIN_ACCESS_TOKEN"),
            "person_urn":   env("LINKEDIN_PERSON_URN"),
        },
        "twitter": {
            "api_key":      env("TWITTER_API_KEY"),
            "api_secret":   env("TWITTER_API_SECRET"),
            "access_token": env("TWITTER_ACCESS_TOKEN"),
            "access_secret":env("TWITTER_ACCESS_TOKEN_SECRET"),
        },
        "facebook": {
            "page_token": env("FB_PAGE_TOKEN"),
            "page_id":    env("FB_PAGE_ID"),
        },
        "instagram": {
            "ig_user_id": env("IG_USER_ID"),
            "page_token": env("FB_PAGE_TOKEN"),  # Instagram uses the same FB token
        },
    }


PLATFORM_CRED_KEY = {"li": "linkedin", "x": "twitter", "fb": "facebook", "ig": "instagram"}


def run_poster(script: str, payload: dict) -> dict:
    path = os.path.join(SCRIPT_DIR, script)
    try:
        result = subprocess.run(
            [sys.executable, path],
            input=json.dumps(payload),
            capture_output=True, text=True, timeout=60,
        )
        if result.returncode != 0:
            return {"success": False, "error": result.stderr[:300] or f"exit {result.returncode}"}
        return json.loads(result.stdout.strip())
    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Posting script timed out"}
    except Exception as e:
        return {"success": False, "error": str(e)}


RESULT_KEYS = {
    "li": "linkedin_result",
    "x":  "twitter_result",
    "fb": "facebook_result",
    "ig": "instagram_result",
}


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--post":
        data = json.loads(sys.stdin.read())
        post       = data["post"]
        doc_id     = data["doc_id"]
        client_slug= data.get("client_slug", "")
        text       = post.get("text", "")
        image_url  = post.get("image_url")
        platforms  = post.get("platforms", [])
        creds      = get_creds(client_slug)

        results = {"doc_id": doc_id}
        all_ok = True
        for platform in platforms:
            script = PLATFORM_SCRIPTS.get(platform)
            cred_key = PLATFORM_CRED_KEY.get(platform)
            if not script or not cred_key:
                results[RESULT_KEYS.get(platform, platform + "_result")] = {
                    "success": False, "error": f"Unknown platform: {platform}"
                }
                all_ok = False
                continue
            payload = {"text": text, "image_url": image_url, "credentials": creds[cred_key]}
            r = run_poster(script, payload)
            results[RESULT_KEYS[platform]] = r
            if not r.get("success"):
                all_ok = False

        results["status"] = "published" if all_ok else "failed"
        print(json.dumps(results))
        return

    print("Social scheduler agent. Use --post mode for posting.", flush=True)


if __name__ == "__main__":
    main()
