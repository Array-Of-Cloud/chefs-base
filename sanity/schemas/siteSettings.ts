import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton — create/delete/duplicate actions are restricted in
  // sanity.config.ts's document.actions resolver, not on the schema itself.
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", description: "Short brand line shown in the footer, e.g. under the wordmark." }),
    defineField({ name: "logo", title: "Logo", type: "image", description: "Optional — falls back to a text wordmark if left empty." }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string", validation: (r) => r.required() }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string", description: "Include country code, no spaces. e.g. +918137060637", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "gstNumber", title: "GST number", type: "string" }),
    defineField({ name: "fssaiNumber", title: "FSSAI license number", type: "string" }),
    defineField({
      name: "colorScheme",
      title: "Color scheme",
      type: "string",
      description: "Choose the site-wide color scheme. Changes take effect on next publish.",
      initialValue: "malabar-night",
      options: {
        list: [
          { title: "Malabar Night — Charcoal & Gold (default)", value: "malabar-night" },
          { title: "Spice Garden — Forest Green & Gold", value: "spice-garden" },
          { title: "Chilli & Ivory — Deep Red & Gold", value: "chilli-ivory" },
          { title: "Colonial Blue — Navy & Gold", value: "colonial-blue" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string", group: "seo" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "string", group: "seo" }),
    defineField({ name: "defaultOgImage", title: "Default OG image", type: "image", group: "seo" }),
  ],
  groups: [{ name: "seo", title: "SEO & social" }],
});
