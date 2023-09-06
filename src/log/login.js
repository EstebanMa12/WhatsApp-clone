import LoginTemplate from '../../public/templates/Login.html'
// import SignUpTemplate from '../public/templates/Sign_up.html'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML         = LoginTemplate
const phoneNumberInput = document.querySelector('input')  
const connectButton    = document.querySelector('button')

connectButton.onclick = event => handleConnectionAttempt(event)

function handleConnectionAttempt(event) {
    if (phoneNumberInput.value.length < 10) return event.preventDefault()
    createSession()
}

// This function creates a session when
// user already exists or admin connects
function createSession() {
    localStorage.setItem('MAKAIAPP_session', true)
    window.location.href = '/'
}


// if running on a localserver, dev environment
// or any environment different to production,
// render a "Connect as an Admin" button
// to skip authentication logic 
if (devENV) {
    const button = document.createElement('button')
    
    button.innerText = 'Connect as an Admin'
    button.style.backgroundColor = 'purple'
    button.onclick = createSession    

    connectButton.parentElement.appendChild(button)
}