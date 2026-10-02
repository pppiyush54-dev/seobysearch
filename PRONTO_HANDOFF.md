# PRONTO Group staging site: handoff instructions

Written 2026-10-02 for the new session that continues this work.
Rule for the new session: **check live state first, then do only what is not yet done.** Every item below has a "how to verify" so you can match before you change anything.

## 0. Ground rules (from the user and Ms Gunay)

- Staging site: https://lightgoldenrodyellow-barracuda-540206.hostingersite.com (future live domain https://pronto-grp.com).
- WordPress REST access uses Basic auth with user `pronto` and an application password. **The password is not in this file.** Ask the user for it. Use it only for this staging rebuild.
- **Approver is Ms Gunay Haiiyeva only. Not Mr Danijel.** She approved the five Lenovo child pages on desktop and said "pls proceed".
- She wants product portfolio and "what we do" information kept accurate, and the work done personally, not handed to juniors.
- Never invent search volumes, rankings, traffic, backlinks or AI citations. Label assumptions.
- Phone is **+971 52 852 4210** everywhere (wa.me links, tel links, schema, footer). Do not revert to +971 50.
- Do not create PHP snippets that read plugin source, expose options, or act as config endpoints. The auto-mode classifier denied these twice ("RCE surface", "unauthorized persistence"). All such snippets are already deleted.
- Do not create a pull request or push unless the user asks.

## 1. What is DONE (verify before touching)

### 1.1 SEO + AI search blueprint
- 33-part blueprint delivered as artifact https://claude.ai/artifact/5YHoKMydohrr5kgqaLsaTF (37 sections, 25 pages mapped, P0/P1/P2 priorities).
- Source files (session scratchpad, may be gone): `seo/data.py`, `seo/build_report.py`, `seo/crawl.py`.

### 1.2 The 11 P0 items, implemented on staging
| # | Item | How to verify |
|---|------|---------------|
| 1 | Rank Math live (unique title, description, OG per page, single enriched Organization node) | `curl -sk "<url>?nocache=1"` and read `<title>`, meta description, JSON-LD |
| 2 | 301 redirects for legacy and duplicate URLs | e.g. `curl -skI .../contacts/` returns 301 to `/contact/` |
| 3 | Junk content removed or noindexed (pages 20, 22, 36 trashed; hello-world trashed; users sitemap off; generator tag removed) | REST `GET /wp/v2/pages?status=trash` |
| 4 | 10 articles migrated to root slugs (posts 274, 276, 278, 280, 282, 284, 286, 288, 290, 292) with featured images, BlogPosting schema | open any article |
| 5 | Insights hub = page 37, set as `page_for_posts`, H1 changed from "Blog" via the theme home template | `/insights/` |
| 6 | Lenovo hub (page 103) links all 5 child pages | open `/products/lenovo/` |
| 7 | New pages: toner/ink/consumables (id 270, parent 10) and ready-stock (id 271) | open both |
| 8 | Ticker removed | home page |
| 9 | About page: team section and legal entity PME FZ-LLC | `/about-us/#team` |
| 10 | Footer legal line | footer of any page |
| 11 | Phone fixed to +971 52 852 4210 site-wide and in generator scripts | grep crawl for `50 852` (should be none) |

Other settings done: WP site title set to "PRONTO Group" (so titles are not doubled), `rank_math_registration_skip=1` (Rank Math was silent before), permalink structure `/%postname%/`, legacy service pages kept (19 serviceitsolution, 21 it-consultation, 38 repair-service, 40 dealer-support), Instagram handle `pronto_group`.

### 1.3 The one persistent snippet
Code Snippets plugin, snippet **id 8 "PRONTO SEO core"**, active. Holds: 301 map, robots.txt filter, generator removal, users-sitemap off, `wp_robots` noindex, Organization enrichment (legalName PME FZ-LLC, contactPoint +97142292357 and +971528524210, sameAs, areaServed, brand[]), one-time rewrite flush. Edit this one snippet. Do not add new ones. Snippets 1 to 4 are unrelated defaults. Snippets 5, 6, 7, 9, 10 are deleted or inactive diagnostics. Leave them off.

### 1.4 Verification already run
- 45-URL crawl: no errors, no horizontal overflow in screenshots (desktop and mobile).
- Sitemap works at `/sitemap_index.xml?nocache=1`. The bare URL was a LiteSpeed-cached 404 and should clear within the 7-day TTL or on **LiteSpeed Purge All** (manual, see section 3).

### 1.5 Hourly Routine
- "Social Scheduler — Post Due Items", id `trig_01QRSWq1xrS21ukrPYqLSPZp`, **paused by the user's request on 2026-10-01**. It never posted anything (the queue was always empty). Do not re-enable unless the user asks.

## 2. What is REMAINING (in priority order)

### 2.1 Epson full portfolio (requested by Ms Gunay, 2026-10-01 14:11). NOT STARTED.
She said: Pronto does POS machines, projectors and document cameras on Epson. "We do full portfolio on EPSON. It is not limited to printing only." Today the Epson page presents printing only.

Verify first: fetch `/products/epson/` (page id 160) and search for "projector", "POS", "document camera". If present, this item is done.

