export const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    de: () => import('./dictionaries/de.json').then((module) => module.default)
}

export type Locales = keyof typeof dictionaries;

export const getDictionary = async (locale: Locales) => dictionaries[locale]();