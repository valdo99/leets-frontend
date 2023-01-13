import { useLingui } from "@lingui/react";

export const useFormatNumber = (): { format(number: number): string } => {
  const { i18n } = useLingui();

  const format = (n: number) => {
    let formatter = Intl.NumberFormat(i18n.locale, { notation: "compact" });

    return formatter.format(n);
  };

  return { format };
};
