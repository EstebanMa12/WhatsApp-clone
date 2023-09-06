import LoginTemplate from '../public/templates/Login.html'
import SignUpTemplate from '../public/templates/Sign_up.html'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML = LoginTemplate
const connectButton = document.querySelector('button')

connectButton.onclick = handleConnectionAttempt

function handleConnectionAttempt() {
    
}

// This function creates a session when
// user already exists or admin connects
function createSession() {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}

if (devENV) {
    const button = document.createElement('button')
    
    button.innerText = 'Connect as an Admin'
    button.style.backgroundColor = 'purple'
    button.onclick = createSession    

    connectButton.parentElement.appendChild(button)
}