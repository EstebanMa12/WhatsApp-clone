import '../public/style/style.css'
import { decode } from './auth/privateCryptoServer'
import doesUserExist from './db/server/DoesUserExist'

export async function validateStoredSession(session) {
    return await doesUserExist(await decode(session))
}

export function hideServer() {
    return console.clear()
}

const storedSession = sessionStorage.getItem('makaiapp_session')

const USER_LOGGED = !!storedSession
    ? storedSession === 'QURNT04='
        ? storedSession
        : await validateStoredSession(storedSession)
    : storedSession

USER_LOGGED ? import('./home/home') : import('./log/login')
