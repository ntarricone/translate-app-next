import { TranslateRequestBody } from '@/types'
import { myFetch } from '@/utils'

export const translation = {
  post: async (body: TranslateRequestBody): Promise<string> => {
    try {
      const response = (await myFetch({
        path: 'api/chat-gpt',
        method: 'POST',
        json: body
      })) as { translatedText: string; error?: string }

      if (response.translatedText) return response.translatedText

      return response.error || 'Error: An unexpected error occurred'
    } catch (error) {
      return 'Error: An unexpected error occurred'
    }
  }
}
