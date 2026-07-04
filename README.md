# Wichita Tree Service Static Website

Plain HTML, CSS, and JavaScript website for Wichita Tree Service.

## Files

- `index.html` — page content
- `styles.css` — green / black theme
- `script.js` — menu behavior and contact form
- `myscript.js` — duplicate safe copy in case an older page references that filename
- `assets/brand/` — favicon and logo files
- `assets/photos/` — placeholder photo

## Contact form

The contact forms submit with JavaScript to FormSubmit AJAX:

```text
https://formsubmit.co/ajax/robert@wichita-treeservice.com
```

The visitor stays on the page. The first real submission may trigger a confirmation email to `robert@wichita-treeservice.com`. Open that confirmation email and approve it, then future form submissions should be delivered.

If the form does not send, check:

1. The site is online or running from a local server, not a blocked file preview.
2. The confirmation email from FormSubmit has been approved.
3. Old files are not still cached. The page loads `script.js?v=20260704-email-live` to help bust cache.
4. Remove any old `<script src="myscript.js"></script>` line from earlier templates, or replace the old `myscript.js` with the included safe copy.

## Local preview

Open `index.html` directly, or run a local static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Photo CDN workflow

When you upload photos to a public GitHub repository, update image paths in `index.html` to jsDelivr URLs like:

```text
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media@main/photos/crane-tree-removal.webp
```

Use compressed `.webp` images for speed.
