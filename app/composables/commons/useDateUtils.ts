export const useDateUtils = () => {
  const humanizeDate = (date: Date) => {
    console.log("date", date);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/ de /g, " de ");
  };

  return {
    humanizeDate,
  };
};
