export function capitalize(str: string): string {
  const firstLetter = str.charAt(0).toUpperCase();

  return `${firstLetter}${str.slice(1)}`;
}
