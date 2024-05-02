const disabledStyle = 'opacity: 0.5; cursor: not-allowed;'
let enabledStyle: string

export const updateSubmitButton = (isDisabled: boolean) => {
  if (!enabledStyle) {
    enabledStyle =
      document.querySelector<HTMLElement>('[type=submit]')?.style?.cssText ?? ''
  }
  const submitButton =
    document.querySelector<HTMLButtonElement>('[type=submit]')
  if (!submitButton) return null
  submitButton.disabled = isDisabled
  submitButton.style.cssText = isDisabled
    ? enabledStyle + disabledStyle
    : enabledStyle
  return submitButton
}
