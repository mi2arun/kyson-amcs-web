# AMCS — Resource & Waste Intelligence (Demo)

A simple, single-page marketing site for a waste & resource-management company,
built as a backdrop to demonstrate the **Kyson AI Support Assistant** chat widget.

## Live site
Published via GitHub Pages → see the repository's **Settings → Pages** for the URL.

## Stack
- Static HTML / CSS / JS — no build step.
- Fonts: Bricolage Grotesque + Archivo (Google Fonts).
- Imagery: Unsplash (hot-linked, optimised via URL params).

## Files
| File | Purpose |
| --- | --- |
| `index.html` | Page markup + Kyson widget embed |
| `style.css` | All styling (industrial-editorial theme) |
| `script.js` | Scroll reveals, sticky nav, animated counters |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## AI support widget
The Kyson chatbot is embedded at the bottom of `index.html`:

```html
<div id="kyson-chatbot-widget-1763462261614-l7l5eq1fy"></div>
<script> window.KysonChatbot = { config: { ... } }; </script>
<script src="https://demo.kyson.io/chatbot-widget.js"></script>
```

To re-theme it, edit the `config` object (e.g. `primaryColor`, `welcomeMessage`,
`autoOpen`).

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```
