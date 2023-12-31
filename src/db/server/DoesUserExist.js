import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function doesUserExist(phoneNumber) {
    if (/\D/.test(phoneNumber) || (await phoneNumber) === null || !phoneNumber)
        return false

    try {
        const existingUser = await axios.get(ENDPOINT + phoneNumber)

        return existingUser.data
    } catch (error) {
        console.error(error)
    }
}

export default doesUserExist
