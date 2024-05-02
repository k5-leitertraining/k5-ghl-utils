export type ValueSelector = {
  query: string
  getValue?: (el: Element) => string
}

export const getValueFromValueSelector = (selector: ValueSelector) => {
  const el = document.querySelector(selector.query)
  if (!el) return ''
  return selector.getValue
    ? selector.getValue(el)
    : (el as HTMLInputElement).value
}

export const observeValueSelector = (
  valueSelector: ValueSelector,
  callback: (value: string) => void,
) => {
  let lastValue = getValueFromValueSelector(valueSelector)
  callback(lastValue)
  const sendValueUpdateIfChanged = () => {
    const newValue = getValueFromValueSelector(valueSelector)
    if (lastValue === newValue) return
    lastValue = newValue
    callback(newValue)
  }

  const withMutationObserver = () => {
    const target = document.querySelector(valueSelector.query) ?? document.body

    const observer = new MutationObserver(() => {
      sendValueUpdateIfChanged()
    })
    observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      observer.disconnect()
    }
  }

  const withInputEvent = () => {
    const target = document.querySelector(valueSelector.query)
    if (!target) return
    target.addEventListener('input', sendValueUpdateIfChanged)
    return () => {
      target.removeEventListener('input', sendValueUpdateIfChanged)
    }
  }

  return valueSelector.getValue ? withMutationObserver() : withInputEvent()
}
