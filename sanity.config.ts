import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Field Notes")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Authors")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
    ]);

export default defineConfig({
  name: "oz-tech-field-notes",
  title: "OZ Tech — Field Notes",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool({ structure }), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
