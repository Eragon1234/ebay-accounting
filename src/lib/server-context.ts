import {cache} from "react";
import {getDictionary} from "@/translation/dictionaries";

export const getLocalizationContext = cache(() => {
    return {
        locale: "en",
        dict: getDictionary("en")
    }
});
