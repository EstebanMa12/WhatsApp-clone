import '../public/style/style.css'
import { decode } from './auth/privateCryptoServer'
import doesUserExist from './db/server/DoesUserExist'
import isTrustedDevice from './db/server/isTrustedDevice'

console.log('HELLO FROM MAIN.JS')

const storedSession = sessionStorage.getItem('makaiapp-session')
console.log(storedSession)
const TRUSTED_DEVICE = await isTrustedDevice()
const USER_LOGGED =
    storedSession === 'ADMON'
        ? storedSession
        : await doesUserExist(await decode(storedSession))

TRUSTED_DEVICE || USER_LOGGED ? import('./home') : import('./log/login')
