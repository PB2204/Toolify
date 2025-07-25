export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

export function toSentenceCase(str: string): string {
    const lower = str.toLowerCase();
    return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}
