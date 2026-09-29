<?php
/**
 * Plugin Name: Social Scheduler
 * Plugin URI:  https://seobysearch.com
 * Description: Private multi-project social media scheduler. Schedule posts to LinkedIn, X/Twitter, Facebook and Instagram with an hourly Routine.
 * Version:     1.0.0
 * Author:      SEO by Search
 * License:     GPL-2.0+
 */

defined('ABSPATH') || exit;

define('SS_VERSION',  '1.0.0');
define('SS_TABLE_PROJECTS', $GLOBALS['wpdb']->prefix . 'ss_projects');
define('SS_TABLE_POSTS',    $GLOBALS['wpdb']->prefix . 'ss_posts');
define('SS_API_NS', 'ss/v1');

/* ── Activation / Deactivation ─────────────────────────────────────────── */

register_activation_hook(__FILE__, 'ss_activate');
function ss_activate() {
    global $wpdb;
    $charset = $wpdb->get_charset_collate();

    $sql_projects = "CREATE TABLE IF NOT EXISTS " . SS_TABLE_PROJECTS . " (
        id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(100) NOT NULL,
        color       VARCHAR(30)  NOT NULL DEFAULT '#4f6ef7',
        slug        VARCHAR(60)  NOT NULL DEFAULT '',
        created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) $charset;";

    $sql_posts = "CREATE TABLE IF NOT EXISTS " . SS_TABLE_POSTS . " (
        id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        project_id       INT UNSIGNED,
        project_name     VARCHAR(100) NOT NULL DEFAULT '',
        project_slug     VARCHAR(60)  NOT NULL DEFAULT '',
        platforms        JSON         NOT NULL,
        content          TEXT         NOT NULL,
        image_url        VARCHAR(1000),
        scheduled_at     DATETIME     NOT NULL,
        status           ENUM('pending','publishing','published','failed') NOT NULL DEFAULT 'pending',
        linkedin_result  JSON,
        twitter_result   JSON,
        facebook_result  JSON,
        instagram_result JSON,
        published_at     DATETIME,
        created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_scheduled (scheduled_at),
        INDEX idx_project (project_id)
    ) $charset;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql_projects);
    dbDelta($sql_posts);

    // Store API key for Routine access
    if (!get_option('ss_api_key')) {
        update_option('ss_api_key', wp_generate_password(32, false));
    }
    update_option('ss_db_version', SS_VERSION);
}

/* ── Admin Menu ─────────────────────────────────────────────────────────── */

add_action('admin_menu', function () {
    add_menu_page(
        'Social Scheduler',
        '📅 Social Scheduler',
        'manage_options',
        'social-scheduler',
        'ss_render_page',
        'dashicons-calendar-alt',
        25
    );
});

function ss_render_page() {
    // Output the SPA — everything runs in this one admin page
    $api_root  = esc_url(rest_url(SS_API_NS));
    $nonce     = wp_create_nonce('wp_rest');
    $api_key   = esc_js(get_option('ss_api_key', ''));
    echo ss_spa_html($api_root, $nonce, $api_key);
}

/* ── REST API ───────────────────────────────────────────────────────────── */

add_action('rest_api_init', 'ss_register_routes');
function ss_register_routes() {
    // Auth helper — WordPress nonce OR API key header
    $auth = function (WP_REST_Request $req) {
        // Nonce auth (browser)
        if (current_user_can('manage_options')) return true;
        // API key auth (Routine)
        $key = $req->get_header('X-SS-API-Key') ?: $req->get_param('api_key');
        return $key && $key === get_option('ss_api_key') ? true : new WP_Error('forbidden', 'Unauthorized', ['status' => 403]);
    };

    // ── Projects ──
    register_rest_route(SS_API_NS, '/projects', [
        ['methods' => 'GET',  'callback' => 'ss_get_projects',    'permission_callback' => $auth],
        ['methods' => 'POST', 'callback' => 'ss_create_project',  'permission_callback' => $auth],
    ]);
    register_rest_route(SS_API_NS, '/projects/(?P<id>\d+)', [
        ['methods' => 'GET',    'callback' => 'ss_get_project',    'permission_callback' => $auth],
        ['methods' => 'PUT',    'callback' => 'ss_update_project', 'permission_callback' => $auth],
        ['methods' => 'DELETE', 'callback' => 'ss_delete_project', 'permission_callback' => $auth],
    ]);

    // ── Posts ──
    register_rest_route(SS_API_NS, '/posts', [
        ['methods' => 'GET',  'callback' => 'ss_get_posts',    'permission_callback' => $auth],
        ['methods' => 'POST', 'callback' => 'ss_create_post',  'permission_callback' => $auth],
    ]);
    register_rest_route(SS_API_NS, '/posts/(?P<id>\d+)', [
        ['methods' => 'GET',    'callback' => 'ss_get_post',    'permission_callback' => $auth],
        ['methods' => 'PUT',    'callback' => 'ss_update_post', 'permission_callback' => $auth],
        ['methods' => 'DELETE', 'callback' => 'ss_delete_post', 'permission_callback' => $auth],
    ]);

    // ── Due posts for Routine ──
    register_rest_route(SS_API_NS, '/posts/due', [
        'methods' => 'GET', 'callback' => 'ss_get_due_posts', 'permission_callback' => $auth,
    ]);

    // ── API Key (admin only) ──
    register_rest_route(SS_API_NS, '/settings', [
        'methods' => 'GET', 'callback' => 'ss_get_settings',
        'permission_callback' => fn() => current_user_can('manage_options'),
    ]);
}

/* ── Project Handlers ───────────────────────────────────────────────────── */

