import axios from 'axios'
import doesUserExist from './DoesUserExist'

const ENDPOINT = API_URL + 'users/'

async function TrustDevice(phoneNumber, trustedDevice) {
    try {
        const ExistingUser = await doesUserExist(phoneNumber)
        const ExistingUserTrustedDevices = ExistingUser.trusted_devices

        ExistingUserTrustedDevices.push(trustedDevice)

        return await axios.patch(ENDPOINT + phoneNumber, {
            trusted_devices: ExistingUserTrustedDevices,
        })
    } catch (error) {
        console.log('Please check your server!')
        console.log('It seems your HTTP GET Request failed somehow...')
        console.log(error)
    }
}

export default TrustDevice
