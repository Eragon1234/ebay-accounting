import {cache} from "react";
import {getDictionary} from "@/translation/dictionaries";
import {LocalizationContextType} from "@/lib/contexts";

export const getLocalizationContext = cache<() => LocalizationContextType>(() => {
    return {
        locale: "en",
        dict: getDictionary("en")
    }
});
