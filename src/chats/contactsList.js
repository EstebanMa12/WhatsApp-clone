import { validateStoredSession } from '../main'

//* get session from sessionStorage, if any
const storedSession = sessionStorage.getItem('makaiapp_session')
const User = await validateStoredSession(storedSession)

console.log(User.contacts)

function renderAllUsersContacts() {
    const chatsContainer = document.querySelector('.chats__container')
}
