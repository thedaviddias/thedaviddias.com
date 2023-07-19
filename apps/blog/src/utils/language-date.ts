import { Locale } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

export const convertLangDateFs = (lang: string): Locale => {
  if (lang === 'en') {
    return enUS
  } else {
    return fr
  }
}
