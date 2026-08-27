# Forever Begins — Digital Wedding Invitation Web App (Yudha & Ina)

A complete, highly interactive, mobile-first digital wedding invitation web application built using HTML5, CSS3, and Vanilla JavaScript.

---

## 🎨 Color Palette

- **Galaxy (Dark Navy Blue)**: `#081F5C`
- **Planetary (Royal Blue)**: `#334EAC`
- **Universe (Medium Soft Blue)**: `#7096D1`
- **Venus (Light Soft Blue)**: `#BAD6EB`
- **Sky (Pale Ice Blue)**: `#D0E3FF`
- **Meteor (Off-White / Card)**: `#F7F2EB`
- **Milky Way (Warm Cream / Page Bg)**: `#FFF9F0`

---

## ✨ Features & Structure

1. **Cover Page (Splash Screen)**
   - Dynamic URL parameter parser (`?to=GuestName`) displaying personalized guest greeting (e.g. `Kepada Yth. Bpk/Ibu/Saudara: Nama Tamu`).
   - "Buka Undangan" CTA button sliding up the splash screen & triggering background audio + scroll animations.
2. **Home Page (Profile Mempelai)**
   - Groom (Florianus Demon Yudhasaputra) & Bride (Yohana Ina Naga) cards with parents info, child order.
3. **Pemberkatan & Resepsi Nikah (Event Details)**
   - Akad & Resepsi event cards, St. Yohanes Paulus II holy scripture quote.
   - Dynamic Live Countdown Timer to wedding day.
   - "Google Maps Location" and "Add to Google Calendar" action buttons.
4. **Turut Mengundang (Honored Guests)**
   - Extended family & honored guests list.
5. **Galeri Foto (Photo Gallery)**
   - Responsive photo grid with hover/tap animations & Lightbox Modal view.
6. **Ucapan & Doa (RSVP & Wishes)**
   - Interactive confirmation form (Attending/Not Attending, Guest Count, Message).
   - Live Feed displaying submitted wishes persisted via `localStorage`.
7. **Amplop Digital (Digital Gift)**
   - Cashless gift cards for Bank BRI.
   - "Copy Account Number" button with visual toast feedback ("Nomor Rekening Berhasil Disalin!").
8. **Floating Music Controller**
   - Fixed bottom-right vinyl record audio player with play/pause state and spinning animation.

---

## 🔗 Guest Link Customization

To send personalized invitation links to your guests, add `?to=Nama+Tamu` to your website URL:

```text
https://yourdomain.com/?to=Bpk.%20Budi%20%26%20Keluarga
https://yourdomain.com/?to=Siti%20Rahma
```

---

## ⚡ Free 2-Minute Deployment Guide

### Option 1: Deploy to Vercel
1. Install Vercel CLI (or connect your GitHub repository):
   ```bash
   npm i -g vercel
   ```
2. Run command inside project folder:
   ```bash
   vercel
   ```
3. Follow the CLI prompts (accept default settings). Your live URL will be ready instantly!

### Option 2: Deploy to Netlify
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag & drop this entire project folder (`foreverbegins`).
3. Your site is deployed in seconds!

---

## 🛠 Tech Stack
- **HTML5 & Semantic Structure**
- **CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism & Keyframes)**
- **Vanilla JavaScript (ES6+, Web Audio API, IntersectionObserver, Clipboard API, LocalStorage)**
