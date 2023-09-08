import '../public/style/style.css'
import isTrustedDevice from './db/server/isTrustedDevice'
import { User } from './log/User'


console.log('HELLO FROM MAIN.JS')


const TRUSTED_DEVICE = await isTrustedDevice()
const USER_LOGGED = !!User.get()
console.log(USER_LOGGED)
TRUSTED_DEVICE || USER_LOGGED 
    ? import('./home')
    : import('./log/login')