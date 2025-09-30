// Таймстамп дати без часу (сьогодні 00:00 за локальним часом сервера)
export const getDateStamp = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return String(d.getTime());
};