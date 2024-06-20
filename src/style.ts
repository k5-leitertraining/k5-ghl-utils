export const appendStyleTo = async (element: HTMLElement) => {
  const { default: style } = await import('@/style.css?inline')
  const styleElement = document.createElement('style')
  styleElement.innerHTML = style
  element.appendChild(styleElement)
}
