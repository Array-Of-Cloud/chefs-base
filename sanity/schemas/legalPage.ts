import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "Fixed values expected: privacy-policy, terms-and-conditions, cookie-policy.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lastUpdated", title: "Last updated", type: "date", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }], validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "lastUpdated" },
  },
});
