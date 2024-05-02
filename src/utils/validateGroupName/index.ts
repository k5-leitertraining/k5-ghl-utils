import { displayError } from '../tools/displayError'
import { updateSubmitButton } from '../tools/updateSubmitButton'
import { checkGroupName } from './tools/checkGroupName'
import {
  ValueSelector,
  getValueFromValueSelector,
  observeValueSelector,
} from './tools/observeValueSelector'

export const validateGroupName = ({
  orgNameSelector,
  groupNameSelector,
  errorMessage,
  localDev = false,
}: {
  orgNameSelector: ValueSelector
  groupNameSelector: ValueSelector
  errorMessage: string
  localDev?: boolean
}) => {
  let orgName = getValueFromValueSelector(orgNameSelector)
  let groupName = getValueFromValueSelector(groupNameSelector)

  const toggleError = (shouldDisplayError: boolean) => {
    const submitButton = updateSubmitButton(shouldDisplayError)
    submitButton &&
      displayError({
        element: submitButton,
        shouldDisplayError,
        errorMessage,
      })
    const groupNameElement = document.querySelector(groupNameSelector.query)
    groupNameElement &&
      displayError({
        element: groupNameElement as HTMLElement,
        shouldDisplayError,
        errorMessage,
      })
  }

  const triggerCheck = () => {
    toggleError(false)
    updateSubmitButton(true)

    checkGroupName({
      orgName,
      groupName,
      localDev,
      onValid: () => {
        toggleError(false)
      },
      onInvalid: () => {
        toggleError(true)
      },
      onEmptyInput: () => {
        toggleError(false)
      },
    })
  }

  observeValueSelector(orgNameSelector, (_orgName) => {
    orgName = _orgName
    triggerCheck()
  })
  observeValueSelector(groupNameSelector, (_groupName) => {
    groupName = _groupName
    triggerCheck()
  })
}
