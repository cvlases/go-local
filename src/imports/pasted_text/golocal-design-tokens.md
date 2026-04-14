# GoLocal — Community Restaurant Directory
## Vibe Code Prompt

---

## What This Is

**GoLocal** is a community-curated restaurant directory for local students and neighbors. It's a **human-powered alternative to Google Maps and Yelp** — no algorithms, no ads, no promoted listings. Just real recommendations from real people in the community. Think of it as a **living community zine meets organized reference tool** — something you'd want to bookmark, return to, and contribute to.

> "Not ranked by robots. Found by neighbors."

This is a **community tool first** — useful, accessible, and easy to navigate. The zine quality comes through in personality and warmth, not noise or clutter. Clean grids, clear hierarchy, friendly voice.

---

## Visual Identity

### Color Palette
```
--coral:     #F36E63   /* primary CTA, highlights, active states */
--sky:       #72B0D8   /* links, map accents, secondary elements */
--lime:      #9ACD65   /* badges, dietary tags, positive indicators */
--gold:      #FAD331   /* featured sections, catering callouts, stars */
--cream:     #FDF8F2   /* page background */
--ink:       #1C1C1C   /* body text */
--stone:     #F0EBE3   /* card backgrounds, subtle dividers */
--muted:     #7A7570   /* secondary text, meta info */
```

### Typography
- **Display / Section Headers**: `Playfair Display` — editorial warmth, not stiff
- **UI / Body**: `DM Sans` — clean, friendly, highly readable
- **Tags / Labels / Meta**: `DM Mono` — zine-like, structured, gives texture
- Import from Google Fonts

### Aesthetic Direction
**Clean editorial zine.** Imagine a well-designed community print newsletter that was translated to the web thoughtfully — not dumbed down, not overdesigned. Key qualities:
- Generous whitespace. Cards breathe. Sections are clearly delineated.
- Structured grid layouts (not chaotic masonry)
- Warm off-white background, not stark white
- Occasional bold color blocks as section dividers or feature banners
- Subtle paper-grain texture overlay on hero areas (CSS noise or SVG filter)
- Thick-bordered cards (2px solid `--ink`) with slight corner radius (8–12px)
- Bold typographic section labels in `DM Mono`, all-caps, letter-spaced
- Handmade feel through font choices + color use, not through decoration overload
- NO stock food photography icons, NO gradient blobs, NO drop shadows everywhere
- Illustrations: simple flat line-art icons for cuisine types and dietary badges (use emoji or simple SVGs)

---

## Site Structure

### Page 1: Landing Page (first impression)

**Hero Section:**
- Full-width, cream background with subtle texture
- Large display headline: **"Your neighborhood, on one page."**
- Subheading (warm, second-person): "GoLocal is a community-built guide to the best local restaurants near you — discovered and recommended by real people."
- Two CTA buttons: **"Browse the Directory"** (coral, filled) + **"Submit a Restaurant"** (outlined)
- Below: animated horizontal ticker/marquee of category tags with emoji: 🍕 Pizza · 🍜 Noodles · 🌮 Tacos · ☕ Café · 🥗 Vegan · 🍱 Takeout · 🎉 Catering · 🏘️ Southside · ...

**Stats Bar:**
- 3 simple callout stats in a row: `48 Restaurants` · `12 Neighborhoods` · `100% Human Curated`
- Style: large gold or coral number, small mono label below

**Featured Category Preview:**
- Show 2–3 horizontal scroll rows as a teaser (same as directory)
- "Community Favorites", "Great for Catering", "New Additions"
- Each row has 3–4 cards visible, with "See all →" link to directory

**Why GoLocal? Strip:**
- 3-column value prop section
- Col 1: 🙋 "Recommended by your neighbors, not an algorithm"
- Col 2: 📋 "A living directory — always growing, always community-updated"
- Col 3: 🚫 "No ads. No promoted placements. Ever."

