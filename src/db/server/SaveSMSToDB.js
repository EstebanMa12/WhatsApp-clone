import axios from 'axios'

export async function saveSMSToDB(phoneNumber, code) {
    const ENDPOINT = API_URL + 'users/' + phoneNumber

    try {
        const createTimeStamp = new Date()
        const TimeStampInMilliSeconds = createTimeStamp.getTime()
        const userCode = {
            date: TimeStampInMilliSeconds,
            value: code,
        }

        await axios.patch(ENDPOINT, { code: userCode })
    } catch (error) {
        console.log('[ERROR] saving your SMS to the DB as a code.')
        console.log(error)
    }
}
