import en from "@/translation/dictionaries/en";
import de from "@/translation/dictionaries/de";

export const dictionaries = {
    en,
    de
}

export type Locales = keyof typeof dictionaries;

export type Dict = typeof dictionaries[Locales];

export function getDictionary(locale: Locales): Dict {
    return dictionaries[locale];
}

export type Localization = {
    dict: Dict,
    locale: Locales
}