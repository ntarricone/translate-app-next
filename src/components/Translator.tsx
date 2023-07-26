//NOTE - Translator is it's own component to be able to run client code

'use client'

import { LanguageSelector } from './LanguageSelector'
import { TextArea } from './TextArea'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './Icons'
import { useEffect, useState } from 'react'

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '@/constants'
import { useTranslateStore } from '@/hooks/useTranslateStore'
import { useDebounce } from '@/hooks/useDebounce'
import { translation } from '@/services/translation'
import { SectionType } from '@/types'

export const Translator = () => {
  const [lastTranslatedText, setLastTranslatedText] = useState('')
  const [isInterchanging, setIsInterchanging] = useState(false)

  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    actions: { interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult }
  } = useTranslateStore()

  const { debouncedValue: debouncedFromText } = useDebounce<string>({ value: fromText })

  useEffect(() => {
    const textAlreadyTranslated = lastTranslatedText === debouncedFromText

    if (!debouncedFromText || (isInterchanging && textAlreadyTranslated)) return

    setLastTranslatedText(debouncedFromText)

    translation
      .post({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(res => setResult(res))
      .finally(() => setIsInterchanging(false))
  }, [debouncedFromText, toLanguage, fromLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = String(toLanguage)
    speechSynthesis.speak(utterance)
  }

  return (
    <div className='sm:flex'>
      <div className='flex flex-col gap-2'>
        <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
        <TextArea
          placeholder='Introducir Texto'
          value={fromText}
          onChange={setFromText}
          autofocus
          style={{ backgroundColor: '#f5f5f5' }}
        />
      </div>
      <div className='p-4 flex justify-center sm:items-start'>
        <button
          disabled={fromLanguage === AUTO_LANGUAGE}
          onClick={() => {
            setIsInterchanging(true)
            interchangeLanguages()
          }}
        >
          <ArrowsIcon />
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
        <div className='relative'>
          <TextArea
            placeholder={loading ? 'Cargando...' : 'Traducción'}
            value={result}
            onChange={setResult}
            disabled
          />
          {result && (
            <div className='flex absolute bottom-3 left-2 gap-3'>
              <button onClick={handleClipboard}>
                <ClipboardIcon />
              </button>
              <button onClick={handleSpeak}>
                <SpeakerIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
