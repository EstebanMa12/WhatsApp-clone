import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function findUserFromTrustedDevice() {
    try {
        let existingUsers = await axios.get(ENDPOINT)
        existingUsers = existingUsers.data

        return existingUsers.find(user =>
            user.trusted_devices.includes(navigator.userAgent)
        )
    } catch (error) {
        console.log('Please check your server!')
        console.log('It seems your HTTP GET Request failed somehow...')
        console.log(error)
    }
}

export default findUserFromTrustedDevice
