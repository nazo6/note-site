function toDateStr(date: Date) {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function ArticleTimeInfo({
  updated,
  created,
}: {
  updated: Date;
  created: Date;
}) {
  return (
    <div className="mb-2 mt-4 inline-flex gap-2 rounded-md bg-gray-300 px-2 text-sm dark:bg-gray-700">
      <p>作成:{toDateStr(created)}</p>
      <p>更新:{toDateStr(updated)}</p>
    </div>
  );
}
