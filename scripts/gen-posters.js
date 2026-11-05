const fs = require('fs');
const path = require('path');

const projects = [
  {
    id: 'solid-design',
    title: 'Solid Design Reel',
    category: 'ads',
    year: '2025',
    runtime: '0:45',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design'],
    description: 'High-energy commercial showcase engineered with precision kinetic cuts, seamless whip transitions, and balanced architectural lighting.',
    youtubeId: 'hAhhr5ok6ME',
    badge: 'BEST REEL',
    isShort: true
  },
  {
    id: 'taakh-product',
    title: 'Taakh Luxury Product Film',
    category: 'ads',
    year: '2025',
    runtime: '0:35',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Color Grading'],
    description: 'Commercial product showcase featuring tactile foley sound design, moody shadows, and refined brand color science.',
    youtubeId: 'kVjrJ1y5F00',
    badge: 'COMMERCIAL',
    isShort: true
  },
  {
    id: 'overld-brand',
    title: 'Overld Clothing Brand',
    category: 'ads',
    year: '2025',
    runtime: '0:42',
    tools: ['Premiere Pro', 'After Effects', 'Sound FX'],
    description: 'Fast-paced urban streetwear commercial built with snappy match cuts, rhythmic bass pacing, and dynamic kinetic typography.',
    youtubeId: 'LdQXxF4Lruc',
    badge: 'CAMPAIGN',
    isShort: true
  },
  {
    id: 'charli-m-bakes',
    title: 'Charli M Bakes Promo',
    category: 'ads',
    year: '2025',
    runtime: '0:38',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Warm promotional brand reel highlighting artisanal craft with vibrant natural lighting and mouth-watering macro pacing.',
    youtubeId: 't6jIU2ExLmg',
    badge: 'PROMO',
    isShort: true
  },
  {
    id: 'taakh-gifting',
    title: 'Taakh Gifting Brand Reel',
    category: 'ads',
    year: '2025',
    runtime: '0:40',
    tools: ['Premiere Pro', 'Color Grading'],
    description: 'Celebratory luxury gifting brand reel with smooth camera motion and prestige color treatment.',
    youtubeId: 'nRq2p9OLrQ4',
    badge: 'BRAND FILM',
    isShort: true
  },
  {
    id: 'eery-drinks',
    title: 'The Eery Drinks Reel',
    category: 'shorts',
    year: '2025',
    runtime: '0:32',
    tools: ['After Effects', 'Premiere Pro', 'Masking VFX'],
    description: 'Advanced masking and liquid match-cuts creating an illusion of seamless pouring, beverage flow, and speed manipulation.',
    youtubeId: 'pJsO2g2jGsA',
    badge: 'MASKING & VFX',
    isShort: true
  },
  {
    id: 'shraddha-designs',
    title: 'Shraddha Agarwal Designs',
    category: 'shorts',
    year: '2025',
    runtime: '0:48',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    description: 'Couture bridal showcase emphasizing fabric texture, slow-motion speed ramps, and warm golden cinematic tones.',
    youtubeId: 'b0IGNRTyk3w',
    badge: 'FASHION',
    isShort: true
  },
  {
    id: 'shraddha-clothing',
    title: 'Shraddha Design Clothing',
    category: 'shorts',
    year: '2025',
    runtime: '0:36',
    tools: ['Premiere Pro', 'Sound Design'],
    description: 'Dynamic fashion lookbook edit with synchronized musical rhythm and modern typography overlays.',
    youtubeId: 'hfmHqqFdw6A',
    badge: 'LOOKBOOK',
    isShort: true
  },
  {
    id: 'shraddha-editorial',
    title: 'Shraddha Studio Portrait',
    category: 'shorts',
    year: '2024',
    runtime: '0:30',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Clean studio fashion cut with subtle background desaturation emphasizing garment textures and model presence.',
    youtubeId: '_27V00TEqZw',
    badge: 'STUDIO',
    isShort: true
  },
  {
    id: 'sarvam-interior',
    title: 'Sarvam Interior Tour',
    category: 'shorts',
    year: '2025',
    runtime: '0:50',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Architectural space showcase celebrating geometry, clean lines, and balanced ambient interior lighting.',
    youtubeId: 'IBiRsAlHcJc',
    badge: 'INTERIOR',
    isShort: true
  },
  {
    id: 'sarvam-intro',
    title: 'Sarvam Interio Introduction',
    category: 'shorts',
    year: '2025',
    runtime: '0:45',
    tools: ['Premiere Pro', 'After Effects'],
    description: 'Hook-driven firm introduction showing design methodology, material selection, and completed residences.',
    youtubeId: 'eqcVZOPxUdo',
    badge: 'SHOWCASE',
    isShort: true
  },
  {
    id: 'eery-cafe-collage',
    title: 'The Eery Cafe Collage',
    category: 'shorts',
    year: '2025',
    runtime: '0:28',
    tools: ['Premiere Pro', 'After Effects'],
    description: 'Multi-window split collage edit capturing the energetic rhythm and charm of cafe culture.',
    youtubeId: 'a6CCIS8E5Us',
    badge: 'COLLAGE',
    isShort: true
  },
  {
    id: 'eery-cafe-reel',
    title: 'The Eery Cafe Reel',
    category: 'shorts',
    year: '2025',
    runtime: '0:34',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Warm cafe ambiance cut with vintage film grain, smooth camera tracking, and cozy lo-fi soundscapes.',
    youtubeId: 'nQanLzSgJoY',
    badge: 'HOSPITALITY',
    isShort: true
  },
  {
    id: 'palash-resort',
    title: 'Palash Jungle Resort',
    category: 'shorts',
    year: '2024',
    runtime: '0:52',
    tools: ['Premiere Pro', 'Color Grading'],
    description: 'Experiential nature resort testimonial and property tour with rich organic foliage grading and guest storytelling.',
    youtubeId: 'DMN1LYhxhU0',
    badge: 'TESTIMONIAL',
    isShort: true
  },
  {
    id: 'swimming-paradise',
    title: 'Swimming Paradise Testimonial',
    category: 'shorts',
    year: '2024',
    runtime: '0:46',
    tools: ['Premiere Pro', 'Audition'],
    description: 'Engaging client testimonial reel featuring crisp dialogue leveling, underwater foley, and upbeat rhythm.',
    youtubeId: 'yicZuMoDIp0',
    badge: 'TESTIMONIAL',
    isShort: true
  },
  {
    id: 'bluebirds-academy',
    title: 'Bluebirds Academy Story',
    category: 'shorts',
    year: '2024',
    runtime: '0:55',
    tools: ['Premiere Pro', 'Audio Cleanup'],
    description: 'Inspirational educational testimonial with emotional pacing, clean voiceovers, and student success highlights.',
    youtubeId: 'sXklgG8WM34',
    badge: 'EDUCATION',
    isShort: true
  },
  {
    id: 'tasmmay-1',
    title: 'Tasmmay Collection 1',
    category: 'shorts',
    year: '2025',
    runtime: '0:38',
    tools: ['Premiere Pro', 'Resolve'],
    description: 'Vibrant ethnic couture showcase with dynamic slow-motion ramps and punchy bass drops.',
    youtubeId: 'y-6msD2bUoU',
    badge: 'FASHION',
    isShort: true
  },
  {
    id: 'allied-events-1',
    title: 'Allied Events Festival Recap',
    category: 'shorts',
    year: '2025',
    runtime: '0:44',
    tools: ['Premiere Pro', 'After Effects', 'Sound FX'],
    description: 'High-scale live event highlight reel with crowd energy and synchronized pyrotechnic audio hits.',
    youtubeId: 'QQh3x-rm70o',
    badge: 'LIVE EVENT',
    isShort: true
  },
  {
    id: 'allied-events-2',
    title: 'Allied Events Gala Night',
    category: 'shorts',
    year: '2025',
    runtime: '0:40',
    tools: ['Premiere Pro', 'Resolve'],
    description: 'Gala recap with stage lighting, speaker highlights, and bass-heavy audio master.',
    youtubeId: '033eeXE-qnc',
    badge: 'EVENT',
    isShort: true
  },
  {
    id: 'allied-events-3',
    title: 'Allied Events Grand Stage',
    category: 'shorts',
    year: '2025',
    runtime: '0:48',
    tools: ['Premiere Pro', 'Sound Design'],
    description: 'Festival scale stage production captured with wide sweeping cinematic edits and crowd immersion.',
    youtubeId: 'Xumh22dVstU',
    badge: 'STAGE REEL',
    isShort: true
  },
  {
    id: 'allied-events-4',
    title: 'Allied Events Experience',
    category: 'shorts',
    year: '2025',
    runtime: '0:35',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description: 'Fast-cut recap featuring attendee reactions, decor details, and musical synchronization.',
    youtubeId: 'f5OE4UW4GfA',
    badge: 'EXPERIENCE',
    isShort: true
  },
  {
    id: 'personal-instagram-edits',
    title: 'Personal Instagram Edits & Showreel',
    category: 'long-form',
    year: '2025',
    runtime: '2:15',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Audition'],
    description: 'Master compilation of creative video editing, kinetic match cuts, advanced grading, and sound architecture.',
    youtubeId: 'sRaujP2fbJA',
    badge: 'SHOWREEL',
    isShort: false
  }
];

