import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  // Singleton — create/delete/duplicate actions are restricted in
  // sanity.config.ts's document.actions resolver, not on the schema itself.
  fields: [
    defineField({ name: "storyParagraph1", title: "Story — paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "storyParagraph2", title: "Story — paragraph 2", type: "text", rows: 4 }),
    defineField({ name: "missionText", title: "Mission", type: "text", rows: 4 }),
    defineField({ name: "visionText", title: "Vision", type: "text", rows: 4 }),
  ],
});
