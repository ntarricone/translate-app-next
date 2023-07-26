import type { CSSProperties, ChangeEvent, FC, TextareaHTMLAttributes } from 'react'

type TextareaPropsWithoutOnChange = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface ITextareaProps extends TextareaPropsWithoutOnChange {
  onChange: (value: string) => void
  autofocus?: boolean
}

const commonStyles = { boder: 0, height: '200px' }

export const TextArea: FC<ITextareaProps> = ({
  placeholder,
  value,
  onChange,
  style,
  autofocus,
  disabled
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target.value)
  }

  return (
    <textarea
      className='rounded p-2 border-0 h-48'
      placeholder={placeholder}
      autoFocus={autofocus}
      disabled={disabled}
      style={{ ...style }}
      value={value}
      onChange={handleChange}
    />
  )
}
