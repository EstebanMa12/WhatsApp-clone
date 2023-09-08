import axios from 'axios'

const ENDPOINT = API_URL + 'users/'

async function isTrustedDevice() {
    try {
        let existingUsers = await axios.get(ENDPOINT)
        existingUsers = existingUsers.data

        const currentDeviceTrustedBy = existingUsers.find(user =>
            user.trusted_devices.includes(navigator.userAgent)
        )

        if (!!currentDeviceTrustedBy !== true) return false
    } catch (error) {
        console.log('Please check your server!')
        console.log('It seems your HTTP GET Request failed somehow...')
        console.log(error)
    }
}

export default isTrustedDevice
