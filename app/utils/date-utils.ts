export const parseDateOnly = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return new Date(NaN);
  }

  return new Date(year, month - 1, day);
};
