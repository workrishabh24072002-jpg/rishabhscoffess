═══════════════════════════════════════════════════════════════
  RISHABH'S COFFEE — COMPLETE HEADLESS SHOPIFY WEBSITE
  Ready to deploy to Netlify or GitHub Pages
═══════════════════════════════════════════════════════════════

STORE DETAILS (already connected):
  Store: rishabhscoffee.myshopify.com
  Token: 894827c544e3458fd0ca049c6fa786f9

PAGES INCLUDED:
  index.html       → Homepage (hero carousel + products)
  products.html    → Shop all coffees (loads from Shopify API)
  product.html     → Product detail + Add to Cart (Shopify API)
  cart.html        → Cart page + Shopify checkout redirect
  about.html       → About Us
  contact.html     → Contact form
  faq.html         → FAQ accordion (10 questions)
  blog.html        → Journal / Blog listing
  article.html     → Individual article page (6 articles)
  terms.html       → Terms of Service
  privacy.html     → Privacy Policy

VIDEO FILES (videos/ folder):
  The site uses 6 video files, named 1.mp4 through 6.mp4:

  1.mp4  → Hero Slide 1: Dark Espresso
  2.mp4  → Hero Slide 2: French Vanilla
  3.mp4  → Hero Slide 3: Hazelnut Brew
  4.mp4  → "Perfect Pour" split section
  5.mp4  → "Masterfully Roasted" full-screen section
  6.mp4  → "The Perfect Grind" + "The Extraction" sections

  All video references in index.html already point to these filenames.
  No renaming required.

DEPLOY TO NETLIFY (drag & drop):
  1. Go to netlify.com/drop
  2. Drag the entire deploy-new folder onto the page
  3. Wait 30 seconds — your site is live!

DEPLOY TO NETLIFY (via GitHub — recommended):
  1. Push this folder to a GitHub repository
  2. Go to netlify.com → Add new site → Import from Git
  3. Connect your GitHub repo
  4. Every future git push auto-deploys the site

TEST YOUR SITE:
  ✓ Click "Add to Cart" on any product
  ✓ Go to cart.html — you should see your item
  ✓ Click "Proceed to Checkout" — redirects to Shopify checkout
  ✓ Test purchase using Shopify's test card:
    Card: 1 (in Bogus Gateway test mode)
    Expiry: Any future date
    CVV: Any 3 digits

ADD YOUR LECTURER:
  Shopify Admin → Settings → Users and permissions
  → Add staff → cara.callaghan@tus.ie → All permissions → Send invite

REMOVE STORE PASSWORD:
  Shopify Admin → Online Store → Preferences
  → Uncheck "Restrict access to visitors with the password"
  → Save

HOW THE CART WORKS:
  - Click "Add to Cart" on any product page
  - The Shopify Storefront API creates/updates a cart
  - Cart ID is saved in localStorage (persists across pages)
  - Cart page shows all items with +/- quantity controls
  - "Proceed to Checkout" redirects to Shopify's hosted checkout
  - Shopify handles payment, tax, and shipping calculations

FOLDER STRUCTURE:
  deploy-new/
  ├── index.html
  ├── products.html
  ├── product.html
  ├── cart.html
  ├── about.html
  ├── contact.html
  ├── faq.html
  ├── blog.html
  ├── article.html
  ├── terms.html
  ├── privacy.html
  ├── .gitignore
  ├── css/
  │   └── main.css
  ├── js/
  │   ├── shopify.js
  │   ├── carousel.js
  │   └── chatbot.js
  ├── images/
  │   └── (all product + lifestyle images)
  └── videos/
      ├── 1.mp4  (hero slide 1)
      ├── 2.mp4  (hero slide 2)
      ├── 3.mp4  (hero slide 3)
      ├── 4.mp4  (perfect pour)
      ├── 5.mp4  (roasting)
      └── 6.mp4  (grind + extraction)

Good luck with your assignment! ☕
