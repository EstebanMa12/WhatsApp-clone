import LoginTemplate from '../../public/templates/Login.html'
import queryDBToAuthenticate from '../db/server/DoesUserExist'
import authPhoneWithSMSThroughFirebase from '../auth/firebaseSMSAuth'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML         = LoginTemplate
const phoneNumberInput = document.querySelector('input')  
const connectButton    = document.querySelector('button')
const loginForm        = document.querySelector('form')

loginForm.onsubmit = event => handleConnectionAttempt(event)

async function handleConnectionAttempt(event) {
    event.preventDefault()

    if (phoneNumberInput.value.length < 10) return 

    // Gather given phone number by client on the form
    const formData = new FormData(loginForm)
    const phoneNumber = formData.get('phone')

    // Evaluate whether phone number is already verified on system
    const User = await queryDBToAuthenticate(phoneNumber)
    if (await User.verified) return createSession(User)
    authPhoneWithSMSThroughFirebase(phoneNumber)
}

// This function creates a session when
// user already exists or admin connects
export async function createSession(User) {
    import('./User').then(mod => {mod.User.set(User)})
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
    button.onclick = () => import('../home')

    connectButton.parentElement.appendChild(button)
}