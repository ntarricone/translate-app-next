import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Translator } from '@/components/Translator'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

test('My App works as expected', async () => {
  const textToTranslate = 'Hola mundo'
  const translatedText = 'Hello world'

  render(<Translator />)

  const textareaFrom = await screen.findByPlaceholderText('Introducir Texto')

  await waitFor(async () => {
    userEvent.type(textareaFrom, textToTranslate)

    fetchMock.mockResponseOnce(JSON.stringify({ translatedText }))
  })

  const result = await screen.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })
  expect(result).toBeTruthy()
})
