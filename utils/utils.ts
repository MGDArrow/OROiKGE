export function formatLabelNumber(number: string | undefined) {
  if (!number) return '';
  return `${number.slice(0, 3)}-${number.slice(3, 6)}`;
}
