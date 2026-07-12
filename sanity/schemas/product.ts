import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (r) => r.required() }),
    defineField({ name: "mainImage", title: "Main image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })], validation: (r) => r.required() }),
    defineField({ name: "gallery", title: "Image gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "shortDescription", title: "Short description", type: "string", description: "Used on product cards. Max 120 chars.", validation: (r) => r.required().max(120) }),
    defineField({ name: "description", title: "Full description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "preparationSteps",
      title: "How to prepare",
      type: "array",
      of: [{ type: "block" }],
      description: "Cooking/preparation instructions for restaurant kitchen staff (ingredients to add, steps, timing).",
    }),
    defineField({ name: "ingredients", title: "Ingredients", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "shelfLife", title: "Shelf life", type: "string", description: "e.g. 24 months at room temperature" }),
    defineField({ name: "storageInfo", title: "Storage instructions", type: "string" }),
    defineField({ name: "customOrderAvailable", title: "Custom order available", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "string", group: "seo" }),
  ],
  groups: [{ name: "seo", title: "SEO" }],
  orderings: [{ title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] }],
});
