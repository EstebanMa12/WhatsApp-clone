import HomeTemplate from '../public/templates/Home.html'
import HomeWelcomeTemplate from '../public/templates/Home_Welcome.html'
import HomeTrustedDeviceTemplate from '../public/templates/Home_Trusted_Device.html'
import { User } from './log/User'


console.log('HELLO FROM HOME.JS')

root.innerHTML = HomeTemplate
root.innerHTML += HomeTrustedDeviceTemplate


document.querySelector('.unregister-button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', false)
    window.location.href = '/'
}

const change_profile = document.querySelector(".container_profile")
const headerImg = document.querySelector(".chats__header__img")
const chats = document.querySelector(".chats")

headerImg.onclick = () =>{
    console.log("Se hizo click")
    change_profile.style.display = "flex"
    chats.style.display = "none"
}