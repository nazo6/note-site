import { matter } from "vfile-matter";

export default function remarkExtractFrontmatter() {
  return (_tree: any, file: any) => {
    matter(file);
  };
}
