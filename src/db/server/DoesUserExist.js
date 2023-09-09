import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function doesUserExist(phoneNumber) {
    if ((await phoneNumber) == null || !phoneNumber) return false

    try {
        phoneNumber = phoneNumber.replace(/\D/g, '')
        const existingUser = await axios.get(ENDPOINT + phoneNumber)

        return existingUser.data
    } catch (error) {
        console.error(error)
    }
}

export default doesUserExist
