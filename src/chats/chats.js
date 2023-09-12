const submitButton = document.querySelector('.send-button')
console.log(submitButton, 'hi xd')
submitButton.addEventListener('click', e => {
    console.log('Trying to send a message')
    e.preventDefault()
    sendMessage()
})
function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return hours + ':' + minutes
}

function sendMessage() {
    const userMessage = document.getElementById('userMessage').value
    if (userMessage.trim() === '') {
        return
    }

    const chatMessages = document.querySelector('.webchat__messages')
    const messageSent = document.createElement('div')

    messageSent.className = 'webchat__message-sent'
    messageSent.innerHTML = `<p>${userMessage}</p><span class="webchat__time">${getCurrentTime()}</span>`
    chatMessages.appendChild(messageSent)
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Clear the input field
    document.getElementById('userMessage').value = ''
}
