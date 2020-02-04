export const dateFormat = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = ("00" + (date.getMonth() + 1)).slice(-2);
  const day = ("00" + (date.getDay() + 1)).slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};
