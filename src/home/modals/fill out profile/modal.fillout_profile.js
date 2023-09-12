export async function fillOutProfile(phoneNumber) {
    const modal = {
        handleOverlayClick: event => {
            if (event.target.className === 'home-modal welcome') {
                closeModal(document.body)
            }
        },
        saveProfile: () => {
            console.log('POST PROFILE ON DATABASE')
        },
    }

    function closeModal(opener) {
        setVisibile(false)
        setInertBehindModal(false)
        opener.focus()
    }

    function attachEventListener(submitButton, overlay) {
        overlay.addEventListener('click', modal.handleOverlayClick)
        submitButton.addEventListener('click', modal.saveProfile)
        window.addEventListener('keydown', clallIfEscPress)
    }

    function setInertBehindModal(inert) {
        const element = document.querySelector('body')
        element.inert = inert
        element.setAttribute('aria-hidden', inert)
    }

    function clallIfEscPress(event) {
        if (event.key === 'Escape') {
            modal.callClose()
        }
    }

    const submitButton = document.querySelector('.home-modal__button--letsgo')
    const overlay = document.querySelector('.welcome')
    attachEventListener(submitButton, overlay)
}

export function setVisibile(visible) {
    const display = visible ? 'block' : 'none'
    document.querySelector('.welcome').style.display = display
}