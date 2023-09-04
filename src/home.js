import HomeTemplate from '../public/templates/Home.html'

document.querySelector('#root').innerHTML = HomeTemplate
document.querySelector('button').onclick = () => {
    localStorage.setItem('MAKAIAPP_session', false)
    window.location.href = '/'
}

console.log('HELLO FROM _HOME MODULE')


// document.body.innerText = 'WELCOME BACK, OLD USER!'