function ss_get_projects(WP_REST_Request $req) {
    global $wpdb;
    $rows = $wpdb->get_results("SELECT * FROM " . SS_TABLE_PROJECTS . " ORDER BY created_at DESC", ARRAY_A);
    return rest_ensure_response($rows ?: []);
}
function ss_get_project(WP_REST_Request $req) {
    global $wpdb;
    $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM " . SS_TABLE_PROJECTS . " WHERE id=%d", $req['id']), ARRAY_A);
    return $row ? rest_ensure_response($row) : new WP_Error('not_found', 'Project not found', ['status' => 404]);
}
function ss_create_project(WP_REST_Request $req) {
    global $wpdb;
    $name  = sanitize_text_field($req->get_param('name'));
    $color = sanitize_hex_color($req->get_param('color')) ?: '#4f6ef7';
    $slug  = sanitize_title($name);
    if (!$name) return new WP_Error('bad_request', 'name required', ['status' => 400]);
    $wpdb->insert(SS_TABLE_PROJECTS, compact('name', 'color', 'slug'));
    return rest_ensure_response(['id' => $wpdb->insert_id, 'name' => $name, 'color' => $color, 'slug' => $slug]);
}
function ss_update_project(WP_REST_Request $req) {
    global $wpdb;
    $data = [];
    if ($req->get_param('name'))  $data['name']  = sanitize_text_field($req->get_param('name'));
    if ($req->get_param('color')) $data['color'] = sanitize_hex_color($req->get_param('color')) ?: '#4f6ef7';
    if ($data['name'] ?? '') $data['slug'] = sanitize_title($data['name']);
    if (!$data) return new WP_Error('bad_request', 'Nothing to update', ['status' => 400]);
    $wpdb->update(SS_TABLE_PROJECTS, $data, ['id' => (int)$req['id']]);
    return rest_ensure_response(['updated' => true]);
}
function ss_delete_project(WP_REST_Request $req) {
    global $wpdb;
    $wpdb->delete(SS_TABLE_PROJECTS, ['id' => (int)$req['id']]);
    return rest_ensure_response(['deleted' => true]);
}

/* ── Post Handlers ──────────────────────────────────────────────────────── */

function ss_get_posts(WP_REST_Request $req) {
    global $wpdb;
    $where = '1=1';
    $params = [];
    if ($req->get_param('project_id')) {
        $where .= ' AND project_id = %d';
        $params[] = (int)$req->get_param('project_id');
    }
    if ($req->get_param('status')) {
        $where .= ' AND status = %s';
        $params[] = $req->get_param('status');
    }
    $limit = min((int)($req->get_param('limit') ?: 200), 500);
    $sql = "SELECT * FROM " . SS_TABLE_POSTS . " WHERE $where ORDER BY scheduled_at DESC LIMIT $limit";
    $rows = $params ? $wpdb->get_results($wpdb->prepare($sql, ...$params), ARRAY_A)
                    : $wpdb->get_results($sql, ARRAY_A);
    foreach ($rows as &$r) {
        $r['platforms']        = json_decode($r['platforms'] ?? '[]', true) ?: [];
        $r['linkedin_result']  = json_decode($r['linkedin_result']  ?? 'null', true);
        $r['twitter_result']   = json_decode($r['twitter_result']   ?? 'null', true);
        $r['facebook_result']  = json_decode($r['facebook_result']  ?? 'null', true);
        $r['instagram_result'] = json_decode($r['instagram_result'] ?? 'null', true);
    }
    return rest_ensure_response($rows ?: []);
}
function ss_get_post(WP_REST_Request $req) {
    global $wpdb;
    $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM " . SS_TABLE_POSTS . " WHERE id=%d", $req['id']), ARRAY_A);
    if (!$row) return new WP_Error('not_found', 'Post not found', ['status' => 404]);
    $row['platforms'] = json_decode($row['platforms'] ?? '[]', true) ?: [];
    return rest_ensure_response($row);
}
function ss_create_post(WP_REST_Request $req) {
    global $wpdb;
    $content      = sanitize_textarea_field($req->get_param('content') ?: '');
    $scheduled_at = sanitize_text_field($req->get_param('scheduled_at') ?: '');
    $platforms    = json_encode(array_map('sanitize_text_field', (array)($req->get_param('platforms') ?: [])));
    $project_id   = (int)($req->get_param('project_id') ?: 0);
    if (!$content || !$scheduled_at) return new WP_Error('bad_request', 'content and scheduled_at required', ['status' => 400]);

    $proj = $project_id ? $wpdb->get_row($wpdb->prepare("SELECT name,slug FROM " . SS_TABLE_PROJECTS . " WHERE id=%d", $project_id), ARRAY_A) : null;

    $wpdb->insert(SS_TABLE_POSTS, [
        'project_id'   => $project_id ?: null,
        'project_name' => $proj['name'] ?? '',
        'project_slug' => $proj['slug'] ?? '',
        'platforms'    => $platforms,
        'content'      => $content,
        'image_url'    => esc_url_raw($req->get_param('image_url') ?: ''),
        'scheduled_at' => date('Y-m-d H:i:s', strtotime($scheduled_at)),
        'status'       => 'pending',
    ]);
    return rest_ensure_response(['id' => $wpdb->insert_id]);
}
function ss_update_post(WP_REST_Request $req) {
    global $wpdb;
    $data = [];
    $allowed = ['content', 'image_url', 'scheduled_at', 'status', 'linkedin_result', 'twitter_result', 'facebook_result', 'instagram_result', 'published_at'];
    foreach ($allowed as $k) {
        $v = $req->get_param($k);
        if ($v !== null) {
            if (in_array($k, ['linkedin_result','twitter_result','facebook_result','instagram_result'])) {
                $data[$k] = is_array($v) ? json_encode($v) : $v;
            } elseif ($k === 'platforms') {
                $data[$k] = json_encode((array)$v);
            } else {
                $data[$k] = sanitize_text_field($v);
            }
        }
    }
    if ($req->get_param('platforms')) $data['platforms'] = json_encode((array)$req->get_param('platforms'));
    if (!$data) return new WP_Error('bad_request', 'Nothing to update', ['status' => 400]);
    $wpdb->update(SS_TABLE_POSTS, $data, ['id' => (int)$req['id']]);
    return rest_ensure_response(['updated' => true]);
}
function ss_delete_post(WP_REST_Request $req) {
    global $wpdb;
    $wpdb->delete(SS_TABLE_POSTS, ['id' => (int)$req['id']]);
    return rest_ensure_response(['deleted' => true]);
}
function ss_get_due_posts(WP_REST_Request $req) {
    global $wpdb;
    $now  = current_time('mysql');
    $rows = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM " . SS_TABLE_POSTS . " WHERE status='pending' AND scheduled_at <= %s ORDER BY scheduled_at ASC LIMIT 50", $now),
        ARRAY_A
    );
    foreach ($rows as &$r) $r['platforms'] = json_decode($r['platforms'] ?? '[]', true) ?: [];
    return rest_ensure_response($rows ?: []);
}
function ss_get_settings() {
    return rest_ensure_response([
        'api_key'    => get_option('ss_api_key', ''),
        'api_root'   => rest_url(SS_API_NS),
        'db_version' => get_option('ss_db_version', ''),
    ]);
}

