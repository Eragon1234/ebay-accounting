"use client";

import {createContext} from "react";
import {Dict, getDictionary, Locales} from "@/translation/dictionaries";

export interface LocalizationContextType {
    locale: Locales,
    dict: Dict
}

export const LocalizationContext = createContext<LocalizationContextType>({
    locale: "en",
    dict: getDictionary("en")
});