const workDir = path.join(process.cwd(), 'public', 'work');
if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true });

projects.forEach((p, idx) => {
  const width = p.isShort ? 720 : 1280;
  const height = p.isShort ? 1280 : 720;
  const num = String(idx + 1).padStart(2, '0');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad_${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E2328" />
      <stop offset="50%" stop-color="#2A3138" />
      <stop offset="100%" stop-color="#373F47" />
    </linearGradient>
    <radialGradient id="glow_${p.id}" cx="65%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#6C91C2" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#C3C9E9" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#1E2328" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#grad_${p.id})" />
  <rect width="100%" height="100%" fill="url(#glow_${p.id})" />

  <!-- Frame border -->
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="16" fill="none" stroke="#8B8982" stroke-width="1.5" stroke-opacity="0.28" />

  <!-- Timecode & Metadata HUD -->
  <text x="48" y="64" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="500" fill="#C3C9E9" letter-spacing="2">CAM_01 / REC [${num}]</text>
  <text x="${width - 48}" y="64" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="500" fill="#6C91C2" letter-spacing="1.5">${p.runtime} / 24FPS</text>

  <!-- Center Play glyph -->
  <circle cx="${width / 2}" cy="${height / 2 - 20}" r="44" fill="#1E2328" fill-opacity="0.8" stroke="#6C91C2" stroke-width="2" />
  <polygon points="${width / 2 - 10},${height / 2 - 36} ${width / 2 - 10},${height / 2 - 4} ${width / 2 + 16},${height / 2 - 20}" fill="#EEF0FA" />

  <!-- Badge & Title -->
  <rect x="48" y="${height - 130}" width="${p.badge.length * 9 + 28}" height="26" rx="13" fill="#373F47" stroke="#6C91C2" stroke-width="1" />
  <text x="62" y="${height - 113}" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#C3C9E9" letter-spacing="1.5">${p.badge}</text>
  
  <text x="48" y="${height - 68}" font-family="'Bricolage Grotesque', sans-serif" font-size="${p.isShort ? 32 : 36}" font-weight="700" fill="#EEF0FA" letter-spacing="-0.5">${p.title.replace(/&/g, '&amp;')}</text>
</svg>`;

  fs.writeFileSync(path.join(workDir, `${p.id}.svg`), svgContent, 'utf8');
});

console.log('Successfully generated', projects.length, 'SVG posters in public/work/');
