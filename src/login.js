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
    const div = document.createElement('div')

    div.appendChild(input)
    div.appendChild(label)
    form.appendChild(div)

    input.type = 'checkbox'
    input.id = 'admin_check'
    input.style.width = '10%'
    
    label.htmlFor = 'admin_check'
    label.innerText = 'Connect as an Admin'
    label.style.fontSize = '16px'

    connectButton.parentElement.appendChild(form)
}