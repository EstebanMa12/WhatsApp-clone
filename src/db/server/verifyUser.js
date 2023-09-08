import axios from 'axios'
import { createSession } from '../../log/login'

async function verifyUser(phoneNumber) {
    const ENDPOINT = API_URL + 'users/' + phoneNumber
    const User = await axios.patch(ENDPOINT, { verified: true })
    createSession(User)
} 

export default verifyUser