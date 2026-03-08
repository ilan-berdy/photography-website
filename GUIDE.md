# Photography Website — How to Customize & Deploy

## 1. Adding Your Photos

### Option A: Local photos (recommended)
1. Create a `photos/` folder inside this `Website/` directory
2. Drop your photos in there (JPG or WebP, ideally 1200-2000px wide for web)
3. In `index.html`, replace the Unsplash URLs with your local paths:

**Before:**
```html
<img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Mountain landscape">
```

**After:**
```html
<img src="photos/my-landscape.jpg" alt="Mountain landscape at golden hour">
```

### Option B: Use a CDN / cloud storage
Upload photos to a service like Cloudinary, Imgur, or Amazon S3, and use the URLs they give you.

### Photo tips
- **Gallery images**: Aim for 1200px wide (2400px for the wide/spanning images)
- **About photo**: 800px wide works well
- **Format**: WebP is smaller and faster; JPG is universally supported
- **Alt text**: Update the `alt="..."` attribute on each `<img>` to describe the photo (good for accessibility & SEO)

---

## 2. Updating Your Info

All changes are in `index.html`. Open it in any text editor (or VS Code).

### Your name
Search for "Ilan Berdy" and replace with your name in these spots:
- Line ~10: `<title>` tag (browser tab title)
- Line ~17: Nav logo
- Line ~46: Hero subtitle
- Footer: Copyright line

### Contact email
Find this line and change the email:
```html
<a href="mailto:hello@ilanberdy.com" class="contact-email">hello@ilanberdy.com</a>
```

### Social links
Find the `contact-socials` section and update the `href="#"` with your actual URLs:
```html
<a href="https://instagram.com/YOUR_USERNAME">Instagram</a>
<a href="https://behance.net/YOUR_USERNAME">Behance</a>
```
You can also change these to other platforms (Twitter/X, 500px, Flickr, etc.)

### About section text
Find the `<section class="about">` and edit:
- The heading ("Every frame tells a story")
- The two `<p>` paragraphs with your bio
- The stats (years, projects, countries) — change the numbers and labels

### Gallery captions
Each gallery item has a category and title you can change:
```html
<span class="gallery-category">Landscape</span>
<h3>Golden Horizons</h3>
```

### Adding or removing gallery items
Copy an existing `<div class="gallery-item">...</div>` block to add more photos.
Delete one to remove it. Use these classes to control sizing:
- `gallery-item` — standard size
- `gallery-item gallery-item--wide` — spans full width
- `gallery-item gallery-item--tall` — taller portrait format

---

## 3. Hosting & Deployment

This site is hosted on **GitHub Pages** and lives at **ilanberdy.com**.

- **Repository**: https://github.com/ilan-berdy/photography-website
- **Domain**: ilanberdy.com (managed via Cloudflare DNS)
- **Deploys automatically** when you push to the `main` branch

### How to update the site

After making any changes (new photos, text edits, etc.):
```bash
git add . && git commit -m "Describe what you changed"
git push
```
GitHub Pages will redeploy within about a minute.

### DNS setup (already done, for reference)

Domain is registered on **Cloudflare**. DNS records:

| Type  | Name | Content |
|-------|------|---------|
| A     | `@`  | `185.199.108.153` |
| A     | `@`  | `185.199.109.153` |
| A     | `@`  | `185.199.110.153` |
| A     | `@`  | `185.199.111.153` |
| CNAME | `www` | `ilan-berdy.github.io` |
| TXT   | `_github-pages-challenge-ilan-berdy` | *(verification code)* |

Proxy status is set to **DNS only** (gray cloud) for all records.

---

## 4. File Overview

```
Website/
├── index.html    ← All your content (text, photos, links)
├── styles.css    ← Visual design (colors, layout, animations)
├── script.js     ← Interactions (lightbox, scroll effects, menu)
├── photos/       ← Put your photos here
├── CNAME         ← Tells GitHub Pages to use ilanberdy.com
└── GUIDE.md      ← This file
```

## 5. Quick Color Customization

In `styles.css`, the colors are defined at the top in `:root`:

```css
--bg: #0a0a0a;          /* Background (near black) */
--bg-elevated: #111111;  /* Slightly lighter background */
--text: #f0ede8;         /* Main text (warm white) */
--text-muted: #8a8579;   /* Secondary text (warm gray) */
--accent: #c9b99a;       /* Gold accent color */
```

Change `--accent` to shift the entire color palette. Some ideas:
- Warm gold: `#c9b99a` (current)
- Cool silver: `#a8b5c4`
- Rose: `#c4a0a0`
- Sage green: `#a0b4a0`
