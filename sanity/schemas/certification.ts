import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Certification name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo / badge image", type: "image", validation: (r) => r.required() }),
    defineField({ name: "issuedBy", title: "Issued by", type: "string" }),
    defineField({ name: "licenseNumber", title: "License / registration number", type: "string" }),
    defineField({ name: "validUntil", title: "Valid until", type: "date" }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers appear first" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
