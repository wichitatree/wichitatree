# Wichita Tree Service Static Website

Simple HTML, CSS, and JavaScript website for Wichita Tree Service with a green/black theme, white copy, favicon/logo assets, jsDelivr-ready photo paths, and contact forms that stay on the page.

## Files

- `index.html` - all page content
- `styles.css` - green/black theme and responsive design
- `script.js` - mobile menu, current year, and no-page-leave contact form behavior
- `favicon.ico` and `favicon.png` - browser favicon files
- `site.webmanifest` - web app icon metadata
- `assets/brand/` - favicon/logo image sizes made from the uploaded tree icon
- `assets/photos/tree-placeholder.svg` - fallback image if CDN photos are missing

## How to use

Open `index.html` in a browser, or upload the folder to any static host.

Good hosting options:

- GitHub Pages
- Netlify
- Vercel static deployment
- GoDaddy/cPanel public HTML folder

## Contact form setup

The forms are already designed to stay on the page instead of opening the visitor's email app.

In `script.js`, add your email service endpoint here:

```js
const CONTACT_ENDPOINT = '';
const RECIPIENT_EMAIL = 'robert@wichita-treeservice.com';
```

Use an endpoint from Formspree, Basin, Netlify Forms, GoHighLevel, Zapier, or your own backend. Once the endpoint is added, the form will submit the request in the background and show a success/error message on the page.

Until that endpoint is added, submissions will not email Robert yet. The payload logs in the browser console so the setup can be tested without sending live leads.

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

Change phone number, address, or content in `index.html`.

Change the form endpoint or destination email in `script.js`.

Change the main colors in the `:root` section of `styles.css`.

## Next upgrades

- Add separate pages for each service
- Add local city pages around Wichita
- Connect the form to GoHighLevel, Zapier, or another CRM
- Add real reviews/testimonials
- Add LocalBusiness schema and Service schema
