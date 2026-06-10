import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  description:
    "Write in first person. Share one concrete lesson. Keep it scannable (300–800 words).",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Used on cards and meta description.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Describe the image for screen readers and SEO.",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption shown below the image.",
            }),
            defineField({
              name: "ratio",
              type: "string",
              title: "Aspect ratio",
              description:
                "How the image should be framed. Auto preserves the original aspect ratio.",
              options: {
                list: [
                  { title: "Wide (16:9)", value: "wide" },
                  { title: "Tall (4:5)", value: "tall" },
                  { title: "Square (1:1)", value: "square" },
                  { title: "Auto (original)", value: "auto" },
                ],
                layout: "radio",
              },
              initialValue: "wide",
            }),
            defineField({
              name: "frame",
              type: "string",
              title: "Frame style",
              description:
                "Photo = soft card. Screenshot = paper-card with browser chrome (use for app screenshots).",
              options: {
                list: [
                  { title: "Photo", value: "photo" },
                  { title: "Screenshot", value: "screenshot" },
                ],
                layout: "radio",
              },
              initialValue: "photo",
            }),
          ],
          preview: {
            select: {
              imageUrl: "asset.url",
              title: "caption",
              subtitle: "alt",
              media: "asset",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || subtitle || "Image",
                subtitle: title && subtitle ? subtitle : undefined,
                media,
              };
            },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "code",
          title: "Code block",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  "typescript",
                  "javascript",
                  "bash",
                  "json",
                  "html",
                  "css",
                  "text",
                ],
              },
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Pin to the top of the blog index.",
    }),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `by ${author}` : undefined,
        media,
      };
    },
  },
});
