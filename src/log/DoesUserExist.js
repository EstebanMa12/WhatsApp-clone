import axios from "axios"

const ENDPOINT = API_URL + 'users/'

async function queryDBToAuthenticate(phoneNumber) {
    try {
        const existingUser = await axios.get(ENDPOINT + phoneNumber)
        return existingUser.data.verified
    } catch {
        const newUser = {
            id: phoneNumber,
            verified: false,
            trusted_devices: [],
            profile: {
                name: null,
                tag: null,
                avatar: null,
                online: false,
                last_connection: null
            }
        }

        axios.post(ENDPOINT, newUser)
        .then(() => console.log('USER', phoneNumber, 'REGISTERED'))
        return newUser.verified
    }
}

export default queryDBToAuthenticate