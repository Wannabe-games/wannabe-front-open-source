export const formatBalance = (amount: number) =>
    new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(amount);
