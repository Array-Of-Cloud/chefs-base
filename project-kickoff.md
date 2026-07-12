# Chefs Base LLP — Project Kickoff Prompt
> Paste this entire prompt into Claude Code in an empty project folder.

---

You are helping build a professional B2B marketing and product catalog website for **Chefs Base LLP**, a Kerala-based retort food company targeting international restaurant buyers. The site must look premium, load fast, and be easy for a non-technical client to manage.

## Tech stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity v3 (headless, with Sanity Studio embedded at `/studio`)
- **Deployment**: Vercel (frontend) + Sanity cloud (content lake)
- **Email**: Resend (for contact/RFQ form submissions)
- **Styling approach**: Custom Tailwind config using the brand palette below

## Brand identity
- **Primary**: Charcoal `#1C1C1A`
- **Accent**: Saffron Gold `#C99A3E`
- **Background**: Warm Cream `#F7EDD8`
- **Text on dark**: `#F7EDD8`
- **Font**: Use `Playfair Display` (serif, Google Fonts) for headings and `Inter` (sans-serif) for body text

## Project structure to scaffold

```
chefsbase/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public-facing site
│   │   ├── layout.tsx            # Root layout with Navbar + Footer
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx          # Products catalog
│   │   │   └── [slug]/page.tsx   # Product detail
│   │   ├── technology/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── contact/page.tsx
│   │   └── custom-orders/page.tsx
│   ├── studio/[[...tool]]/page.tsx  # Sanity Studio route
│   └── api/
│       ├── contact/route.ts      # RFQ form handler → Resend
│       └── revalidate/route.ts   # On-demand ISR revalidation
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client config
│   │   ├── image.ts              # urlForImage helper
│   │   └── queries.ts            # All GROQ queries
│   ├── schemas/
│   │   ├── index.ts              # Schema registry
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── post.ts
│   │   ├── certification.ts
│   │   ├── teamMember.ts
│   │   └── siteSettings.ts
│   └── sanity.config.ts          # Sanity Studio config
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProductCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── WhatsAppButton.tsx    # Sticky float button
│   └── sections/                 # Homepage sections
│       ├── Hero.tsx
│       ├── TrustBar.tsx
│       ├── FeaturedProducts.tsx
│       ├── TechnologyTeaser.tsx
│       ├── WhyUs.tsx
│       ├── CertificationsStrip.tsx
│       ├── LatestPosts.tsx
│       └── CtaBanner.tsx
├── lib/
│   └── resend.ts                 # Resend email helper
├── types/
│   └── index.ts                  # Shared TypeScript types
├── public/
│   └── fonts/                    # If self-hosting fonts
├── sanity.config.ts              # Root Sanity config
├── next.config.ts
└── tailwind.config.ts
```

---

## Step 1 — Install dependencies

Run the following in order in the empty project folder:

```bash
# Scaffold Next.js with TypeScript + Tailwind + App Router
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Add Sanity to the existing Next.js project
npm create sanity@latest -- --project <PROJECT_ID> --dataset production --template clean

# Additional dependencies
npm install @sanity/image-url @sanity/vision next-sanity resend
npm install @tailwindcss/typography
```

> Note: Create a Sanity project at sanity.io first to get the PROJECT_ID and dataset name. Use dataset name: `production`.

---

## Step 2 — Tailwind config

Update `tailwind.config.ts` with brand tokens:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1C1A',
        gold: '#C99A3E',
        cream: '#F7EDD8',
        'cream-dark': '#EDE3CC',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

---

## Step 3 — Sanity schemas

Create each schema file exactly as follows:

### `sanity/schemas/category.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'string' }),
  ],
})
```

### `sanity/schemas/product.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: r => r.required() }),
    defineField({ name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })], validation: r => r.required() }),
    defineField({ name: 'gallery', title: 'Image gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'string', description: 'Used on product cards. Max 120 chars.', validation: r => r.required().max(120) }),
    defineField({ name: 'description', title: 'Full description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ingredients', title: 'Ingredients', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'shelfLife', title: 'Shelf life', type: 'string', description: 'e.g. 24 months at room temperature' }),
    defineField({ name: 'storageInfo', title: 'Storage instructions', type: 'string' }),
    defineField({ name: 'customOrderAvailable', title: 'Custom order available', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'string', group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'SEO' }],
  orderings: [{ title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
})
```

### `sanity/schemas/post.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'teamMember' }] }),
    defineField({ name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })], validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'string', description: 'Short summary for listing cards. Max 160 chars.', validation: r => r.required().max(160) }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }], validation: r => r.required() }),
    defineField({ name: 'readTime', title: 'Read time (minutes)', type: 'number' }),
    defineField({ name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'string', group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'SEO' }],
  orderings: [{ title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
```

### `sanity/schemas/certification.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Certification name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'logo', title: 'Logo / badge image', type: 'image', validation: r => r.required() }),
    defineField({ name: 'issuedBy', title: 'Issued by', type: 'string' }),
    defineField({ name: 'licenseNumber', title: 'License / registration number', type: 'string' }),
    defineField({ name: 'validUntil', title: 'Valid until', type: 'date' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', description: 'Lower numbers appear first' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

### `sanity/schemas/teamMember.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role / title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
})
```

### `sanity/schemas/siteSettings.ts`
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  // Singleton — only one document should ever exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Site name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', validation: r => r.required() }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string', validation: r => r.required().email() }),
    defineField({ name: 'contactPhone', title: 'Contact phone', type: 'string', validation: r => r.required() }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp number', type: 'string', description: 'Include country code, no spaces. e.g. +918137060637', validation: r => r.required() }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({ name: 'gstNumber', title: 'GST number', type: 'string' }),
    defineField({ name: 'fssaiNumber', title: 'FSSAI license number', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'defaultSeoTitle', title: 'Default SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'defaultSeoDescription', title: 'Default SEO description', type: 'string', group: 'seo' }),
    defineField({ name: 'defaultOgImage', title: 'Default OG image', type: 'image', group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'SEO & social' }],
})
```

