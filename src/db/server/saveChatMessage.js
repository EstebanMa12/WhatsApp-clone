import axios from 'axios'

export async function saveChatMessage(phoneNumber, messageContent) {
    const ENDPOINT = API_URL + 'messages/'
    
    // Get year, month, and day
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0')

    // Get hour, minutes, and seconds
    const hours = currentDate.getHours().toString().padStart(2, '0')
    const minutes = currentDate.getMinutes().toString().padStart(2, '0')
    const seconds = currentDate.getSeconds().toString().padStart(2, '0')

    // Format the date and time
    const fullDateFormat = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

    const messageToSave = {
        content: messageContent,
        date: fullDateFormat,
        from: phoneNumber,
        to: 'global chat',
    }

    return axios.post(ENDPOINT, messageToSave)
}
