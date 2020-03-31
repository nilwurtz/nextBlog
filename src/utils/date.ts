export const dateFormat = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = ("00" + String(date.getMonth())).slice(-2);
  const day = ("00" + String(date.getDate())).slice(-2);
  return `${year}-${month}-${day}`;
};
