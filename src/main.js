import '../public/style/style.css'
import { decode } from './auth/privateCryptoServer'
import doesUserExist from './db/server/DoesUserExist'

console.log('HELLO FROM MAIN.JS')

export async function validateStoredSession(session) {
    return await doesUserExist(await decode(session))
}

const storedSession = sessionStorage.getItem('makaiapp_session')

const USER_LOGGED = !!storedSession
    ? storedSession === 'ADMON'
        ? storedSession
        : await validateStoredSession(storedSession)
    : storedSession

USER_LOGGED ? import('./home/home') : import('./log/login')
