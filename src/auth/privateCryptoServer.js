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

export async function decode(doodle) {
    if (!doodle || /^[0-9]+$/.test(doodle)) return null

    try {
        const response = await api.get(decoder + doodle)
        return response.data.decodedNumbers
    } catch (error) {
        import('../main').then(helpMeTo => helpMeTo.hideServer())
        return null
    }
}