/* ── SPA HTML ───────────────────────────────────────────────────────────── */

function ss_spa_html(string $api_root, string $nonce, string $api_key): string {
ob_start(); ?>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap">
<style>
/* Scoped to #ss-app to avoid WP admin conflicts */
#ss-app *,#ss-app *::before,#ss-app *::after{box-sizing:border-box;margin:0;padding:0}
#ss-app {
  --bg:#0d1117;--surface:#161b22;--card:#1c2128;--border:#30363d;--fg:#e6edf3;--muted:#7d8590;
  --accent:#4f6ef7;--li:#0a66c2;--fb:#1877f2;--ig1:#e1306c;--ig2:#833ab4;--x-col:#e7e9ea;
  --green:#3fb950;--yellow:#d29922;--red:#f85149;--purple:#bc8cff;
  font-family:'Inter',system-ui,sans-serif;font-size:14px;line-height:1.5;
  color:var(--fg);display:flex;height:calc(100vh - 46px);overflow:hidden;
  background:var(--bg);border-radius:8px;border:1px solid var(--border);
  position:relative;
}
/* sidebar */
#ss-app .sb{width:220px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto}
#ss-app .sb-brand{padding:16px 14px 12px;border-bottom:1px solid var(--border)}
#ss-app .sb-brand h2{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;display:flex;align-items:center;gap:7px}
#ss-app .sb-nav{flex:1;padding:8px 0}
#ss-app .sb-section{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);padding:10px 14px 4px}
#ss-app .nav-item{display:flex;align-items:center;gap:8px;padding:7px 14px;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;border-radius:0;transition:all .15s;border:none;background:none;width:100%;text-align:left;font-family:inherit}
#ss-app .nav-item:hover{background:var(--card);color:var(--fg)}
#ss-app .nav-item.active{background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent)}
#ss-app .nav-icon{font-size:15px;width:18px;text-align:center}
#ss-app .sb-create{padding:12px 14px;border-top:1px solid var(--border)}
#ss-app .btn-create{width:100%;background:var(--accent);color:#fff;border:none;border-radius:8px;padding:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px}
#ss-app .btn-create:hover{opacity:.88}
/* project list in sidebar */
#ss-app .proj-list{padding:0 8px}
#ss-app .proj-item{display:flex;align-items:center;gap:7px;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:12px;color:var(--muted);transition:all .15s;border:none;background:none;width:100%;text-align:left;font-family:inherit}
#ss-app .proj-item:hover{background:var(--card);color:var(--fg)}
#ss-app .proj-item.active{background:var(--card);color:var(--fg)}
#ss-app .proj-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
/* main */
#ss-app .main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden}
#ss-app .topbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 18px;border-bottom:1px solid var(--border);flex-shrink:0}
#ss-app .topbar-left{display:flex;align-items:center;gap:10px}
#ss-app .topbar h1{font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700}
#ss-app .view-toggle{display:flex;gap:3px;background:var(--card);border-radius:7px;padding:3px}
#ss-app .vtab{background:none;border:none;color:var(--muted);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
#ss-app .vtab.active{background:var(--surface);color:var(--fg)}
#ss-app .topbar-right{display:flex;gap:7px}
#ss-app .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border-bottom:1px solid var(--border);flex-shrink:0}
#ss-app .stat-box{background:var(--surface);padding:10px 16px;display:flex;align-items:center;gap:8px}
#ss-app .stat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
#ss-app .stat-val{font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
#ss-app .stat-label{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
#ss-app .filter-bar{display:flex;gap:6px;padding:10px 16px;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;flex-shrink:0;align-items:center}
#ss-app .filter-bar::-webkit-scrollbar{display:none}
#ss-app .ftab{background:none;border:1px solid var(--border);border-radius:20px;color:var(--muted);padding:4px 12px;font-size:11px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .15s;font-family:inherit}
#ss-app .ftab.active{background:var(--accent);border-color:var(--accent);color:#fff}
/* posts list */
#ss-app .posts-area{flex:1;overflow-y:auto;padding:14px 18px 48px;display:flex;flex-direction:column;gap:8px}
/* Calendar */
#ss-app .cal-area{flex:1;overflow-y:auto;display:flex;flex-direction:column}
#ss-app .cal-header{display:grid;grid-template-columns:60px repeat(7,1fr);border-bottom:1px solid var(--border);background:var(--surface);flex-shrink:0}
#ss-app .cal-dayhdr{padding:8px 6px;font-size:11px;font-weight:600;text-align:center;color:var(--muted)}
#ss-app .cal-dayhdr.today{color:var(--accent)}
#ss-app .cal-body{flex:1;overflow-y:auto;display:grid;grid-template-columns:60px repeat(7,1fr)}
#ss-app .cal-time-col{display:flex;flex-direction:column}
#ss-app .cal-hour-label{height:60px;padding:4px 6px;font-size:10px;color:var(--muted);border-bottom:1px solid var(--border);text-align:right;flex-shrink:0}
#ss-app .cal-day-col{border-left:1px solid var(--border);position:relative;min-height:1440px}
#ss-app .cal-day-col .hour-line{position:absolute;left:0;right:0;height:1px;background:var(--border)}
#ss-app .cal-post-block{position:absolute;left:2px;right:2px;background:color-mix(in srgb,var(--accent) 15%,transparent);border-left:3px solid var(--accent);border-radius:3px;padding:2px 4px;font-size:10px;overflow:hidden;cursor:pointer;z-index:1}
#ss-app .cal-post-block.published{border-color:var(--green);background:color-mix(in srgb,var(--green) 12%,transparent)}
#ss-app .cal-post-block.failed{border-color:var(--red);background:color-mix(in srgb,var(--red) 12%,transparent)}
/* cards */
#ss-app .pcard{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;display:flex;gap:10px;transition:border-color .15s;cursor:default}
#ss-app .pcard:hover{border-color:var(--accent)}
#ss-app .pcard.overdue{border-left:3px solid var(--yellow)}
#ss-app .pcard-side{display:flex;flex-direction:column;gap:4px;align-items:center;flex-shrink:0;min-width:30px}
#ss-app .picon{width:26px;height:26px;border-radius:6px;display:grid;place-items:center;font-size:11px;font-weight:800;border:1px solid transparent}
#ss-app .picon.li{background:color-mix(in srgb,var(--li) 12%,transparent);color:var(--li);border-color:color-mix(in srgb,var(--li) 25%,transparent)}
#ss-app .picon.x{background:color-mix(in srgb,var(--x-col) 8%,transparent);color:var(--x-col);border-color:var(--border)}
#ss-app .picon.fb{background:color-mix(in srgb,var(--fb) 12%,transparent);color:var(--fb);border-color:color-mix(in srgb,var(--fb) 25%,transparent)}
#ss-app .picon.ig{background:color-mix(in srgb,var(--ig1) 12%,transparent);color:var(--ig1);border-color:color-mix(in srgb,var(--ig1) 25%,transparent)}
#ss-app .proj-chip{font-size:9px;font-weight:700;padding:2px 5px;border-radius:4px;text-transform:uppercase;max-width:44px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
#ss-app .pcard-body{flex:1;min-width:0}
#ss-app .pcard-text{font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
#ss-app .pcard-img{width:100%;max-height:130px;object-fit:cover;border-radius:6px;border:1px solid var(--border);margin-bottom:6px}
#ss-app .pcard-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
#ss-app .meta-time{font-size:11px;color:var(--muted)}
#ss-app .badge{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:2px 7px;border-radius:20px}
#ss-app .badge.pending{background:color-mix(in srgb,var(--yellow) 12%,transparent);color:var(--yellow)}
#ss-app .badge.publishing{background:color-mix(in srgb,var(--purple) 12%,transparent);color:var(--purple)}
#ss-app .badge.published{background:color-mix(in srgb,var(--green) 12%,transparent);color:var(--green)}
#ss-app .badge.failed{background:color-mix(in srgb,var(--red) 12%,transparent);color:var(--red)}
#ss-app .pcard-del{width:26px;height:26px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;display:grid;place-items:center;font-size:12px;font-family:inherit;flex-shrink:0;align-self:flex-start;transition:all .15s}
#ss-app .pcard-del:hover{border-color:var(--red);color:var(--red)}
/* empty */
#ss-app .empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;color:var(--muted);gap:6px}
#ss-app .empty-icon{font-size:36px}
#ss-app .empty h3{font-size:14px;color:var(--fg)}
/* overlays */
#ss-app .overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;display:none;align-items:center;justify-content:center;padding:20px}
#ss-app .overlay.open{display:flex}
#ss-app .modal{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px 20px 28px;width:100%;max-width:500px;max-height:92vh;overflow-y:auto}
#ss-app .modal-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
#ss-app .modal-hdr h2{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700}
#ss-app .btn-close{width:26px;height:26px;border-radius:50%;background:var(--card);border:1px solid var(--border);color:var(--muted);font-size:14px;cursor:pointer;display:grid;place-items:center;font-family:inherit}
#ss-app .fgroup{margin-bottom:12px}
#ss-app .flabel{display:block;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:4px}
#ss-app .finput{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:7px;color:var(--fg);font-size:13px;padding:8px 10px;font-family:inherit;transition:border-color .15s;outline:none}
#ss-app .finput:focus{border-color:var(--accent)}
#ss-app textarea.finput{min-height:80px;resize:vertical;line-height:1.6}
#ss-app .char-row{display:flex;justify-content:flex-end;font-size:10px;color:var(--muted);margin-top:2px}
#ss-app .char-row.warn{color:var(--yellow)} #ss-app .char-row.over{color:var(--red)}
#ss-app .plt-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
#ss-app .plt-btn{padding:8px;border:2px solid var(--border);border-radius:8px;background:none;color:var(--muted);font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit}
#ss-app .plt-btn.li.on{border-color:var(--li);color:var(--li);background:color-mix(in srgb,var(--li) 10%,transparent)}
#ss-app .plt-btn.x.on{border-color:var(--x-col);color:var(--x-col);background:color-mix(in srgb,var(--x-col) 8%,transparent)}
#ss-app .plt-btn.fb.on{border-color:var(--fb);color:var(--fb);background:color-mix(in srgb,var(--fb) 10%,transparent)}
#ss-app .plt-btn.ig.on{border-color:var(--ig1);color:var(--ig1);background:color-mix(in srgb,var(--ig1) 10%,transparent)}
#ss-app .ig-note{font-size:10px;color:var(--yellow);margin-top:3px;display:none}
#ss-app .img-tabs{display:flex;gap:4px;margin-bottom:6px}
#ss-app .img-tab{flex:1;padding:5px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--muted);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;text-align:center}
#ss-app .img-tab.active{background:var(--accent);border-color:var(--accent);color:#fff}
#ss-app .upload-zone{border:2px dashed var(--border);border-radius:8px;padding:18px;text-align:center;cursor:pointer;transition:all .15s;position:relative;background:var(--bg)}
#ss-app .upload-zone:hover{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 5%,var(--bg))}
#ss-app .upload-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
#ss-app .uz-text{font-size:11px;color:var(--muted)}
#ss-app .upload-preview img{width:100%;max-height:120px;object-fit:cover;border-radius:6px;margin-top:6px}
#ss-app .upload-info{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:3px}
#ss-app .btn-rm{background:none;border:none;color:var(--red);cursor:pointer;font-size:11px;font-family:inherit}
#ss-app .color-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:4px}
#ss-app .color-sw{width:24px;height:24px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .15s}
#ss-app .color-sw.sel{border-color:#fff;transform:scale(1.15)}
#ss-app .modal-footer{display:flex;gap:8px;margin-top:16px}
#ss-app .btn-cancel{flex:1;background:none;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:9px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
#ss-app .btn-submit{flex:2;background:var(--accent);border:none;color:#fff;border-radius:8px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
#ss-app .btn-submit:hover{opacity:.87} #ss-app .btn-submit:disabled{opacity:.5;cursor:not-allowed}
#ss-app .settings-box{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:14px;font-size:12px;margin-bottom:12px}
#ss-app .settings-box h3{font-size:13px;font-weight:600;margin-bottom:8px}
#ss-app .key-display{background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:6px 10px;font-size:12px;font-family:monospace;word-break:break-all;color:var(--green)}
#ss-app .spin{width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:ss-spin .7s linear infinite;flex-shrink:0}
@keyframes ss-spin{to{transform:rotate(360deg)}}
#ss-app .loading-msg{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px;padding:24px;justify-content:center}
</style>

