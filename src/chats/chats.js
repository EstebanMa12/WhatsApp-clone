const socket = io('https://live-chat-server.up.railway.app')
const messagesContainer = document.querySelector('.webchat__messages')
const messageForm = document.querySelector('.webchat__message-input')
const messageInput = document.querySelector('#userMessage')
const submitButton = document.querySelector('.send-button')

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    sendMessage(message)
    socket.emit('send-chat-message', message)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    message.value = ''
})

const Name = prompt('What is your name?')
sendMessage('You joined')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
    sendMessage(`${data.name}: ${data.message}`)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})

socket.on('user-connected', name => {
    sendMessage(`${name} connected`)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})

socket.on('user-disconnected', name => {
    sendMessage(`${name} disconnected`)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})

function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return hours + ':' + minutes
}

function sendMessage(userMessage) {
    if (userMessage.trim() === '') {
        return
    }

    const messageSent = document.createElement('div')

    messageSent.className = 'webchat__message-sent'
    messageSent.innerHTML = `<p>${userMessage}</p><span class="webchat__time">${getCurrentTime()}</span>`
    messagesContainer.appendChild(messageSent)
}

// active effect on webchat section when focusing chat
const webchatMessages = document.querySelector('.webchat__messages')
const webchatHeader = document.querySelector('.webchat__header')
const webchatComponents = [webchatHeader, webchatMessages]

webchatComponents.forEach(
    component =>
        (component.onmouseover = function () {
            this.style.borderColor = 'white'
        })
)
webchatComponents.forEach(
    component =>
        (component.onmouseleave = function () {
            this.style.borderColor = 'rgb(244, 244, 244, 0.5)'
        })
)

messageInput.onfocus = () => {
    webchatComponents.forEach(
        component => (component.style.borderColor = 'white')
    )
}
messageInput.onblur = () => {
    webchatComponents.forEach(
        component => (component.style.borderColor = 'rgb(244, 244, 244, 0.5)')
    )
}
