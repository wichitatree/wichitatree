# Wichita Tree Service Static Website

Plain HTML/CSS/JS website for Wichita Tree Service.

## Files

- `index.html` — main page
- `styles.css` — green/black theme and responsive layout
- `script.js` — menu, call widget, custom human check, and AJAX form submit
- `myscript.js` — safety copy of the same JavaScript in case an older page references this filename
- `assets/photos/` — real Wichita Tree Service photos
- `assets/brand/` — logo mark and favicon files


## Latest update

This version adds the two missing service photos:

- `assets/photos/stump-grinding-backyard.webp` and `.jpg`
- `assets/photos/plant-health-care-tree-injection.webp` and `.jpg`

It also replaces the short About section with the full Robert Phillips / Wichita Tree Service founder story and credentials text.

## Contact form

The contact forms submit without leaving the page through FormSubmit AJAX:

```text
https://formsubmit.co/ajax/robert@wichita-treeservice.com
```

The first time the form is used, FormSubmit may send an activation email to:

```text
robert@wichita-treeservice.com
```

Open that email and confirm it before relying on lead delivery.

## Spam protection

This version includes:

- A custom “I’m not a robot” style human check
- A short verification delay/spinner
- A hidden honeypot field
- JavaScript validation before email submit

This is intentionally **not Google reCAPTCHA** and does not use Google branding or Google keys. It is a simple on-page check for a static website. For stronger spam protection later, use Google reCAPTCHA, Cloudflare Turnstile, hCaptcha, or a backend/serverless form endpoint.

## Call/Text widget

The floating widget and header buttons use:

```text
Phone: 316-616-8321
Email target: robert@wichita-treeservice.com
Address: 4631 W 47th St S, Wichita, KS 67215
```

## Uploading

You can upload the full folder to normal web hosting, GitHub Pages, Netlify, Vercel static hosting, or GoDaddy hosting.


## Latest visual update

Theme adjusted to a softer, lighter green accent while keeping the black background and white text for contrast.
