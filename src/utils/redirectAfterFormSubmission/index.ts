import { appendStyleTo } from '@/style'

import { delay } from '../tools/delay'
import { EmailInputTracker } from './tools/EmailInputTracker'
import { getRedirectUrl } from './tools/getRedirectUrl'
import { showWaitingAnimation } from './tools/showWaitingAnimation'
import { trackFormSubmission } from './tools/trackFormSubmission'

export const redirectAfterFormSubmission = async ({
  localDev = false,
  successMessage,
}: {
  localDev?: boolean
  successMessage?: string | ((redirectUrl: string) => string)
}) => {
  // email input tracking
  const emailInputTracker = new EmailInputTracker()
  emailInputTracker.trackEmailInput()

  // wait for form submission
  await trackFormSubmission()

  // show waiting animation
  const thankYouMessageElement =
    document.querySelector<HTMLElement>('.thank-you-message')!
  await appendStyleTo(thankYouMessageElement)
  showWaitingAnimation(thankYouMessageElement)

  // get redirect URL
  const email = emailInputTracker.getEmail()
  let redirectUrl = ''
  while (!redirectUrl) {
    redirectUrl = await getRedirectUrl({ email, localDev })
    await delay(2500)
  }

  // redirect
  window.location.href = redirectUrl

  // show success message in thankYouMessageElement
  const successMessageString =
    typeof successMessage === 'function'
      ? successMessage(redirectUrl)
      : successMessage
  if (successMessageString) {
    thankYouMessageElement.innerHTML = successMessageString
  }
}
