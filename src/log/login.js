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
    authPhoneWithSMSThroughFirebase(phoneNumber)
}

// This function creates a session when
// user already exists or admin connects
export async function createSession(phoneNumber) {
    const sessionKey =
        phoneNumber === 'ADMON' ? 'ADMON' : await encode(phoneNumber)
    sessionStorage.setItem('makaiapp-session', sessionKey)
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