<div id="ss-app">
  <!-- Sidebar -->
  <aside class="sb">
    <div class="sb-brand">
      <h2>📅 Social Scheduler</h2>
    </div>
    <div class="sb-nav">
      <button class="nav-item active" onclick="setView('posts',this)"><span class="nav-icon">📋</span>Posts</button>
      <button class="nav-item" onclick="setView('calendar',this)"><span class="nav-icon">📆</span>Calendar</button>
      <button class="nav-item" onclick="setView('settings',this)"><span class="nav-icon">⚙️</span>Settings</button>
      <div class="sb-section">Projects</div>
      <div class="proj-list" id="proj-list">
        <button class="proj-item active" data-pid="all" onclick="setProject('all',this)">
          <div class="proj-dot" style="background:var(--muted)"></div>All Projects
        </button>
      </div>
    </div>
    <div class="sb-create">
      <button class="btn-create" onclick="openPostModal()">
        ＋ Create Post
      </button>
    </div>
  </aside>

  <!-- Main -->
  <div class="main">
    <!-- Posts view -->
    <div id="view-posts" class="main" style="overflow:hidden">
      <div class="topbar">
        <div class="topbar-left">
          <h1 id="posts-title">All Projects</h1>
          <div class="view-toggle">
            <button class="vtab active" onclick="setListView('list',this)">≡ List</button>
          </div>
        </div>
        <div class="topbar-right">
          <button class="ftab" onclick="openProjectModal()" style="border-style:dashed">+ Project</button>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-box"><div class="stat-dot" style="background:var(--yellow)"></div><div><div class="stat-val" id="s-pending">—</div><div class="stat-label">Scheduled</div></div></div>
        <div class="stat-box"><div class="stat-dot" style="background:var(--green)"></div><div><div class="stat-val" id="s-pub">—</div><div class="stat-label">Published</div></div></div>
        <div class="stat-box"><div class="stat-dot" style="background:var(--red)"></div><div><div class="stat-val" id="s-fail">—</div><div class="stat-label">Failed</div></div></div>
      </div>
      <div class="filter-bar">
        <button class="ftab active" onclick="setFilter('all',this)">All</button>
        <button class="ftab" onclick="setFilter('pending',this)">Scheduled</button>
        <button class="ftab" onclick="setFilter('published',this)">Published</button>
        <button class="ftab" onclick="setFilter('failed',this)">Failed</button>
      </div>
      <div class="posts-area" id="posts-area">
        <div class="loading-msg"><div class="spin"></div>Loading…</div>
      </div>
    </div>

    <!-- Calendar view -->
    <div id="view-calendar" class="main" style="display:none;overflow:hidden">
      <div class="topbar">
        <div class="topbar-left">
          <button onclick="calNav(-7)" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--muted);cursor:pointer;font-family:inherit">‹</button>
          <h1 id="cal-title">Week</h1>
          <button onclick="calNav(7)" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--muted);cursor:pointer;font-family:inherit">›</button>
          <button onclick="calGoToday()" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--fg);cursor:pointer;font-size:11px;font-weight:600;font-family:inherit">Today</button>
        </div>
      </div>
      <div id="cal-container" style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div class="cal-header" id="cal-header">
          <div class="cal-dayhdr"></div>
        </div>
        <div class="cal-body" id="cal-body">
          <div class="cal-time-col" id="cal-time-col"></div>
        </div>
      </div>
    </div>

    <!-- Settings view -->
    <div id="view-settings" style="display:none;flex:1;overflow-y:auto;padding:20px">
      <h1 style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:700;margin-bottom:16px">Settings</h1>
      <div class="settings-box">
        <h3>🔑 Routine API Key</h3>
        <p style="color:var(--muted);font-size:12px;margin-bottom:8px">Use this key in your Claude Routine to authenticate calls to the WordPress REST API.</p>
        <div class="key-display" id="api-key-display">Loading…</div>
        <div style="margin-top:8px;font-size:11px;color:var(--muted)">Header: <code>X-SS-API-Key: &lt;key&gt;</code></div>
      </div>
      <div class="settings-box">
        <h3>🌐 API Endpoints</h3>
        <p style="color:var(--muted);font-size:12px;margin-bottom:8px">REST API base URL for the Routine:</p>
        <div class="key-display" id="api-root-display">Loading…</div>
        <div style="margin-top:10px;font-size:12px;color:var(--muted)">
          <div>GET /posts/due — fetch pending posts that are due</div>
          <div>PUT /posts/{id} — update post status/results</div>
        </div>
      </div>
      <div class="settings-box">
        <h3>📦 Database</h3>
        <p style="font-size:12px;color:var(--muted)">Posts and projects are stored in your WordPress MySQL database on Hostinger.<br>Tables: <code>wp_ss_projects</code> and <code>wp_ss_posts</code></p>
      </div>
      <div class="settings-box">
        <h3>🔐 Environment Secrets (Hostinger)</h3>
        <p style="font-size:12px;color:var(--muted);margin-bottom:6px">Add these as environment variables in your Claude Code environment secrets for each project:</p>
        <pre style="font-size:11px;color:var(--green);background:var(--bg);padding:10px;border-radius:6px;overflow-x:auto">{SLUG}_LINKEDIN_ACCESS_TOKEN
{SLUG}_LINKEDIN_PERSON_URN
{SLUG}_TWITTER_API_KEY
{SLUG}_TWITTER_API_SECRET
{SLUG}_TWITTER_ACCESS_TOKEN
{SLUG}_TWITTER_ACCESS_TOKEN_SECRET
{SLUG}_FB_PAGE_TOKEN
{SLUG}_FB_PAGE_ID
{SLUG}_IG_USER_ID</pre>
        <p style="font-size:11px;color:var(--muted);margin-top:6px">Example: project slug "aimil" → <code>AIMIL_LINKEDIN_ACCESS_TOKEN</code></p>
      </div>
    </div>
  </div>
