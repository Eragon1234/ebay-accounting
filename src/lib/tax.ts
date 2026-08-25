export async function calculateVat(
  taxableIncome: number,
  paidVat: number,
): Promise<number> {
  const taxToBePaid = taxableIncome - taxableIncome / 1.19;

  return taxToBePaid - paidVat;
}

export async function calculateTaxableIncome(
  income: number,
  differentialIncome: number,
) {
  return income - differentialIncome;
}
