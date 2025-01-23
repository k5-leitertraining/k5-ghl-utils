import { debounce } from '../../tools/debounce'

let lastAbortController: AbortController
const _checkGroupName = async ({
  orgName,
  groupName,
  localDev = false,
  onValid,
  onInvalid,
  onEmptyInput,
}: {
  orgName: string
  groupName: string
  localDev?: boolean
  onValid: () => void
  onInvalid: () => void
  onEmptyInput: () => void
}) => {
  lastAbortController?.abort()

  if (!orgName || !groupName) return onEmptyInput()

  lastAbortController = new AbortController()
  const signal = lastAbortController.signal
  const host = localDev
    ? 'http://localhost:9999'
    : 'https://netlify.k5-leitertraining.de'
  const result = await fetch(
    `${host}/.netlify/functions/ortsgruppenname-is-valid?orgName=${orgName}&groupName=${groupName}`,
    { signal },
  )
    .then(
      (response) =>
        response.json() as Promise<{
          isGroupNameValid: boolean
        }>,
    )
    .catch((err) => {
      if ((err as Error).name === 'AbortError') return 'aborted'
      console.log(err)
    })
  if (result === 'aborted') return

  const isGroupNameValid = !!result?.isGroupNameValid
  isGroupNameValid ? onValid() : onInvalid()
}

export const checkGroupName = debounce(_checkGroupName, 500)
