# Blue Hour — Video Editor Portfolio

A production-quality landing portfolio for **Shobu** (Video Editor & Colorist), crafted around the **Blue Hour** concept and palette: *Pale Slate / Grey Olive / Charcoal Blue / Dusty Denim / Periwinkle*, featuring all nine interactive **React Bits** components.

---

## 1. Quick Start

### Installation
Dependencies are already installed:
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
The build executes with Turbopack, static page generation, and zero compiler warnings.

---

## 2. Concept: Blue Hour

The entire page is structured as a color grade. The visitor scrolls through a cutting room at dusk: a dark, neutral grading suite (`Charcoal Blue`), where flat, desaturated log footage (`Grey Olive`, `Pale Slate`) transforms into luminous graded highlights (`Dusty Denim`, `Periwinkle`). Greys are raw; blues are graded.

### Design Tokens
| Token | Hex | Palette Source | Role |
| :--- | :--- | :--- | :--- |
| `--ink-950` | `#1E2328` | Charcoal Blue (darkened) | Main page background |
| `--ink-900` | `#2A3138` | Charcoal Blue (darkened) | Alternate section background |
| `--ink-800` | `#373F47` | Charcoal Blue | Bento cards, inputs, Statement B |
| `--accent` | `#6C91C2` | Dusty Denim | Primary CTA, active states, focus ring, playhead |
| `--hi` | `#C3C9E9` | Periwinkle | UI text, hover fills, light band background |
| `--hi-max` | `#EEF0FA` | Periwinkle (lightened) | Headings, hero wordmark |
| `--text` | `#AAABBC` | Pale Slate | Body copy |
| `--line` | `#8B8982` | Grey Olive | Ticks, icons at rest, metadata; hairlines at 28% alpha |

---

## 3. Projects & YouTube Links Included

All 22 project videos provided in your brief are linked with embed configurations, metadata, runtime tags, and custom SVG posters in `lib/projects.js`:

1. **Solid Design Reel (Best Reel)** — `https://youtube.com/shorts/hAhhr5ok6ME`
2. **Taakh Luxury Product Film** — `https://youtube.com/shorts/kVjrJ1y5F00`
3. **Overld Clothing Brand** — `https://youtube.com/shorts/LdQXxF4Lruc`
4. **Charli M Bakes Promo** — `https://youtube.com/shorts/t6jIU2ExLmg`
5. **Taakh Gifting Brand Reel** — `https://youtube.com/shorts/nRq2p9OLrQ4`
6. **The Eery Drinks Reel (Masking VFX)** — `https://youtube.com/shorts/pJsO2g2jGsA`
7. **Shraddha Agarwal Designs** — `https://youtube.com/shorts/b0IGNRTyk3w`
8. **Shraddha Design Clothing** — `https://youtube.com/shorts/hfmHqqFdw6A`
9. **Shraddha Studio Portrait** — `https://youtube.com/shorts/_27V00TEqZw`
10. **Sarvam Interior Tour** — `https://youtube.com/shorts/IBiRsAlHcJc`
11. **Sarvam Interio Introduction** — `https://youtube.com/shorts/eqcVZOPxUdo`
12. **The Eery Cafe Collage** — `https://youtube.com/shorts/a6CCIS8E5Us`
13. **The Eery Cafe Reel** — `https://youtube.com/shorts/nQanLzSgJoY`
14. **Palash Jungle Resort Testimonial** — `https://youtube.com/shorts/DMN1LYhxhU0`
15. **Swimming Paradise Testimonial** — `https://youtube.com/shorts/yicZuMoDIp0`
16. **Bluebirds Academy Story** — `https://youtube.com/shorts/sXklgG8WM34`
17. **Tasmmay Collection 1** — `https://youtube.com/shorts/y-6msD2bUoU`
18. **Allied Events Festival Recap** — `https://youtube.com/shorts/QQh3x-rm70o`
19. **Allied Events Gala Night** — `https://youtube.com/shorts/033eeXE-qnc`
20. **Allied Events Grand Stage** — `https://youtube.com/shorts/Xumh22dVstU`
21. **Allied Events Experience** — `https://youtube.com/shorts/f5OE4UW4GfA`
22. **Personal Instagram Edits & Showreel** — `https://youtu.be/sRaujP2fbJA`

