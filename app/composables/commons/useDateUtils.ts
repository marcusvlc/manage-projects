import { parseDateOnly } from "~/utils/date-utils";

export const useDateUtils = () => {
  const humanizeDate = (date: Date | string) => {
    const parsedDate = typeof date === "string" ? parseDateOnly(date) : date;

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(parsedDate)
      .replace(/ de /g, " de ");
  };

  return {
    humanizeDate,
  };
};