</div>

<!-- Add Project Modal -->
<div class="overlay" id="proj-overlay" onclick="if(event.target===this)closeModal('proj-overlay')">
  <div class="modal">
    <div class="modal-hdr">
      <h2>Add Project</h2>
      <button class="btn-close" onclick="closeModal('proj-overlay')">✕</button>
    </div>
    <div class="fgroup">
      <label class="flabel">Project Name</label>
      <input type="text" class="finput" id="pj-name" placeholder="e.g. Aimil Ltd.">
    </div>
    <div class="fgroup">
      <label class="flabel">Brand Colour</label>
      <div class="color-row" id="color-row"></div>
    </div>
    <div class="modal-footer">
      <button class="btn-cancel" onclick="closeModal('proj-overlay')">Cancel</button>
      <button class="btn-submit" onclick="saveProject()">Add Project</button>
    </div>
  </div>
</div>

<!-- Create Post Modal -->
<div class="overlay" id="post-overlay" onclick="if(event.target===this)closeModal('post-overlay')">
  <div class="modal">
    <div class="modal-hdr">
      <h2>Schedule Post</h2>
      <button class="btn-close" onclick="closeModal('post-overlay')">✕</button>
    </div>
    <div class="fgroup">
      <label class="flabel">Project</label>
      <select class="finput" id="pp-project"></select>
    </div>
    <div class="fgroup">
      <label class="flabel">Platforms</label>
      <div class="plt-grid">
        <button class="plt-btn li on" id="plt-li" onclick="togglePlt('li')"><b>𝗶𝗻</b> LinkedIn</button>
        <button class="plt-btn x"  id="plt-x"  onclick="togglePlt('x')">𝕏 Twitter / X</button>
        <button class="plt-btn fb" id="plt-fb" onclick="togglePlt('fb')">f Facebook</button>
        <button class="plt-btn ig" id="plt-ig" onclick="togglePlt('ig')">📷 Instagram</button>
      </div>
      <div class="ig-note" id="ig-note">⚠️ Instagram requires an image — text-only posts will be skipped.</div>
    </div>
    <div class="fgroup">
      <label class="flabel">Post Content</label>
      <textarea class="finput" id="pp-content" placeholder="Write your caption…" oninput="onTextInput()"></textarea>
      <div class="char-row" id="char-count">0 / 3000</div>
    </div>
    <div class="fgroup">
      <label class="flabel">Image <span style="opacity:.5;font-weight:400;text-transform:none">optional</span></label>
      <div class="img-tabs">
        <button class="img-tab active" id="itab-url" onclick="switchImgTab('url')">🔗 Paste URL</button>
        <button class="img-tab" id="itab-file" onclick="switchImgTab('file')">📁 Browse</button>
      </div>
      <div id="ipanel-url">
        <input type="url" class="finput" id="pp-imgurl" placeholder="https://…/image.jpg">
      </div>
      <div id="ipanel-file" hidden>
        <div class="upload-zone" onclick="document.getElementById('pp-file').click()">
          <input type="file" id="pp-file" accept="image/*" style="display:none" onchange="onFileChange(event)">
          <div class="uz-text">📁 Click to browse — max 5MB</div>
        </div>
        <div id="file-preview" hidden>
          <img id="file-thumb" src="" alt="">
          <div class="upload-info">
            <span id="file-name" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70%"></span>
            <button class="btn-rm" onclick="removeFile()">✕ Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div class="fgroup">
      <label class="flabel">Schedule Date &amp; Time</label>
      <input type="datetime-local" class="finput" id="pp-when">
    </div>
    <div class="modal-footer">
      <button class="btn-cancel" onclick="closeModal('post-overlay')">Cancel</button>
      <button class="btn-submit" id="btn-submit-post" onclick="submitPost()">📅 Schedule</button>
    </div>
  </div>
