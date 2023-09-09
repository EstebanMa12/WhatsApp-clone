import { encoder, decoder } from './privateEndPoints'
import axios from 'axios'

// Encode numbers to letters
export async function encode(phoneNumber) {
    if (!phoneNumber) return

    phoneNumber = phoneNumber.replace(/\D/g, '')

    try {
        const response = await axios.get(encoder + phoneNumber)
        return response.data.encodedLetters
    } catch (error) {
        console.error('Error encoding:', error.message)
    }
}

// Decode letters to numbers
const api = axios.create({
    baseURL: decoder,
})

export async function decode(doodle) {
    if (!doodle) return null

    api.interceptors.request.use(
        config => config,
        error => Promise.reject(error)
    )

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response) {
                const sanitizedError = { ...error }

                sanitizedError.config.url = '*** CENSORED URL ***'
                return Promise.reject(sanitizedError)
            } else if (error.request) {
                const sanitizedError = { ...error }
                sanitizedError.request._currentUrl = '*** CENSORED URL ***'
                return Promise.reject(sanitizedError)
            } else {
                return Promise.reject(error)
            }
        }
    )

    try {
        const response = await api.get(decoder + doodle, {
            validateStatus: () => true,
        })

        return response.data.decodedNumbers
    } catch (error) {
        return null
    }
}
