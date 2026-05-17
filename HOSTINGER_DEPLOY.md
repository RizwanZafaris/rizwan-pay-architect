# Deploy to Hostinger (Shared / Premium / Business)

Your TanStack Start app builds for Cloudflare Workers by default — which doesn't run on Hostinger's shared plans. The `bun run build:static` command converts it to a fully static export (35+ pre-rendered HTML files + assets + Apache `.htaccess`) that runs on any shared host.

**Total deploy time: ~10 minutes.**

---

## One-time setup (5 min)

1. **Buy a Hostinger plan** if you haven't (Premium or Business recommended — Single is fine for one site).
2. **Add your domain** in Hostinger → Domains → Add domain. If you bought from Hostinger it's already there.
3. **Enable free SSL** in Hostinger → SSL → install on your domain (Let's Encrypt, one-click).

---

## Every deploy (5 min)

### Step 1 — Build the static export locally

```bash
cd "/Volumes/T7 Shield/rizwan-pay-architect"

# Set your real domain so canonical URLs + sitemap + OG tags point at it
export VITE_SITE_URL=https://rizwanzafar.com

# Build SSR + prerender + assemble dist-static/
bun run build:static

# Clean macOS metadata files (only matters if you're on an external drive)
find dist-static -name "._*" -delete
```

You should see something like:

```
Prerendering 35 routes…
✓ /                                                → dist-static/index.html  (24.3 KB)
✓ /about                                           → dist-static/about/index.html  (28.0 KB)
... (33 more routes)
✓ Wrote dist-static/sitemap.xml
✓ Copied public/.htaccess → dist-static/.htaccess

Done: 35 routes prerendered, 0 failed.
Output: ./dist-static/  (upload contents to public_html/ on Hostinger)
```

### Step 2 — Zip the output

Hostinger File Manager uploads a single .zip file faster than 1000 individual files.

```bash
cd dist-static
zip -r ../site.zip . -x "._*" "**/._*"
cd ..

ls -lh site.zip   # should be ~10-15 MB
```

### Step 3 — Upload via Hostinger File Manager

1. Log in to https://hpanel.hostinger.com
2. **Files → File Manager**
3. Open `public_html/` (the web root)
4. **If this is a redeploy: select all existing files and delete them first** (otherwise old assets linger and bloat the directory)
5. Click **Upload** (top right) → upload `site.zip`
6. Right-click `site.zip` → **Extract** → extract into `public_html/`
7. Delete `site.zip` once extracted
8. Confirm `.htaccess`, `index.html`, `sitemap.xml`, `robots.txt`, `assets/` and all the route folders (`about/`, `blog/`, etc.) are present at the root of `public_html/`

### Step 4 — Verify

Open your domain in a browser. Check:

- [ ] Homepage renders correctly
- [ ] `https://yourdomain.com/about` works (direct URL — confirms `.htaccess` rewrite is active)
- [ ] `https://yourdomain.com/blog/ai-in-payments-four-production-use-cases` works
- [ ] `https://yourdomain.com/sitemap.xml` returns the XML sitemap
- [ ] `https://yourdomain.com/robots.txt` returns robots.txt
- [ ] HTTPS works (no mixed-content warnings)
- [ ] Right-click → View source on any page — `<title>`, `<meta description>`, `og:*`, `twitter:*` and JSON-LD blocks are all present in the HTML

If `.htaccess` isn't working (direct URLs return 404):

- Hostinger → Files → File Manager → confirm `.htaccess` exists in `public_html/`
- Hostinger → Advanced → check `mod_rewrite` is enabled (it is by default on every Hostinger plan)
- If you uploaded via FTP, some clients hide dotfiles by default — confirm via File Manager

---

## Alternative: FTP upload (faster for incremental updates)

If you want to skip the zip/extract cycle:

1. Get FTP credentials from Hostinger → Files → FTP Accounts
2. Connect with FileZilla / Cyberduck / Transmit
3. Drag the contents of `dist-static/` into the remote `public_html/`
4. **Important**: enable "show hidden files" in your FTP client so `.htaccess` uploads (it's a dotfile)

For repeated deploys: use a sync command like `lftp`:

```bash
lftp -u USERNAME,PASSWORD ftp.yourdomain.com -e "mirror -R --delete --exclude='._*' dist-static/ /public_html/; quit"
```

---

## Alternative: Hostinger Git deploy

Hostinger Premium and above support Git auto-deploy. If you want to push to your repo and have Hostinger pull and rebuild:

1. Hostinger → Files → Git
2. Add repo: `https://github.com/RizwanZafaris/rizwan-pay-architect`
3. Set branch: `main`
4. Set path: `/public_html`
5. **Build command**: Hostinger doesn't run Node/Bun on shared plans — so you can't `bun run build:static` server-side. Instead, you'd commit the `dist-static/` folder to a branch (e.g. `hostinger-static`) and point Git deploy at that branch.

To do this:

```bash
git checkout -b hostinger-static
# (one-time) un-ignore dist-static for this branch
echo "!dist-static/" >> .gitignore
git add -f dist-static
git commit -m "Hostinger static build"
git push -u origin hostinger-static
```

Then in Hostinger Git settings, point at branch `hostinger-static`, path `dist-static/`. Each future deploy: rebuild locally, force-push `dist-static/` to the branch, Hostinger pulls.

**Recommendation: use File Manager + zip for the first few deploys.** Only switch to Git auto-deploy once you're confident in the build output.

---

## Things to know

### What stays dynamic

- **Contact form** — already uses Web3Forms (third-party POST endpoint). Set `VITE_CONTACT_ACCESS_KEY=<your_key>` in `.env.local` before `bun run build:static`, otherwise the form falls back to `mailto:`.

### What was lost vs the SSR version

- **`/sitemap.xml` is now build-time generated** instead of per-request. Rebuild & redeploy whenever you publish a new blog post or case study. Same end result for search engines.
- **No server-side dynamic content** — every page is the same HTML for every visitor. For a portfolio site this is correct; for an app with personalisation, you'd need a Cloud or VPS plan.

### Custom domain DNS

If your domain is registered elsewhere (Namecheap, GoDaddy, etc.) and you want it on Hostinger:

1. Hostinger → Domains → your domain → Nameservers
2. Use Hostinger's nameservers: `ns1.dns-parking.com` and `ns2.dns-parking.com`
3. Set those at your registrar
4. DNS propagation: usually < 1 hour, can be up to 48 hours

OR keep DNS at your registrar and just add an A record pointing to your Hostinger IP (look up in hPanel → Hosting → Shared → details).

### When to rebuild

| Trigger                                    | Rebuild needed?            |
| ------------------------------------------ | -------------------------- |
| New blog post                              | Yes                        |
| New case study                             | Yes                        |
| Profile/metric update                      | Yes                        |
| Anything in `content/blog/` or `src/data/` | Yes                        |
| Visitor activity / contact submissions     | No (those go to Web3Forms) |

### Image hosting

If you generate Gemini images (per `website-review/11-IMAGES_NEEDED.md`), drop them in `public/og/` and `public/case-studies/` before running `bun run build:static`. They'll be copied into `dist-static/` automatically.

For very large images (>5 MB), consider hosting on Cloudflare R2 or Cloudinary instead — they're optimised for image delivery and don't count against Hostinger storage.

---

## Troubleshooting

**"All routes return 404 except the homepage"**
The `.htaccess` isn't being processed. Hostinger Premium+ has `mod_rewrite` enabled by default. Check:

- Is `.htaccess` actually in `public_html/`? Use File Manager (FTP often hides dotfiles).
- Did the upload preserve it? Try uploading just the `.htaccess` file again.

**"Assets 404 (CSS/JS not loading)"**
Check the asset path in browser DevTools → Network. They should be `/assets/...-[hash].js`. If they're missing, the `dist-static/assets/` folder didn't upload. Re-upload it.

**"Sitemap shows wrong URLs"**
You forgot to set `VITE_SITE_URL` before building. Re-run:

```bash
export VITE_SITE_URL=https://yourdomain.com
bun run build:static
```

**"Page content is correct but social-share preview is wrong"**
Either:

- LinkedIn/X has cached an old OG card → use the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [X Card Validator](https://cards-dev.twitter.com/validator) to force a refresh, OR
- The OG image URL is still the Lovable R2 default. Generate a real OG card and set `VITE_OG_IMAGE_URL=https://yourdomain.com/og/og-default.png` before building.

**"I want to update without rebuilding everything"**
You can edit any individual `.html` file in `public_html/` directly via File Manager. But the source of truth is the repo + `bun run build:static`. Manual edits get overwritten next deploy.

---

## What's in `dist-static/`

```
dist-static/
├── .htaccess            ← Apache config (rewrite + cache + compression + security)
├── index.html           ← Homepage (24 KB)
├── about/index.html
├── blog/index.html
├── blog/<slug>/index.html × 38
├── product-work/index.html
├── product-work/<slug>/index.html × 10
├── products/index.html
├── for/index.html
├── for/<audience>/index.html × 3
├── media/index.html
├── topics/index.html
├── resume/index.html
├── contact/index.html
├── assets/              ← Hashed JS/CSS bundles (~28 files)
├── sitemap.xml          ← Build-time generated
├── robots.txt
├── llms.txt
└── Rizwan_Zafar_Resume.pdf
```

Total: ~35 HTML files + 32 asset files + ~31 MB on disk.

---

## TL;DR

```bash
export VITE_SITE_URL=https://yourdomain.com
bun run build:static
find dist-static -name "._*" -delete
cd dist-static && zip -r ../site.zip . && cd ..
# Upload site.zip via Hostinger File Manager → public_html/ → Extract
```

That's it. Refresh your domain — the site is live.
