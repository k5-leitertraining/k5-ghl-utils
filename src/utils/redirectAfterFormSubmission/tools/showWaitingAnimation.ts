import loadingIcon from '../../../assets/loading.svg?raw'

export const showWaitingAnimation = (elementToAppend: HTMLElement) => {
  const loadingIconElement = document.createElement('div')
  loadingIconElement.innerHTML = loadingIcon
  loadingIconElement.className = 'object-fill p-8 mx-auto size-32'
  elementToAppend.appendChild(loadingIconElement)
  return loadingIconElement
}
