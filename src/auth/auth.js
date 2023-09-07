import SignUpTemplate from '../../public/templates/Sign_up copy.html'
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"

function authPhoneWithSMSThroughFirebase(phoneNumber) {
    root.innerHTML = SignUpTemplate

    const firebaseConfig = {
        apiKey: "AIzaSyAHo3XnjxQV_9i-CvxcBYsQ2_FRGq-GZTo",
        authDomain: "sms-authentication-e7780.firebaseapp.com",
        projectId: "sms-authentication-e7780",
        storageBucket: "sms-authentication-e7780.appspot.com",
        messagingSenderId: "42830106022",
        appId: "1:42830106022:web:8f1c8eac6c5540c1c69367"
      }
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig)
      
      // Firebase SMS Auth
      const auth = getAuth(app)
      
      // Mandatory reCAPTCHA (this is invisible)
      auth.useDeviceLanguage()
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': response => {
            // onSignInSubmit()
            console.log('CAPTCHA WORKED?')
            console.log(response)
        }
      })
      
      // const phoneNumber = getPhoneNumberFromUserInput()
      const appVerifier = window.recaptchaVerifier
      
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then(confirmationResult => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult

          }).catch(error => {
            console.error('MESSAGE NO SENT.')
            console.error(error)
          })
}

export default authPhoneWithSMSThroughFirebase