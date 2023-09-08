import axios from "axios"

const ENDPOINT = API_URL + 'users/'

async function isTrustedDevice() {
    try {
        let existingUsers = await axios.get(ENDPOINT)
        existingUsers = existingUsers.data
        const trustedDevices = existingUsers.map(user => user.trusted_devices)

        console.log(navigator.userAgent)

        return trustedDevices.includes(navigator.userAgent)
    } catch (error) {
        console.log('Please check your server!')
        console.log('It seems your HTTP GET Request failed somehow...')
        console.log(error)
    }
}

export default isTrustedDevice