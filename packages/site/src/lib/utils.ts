export function getTitleFromPath(path: string[]) {
  if (path.length === 0) {
    throw Error("Invalid path");
  }
  return path[path.length - 1];
}

export function decodePath(path: string[]) {
  return path.map(decodeURIComponent);
}
