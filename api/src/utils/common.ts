/**
 * Set start date to the beginning of the day
 * @param date
 * @returns date
 */
export const setStartDay = (date: string | Date) => {
  const _date = new Date(date);
  _date.setHours(0, 0, 0, 0);

  return _date;
};

/**
 * Set end date to the end of the day
 * @param date
 * @returns date
 */
export const setEndDay = (date: string | Date) => {
  const _date = new Date(date);
  _date.setHours(23, 59, 59, 999);

  return _date;
};
