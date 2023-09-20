import './events'
import './contactsList'
import { validateStoredSession } from '../main'
import { saveChatMessage } from '../db/server/saveChatMessage'
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
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    messageInput.value = ''
})

// GLOBAL CHAT SOCKET [BEGINNING]
socket.emit('new-user', thisUser.id)

socket.on('chat-message', async data => {
    sendMessage(`${data.name}: ${data.message}`, data)
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
// GLOBAL CHAT SOCKET [ENDING]

function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return hours + ':' + minutes
}

async function sendMessage(userMessage, data) {
    if (userMessage.trim() === '') {
        return
    }
    
    const messageSent = document.createElement('div')

    data  
    ? messageSent.className = 'webchat__message-received'
    : messageSent.className = 'webchat__message-sent'
    messageSent.innerHTML = `<p>${userMessage}</p><span class="webchat__time">${getCurrentTime()}</span>`
    messagesContainer.appendChild(messageSent)
    if (data) await saveChatMessage(data.name, data.message)
    await saveChatMessage(thisUser.id, userMessage)
}
