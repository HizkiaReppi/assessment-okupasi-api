export function calculatePercentage(
    value: number,
    total: number,
): string {
  const percentage = (value / total) * 100;

  return percentage.toString() + '%';
}
