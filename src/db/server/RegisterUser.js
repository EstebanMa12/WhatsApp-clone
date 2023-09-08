import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function queryDBToAuthenticate(phoneNumber) {
    try {
        phoneNumber = phoneNumber.replace(/\D/g, '')
        const existingUser = await axios.get(ENDPOINT + phoneNumber, {
            headers,
            validateStatus: () => true,
        })
        return existingUser.data
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
                last_connection: null,
            },
        }

        axios
            .post(ENDPOINT, newUser)
            .then(() => console.log('USER', phoneNumber, 'REGISTERED'))
        return newUser
    }
}

export default queryDBToAuthenticate
