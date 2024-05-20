import createServerContext from "@/lib/server-context";
import {LocalizationContextType} from "@/lib/contexts";

export const getLocalizationContext = createServerContext<LocalizationContextType>();
