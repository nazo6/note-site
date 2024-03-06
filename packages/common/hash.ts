import { md5 as md5orig } from "js-md5";

export function md5(str: string) {
  return md5orig(str);
}