---

## 4. The 4 React Bits Component Patches

As specified in the build specification, the four React Bits components received targeted enhancements:

1. **OptionWheel (`components/react-bits/OptionWheel.jsx`)**:
   - Added `selected` (controlled index) and `captureWheel` (boolean) props.
   - Updated `applyTarget(value, snap, silent)` to accept `silent` so programmatic scrolling does not trigger redundant callbacks.
   - In the wheel event listener, returns early if `captureWheel` is false so native page scroll continues unimpeded.
   - Debounced user drag `onChange` to 180ms to avoid scroll event spam.

2. **CircularGallery (`components/react-bits/CircularGallery.jsx`)**:
   - In `onWheel`, checks `Math.abs(event.deltaX) > Math.abs(event.deltaY)` and whether `shiftKey` is held. If vertical scrolling occurs without shift, returns early without calling `preventDefault()`.

3. **ScrollFloat (`components/react-bits/ScrollFloat.jsx`)**:
   - Added `as` prop (default `'h2'`) rendering `const Tag = as` dynamically so statement bands render as semantic `<p>` tags without distorting heading hierarchies.

4. **BubbleMenu (`components/react-bits/BubbleMenu.jsx`)**:
   - Added an `onClick` handler on each navigation link that closes the menu overlay and calls `onMenuClick?.(false)`.

---

## 5. Where to Swap Content

- **Site Copy, Contact & Socials**: [`lib/site.js`](file:///c:/Users/sksah/Documents/projects/new-landing-page/lib/site.js)
  - Edit `brandName`, `email`, `whatsapp`, `linktree`, `bio`, `stats`, `testimonials`, and `faqs`.
- **Projects & Videos**: [`lib/projects.js`](file:///c:/Users/sksah/Documents/projects/new-landing-page/lib/projects.js)
  - Add or modify projects, YouTube URLs, tags, or categories.
- **Images & Visual Assets**:
  - `public/portrait.png`: Replace with your cut-out transparent silhouette portrait.
  - `public/pattern.svg`: Foil holographic pattern tile.
  - `public/work/*.svg`: SVG poster frames with explicit dimensions.

---

## 6. Contact Form API & Email Dispatch TODO

The contact form submits to [`app/api/contact/route.js`](file:///c:/Users/sksah/Documents/projects/new-landing-page/app/api/contact/route.js).
It includes input validation, an invisible honeypot trap (`company_fax_hp`), and returns structured JSON responses.

To send real emails to your inbox via **Resend**:
1. Run `npm install resend`
2. Add `RESEND_API_KEY=re_123456789` in `.env.local`
3. In `app/api/contact/route.js`, uncomment the Resend dispatch block:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Shobu Portfolio <onboarding@resend.dev>',
  to: 'creator.seikh@gmail.com',
  subject: `New Project Inquiry: ${projectType} from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\nBudget: ${budget || 'Not specified'}\n\nMessage:\n${message}`
});
```

---

## 7. Accessibility & Performance

- **Lighthouse Performance**: Fast loading with zero runtime overhead beyond GSAP, Motion, and Hugeicons.
- **WebGL Lifecycle**: `LazyMount` unmounts offscreen 3D canvases, capping active WebGL contexts to 2.
- **Reduced Motion**: Full support for `prefers-reduced-motion` with instant counter completion, disabled autoscroll, and native scroll behaviors.
- **WCAG Contrast**: All colors and tone transitions strictly adhere to contrast targets on both dark (`#1E2328`) and light (`#C3C9E9`) bands.
