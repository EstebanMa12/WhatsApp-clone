import LoginTemplate from '../../public/templates/Login.html'
import queryDBToAuthenticate from '../db/server/RegisterUser'
import authPhoneWithSMSThroughFirebase from '../auth/firebaseSMSAuth'
import { encode } from '../auth/privateCryptoServer'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML = LoginTemplate
const phoneNumberInput = document.querySelector('input')
const connectButton = document.querySelector('button')
const loginForm = document.querySelector('form')

loginForm.onsubmit = event => handleConnectionAttempt(event)

async function handleConnectionAttempt(event) {
    event.preventDefault()

    if (phoneNumberInput.value.length < 10) return

    // Gather given phone number by client on the form
    const formData = new FormData(loginForm)
    const phoneNumber = formData.get('phone')

    // Evaluate whether phone number is already verified on system
    const User = await queryDBToAuthenticate(phoneNumber)
    if (await User.verified) return createSession(phoneNumber)

    // if user not verified,
    // if user have not generated a SMS Firebase code, generate itfirebase
    if (!(await User.code?.date)) return //authPhoneWithSMSThroughFirebase(phoneNumber)

    // if user already generated a code in db, test it
    const userCodeDate = await User.code.date
    const actualDate = new Date()
    const actualDateToMilliSeconds = actualDate.getDate()

    const dailyCodeExpired = 1_000 * 60 * 60
    const CODE_DATE_FROM_MILLISECONDS_TO_HOURS =
        (actualDateToMilliSeconds - userCodeDate) / dailyCodeExpired

    // if code is older than one day, generate brand new Firebase SMS code
    if (CODE_DATE_FROM_MILLISECONDS_TO_HOURS >= 24) return //authPhoneWithSMSThroughFirebase(phoneNumber)

    // else, compare inputted code with saved code to validate user
    document.querySelector('form').onsubmit = async function (event) {
        event.preventDefault()

        const codeProvidedByUser = new FormData(this).get('code')
        const validCode = await User.code.value

        if (codeProvidedByUser == validCode)
            return await verifyUser(phoneNumber)

        const input = document.querySelector('input')
        const error = document.createElement('label')

        input.value = ''
        error.innerText = 'Invalid code!'
        error.style.color = 'red'
        input.appendChild(error)
    }
}

// This function creates a session when
// user already exists or admin connects
export async function createSession(phoneNumber) {
    const sessionKey =
        phoneNumber === 'ADMON' ? 'ADMON' : await encode(phoneNumber)
    sessionStorage.setItem('makaiapp_session', sessionKey)
    window.location.href = '/'
}
// if running on a localserver, dev environment
// or any environment different to production,
// render a "Connect as an Admin" button
// to skip authentication logic test
if (devENV) {
    const button = document.createElement('button')

    button.innerText = 'Connect as an Admin'
    button.style.backgroundColor = 'purple'
    button.onclick = () => createSession('ADMON')

    connectButton.parentElement.appendChild(button)
}
