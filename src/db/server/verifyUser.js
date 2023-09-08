import axios from 'axios'
import { createSession } from '../../log/login'

async function verifyUser(phoneNumber) {
    const ENDPOINT = API_URL + 'users/' + phoneNumber
    await axios.patch(ENDPOINT, { verified: true })
    createSession(phoneNumber)
} 

export default verifyUser