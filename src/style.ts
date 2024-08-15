import { appendStyleTo } from './utils/tools/appendStyleTo'

export const appendRootStyleTo = (element: HTMLElement) =>
  appendStyleTo(element, () => import('@/style.css?inline'))
