import { debounce } from './debounce'
import { displayError } from './displayError'
import { updateSubmitButton } from './updateSubmitButton'

let lastAbortController: AbortController
const _checkEmail = async ({
  target,
  errorMessage,
  courseId,
  localDev = false,
}: {
  target: EventTarget
  errorMessage: string
  courseId: string
  localDev?: boolean
}) => {
  if (!(target instanceof HTMLInputElement)) return
  const email = target.value
  lastAbortController?.abort()
  if (!email) return
  lastAbortController = new AbortController()
  const signal = lastAbortController.signal
  const host = localDev
    ? 'http://localhost:9999'
    : 'https://k5-leitertraining.de'
  const result = await fetch(
    `${host}/.netlify/functions/is-registered?email=${email}&course=${courseId}`,
    { signal },
  )
    .then(
      (response) =>
        response.json() as Promise<{ isAlreadyRegistered: boolean }>,
    )
    .catch((err) => {
      console.log(err)
    })

  const isAlreadyRegistered = !!result?.isAlreadyRegistered

  target.setCustomValidity(isAlreadyRegistered ? errorMessage : '')

  const submitButton = updateSubmitButton(isAlreadyRegistered)
  submitButton &&
    displayError({
      shouldDisplayError: isAlreadyRegistered,
      element: submitButton,
      errorMessage,
    })
  displayError({
    shouldDisplayError: isAlreadyRegistered,
    element: target,
    errorMessage,
  })
}

export const checkEmail = debounce(_checkEmail, 500)
