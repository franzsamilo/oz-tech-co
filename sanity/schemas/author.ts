import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "1–2 sentences, conversational tone.",
    }),
    defineField({
      name: "motto",
      title: "Motto",
      type: "string",
      description: "Optional pull-quote shown on posts.",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description:
        "Personal links (portfolio, LinkedIn, GitHub, etc.). Shown on the author page and used for SEO (sameAs / rel=me).",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Portfolio, LinkedIn, GitHub",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
