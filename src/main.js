import '../public/style/style.css'

console.log('HELLO FROM MAIN.JS')
console.log(window.location.href)

const USER_LOGGED = JSON.parse(localStorage.getItem('MAKAIAPP_session'))

USER_LOGGED 
    ? import('./home')
    : import('./login')