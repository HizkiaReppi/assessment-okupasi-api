export function calculatePercentage(
    value: number,
    total: number,
): string {
  if (!value || !total) {
    return '0%';
  }

  const percentage = (value / total) * 100;

  return percentage.toString() + '%';
}
