import '../public/style/style.css'
import { decode } from './auth/privateCryptoServer'
import doesUserExist from './db/server/DoesUserExist'
import isTrustedDevice from './db/server/isTrustedDevice'

console.log('HELLO FROM MAIN.JS')

const TRUSTED_DEVICE = await isTrustedDevice()

const storedSession = sessionStorage.getItem('makaiapp-session')
const USER_LOGGED =
    storedSession === 'ADMON'
        ? storedSession
        : await doesUserExist(await decode(storedSession))

TRUSTED_DEVICE || USER_LOGGED ? import('./home/home') : import('./log/login')
