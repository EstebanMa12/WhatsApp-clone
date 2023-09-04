import '../public/style/style.css'

const USER_LOGGED = JSON.parse(localStorage.getItem('MAKAIAPP_session'))

if (USER_LOGGED) {
    import('./home')
} else {
    import('./login')
}
