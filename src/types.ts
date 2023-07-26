import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface TranslateState {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export interface TranslateRequestBody {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export type TAction =
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'INTERCHANGE_LANGUAGES' }

export enum SectionType {
  From = 'from',
  To = 'to'
}
