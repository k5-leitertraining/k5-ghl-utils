import { delay } from '../tools/delay'
import { EmailInputTracker } from './tools/EmailInputTracker'
import { getRedirectUrl } from './tools/getRedirectUrl'
import { showWaitingAnimation } from './tools/showWaitingAnimation'
import { trackFormSubmission } from './tools/trackFormSubmission'

export const redirectAfterFormSubmission = async ({ localDev = false }) => {
  // import styles
  await import('@/style.css')

  // email input tracking
  const emailInputTracker = new EmailInputTracker()
  emailInputTracker.trackEmailInput()

  // wait for form submission
  await trackFormSubmission()

  // show waiting animation
  showWaitingAnimation(document.querySelector('.thank-you-message')!)

  // get redirect URL
  const email = emailInputTracker.getEmail()
  let redirectUrl = ''
  while (!redirectUrl) {
    redirectUrl = await getRedirectUrl({ email, localDev })
    await delay(2500)
  }

  // redirect
  window.location.href = redirectUrl
}
