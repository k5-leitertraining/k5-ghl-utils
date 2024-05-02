export const displayError = ({
  shouldDisplayError,
  element,
  errorMessage,
}: {
  shouldDisplayError: boolean
  element: HTMLElement
  errorMessage: string
}) => {
  if (!element.parentElement?.querySelector('.course-already-bought-error')) {
    element.insertAdjacentHTML(
      'afterend',
      `<div class="error course-already-bought-error">${errorMessage}</div>`,
    )
  }
  const errorElement = element.parentElement?.querySelector<HTMLElement>(
    '.course-already-bought-error',
  )
  if (!errorElement) return
  errorElement.style.cssText = shouldDisplayError ? '' : 'display: none;'
}
