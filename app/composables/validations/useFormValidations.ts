export const useFormValidations = () => {
  const required = (value: unknown) => {
    return !!value;
  };

  const minTextLength = (value: unknown, minValue = 1) => {
    return typeof value === "string" && value.length >= minValue;
  };

  const minWords = (value: unknown, minValue = 1) => {
    if (typeof value !== "string") return false;

    return value.trim().split(/\s+/).length >= minValue;
  };

  return {
    required,
    minTextLength,
    minWords,
  };
};
