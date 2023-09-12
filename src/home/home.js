import HomeTemplate from '../../public/templates/Home.html'
import HomeProfileTemplate from '../../public/templates/Home_Welcome.html'
import HomeTrustedDeviceTemplate from '../../public/templates/Home_Trusted_Device.html'
import { validateStoredSession } from '../main'
import { setVisibile } from './modals/fill out profile/modal.fillout_profile'

root.innerHTML = HomeTemplate

//* get session from sessionStorage, if any
const storedSession = sessionStorage.getItem('makaiapp_session')
const User = await validateStoredSession(storedSession)

// swap user's connected to true

// If not a trusted device, prompt "is a trusted device" modal
if (!User.trusted_devices.includes(navigator.userAgent)) {
    import('./modals/modals').then(modals =>
        modals.trustOrNotTrust(User.id, navigator.userAgent)
    )
    root.innerHTML += HomeTrustedDeviceTemplate
}

if (!User.profile?.name) {
    import('./modals/modals').then(modals => modals.fillOutProfile(User.id))
    root.innerHTML += HomeProfileTemplate
}

// UN-REGISTER BUTTON
document.querySelector('.unregister-button').onclick = () => {
    sessionStorage.clear()
    window.location.href = '/'
}


const headerImg = document.querySelector('.chats__header__img')

headerImg.onclick = () => setVisibile(true)