</div>

<script>
(function(){
const API   = <?php echo json_encode($api_root); ?>;
const NONCE = <?php echo json_encode($nonce); ?>;

const COLORS = ['#4f6ef7','#0a66c2','#1877f2','#e1306c','#3fb950','#d29922','#f85149','#bc8cff','#ff7b00','#00b4d8','#06d6a0','#e63946'];
const PLT_LABELS = {li:'𝗶𝗻',x:'𝕏',fb:'f',ig:'📷'};

let projects = [], posts = [], activeProject = 'all', activeFilter = 'all', activeView = 'posts';
let plts = new Set(['li']);
let imgTab = 'url', fileDataUrl = null;
let selColor = COLORS[0];
let calOffset = 0; // days offset from current week

/* ── API helpers ── */
async function api(method, path, data) {
  const opts = {
    method,
    headers: {'Content-Type':'application/json','X-WP-Nonce': NONCE},
    credentials: 'include'
  };
  if (data) opts.body = JSON.stringify(data);
  const r = await fetch(API + path, opts);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/* ── Bootstrap ── */
async function init() {
  buildColorRow();
  buildCalTimecol();
  await Promise.all([loadProjects(), loadPosts()]);
  // Load API key for settings
  try {
    const s = await api('GET', '/settings');
    document.getElementById('api-key-display').textContent = s.api_key || '—';
    document.getElementById('api-root-display').textContent = s.api_root || API;
  } catch(e){}
}
async function loadProjects() {
  projects = await api('GET', '/projects');
  renderProjectSidebar();
  renderProjectSelect();
}
async function loadPosts() {
  const qs = activeProject !== 'all' ? `?project_id=${activeProject}` : '';
  posts = await api('GET', '/posts' + qs);
  renderPosts();
  updateStats();
  renderCalendar();
}

/* ── Project sidebar ── */
function renderProjectSidebar() {
  const list = document.getElementById('proj-list');
  const all  = `<button class="proj-item${activeProject==='all'?' active':''}" data-pid="all" onclick="setProject('all',this)"><div class="proj-dot" style="background:var(--muted)"></div>All Projects</button>`;
  const items = projects.map(p =>
    `<button class="proj-item${activeProject==p.id?' active':''}" data-pid="${p.id}" onclick="setProject(${p.id},this)">
      <div class="proj-dot" style="background:${esc(p.color)}"></div>${esc(p.name)}
    </button>`).join('');
  list.innerHTML = all + items;
}
function renderProjectSelect() {
  const sel = document.getElementById('pp-project');
  sel.innerHTML = projects.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
}
function setProject(pid, btn) {
  activeProject = pid;
  document.querySelectorAll('#ss-app .proj-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const p = projects.find(x => x.id == pid);
  document.getElementById('posts-title').textContent = p ? p.name : 'All Projects';
  loadPosts();
}

/* ── Stats ── */
function updateStats() {
  let p=0,pub=0,fail=0;
  posts.forEach(v => {
    if (v.status==='pending'||v.status==='publishing') p++;
    else if (v.status==='published') pub++;
    else if (v.status==='failed') fail++;
  });
  document.getElementById('s-pending').textContent = p;
  document.getElementById('s-pub').textContent     = pub;
  document.getElementById('s-fail').textContent    = fail;
}

/* ── Views ── */
function setView(v, btn) {
  activeView = v;
  document.querySelectorAll('#ss-app .nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('view-posts').style.display = v==='posts' ? 'flex' : 'none';
  document.getElementById('view-calendar').style.display = v==='calendar' ? 'flex' : 'none';
  document.getElementById('view-settings').style.display = v==='settings' ? 'block' : 'none';
  if (v==='calendar') renderCalendar();
}
function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('#ss-app .filter-bar .ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPosts();
}

/* ── Post list ── */
function renderPosts() {
  const area = document.getElementById('posts-area');
  let list = posts.slice();
  if (activeFilter !== 'all') list = list.filter(p => activeFilter==='pending' ? (p.status==='pending'||p.status==='publishing') : p.status===activeFilter);
  list.sort((a,b) => {
    const ap = a.status==='pending'||a.status==='publishing';
    const bp = b.status==='pending'||b.status==='publishing';
    if (ap!==bp) return ap?-1:1;
    return ap ? new Date(a.scheduled_at)-new Date(b.scheduled_at) : new Date(b.scheduled_at)-new Date(a.scheduled_at);
  });
  if (!list.length) {
    area.innerHTML = `<div class="empty"><div class="empty-icon">📭</div><h3>${activeFilter==='all'?'No posts yet — click "Create Post" to schedule one.':'No '+activeFilter+' posts.'}</h3></div>`;
    return;
  }
  area.innerHTML = list.map(cardHtml).join('');
}

function cardHtml(p) {
  const now = new Date(), sched = new Date(p.scheduled_at);
  const overdue = p.status==='pending' && sched < now;
  const proj = projects.find(x=>x.id==p.project_id);
  const picons = (p.platforms||[]).map(pl => `<div class="picon ${pl}">${PLT_LABELS[pl]||pl}</div>`).join('');
  const chip = proj ? `<div class="proj-chip" style="background:${proj.color}22;color:${proj.color}">${esc(proj.name)}</div>` : '';
  const badgeLabel = {pending:'⏳ Scheduled',publishing:'⏳ Posting…',published:'✓ Published',failed:'✕ Failed'}[p.status]||p.status;
  const imgEl = p.image_url ? `<img src="${esc(p.image_url)}" class="pcard-img" onerror="this.hidden=true" alt="">` : '';
  const results = ['li','x','fb','ig'].map(pl => {
    const key = {li:'linkedin_result',x:'twitter_result',fb:'facebook_result',ig:'instagram_result'}[pl];
    const r = p[key]; if (!r) return '';
    const label = {li:'LI',x:'X',fb:'FB',ig:'IG'}[pl];
    if (r.skipped) return `<span style="color:var(--muted);font-size:10px">${label}: skipped</span>`;
    if (r.success) return `<span style="color:var(--green);font-size:10px">${label} ✓</span>`;
    if (r.error)   return `<span style="color:var(--red);font-size:10px">${label}: ${esc(String(r.error).slice(0,40))}</span>`;
    return '';
  }).filter(Boolean).join(' ');
  const del = p.status==='pending' ? `<button class="pcard-del" onclick="delPost(${p.id})" title="Delete">🗑</button>` : '';
  return `<div class="pcard${overdue?' overdue':''}">
    <div class="pcard-side">${picons}${chip}</div>
    <div class="pcard-body">
      <div class="pcard-text">${esc(p.content||'')}</div>${imgEl}
      <div class="pcard-meta">
        <span class="meta-time">🕐 ${fmtDate(p.scheduled_at)}</span>
        <span class="badge ${p.status}">${badgeLabel}</span>
        ${overdue?'<span style="font-size:9px;color:var(--yellow)">overdue</span>':''}
      </div>
      ${results?`<div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap">${results}</div>`:''}
    </div>${del}
  </div>`;
}

/* ── Calendar ── */
function buildCalTimecol() {
  const col = document.getElementById('cal-time-col');
  col.innerHTML = Array.from({length:24},(_,h) =>
    `<div class="cal-hour-label">${String(h).padStart(2,'0')}:00</div>`
  ).join('');
}
function calNav(days) { calOffset += days; renderCalendar(); }
function calGoToday() { calOffset = 0; renderCalendar(); }
function renderCalendar() {
  const today = new Date(); today.setHours(0,0,0,0);
  const startOfWeek = new Date(today);
  const dow = today.getDay(); // 0=Sun
  startOfWeek.setDate(today.getDate() - dow + calOffset);
  const days = Array.from({length:7}, (_,i) => { const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate()+i); return d; });

  // Header
  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const hdr = document.getElementById('cal-header');
  hdr.innerHTML = `<div class="cal-dayhdr"></div>` +
    days.map(d => {
      const isToday = d.toDateString() === new Date().toDateString();
      return `<div class="cal-dayhdr${isToday?' today':''}">${DAY_NAMES[d.getDay()]}<br><b>${d.getDate()}</b></div>`;
    }).join('');

  const title = startOfWeek.toLocaleDateString('en-GB',{month:'short',year:'numeric'});
  document.getElementById('cal-title').textContent = title;

  // Body — day columns
  const body = document.getElementById('cal-body');
  const tc = document.getElementById('cal-time-col');
  body.innerHTML = '';
  body.appendChild(tc);

  days.forEach(d => {
    const col = document.createElement('div');
    col.className = 'cal-day-col';
    // Hour lines
    for (let h=0;h<24;h++) {
      const line = document.createElement('div');
      line.className = 'hour-line';
      line.style.top = (h*60)+'px';
      col.appendChild(line);
    }
    // Posts for this day
    const dayStr = d.toISOString().slice(0,10);
    const dayPosts = posts.filter(p => p.scheduled_at && p.scheduled_at.slice(0,10) === dayStr);
    dayPosts.forEach(p => {
      const dt = new Date(p.scheduled_at);
      const top = (dt.getHours()*60 + dt.getMinutes());
      const block = document.createElement('div');
      block.className = `cal-post-block ${p.status}`;
      block.style.top = top + 'px';
      block.title = p.content;
      const plIcons = (p.platforms||[]).map(pl=>PLT_LABELS[pl]||pl).join(' ');
      block.textContent = plIcons + ' ' + (p.content||'').slice(0,30);
      col.appendChild(block);
    });
    body.appendChild(col);
  });
}

/* ── Platform toggles ── */
function togglePlt(id) {
  const btn = document.getElementById('plt-'+id);
  if (plts.has(id)) { if(plts.size<2) return; plts.delete(id); btn.classList.remove('on'); }
  else { plts.add(id); btn.classList.add('on'); }
  document.getElementById('ig-note').style.display = plts.has('ig') ? 'block' : 'none';
  onTextInput();
}
function onTextInput() {
  const t = document.getElementById('pp-content').value;
  const limit = plts.has('x') ? 280 : 3000;
  const el = document.getElementById('char-count');
  el.textContent = `${t.length} / ${limit}`;
  el.className = 'char-row'+(t.length>limit?' over':t.length>limit*.85?' warn':'');
}

/* ── Image tab ── */
function switchImgTab(tab) {
  imgTab = tab;
  document.getElementById('itab-url').classList.toggle('active', tab==='url');
  document.getElementById('itab-file').classList.toggle('active', tab==='file');
  document.getElementById('ipanel-url').hidden  = tab !== 'url';
  document.getElementById('ipanel-file').hidden = tab !== 'file';
}
function onFileChange(e) {
  const f = e.target.files[0]; if (!f) return;
  if (f.size > 5*1024*1024) { alert('Max 5 MB'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    fileDataUrl = ev.target.result;
    document.getElementById('file-thumb').src = fileDataUrl;
    document.getElementById('file-name').textContent = f.name;
    document.getElementById('file-preview').hidden = false;
  };
  reader.readAsDataURL(f);
}
function removeFile() { fileDataUrl=null; document.getElementById('file-preview').hidden=true; document.getElementById('pp-file').value=''; }

/* ── Color picker ── */
function buildColorRow() {
  document.getElementById('color-row').innerHTML = COLORS.map((c,i) =>
    `<div class="color-sw${i===0?' sel':''}" style="background:${c}" onclick="pickColor('${c}',this)"></div>`
  ).join('');
}
function pickColor(c, el) {
  selColor = c;
  document.querySelectorAll('#ss-app .color-sw').forEach(s=>s.classList.remove('sel'));
  el.classList.add('sel');
}

/* ── Modals ── */
function openProjectModal() {
  document.getElementById('pj-name').value='';
  document.getElementById('proj-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('pj-name').focus(),50);
}
function openPostModal() {
  const d = new Date(Date.now()+3600_000); d.setSeconds(0,0);
  document.getElementById('pp-when').value = d.toISOString().slice(0,16);
  document.getElementById('pp-content').value='';
  document.getElementById('pp-imgurl').value='';
  removeFile(); onTextInput();
  if (activeProject !== 'all') {
    const sel = document.getElementById('pp-project');
    if (sel.querySelector(`option[value="${activeProject}"]`)) sel.value = activeProject;
  }
  document.getElementById('post-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('pp-content').focus(),50);
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* ── Save project ── */
async function saveProject() {
  const name = document.getElementById('pj-name').value.trim();
  if (!name) { alert('Enter a project name.'); return; }
  try {
    await api('POST', '/projects', {name, color: selColor});
    closeModal('proj-overlay');
    await loadProjects();
  } catch(e) { alert('Error: '+e.message); }
}

/* ── Save post ── */
async function submitPost() {
  const content     = document.getElementById('pp-content').value.trim();
  const when        = document.getElementById('pp-when').value;
  const project_id  = parseInt(document.getElementById('pp-project').value);
  if (!content) { alert('Write some content.'); return; }
  if (!when)    { alert('Pick a schedule time.'); return; }
  if (!project_id) { alert('Select a project.'); return; }
  if (plts.has('x') && content.length > 280) { alert('Twitter/X limit is 280 characters.'); return; }

  let image_url = '';
  if (imgTab==='url') image_url = document.getElementById('pp-imgurl').value.trim();
  else if (fileDataUrl) image_url = fileDataUrl; // data: URI stored in DB

  const btn = document.getElementById('btn-submit-post');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    await api('POST', '/posts', {
      project_id, platforms: [...plts], content, image_url,
      scheduled_at: new Date(when).toISOString()
    });
    closeModal('post-overlay');
    await loadPosts();
  } catch(e) { alert('Error: '+e.message); }
  finally { btn.disabled=false; btn.textContent='📅 Schedule'; }
}

/* ── Delete post ── */
async function delPost(id) {
  if (!confirm('Delete this scheduled post?')) return;
  try { await api('DELETE', '/posts/'+id); await loadPosts(); }
  catch(e) { alert('Delete failed: '+e.message); }
}

/* ── Helpers ── */
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmtDate(iso){try{const d=new Date(iso);return d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+' · '+d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}catch{return iso}}

window.setView=setView;window.setFilter=setFilter;window.setProject=setProject;
window.openProjectModal=openProjectModal;window.openPostModal=openPostModal;
window.closeModal=closeModal;window.saveProject=saveProject;window.submitPost=submitPost;
window.delPost=delPost;window.togglePlt=togglePlt;window.onTextInput=onTextInput;
window.pickColor=pickColor;window.switchImgTab=switchImgTab;window.onFileChange=onFileChange;
window.removeFile=removeFile;window.calNav=calNav;window.calGoToday=calGoToday;
window.setListView=function(){};

init();
})();
</script>
<?php
return ob_get_clean();
}
