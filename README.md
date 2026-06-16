# Booktail NYC - Cafe, Bookstore & Cat Lounge

Welcome to **Booktail**, NYC's cozy 2-in-1 cafe and bookstore featuring resident rescue cats! Tucked away in a tranquil alleyway in Greenwich Village, Booktail opens up into a surprisingly large, lush, and overgrown space, complete with warm ambient lighting, wood and stone details, and a small footbridge over a tiny koi pond.

This is the source code for Booktail's modern, interactive, and premium multi-page website.

---

## 🌟 Tech Stack & Aesthetics

*   **Markup**: Semantic HTML5 for robust structure and SEO optimization.
*   **Styling**: Premium Vanilla CSS3 (the **"Lush Cozy Sanctuary"** design system) featuring HSL tailored colors, organic green/stone tones, glassmorphism, responsive flex/grid layouts, and smooth micro-animations.
*   **Fonts**: *Playfair Display* for heading typography (classic and literary) and *Lora*/*Inter* for clean, comfortable reading.
*   **Icons**: FontAwesome 6 (CDN).
*   **Logic**: Vanilla ES6 JavaScript (pure client-side) handling all interactive features with zero framework dependencies.

---

## 📖 Pages & Features

### 1. Home Page (`index.html`)
*   **Visual Ambience**: Beautiful Hero background depicting the cafe's plant-filled interior.
*   **Experience Panels**: Grids showcasing the koi pond footbridge, the curated bookstore, and the resident cat experience.
*   **Mission Statement**: Prominent focus on providing a safe refuge from the city's hustle and bustle.
*   **Interactive Testimonial Slider**: Auto-sliding carousel of customer reviews with manual prev/next navigation.

### 2. Reservations, Menu & Bookstore Inventory (`reserve.html`)
*   **Spots Reservation Form**: Custom form validation for booking tables/nooks, selecting guests, choosing timeslots, and opting in for Cat Lounge access (+$5 shelter fee).
*   **Interactive Cafe Menu**: Tabbed navigation (Coffee/Tea, Food, Pastries) with a simulated pre-order sidebar. Adding menu items updates subtotal totals, item counts, and triggers cart removal options.
*   **Searchable Book Inventory**: Live searchable and genre-filterable list of titles (Classics, Fantasy, Thrillers, Nonfiction, Manga) complete with shelf coordinates and real-time status badges (Available vs. Rented).

### 3. Meet the Cats (`about.html`)
*   **Founder's Story**: Details the origin of Booktail, the renovation of the alleyway warehouse, and partnership with animal shelters.
*   **Resident Grid**: Grid cards of Barnaby, Midnight, Cleo, and Matcha showing breed descriptions, personality bios, ages, temperaments, and favorite book genres.

### 4. Contact & Reviews (`contact.html`)
*   **B2B & Event Inquiry Form**: Inquiry forms categorized by author book signing events, press, or business collaborations.
*   **Dynamic Review Board**: 
    *   Interactive star rating input (1 to 5 stars).
    *   Submitting reviews dynamically prepends the comment to the live feed and recalculates/updates the average star rating and review count.
    *   **Data Persistence**: Review submissions are saved in `localStorage`, maintaining state upon browser reloads.

---

## 🚀 How to Run Locally

Since the website is built entirely on vanilla web standards, it requires no installation or build steps.

1.  **Direct Browser Access**:
    Simply double-click or open `index.html` in any web browser (Chrome, Firefox, Safari, Edge).
    
2.  **Local Dev Server (Recommended)**:
    For optimal experience (e.g. correct path resolution and header parsing), you can run a local server:
    *   **VS Code**: Right-click `index.html` and choose **"Open with Live Server"**.
    *   **Python**: Run `python -m http.server 8000` in the directory, then navigate to `http://localhost:8000`.
    *   **Node.js**: Run `npx serve` in the directory.

---

## 🐾 Feline Credits
*   **Barnaby** (General Manager)
*   **Midnight** (Philosopher)
*   **Cleo** (Velvet Companion)
*   **Matcha** (High-Energy Quality Inspector)
