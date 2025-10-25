import en from "@/translation/dictionaries/en";
import de from "@/translation/dictionaries/de";

const dictionaries = {
    en,
    de
}

export const defaultLocale: Locales = "de";

export type Locales = keyof typeof dictionaries;

export type Dict = typeof dictionaries[Locales];

export function getDictionary(locale: Locales): Dict {
    return dictionaries[locale];
}

export function isValidLocale(lang: string) {
    return lang in dictionaries;
}

/**
 * Retrieves the locale for the given language string.
 *
 * @param {string} lang - The language string to determine the locale for.
 * @return {Locales} The matching locale if valid, otherwise the default locale.
 */
export function getLocale(lang: string): Locales {
    if (!isValidLocale(lang)) {
        return defaultLocale;
    }
    return lang as Locales;
}

export type Localization = {
    dict: Dict,
    locale: Locales
}

export function getLocalization(lang: string): Localization {
    const locale = getLocale(lang);
    const dict = getDictionary(locale);
    return {dict, locale};
}