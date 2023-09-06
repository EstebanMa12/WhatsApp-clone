import HomeTemplate from '../public/templates/Home.html'

console.log('HELLO FROM HOME.JS')

root.innerHTML = HomeTemplate

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