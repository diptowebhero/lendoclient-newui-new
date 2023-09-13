import { siteLanguages } from "@src/consts";
export function getDirectionFromLocale(initialLocale) {
    const currentLocale = siteLanguages.filter(
        locale => locale.lang == initialLocale
    );
    return currentLocale[0].direction;
}
export function isRtl() {}
