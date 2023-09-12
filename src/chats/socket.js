import './events'
import './contactsList'
import { validateStoredSession } from '../main'
const socket = io('https://live-chat-server.up.railway.app')
const messagesContainer = document.querySelector('.webchat__messages')
const messageForm = document.querySelector('.webchat__message-input')
const messageInput = document.querySelector('#userMessage')

//* get session from sessionStorage, if any
const storedSession = sessionStorage.getItem('makaiapp_session')
const thisUser = await validateStoredSession(storedSession)

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    sendMessage(message)
    socket.emit('send-chat-message', message)
    socket.emit('wpp-session-on')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    messageInput.value = ''
})

socket.emit('new-user', thisUser.id)
socket.emit('wpp-session-on', thisUser.id)

socket.on('wpp-contact-on', whoIsConnected => {
    console.log('Your contact got connected')
})

socket.on('wpp-message', (message, receptorPhoneNumber) => {
    if (receptorPhoneNumber != thisUser.id) return

    sendMessage('A message for you: ' + message)
})

// GLOBAL CHAT SOCKET [BEGINNING]
socket.on('chat-message', data => {
    sendMessage(`${data.name}: ${data.message}`)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})

socket.on('user-connected', name => {
    sendMessage(`${name} connected`)
    console.log(name, 'XD WHY MINE DOESNT WORK')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})

socket.on('user-disconnected', name => {
    sendMessage(`${name} disconnected`)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
})
// GLOBAL CHAT SOCKET [ENDING]

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