### `sanity/schemas/index.ts`
```ts
import category from './category'
import certification from './certification'
import post from './post'
import product from './product'
import siteSettings from './siteSettings'
import teamMember from './teamMember'

export const schemaTypes = [
  siteSettings,
  product,
  category,
  post,
  certification,
  teamMember,
]
```

---

## Step 4 — Sanity client + helpers

### `sanity/lib/client.ts`
```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### `sanity/lib/image.ts`
```ts
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return imageBuilder.image(source).auto('format').fit('max')
}
```

### `sanity/lib/queries.ts`
```ts
import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, logo, contactEmail, contactPhone,
    whatsappNumber, address, gstNumber, fssaiNumber,
    instagram, facebook, linkedin,
    defaultSeoTitle, defaultSeoDescription, defaultOgImage
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(name asc) [0...4] {
    _id, name, slug, shortDescription, mainImage,
    category->{ name, slug }
  }
`

export const allProductsQuery = groq`
  *[_type == "product"] | order(name asc) {
    _id, name, slug, shortDescription, mainImage,
    category->{ name, slug }, customOrderAvailable
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id, name, slug, shortDescription, description,
    mainImage, gallery, ingredients, shelfLife,
    storageInfo, customOrderAvailable,
    category->{ name, slug },
    seoTitle, seoDescription
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ name, role, photo }
  }
`

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ name, role, photo }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, body, mainImage, publishedAt, readTime,
    author->{ name, role, photo },
    seoTitle, seoDescription
  }
`

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id, name, logo, issuedBy, licenseNumber
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id, name, slug, description
  }
`
```

---

## Step 5 — Environment variables

Create `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=chefsbasellp@outlook.com
```

Add `.env.local` to `.gitignore` immediately.

---

## Step 6 — TypeScript types

### `types/index.ts`
```ts
export interface Product {
  _id: string
  name: string
  slug: { current: string }
  shortDescription: string
  mainImage: any
  category: { name: string; slug: { current: string } }
  description?: any[]
  ingredients?: string[]
  shelfLife?: string
  storageInfo?: string
  customOrderAvailable: boolean
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage: any
  readTime?: number
  author?: { name: string; role: string; photo?: any }
  body?: any[]
  seoTitle?: string
  seoDescription?: string
}

export interface Certification {
  _id: string
  name: string
  logo: any
  issuedBy?: string
  licenseNumber?: string
}

export interface SiteSettings {
  siteName: string
  logo: any
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  address?: string
  gstNumber?: string
  fssaiNumber?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  defaultSeoTitle?: string
  defaultSeoDescription?: string
  defaultOgImage?: any
}
```

---

## Step 7 — What to build next (in order)

After all the above is scaffolded and verified (`sanity dev` shows Studio, `npm run dev` shows Next.js):

1. **Navbar** — logo from SiteSettings, nav links, WhatsApp + "Get a quote" CTA buttons
2. **Footer** — logo, nav, contact info pulled from SiteSettings
3. **WhatsAppButton** — sticky float, phone number from SiteSettings
4. **Homepage** — build all 9 sections using the homepage wireframe
5. **Products catalog page** — grid with category filter
6. **Product detail page** — full layout with inquiry CTA
7. **Blog listing page**
8. **Blog post page** — render Portable Text body
9. **Contact page** — RFQ form + WhatsApp, form posts to `/api/contact`
10. **About page** — story + certifications section
11. **Technology page** — static content, retort process steps
12. **Custom orders page** — static, links to contact
13. **404 page**
14. **`/api/contact` route** — validate form, send email via Resend

---

## Design rules for all components

- Background: `bg-cream` or `bg-charcoal` sections alternating
- Headings: `font-serif` (Playfair Display), `text-charcoal` or `text-cream`
- Gold accent (`text-gold`, `border-gold`) used sparingly — dividers, CTAs, hover states
- Body text: `font-sans` (Inter)
- No rounded corners larger than `rounded-xl` — keep it refined, not bubbly
- Buttons: two variants only
  - Primary: `bg-charcoal text-cream hover:bg-charcoal/90`
  - Secondary/outline: `border border-gold text-gold hover:bg-gold hover:text-charcoal`
- All images through `urlForImage()` from `sanity/lib/image.ts`
- All data fetching server-side using `client.fetch()` — no client-side fetching except the contact form

---

## Important notes for Claude Code

- Do NOT use `use client` unless absolutely necessary (interactive form, WhatsApp button). Keep everything server components.
- Use `generateStaticParams` on `[slug]` routes for static generation at build time.
- Use `generateMetadata` on every page for proper SEO using Sanity data.
- The Sanity Studio route (`/studio`) must be excluded from the site layout — it has its own layout.
- Keep the Tailwind config custom colors exactly as specified — do not substitute generic Tailwind colors.
- Install `@tailwindcss/typography` for the blog post body (Portable Text rendering).
- Use `next/image` for all images with proper `width`, `height`, and `alt` props.