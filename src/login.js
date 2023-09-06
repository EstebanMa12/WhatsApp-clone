import LoginTemplate from '../public/templates/Login.html'
import SignUpTemplate from '../public/templates/Sign_up.html'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML = LoginTemplate

document.querySelector('.signup').onclick = () => {
    root.innerHTML = SignUpTemplate
    document.querySelector(".signup-form__button").onclick =() =>
        root.innerHTML = LoginTemplate
}

document.querySelector('button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}