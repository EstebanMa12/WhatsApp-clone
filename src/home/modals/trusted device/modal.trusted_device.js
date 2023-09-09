export async function trustOrNotTrust(phoneNumber, TrustDevice) {
    const modal = {
        callClose: () => {
            closeModal(document.body)
        },
        handleOverlayClick: event => {
            if (event.target.className === 'home-modal') {
                closeModal(document.body)
            }
        },
        trust: () => {
            import('../../../db/server/TrustDevice')
                .then(mod => mod.default(phoneNumber, TrustDevice))
                .finally(() => closeModal(document.body))
        },
    }

    function closeModal(opener) {
        setVisibile(false)
        setInertBehindModal(false)
        opener.focus()
    }

    function attachEventListener(closeButton, trustButton, overlay) {
        closeButton.addEventListener('click', modal.callClose)
        overlay.addEventListener('click', modal.handleOverlayClick)
        trustButton.addEventListener('click', modal.trust)
        window.addEventListener('keydown', clallIfEscPress)
    }

    function setVisibile(visible) {
        const display = visible ? 'block' : 'none'
        document.querySelector('.home-modal').style.display = display
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

    const closeButton = document.querySelector('.home-modal__button--no-trust')
    const trustButton = document.querySelector('.home-modal__button--trust')
    const overlay = document.querySelector('.home-modal')
    attachEventListener(closeButton, trustButton, overlay)
}
