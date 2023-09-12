// active effect on webchat section when focusing chat
const webchatMessages = document.querySelector('.webchat__messages')
const webchatHeader = document.querySelector('.webchat__header')
const webchatComponents = [webchatHeader, webchatMessages]
const messageInput = document.querySelector('#userMessage')

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

// active effect on chats list container for active chat
const activeChat = document.querySelector('.chats__user-second')
const chatsList = document.querySelector('.chats__container')

activeChat.classList.toggle('activeChat')

chatsList.onclick = function (event) {
    const currentActiveChat = this.querySelector('.activeChat')

    // guard clauses
    const didNotClickAChat =
        this == event.target || this == event.target.offsetParent
    const clickedCurrentActiveChat =
        event.target.offsetParent == currentActiveChat

    if (didNotClickAChat || clickedCurrentActiveChat) return

    event.target.offsetParent.classList.toggle('activeChat')
    currentActiveChat.classList.toggle('activeChat')
}
