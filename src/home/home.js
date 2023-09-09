import HomeTemplate from '../../public/templates/Home.html'
import HomeProfileTemplate from '../../public/templates/Home_Welcome.html'
import HomeTrustedDeviceTemplate from '../../public/templates/Home_Trusted_Device.html'
import { validateStoredSession } from '../main'

console.log('HELLO FROM HOME.JS')
root.innerHTML = HomeTemplate

// get session from sessionStorage, if any
const storedSession = sessionStorage.getItem('makaiapp_session')

const User = await validateStoredSession(storedSession)

console.log(User, 'FROM HOME WE ARRIVED WELL')
// swap user's connected to true

// If not a trusted device, prompt "is a trusted device" modal
if (!User.trusted_devices.includes(navigator.userAgent)) {
    import('./modals/modals').then(modals =>
        modals.trustOrNotTrust(User.id, navigator.userAgent)
    )
    root.innerHTML += HomeTrustedDeviceTemplate
}

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