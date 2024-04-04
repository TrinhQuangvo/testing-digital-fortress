import "server-only"
import type { Locale } from "./i18n.config"

const dictionaries = {
  en: () =>
    import("./app/dictionaries/en.json").then((module) => module.default),
  vn: () =>
    import("./app/dictionaries/vn.json").then((module) => module.default),
}
export const getDictionary = (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.vn()
