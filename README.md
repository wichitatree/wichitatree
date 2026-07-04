# Wichita Tree Service Static Website

This is a simple HTML, CSS, and JavaScript website for Wichita Tree Service.

## Files

- `index.html` - all page content
- `styles.css` - green theme and responsive design
- `script.js` - mobile menu, current year, and estimate form mailto behavior
- `assets/photos/tree-placeholder.svg` - fallback image if CDN photos are missing

## How to use

Open `index.html` in a browser, or upload the folder to any static host.

Good hosting options:

- GitHub Pages
- Netlify
- Vercel static deployment
- GoDaddy/cPanel public HTML folder

## Photo CDN setup with jsDelivr

Create a public GitHub repository for photos, for example:

```txt
wichitatreeservice/wts-media
```

Upload WebP photos into a folder named:

```txt
photos/
```

The website is already looking for these photo paths:

```txt
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/crane-tree-removal.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/tree-removal.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/tree-pruning-spider-lift.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/stump-grinding.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/plant-health-care-tree-injection.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/storm-cleanup-grapple-truck.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/land-clearing-skid-steer.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/robert-phillips-arborist.webp
https://cdn.jsdelivr.net/gh/wichitatreeservice/wts-media/photos/wood-recycling-yard.webp
```

If the CDN images are not available yet, the site falls back to the included tree placeholder SVG.

## Quick edits

Change the email address in `script.js` here:

```js
window.location.href = `mailto:wichitatreeservice@gmail.com?subject=${subject}&body=${body}`;
```

Change phone number or address in `index.html`.

## Next upgrades

- Add separate pages for each service
- Add local city pages around Wichita
- Connect the form to GoHighLevel, Zapier, or another CRM
- Add real reviews/testimonials
- Add schema markup for LocalBusiness and Service pages
