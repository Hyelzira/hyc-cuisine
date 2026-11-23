export function generateOrderRef(): string {
  const year = new Date().getFullYear();
  // Generates a random 4-digit number between 1000 and 9999
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HYC-${year}-${random}`;
}