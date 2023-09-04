// import Styles from 'styles.css'
// const root = document.querySelector('#root')
// document.head.appendChild(Styles)
import LoginTemplate from '../public/templates/Login.html'
import SignUpTemplate from '../public/templates/Sign_up.html'

document.querySelector('#root').innerHTML = LoginTemplate
document.querySelector(".signup").onclick =() => {
    document.querySelector('#root').innerHTML = SignUpTemplate
    document.querySelector(".signup-form__button").onclick =() => {
        document.querySelector('#root').innerHTML = LoginTemplate
    }
}

console.log('HELLO FROM LOGIN')

document.querySelector('button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}