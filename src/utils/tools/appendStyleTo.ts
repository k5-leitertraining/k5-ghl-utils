export const appendStyleTo = async (
  element: HTMLElement,
  styleImporter: () => Promise<{ default: string }>,
) => {
  const { default: style } = await styleImporter()
  const styleElement = document.createElement('style')
  styleElement.innerHTML = style
  element.appendChild(styleElement)
}
