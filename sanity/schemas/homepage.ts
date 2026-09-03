import { defineField, defineType } from "sanity";

const reasonItem = defineField({
  name: "reason",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton — create/delete/duplicate actions are restricted in
  // sanity.config.ts's document.actions resolver, not on the schema itself.
  groups: [
    { name: "hero", title: "Hero" },
    { name: "trustBar", title: "Trust Bar" },
    { name: "whyUs", title: "Why Chefs Base" },
    { name: "whoWeServe", title: "Who We Serve" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryButtonLabel", title: "Primary button label", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryButtonLabel", title: "Secondary button label", type: "string", group: "hero" }),

    defineField({
      name: "trustStats",
      title: "Trust bar stats",
      description: "Exactly 4 items expected — each slot has a fixed icon in code, matched by order.",
      type: "array",
      group: "trustBar",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (r) => r.max(4),
    }),

    defineField({
      name: "whyUsReasons",
      title: "Reasons",
      type: "array",
      group: "whyUs",
      of: [reasonItem],
    }),

    defineField({ name: "whoWeServeIntro", title: "Intro text", type: "text", rows: 2, group: "whoWeServe" }),
    defineField({
      name: "whoWeServeSegments",
      title: "Segments",
      type: "array",
      group: "whoWeServe",
      of: [reasonItem],
    }),

    defineField({ name: "ctaHeadline", title: "Headline", type: "string", group: "cta" }),
    defineField({ name: "ctaSubtext", title: "Subtext", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaButtonLabel", title: "Button label", type: "string", group: "cta" }),
  ],
});
