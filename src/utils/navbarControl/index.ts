import { getCustomMenuItems } from './data/getCustomMenuItems'
import { loadNavbarStyle } from './style/loadNavbarStyle'
import { applyNavigation } from './tools/applyNavigation'

export const navbarControl = async () => {
  await loadNavbarStyle()

  const menuItems = await getCustomMenuItems()

  applyNavigation(menuItems)
}