Do:
1. **Page 160** (`/products/epson/`):
   - Hero: kicker, H1 and lead should say full Epson portfolio. Add pills for POS and receipt printers, projectors, document cameras.
   - Product-family table: add rows for POS/receipt printers, projectors, document cameras. Keep "model names are examples, confirmed on quotation, no prices".
   - Add an audience card or section for retail/hospitality (POS), classrooms and meeting rooms (projectors, doc cameras).
   - FAQ: rewrite "Which Epson products do you supply?" to include the new lines, and keep the FAQPage JSON-LD identical to the visible Q&A.
   - Rank Math title and description: now "Epson EcoTank & Business Printers Wholesale Dubai | PRONTO Group". Change to full-portfolio wording, title at most 65 characters, description at most 160.
   - Remove "printing only" phrasing in strip, CTA text ("Request an Epson Quotation" is fine) and BreadcrumbList name.
2. **Products hub (page 10)**: card links labelled "Epson Business Printing" (two places) become "Epson Portfolio" or similar. The brand matrix row for Epson ticks only Printing columns. Add dots for the other relevant categories (Collaboration Solutions for projectors and doc cameras, Printing Supplies is already covered). Confirm categories with the user before ticking a column you are unsure of.
3. Other mentions to align: Partners page (id 23), home page (id 7), header and footer menu label "Epson Printing", FAQ answer on Products hub ("HP, Lenovo and Epson are brands where PRONTO holds formal partner status"). Keep the "official partner" claim as is.
4. Do not invent specific model numbers beyond what the user or Epson confirms. Use families only, as the page already does.
5. Verify: crawl the page, check title/description, JSON-LD validity, desktop screenshot, no overflow.
6. Tell the user when done so they can send it to Ms Gunay.

How Rank Math titles were written earlier: through the page `meta` fields (`rank_math_title`, `rank_math_description`, `rank_math_focus_keyword`) in the REST page update used by the earlier content script (`p0/content.py`). If a REST update does not return the meta in `context=edit`, set it the same way that script did and then confirm with `curl ...?nocache=1`.

### 2.2 Items needing the user's input (the user answered "yes" but gave no values)
The user's last reply listed these and answered "yes". That is ambiguous, so the new session should confirm in one short message and not guess:
| Item | Needed | Current state |
|------|--------|---------------|
| Real authors for the 10 articles | Names (and ideally job titles) | Articles are authored by a placeholder renamed user. Do not invent a person. Ask. |
| Trade licence number | The number and issuing authority | Not on site. Add to About page and footer legal line only once given. |
| Dealer support, IT consultation, repair service | Are these real services? | Pages kept live (ids 40, 21, 38). If the user confirms "yes real", leave as is. If "no", redirect to `/serviceitsolution/` and noindex. The user's "yes" most likely means real, but confirm. |
| Stray phone +971 4 263 5000 | Keep or remove | The user said "yes" to the question. Confirm whether this means keep. Do not change until confirmed. |

### 2.3 Manual steps for the user (cannot be done through REST)
- LiteSpeed Cache: **Purge All** (clears the cached 404 on `/sitemap_index.xml`).
- Rank Math > Titles & Meta > Pages: set Schema Type to None, and clear the default opening hours. (Setting these through code was denied by the classifier.)
- At launch: production robots.txt and host-level rule. Staging serves a Googlebot Disallow at host level. The snippet already outputs the correct robots.txt for production.

### 2.4 P1 and later from the blueprint (not started)
Hero image alt text and srcset sitewide, Reseller and Tender pages, depth for Markets and Supply-logistics pages, Partners evidence table, buying guides, internal-link additions from the blueprint's linking sheet.

## 3. Useful facts for the new session

- Page IDs: home 7, contact 8, about-us 9, products 10, partners 23, insights 37, lenovo 103, hp-computing 104, hp-printing-imaging 105, lenovo-thinksystem-servers 106, asus-dell-msi 107, canon 108, storage-ssd-hdd 109, peripherals-displays-collaboration 110, servers-enterprise-ai 111, markets 113, supply-logistics 114, epson 160, lenovo-thinkvision-monitors 156, lenovo-thinkcentre-desktops 157, lenovo-tiny-in-one 158, lenovo-all-in-one 159, wholesale-it-hardware-dubai 161, toner-ink-consumables 270, ready-stock 271.
- Page content is a single `wp:html` block using the `px-*` and `pr-*` classes, with JSON-LD at the bottom (BreadcrumbList and FAQPage using `https://pronto-grp.com` URLs). Edit by fetching `?context=edit`, changing the raw HTML, and updating, so the design stays consistent.
- LiteSpeed caches for 7 days. Always check with `?nocache=<anything>`.
- Header and footer are template parts edited via the REST template-parts endpoint.
- The earlier session's working files lived in a temporary scratchpad (`wp.py` helper, `p0/content.py`, `seo/data.py`). They may not exist in the new session. The full earlier transcript is at `/root/.claude/projects/-home-user-seobysearch/aa7adc95-3700-58e3-b1fa-b0bcfe757f36.jsonl` if that machine is still available. Otherwise rebuild from live state, which is the source of truth.

## 4. Matching procedure for the new session

1. Run a quick crawl or `curl` of the URLs in sections 1.2 and 2.1 and compare to this file.
2. Mark each item done, partly done or not done.
3. Do only the not-done items in the order of section 2.
4. Report back with a short table of what you found and what you changed.
