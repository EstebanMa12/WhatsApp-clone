// import Styles from 'styles.css'
// const root = document.querySelector('#root')
// document.head.appendChild(Styles)
import LoginTemplate from '../public/templates/Login.html'

document.querySelector('#root').innerHTML = LoginTemplate

console.log('HELLO FROM LOGIN')

document.querySelector('button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}