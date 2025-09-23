import type { StructureResolver } from "@/sanity/deskStructure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("startup").title("Startups"),
    ]);
