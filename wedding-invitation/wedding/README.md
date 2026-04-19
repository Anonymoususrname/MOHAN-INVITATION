# 🪔 Wedding Invitation Website
### Aravind & Meenakshi — 25th July 2025
**Crafted by KalaiPixels Photography**

---

## 📁 File Structure

```
wedding/
├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← Complete stylesheet
├── js/
│   └── main.js         ← All interactivity & animations
└── README.md           ← This file
```

---

## 🚀 How to Open

Simply open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
No build tools. No server required. Pure HTML + CSS + JS.

---

## ✏️ Customization Guide

### 1. Names
Search & replace in `index.html`:
- `Aravind` → Groom's name
- `Meenakshi` → Bride's name

### 2. Date & Time
- HTML: Search `25th July 2025`, `25 · 07 · 2025`, `8:30 AM`
- JS `main.js`: Change `new Date('2025-07-25T08:30:00+05:30')`

### 3. Venue
- Search `Arulmigu Meenakshi Amman Mandapam`
- Search `West Masi Street, Madurai`
- Update the Google Maps link in the Details section

### 4. Family Names
- Search `Kandasamy Pillai`, `Saradha Devi` (Bride's parents)
- Search `Subramaniam Iyer`, `Lakshmi Devi` (Groom's parents)
- Update grandparents names similarly

### 5. Photography Studio
- Search `KalaiPixels Photography`
- Update WhatsApp: `wa.me/919876543210` → actual number
- Update Instagram: `instagram.com/kalaipixels` → actual handle

### 6. Photos
Replace the SVG placeholders in `.couple-photo-placeholder` divs with:
```html
<img src="path/to/photo.jpg" alt="Name" style="width:100%;height:100%;object-fit:cover;" />
```

### 7. Colors (css/style.css, top section)
```css
--maroon: #8B0000;   /* Red/maroon accent */
--gold:   #c8860a;   /* Gold/amber */
```

### 8. WhatsApp RSVP
Update in the RSVP section:
```
wa.me/919876543210  →  wa.me/91XXXXXXXXXX
```

---

## 🎨 Features

| Feature | Details |
|---|---|
| Landing splash page | Animated stars + falling petals + invitation button |
| Temple SVG hero | Full Gopuram with tiers, Kalasha, flagpoles, oil lamps |
| Starry night sky | Layered gradient with twinkling star JS animation |
| Floating deepam lamps | Scroll-triggered descent + CSS flicker + sway |
| Kolam dividers | SVG dot-pattern kolam between every section |
| Scroll progress bar | Gold gradient bar at top |
| IntersectionObserver | Reveal animations on scroll |
| Parallax | Temple moves slower than content on scroll |
| Countdown timer | Live JS countdown to wedding muhurtham |
| Music toggle | Background audio with play/pause button |
| Clip-path cards | Corner-cut event invitation cards |
| Ornate couple frames | Gold corner frame photo placeholders |
| WhatsApp RSVP | Direct WhatsApp link with pre-filled message |
| Photography credit | Footer with social links for studio |

---

## 📱 Responsive
- Mobile-first grid layout
- Touch-friendly buttons
- Floating lamps hidden on small screens
- Font sizes scale with `clamp()`

---

*Made with ♥ for the sacred occasion of Aravind & Meenakshi's wedding.*
*KalaiPixels Photography — Capturing moments, crafting memories.*
