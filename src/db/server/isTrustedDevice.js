import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function isTrustedDevice() {
    try {
        let existingUsers = await axios.get(ENDPOINT)
        existingUsers = existingUsers.data

        const trustedDevices = existingUsers.flatMap(
            user => user.trusted_devices
        )
        return trustedDevices.includes(navigator.userAgent)
    } catch (error) {
        console.log('Please check your server!')
        console.log('It seems your HTTP GET Request failed somehow...')
        console.log(error)
    }
}

export default isTrustedDevice
