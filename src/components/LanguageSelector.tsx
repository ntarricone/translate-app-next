import type { ChangeEvent, FC } from 'react'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language, SectionType } from '../types'

type TProps =
  | { type: SectionType.From; value: FromLanguage; onChange: (language: FromLanguage) => void }
  | { type: SectionType.To; value: Language; onChange: (language: Language) => void }

export const LanguageSelector: FC<TProps> = ({ onChange, type, value }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <select className="rounded p-1" aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </select>
  )
}
