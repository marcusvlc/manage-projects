import { computed, unref, type MaybeRef } from "vue";

import type { ButtonVariant } from "~/types/button/button-types";

export const useButtonColors = (
  variant: MaybeRef<ButtonVariant>,
  active: MaybeRef<boolean> = false,
) => {
  const bgColor = computed(() => {
    const colors: Record<ButtonVariant, string> = {
      primary: unref(active) ? "#462699" : "#695CCD",
      secondary: unref(active) ? "#695CCD" : "#FFFFFF",
    };

    return colors[unref(variant)];
  });

  const textColor = computed(() => {
    const colors: Record<ButtonVariant, string> = {
      secondary: unref(active) ? "#FFFFFF" : "#695CCD",
      primary: "#FFFFFF",
    };

    return colors[unref(variant)];
  });

  const borderColor = computed(() => {
    const colors: Record<ButtonVariant, string> = {
      secondary: "#695CCD",
      primary: "#FFFFFF",
    };

    return colors[unref(variant)];
  });

  return {
    bgColor,
    textColor,
    borderColor,
  };
};
