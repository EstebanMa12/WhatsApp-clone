import axios from 'axios'
import { createSession } from '../../log/login'

async function verifyUser(phoneNumber) {
    phoneNumber = phoneNumber.slice(1)
    const ENDPOINT = API_URL + 'users/' + phoneNumber
    await axios.patch(ENDPOINT, { verified: true })
    createSession(phoneNumber)
} 

export default verifyUser