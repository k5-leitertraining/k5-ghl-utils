import { updateSubmitButton } from '../tools/updateSubmitButton'
import { checkEmail } from './tools/checkEmail'

export const validateEmail = ({
  errorMessage = 'Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.',
  courseId = 'generalCourseParticipantOrCommunityMember',
  localDev = false,
} = {}) => {
  //////////////////////////////
  // add input event listener //
  //////////////////////////////
  document.querySelector('[name="email"]')?.addEventListener('input', (e) => {
    if (!e.target) return
    // deactivate submit button while checking email
    // (will be reactivated in checkEmail function)
    updateSubmitButton(true)
    checkEmail({
      target: e.target,
      errorMessage,
      courseId,
      localDev,
    })
  })

  //////////////////////////////
  // trigger input event      //
  //////////////////////////////
  const emailInput = document.querySelector<HTMLInputElement>('[name="email"]')
  const emailValue = emailInput?.value
  emailInput?.dispatchEvent(
    new Event('input', {
      bubbles: true,
      cancelable: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: emailValue,
    }),
  )
}