**Announcement Popup/Banner:**
- Slides down from top on page load (1.5s delay)
- Coral background, bold white text
- Example: "📣 CSP Spring Market — April 12th at the UC! Learn more →"
- Dismissible with X; dismissed state saved to localStorage (won't re-show same session)
- Editable via a simple config variable at top of JS file

---

### Page 2: Directory (Main Page / Home)

This is the heart of the site. Organized, scannable, inviting.

**Search + Filter Bar (sticky on scroll):**
- Large rounded search input at top: "Search restaurants, cuisines, neighborhoods..."
- Filter pills below in scrollable row — toggle on/off with click:
  - **Cuisine:** Pizza, Burgers, Asian, Mexican, Mediterranean, Sandwiches, Brunch, Café/Bakery, Seafood, Vegetarian, Other
  - **Dietary:** 🌱 Vegan, 🥗 Vegetarian, 🌾 Gluten-Free, 🥛 Dairy-Free, ⚡ Halal
  - **Service:** Dine-in, Takeout, Delivery, Late Night
  - **Catering:** 🎉 Catering Available, 👥 Large Groups (10+), 🍽️ Family-Style
  - **Neighborhood:** Southside, Lawrenceville, Strip District, East Liberty, Squirrel Hill, Oakland, Beechview, Mt. Oliver, Brookline, North Side, Other
- Active filters: filled pill with × to remove each; "Clear all" text link
- Live results counter: `Showing 14 of 48 restaurants`

**Featured Section — "Planning Something Big?" (Catering spotlight)**
- Distinct section with gold/warm background band
- Header: `🎉 PLANNING SOMETHING BIG?` in DM Mono
- Subhead: "These restaurants are ready for your event, party, or group order."
- Horizontal scrollable row of catering-tagged restaurants (bigger cards)
- Each card shows: name, cuisine, "Catering ✓" badge, capacity if available, order/contact link
- "See all catering options →" link to filtered directory view

**Netflix-Style Category Rows (Curated Editorial Sections):**
Each is a labeled horizontal scroll row with left/right arrow buttons:
- 🏆 Community Favorites *(most liked)*
- ✨ New to GoLocal *(recently added)*
- 🎉 Great for Catering *(same data as featured section above, compact)*
- 🌱 Plant-Based & Vegan-Friendly
- 🌙 Open Late
- 📍 Near Campus
- 🏘️ Browse by Neighborhood *(one row per neighborhood, or neighborhood cards that link to filtered view)*

**Full Directory Grid:**
- Responsive CSS grid: 3 col desktop → 2 col tablet → 1 col mobile
- Default sort: Most Liked; other options: Newest, A–Z, By Neighborhood
- Each **Restaurant Card** contains:
  - Photo (or illustrated placeholder in cream/coral tones if none)
  - Name in display font (bold, large)
  - Cuisine tag pill(s) — color varies by type
  - Neighborhood tag in mono font
  - 1–2 line community description in italic (personal voice: "Their lunch special is unreal.")
  - Dietary badge row (small icons: 🌱 V, GF, H etc.)
  - Catering badge if applicable: `🎉 Catering` in gold pill
  - ❤️ Like button (heart icon) + count — toggleable, localStorage persisted
  - **"Order / Visit" CTA button** → links out to restaurant's website (opens new tab)
  - Small "Submitted by community" attribution in muted mono text

---

### Page 3: Restaurant Detail (Modal or Dedicated Page)

Opens when clicking a card (modal overlay preferred for flow):
- Large hero image area
- Name, cuisine tags, neighborhood
- Hours (if known), price range ($, $$, $$$)
- Dietary and catering badges
- Full community description
- ❤️ Like button + count
- **Primary CTA**: "Order / Visit Website →" (big coral button, external link)
- Embedded Google Maps location
- "Something wrong? Suggest an edit →" small link (links to Google Form)

---

### Page 4: Map View

- Full-width interactive map (Leaflet.js with OpenStreetMap tiles — free, no API key needed)
- Color-coded pins by cuisine category
- Clicking a pin opens a compact popup: restaurant name, cuisine, neighborhood, "Visit →" link
- Sidebar or top panel: filter by neighborhood or cuisine to update which pins show
- Pittsburgh neighborhood boundary overlays (GeoJSON available free from WPRDC)
- Legend: color key for cuisine types
- Toggle: "Show only catering-available" — filters map pins

---

### Page 5: Submit a Restaurant

- Embedded Google Form (iframe) OR styled form using FormSubmit.co (no backend needed, sends to email/sheet)
- Friendly headline: **"Know a spot we're missing? Add it to the table."**
- Fields: Restaurant Name, Neighborhood (dropdown), Cuisine Type (multi-select), Website/Order Link, Description (in your own words — max 150 chars), Dietary options (checkboxes), Catering available? (Y/N), Group size capacity (optional), Your name (optional), Photo URL (optional)
- Post-submit: thank you state with animated checkmark, "See the directory →" link
- Note below form: "Submissions are reviewed by the GoLocal community team before going live."

---

### Page 6: Zines & Events

**Zines Section:**
- Grid of zine cover images (2–3 col)
- Each: cover thumbnail, title, date/issue, download PDF button or lightbox view
- Style: slight tilt/rotation on cards for handmade feel (2–3deg max)

**Events Section:**
- Upcoming CSP events as cards: date badge (bold, coral), event name, short description, RSVP/link button
- Past events in a muted archive row below

**Newsletter Strip:**
- Simple email input + subscribe button
- Copy: "Get GoLocal updates — new restaurants, events, and zines in your inbox."

---

### Page 7: Partners & Community

- Intro: "GoLocal is made possible by our community partners."
- Featured partners (large cards): Casa San Jose, Hispanic Development Council — logo, name, 2-sentence description, link
- Secondary partners: smaller grid cards — logo + name + link
- **"Become a Partner" CTA** section at bottom: brief description of what partnership means, link to contact form or email

---

### Page 8: Instagram Embed Section (Footer Component)

- Used in footer across all pages
- Heading: "Find us on Instagram @golocal_pgh"
- 6-post grid embed using **Behold.so** (free tier, clean embed) or **SnapWidget**
- Static fallback: 6 placeholder image squares with "Follow us" overlay if embed unavailable
- Link to Instagram profile

---

## Navigation

**Top Nav (sticky, blur backdrop on scroll):**
- Left: GoLocal wordmark (Playfair Display, bold) + small neighborhood/city label
- Center links: `Directory` · `Map` · `Submit` · `Events` · `Partners`
- Right: Instagram icon + `❤️ Saved (3)` button showing liked restaurant count with badge
- Mobile: hamburger menu → full-screen nav overlay

**Footer:**
- 3-column layout: Logo + tagline | Quick links | Instagram grid
- Bottom bar: "Made with ❤️ by the GoLocal community · Pittsburgh, PA"
- Small link: "Want this for your organization? Use our template →"

---

## Key Interactions & Behavior

### Like System
- Heart button on every card
- Click: toggles filled/outline heart, increments/decrements count
- Persist to localStorage under key `golocal_likes`
- "Saved" nav button shows total liked count; clicking goes to filtered view of liked restaurants
- Optional upgrade: Supabase or Firebase for shared like counts across users

### Filter System
- Multi-select pills — multiple can be active at once
- Filters are ANDed within category, ORed across categories (e.g., Vegan AND Catering, any cuisine)
- URL updates with filter params (e.g., `?dietary=vegan&service=catering`) for shareability
- Smooth CSS transition when cards filter in/out (fade + slight scale)
- Mobile: filters collapse into a "Filter" button → bottom sheet drawer

### Announcement Banner
- Config at top of `config.js`:
```js
const ANNOUNCEMENT = {
  active: true,
  text: "📣 CSP Spring Market — April 12th at the UC!",
  linkText: "Learn more",
  linkUrl: "/events"
}
```
- Set `active: false` to hide. Easy for non-developers to update.

---

## Restaurant Data Schema (JSON)

```json
{
  "id": "primantis-southside",
  "name": "Primanti Brothers",
  "cuisine": ["Sandwiches", "American"],
  "neighborhood": "Southside",
  "description": "A Pittsburgh institution. The coleslaw-on-the-sandwich thing is real and it's great.",
  "dietary": ["vegetarian-option"],
  "catering": true,
  "cateringCapacity": 50,
  "priceRange": "$$",
  "orderLink": "https://primantibros.com/order",
  "website": "https://primantibros.com",
  "image": "images/primantis.jpg",
  "likes": 0,
  "featured": true,
  "categories": ["community-favorites", "great-for-catering", "near-campus"],
  "addedDate": "2025-03-01"
}
```

Store as `restaurants.json` — all filtering, sorting, and rendering driven from this file. Easy to hand off and edit.

---

## Template / Reuse Structure

GoLocal is designed to be a **reusable template** for other student orgs or community groups.

At the top of a `config.js` file, expose all org-specific variables:
```js
const SITE_CONFIG = {
  orgName: "GoLocal",
  city: "Pittsburgh, PA",
  instagramHandle: "@golocal_pgh",
  submitFormUrl: "https://forms.google.com/...",
  primaryColor: "#F36E63",
  announcement: { active: true, text: "...", linkText: "...", linkUrl: "..." }
}
```
All colors should be CSS custom properties tied back to this config.
Comment blocks throughout the code: `// 👋 To adapt: update SITE_CONFIG in config.js`

---

## Tech Stack Recommendation

**Start here (fast, portable, vibe-code friendly):**
- HTML + CSS + Vanilla JS (or Alpine.js for reactivity)
- Restaurants as a local `restaurants.json` file
- Leaflet.js for map (free, no API key)
- FormSubmit.co for form submissions (no backend)
- Behold.so for Instagram embed (free tier)
- Deploy on Vercel, Netlify, or GitHub Pages for free

**Scale up later if needed:**
- Airtable or Notion as a CMS for restaurants (easy for non-devs to update)
- Supabase for shared likes/counts
- Next.js if adding server-side features

---

## Accessibility & Performance
- Mobile-first responsive layout (most users on phones)
- All images have descriptive alt text
- Color contrast: WCAG AA minimum throughout
- Keyboard-navigable filters and cards (focus styles visible)
- Lazy-load images below the fold
- Prefer system-rendered map tiles over heavy JS map libraries where possible
- Smooth animations but respect `prefers-reduced-motion`