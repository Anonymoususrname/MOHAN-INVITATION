# 💍 Wedding Invitation Website
## Arjun & Meenakshi · 14 February 2026
### Built & Managed by **KalaiSelvi Photography**

---

## 📁 Project Structure

```
wedding/
│
├── index.html              ← LANDING PAGE (open this in browser)
├── invitation.html         ← MAIN INVITATION (loaded after landing)
│
├── css/
│   ├── landing.css         ← Styles for the intro landing screen
│   └── style.css           ← Styles for the full invitation website
│
├── js/
│   ├── landing.js          ← Stars, petals, countdown ring, auto-enter logic
│   └── main.js             ← Scroll bar, parallax, lamps, countdown, music, reveals
│
└── assets/
    └── audio/
        └── nadhaswaram.mp3 ← 🎵 ADD YOUR MUSIC FILE HERE (see instructions below)

README.md                   ← This file
```

---

## 🚀 How to Use in VS Code

### Step 1 — Open Project
1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `wedding/` folder

### Step 2 — Add Music (Optional but Recommended)
1. Find a royalty-free Nadaswaram / Carnatic wedding music MP3
2. Rename it to `nadhaswaram.mp3`
3. Place it in `assets/audio/nadhaswaram.mp3`
> 💡 Tip: Search "nadaswaram wedding free mp3" or use YouTube Audio Library

### Step 3 — Run with Live Server
1. Install the **Live Server** extension in VS Code
   - Press `Ctrl+Shift+X` → Search "Live Server" → Install
2. Right-click `index.html` → **Open with Live Server**
3. The site will open at `http://127.0.0.1:5500`

### Step 4 — Customize Content
Open the files and search for these placeholders to update:

| File | What to change |
|------|---------------|
| `index.html` | Bride/Groom names, date, venue in landing screen |
| `invitation.html` | All event details, family names, contact numbers |
| `invitation.html` | Replace `📍` Google Maps links with your actual venue links |
| `invitation.html` | WhatsApp number in RSVP section |
| `invitation.html` | KalaiSelvi Photography social links (WhatsApp + Instagram) |

---

## ✏️ Customization Guide

### Change Names
Search for `Arjun` and `Meenakshi` across all HTML files and replace.

### Change Date
- In `index.html`: update `14 · February · 2026`
- In `invitation.html`: update all event dates
- In `js/main.js` line ~77: update `new Date('2026-02-14T07:00:00')`

### Change Venue
In `invitation.html`, Section 6 (Details), update:
- Mandapam name
- Address
- Google Maps link

### Change Photography Studio Name
Search for `KalaiSelvi Photography` and replace with your studio name.
Update the WhatsApp and Instagram links in the footer.

### Add Real Photos
Replace the SVG photo placeholders in the COUPLE section (§4):
```html
<!-- Find this in invitation.html, Couple section -->
<div class="photo-placeholder">
  <!-- Replace the <svg>...</svg> with: -->
  <img src="assets/photos/groom.jpg" alt="Arjun" style="width:100%;height:auto;display:block;"/>
</div>
```

---

## 🎨 Color Scheme
| Variable | Color | Usage |
|----------|-------|-------|
| `--gold`       | `#c9943a` | Primary accent, borders |
| `--gold-light` | `#e8c46a` | Highlights, glow |
| `--crimson`    | `#8b1a1a` | RSVP background |
| `--cream`      | `#fdf6e3` | Card backgrounds |
| `--dark`       | `#0d0804` | Deep backgrounds |

---

## 🌐 Fonts Used (Google Fonts)
- **Cinzel Decorative** — Names, headings
- **Cinzel** — Subheadings, labels
- **Philosopher** — Body, italics, blessings
- **Lora** — Body text
- **Noto Serif Tamil** — Tamil blessings

---

## 📱 Mobile Responsive
The website is fully responsive:
- Hero temple scales on all screen sizes
- Grid layouts collapse to single column on mobile
- Font sizes scale with `clamp()`
- Touch-friendly buttons

---

## 🔊 Music Notes
- The music button is in the **bottom-right corner** of the invitation page
- Click to toggle ON/OFF
- Music auto-starts on first page interaction (browser policy)
- Add any `.mp3` file as `assets/audio/nadhaswaram.mp3`
- Recommended: Nadaswaram, Thevaram, or soft Carnatic instrumental

---

## 📤 Deployment (Share Online)

### Option A — GitHub Pages (Free)
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Go to Settings → Pages → Deploy from main branch
5. Share the link: `https://yourusername.github.io/wedding/`

### Option B — Netlify (Free, Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `wedding/` folder onto the dashboard
3. Get a shareable link instantly

### Option C — WhatsApp Share
Share the `index.html` file directly on WhatsApp for local viewing.

---

## 🙏 Credits
**Wedding Photography & Website:** KalaiSelvi Photography  
**Technology:** Pure HTML5 · CSS3 · Vanilla JavaScript  
**Fonts:** Google Fonts  
**No frameworks used** — Pure, lightweight, fast loading

---

*With love & blessings — வாழ்க வளமுடன்*  
*Arjun & Meenakshi · 14 February 2026*
