export const trackFormSubmission = () => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes)
          const thankYouMessage = addedNodes.find(
            (node) =>
              node instanceof HTMLElement &&
              (node.classList?.contains('thank-you-message') ||
                node.querySelector('.thank-you-message')),
          )
          if (thankYouMessage) {
            observer.disconnect()
            resolve()
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  })
}
