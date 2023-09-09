import HomeTemplate from '../../public/templates/Home.html'
import HomeWelcomeTemplate from '../../public/templates/Home_Welcome.html'
import HomeTrustedDeviceTemplate from '../../public/templates/Home_Trusted_Device.html'
import doesUserExist from '../db/server/DoesUserExist'
import { decode } from '../auth/privateCryptoServer'
import findUserFromTrustedDevice from '../db/server/FindUserFromTrustedDevice'

console.log('HELLO FROM HOME.JS')
root.innerHTML = HomeTemplate

// get session from sessionStorage, if any
const storedSession = sessionStorage.getItem('makaiapp_session')

// if session does not exist, get user from trusted device
// if session exists, get user from it
const User = !storedSession
    ? await findUserFromTrustedDevice(navigator.userAgent)
    : await doesUserExist(await decode(storedSession))

console.log(User)
// swap user's connected to true

// If not a truste device, prompt "is a trusted device" modal

// UN-REGISTER BUTTON
document.querySelector('.unregister-button').onclick = () => {
    sessionStorage.clear()
    window.location.href = '/'
}

const change_profile = document.querySelector('.container_profile')
const headerImg = document.querySelector('.chats__header__img')
const chats = document.querySelector('.chats')

headerImg.onclick = () => {
    console.log('Se hizo click')
    change_profile.style.display = 'flex'
    chats.style.display = 'none'
}
