# Deploy artifact

`site.zip` (gitignored — regenerate locally) is the latest Hostinger upload bundle. ~2 MB. Contains 35 prerendered HTML pages, all hashed JS/CSS chunks, the resume PDF, `.htaccess`, `sitemap.xml`, `robots.txt`, `llms.txt`.

## Regenerate

```bash
cd "/Volumes/T7 Shield/rizwan-pay-architect"
export VITE_SITE_URL=https://yourdomain.com    # set to your real domain
bun run build:static
find dist-static -name "._*" -delete
cd dist-static && zip -qr ../docs/deploy/site.zip . -x "._*" "**/._*" && cd ..
ls -lh docs/deploy/site.zip
```

## Upload to Hostinger

1. https://hpanel.hostinger.com → **Files → File Manager**
2. Open `public_html/`
3. Delete any existing files (for a clean redeploy)
4. **Upload** → drop `docs/deploy/site.zip`
5. Right-click `site.zip` → **Extract** → into `public_html/`
6. Delete `site.zip` once extracted
7. Visit your domain — site is live

Full instructions: see [`../../HOSTINGER_DEPLOY.md`](../../HOSTINGER_DEPLOY.md).
