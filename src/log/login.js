import LoginTemplate from '../../public/templates/Login.html'
// import SignUpTemplate from '../public/templates/Sign_up.html'

console.log('HELLO FROM LOGIN.JS')

root.innerHTML         = LoginTemplate
const phoneNumberInput = document.querySelector('input')  
const connectButton    = document.querySelector('button')
const loginForm        = document.querySelector('form')

loginForm.onsubmit = event => handleConnectionAttempt(event)

function handleConnectionAttempt(event) {
    // Guard Clauses: if input is empty, ask a number; must have 10 characters
    if (phoneNumberInput.value.length == 0) return // so the <required> pops up
    if (phoneNumberInput.value.length < 10) return event.preventDefault()
    event.preventDefault()
    // Gather given data by client on the form
    const formData = new FormData(loginForm)
    console.log(formData)

    // createSession()
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