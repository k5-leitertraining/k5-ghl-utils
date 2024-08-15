import { appendStyleTo } from '@/utils/tools/appendStyleTo'

export const loadNavbarStyle = () =>
  appendStyleTo(document.head, () => import('./navbarStyle.css?inline'))
