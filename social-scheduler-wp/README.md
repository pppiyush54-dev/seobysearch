# Social Scheduler — WordPress Plugin

A private, multi-project social media scheduling tool for seobysearch.com, inspired by Publer.

## Installation

1. Zip the `social-scheduler-wp/` folder (name the zip `social-scheduler.zip`)
2. Go to **WordPress Admin → Plugins → Add New → Upload Plugin**
3. Upload the zip and click **Activate**
4. A "📅 Social Scheduler" menu appears in your WordPress admin

## Database

On activation the plugin automatically creates two tables in your Hostinger MySQL database:
- `wp_ss_projects` — your project workspaces
- `wp_ss_posts` — scheduled posts with status, platforms, and results

## Features

- 📋 **List view** — all scheduled and published posts
- 📆 **Calendar view** — weekly timeline (Publer-style)  
- 🗂️ **Projects** — multiple workspaces, each with a brand colour
- 4 platforms: **LinkedIn, Twitter/X, Facebook, Instagram**
- Private — only accessible to WordPress admin users

## Routine Setup

After installing, go to **Settings** tab in the Scheduler to get your API key.

Update your Claude Code Routine with this API key so it can:
1. Fetch due posts: `GET /wp-json/ss/v1/posts/due` (Header: `X-SS-API-Key: <key>`)
2. Update post results: `PUT /wp-json/ss/v1/posts/{id}` (same header)

## Credential Env Vars (per project)

For a project with slug `aimil`:
```
AIMIL_LINKEDIN_ACCESS_TOKEN
AIMIL_LINKEDIN_PERSON_URN
AIMIL_TWITTER_API_KEY
AIMIL_TWITTER_API_SECRET
AIMIL_TWITTER_ACCESS_TOKEN
AIMIL_TWITTER_ACCESS_TOKEN_SECRET
AIMIL_FB_PAGE_TOKEN
AIMIL_FB_PAGE_ID
AIMIL_IG_USER_ID
```
