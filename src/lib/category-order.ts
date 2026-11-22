export function orderCategories(categories: string[]): string[] {
  const rank = (value: string) => ({ "термо": 0, "зима": 1 }[value.normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase()] ?? 2);
  return [...categories].sort((a, b) => rank(a) - rank(b));
}
