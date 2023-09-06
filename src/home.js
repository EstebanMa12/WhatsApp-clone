import HomeTemplate from '../public/templates/Home.html'

document.querySelector('#root').innerHTML = HomeTemplate
document.querySelector('button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', false)
    window.location.href = '/'
}

console.log('HELLO FROM _HOME MODULE')
const change_profile = document.querySelector(".container_profile")
const headerImg = document.querySelector(".chats__header__img");
const chats = document.querySelector(".chats")

headerImg.onclick = () =>{
    console.log("Se hizo click");
    change_profile.style.display = "flex";
    chats.style.display = "none";
}
// document.body.innerText = 'WELCOME BACK, OLD USER!'
