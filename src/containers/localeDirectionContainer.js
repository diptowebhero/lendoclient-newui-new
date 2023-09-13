import { useState } from "react";
import { createContainer } from "unstated-next";
import { getLocale } from "@helpers/getters/getLocale";

const initialState = getLocale();
function useLocaleDirection() {
    let [locale, setLocale] = useState(initialState || null);
    let set = (auth) => setLocale(auth);
    return { locale, set };
}
let LocaleDirectionContainer = createContainer(useLocaleDirection);
export default LocaleDirectionContainer;
