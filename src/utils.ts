import { BASE_API_URL } from './constants'

interface IFetchOptions {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  path: string
  json?: object
  formData?: FormData
  token?: string
}

export const myFetch = async ({ method = 'GET', path, json, formData, token }: IFetchOptions) => {
  let headers = new Headers()
  let body: BodyInit | undefined = undefined

  if (json) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(json)
  } else if (formData) {
    body = formData
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  try {
    const response = await fetch(BASE_API_URL + path, {
      method,
      headers,
      body
    })

    if (!response.ok) {
      let errorMessage = 'Unknown error occurred.'
      if (response.status > 400 && response.status < 500) {
        errorMessage = 'Bad Request: Invalid input or missing parameters.'
      } else if (response.status > 500) {
        errorMessage = 'Internal Server Error: Something went wrong on the server.'
      }
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    return 'An unexpected error occurred. Please try again later.'
  }
}
