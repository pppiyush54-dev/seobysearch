#!/usr/bin/env python3
"""
Social media posting agent — reads pending posts from Artifact DB and publishes due items.

Called by the Claude Code Routine every 15 minutes.
Env vars required for each platform:
  LinkedIn: LINKEDIN_ACCESS_TOKEN, LINKEDIN_PERSON_URN
  Twitter:  TWITTER_API_KEY, TWITTER_API_SECRET,
            TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
Reads ARTIFACT_URL to identify the Artifact DB to poll.
"""
import os, sys, json, subprocess
from datetime import datetime, timezone

ARTIFACT_URL = os.environ.get("SOCIAL_SCHEDULER_ARTIFACT_URL", "")
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def run_poster(script: str, payload: dict) -> dict:
    script_path = os.path.join(SCRIPT_DIR, script)
    try:
        result = subprocess.run(
            [sys.executable, script_path],
            input=json.dumps(payload),
            capture_output=True, text=True, timeout=60
        )
        if result.returncode != 0:
            return {"success": False, "error": result.stderr[:300] or f"exit {result.returncode}"}
        return json.loads(result.stdout.strip())
    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Posting script timed out"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def main():
    if not ARTIFACT_URL:
        print("SOCIAL_SCHEDULER_ARTIFACT_URL not set — skipping", flush=True)
        return

    # Import ArtifactData is not available directly from Python;
    # this script prints structured output for the Claude Routine to act on.
    # The actual DB reads/writes happen via the Routine's tool calls.
    # This script is a helper invoked by the Routine with post data as stdin JSON.
    #
    # Usage as helper: echo '{"post": {...}, "doc_id": "..."}' | python run_agent.py --post
    if len(sys.argv) > 1 and sys.argv[1] == "--post":
        data = json.loads(sys.stdin.read())
        post = data["post"]
        doc_id = data["doc_id"]
        text = post.get("text", "")
        image_url = post.get("image_url")
        platforms = post.get("platforms", [])

        results = {}
        for platform in platforms:
            if platform == "li":
                results["linkedin_result"] = run_poster("post_linkedin.py", {"text": text, "image_url": image_url})
            elif platform == "x":
                results["twitter_result"] = run_poster("post_twitter.py", {"text": text, "image_url": image_url})

        all_ok = all(v.get("success") for v in results.values())
        results["status"] = "published" if all_ok else "failed"
        results["doc_id"] = doc_id
        print(json.dumps(results))
        return

    print("Social scheduler agent ready. Use --post mode for posting.", flush=True)


if __name__ == "__main__":
    main()
