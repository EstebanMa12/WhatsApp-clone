import LoginTemplate from '../public/templates/Login.html'
import SignUpTemplate from '../public/templates/Sign_up.html'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML = LoginTemplate
const connectButton = document.querySelector('button')

connectButton.onclick = () => {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}

if (devENV) {
    const form  = document.createElement('form')
    const input = document.createElement('input')
    const label = document.createElement('label')
    
    form.appendChild(input)
    form.appendChild(label)
    input.type = 'checkbox'
    label.innerText = 'Connect as an Admin'

    connectButton.parentElement.appendChild(form)
}