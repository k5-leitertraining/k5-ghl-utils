export const debounce = <TArgs extends unknown[]>(
  func: (...args: TArgs) => unknown,
  delay: number,
) => {
  let timeoutId: number

  return (...args: TArgs) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      func(...args)
    }, delay)
  }
}
