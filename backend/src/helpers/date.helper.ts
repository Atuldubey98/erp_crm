export const parseDate = (date: string) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return new Date(Date.now());
    }
    return parsedDate;
  } catch (error) {
    return new Date(Date.now());
  }
};
