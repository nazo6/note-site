export type PageMeta = {
  og?:
    | {
        type: "top";
      }
    | {
        type: "article";
        image?: OgImageOptions;
      };
  title: string;
  literalTitle?: boolean;
  description?: string;
  path: string[];
  index?: boolean;
  created?: Date;
  updated?: Date;
  canonical?: string;
};

export type OgImageOptions = {
  title: string;
  /// If omitted, `title` is used.
  display?: string;
  category: "memo" | "blog" | string;
  tags: string[][];
  index?: boolean;
};
