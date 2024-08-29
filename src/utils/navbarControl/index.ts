import { getCustomMenuItems } from './data/getCustomMenuItems'
import { loadNavbarStyle } from './style/loadNavbarStyle'
import { applyNavigation } from './tools/applyNavigation'

export const navbarControl = async ({ localDev = false } = {}) => {
  await loadNavbarStyle()

  const menuItems = await getCustomMenuItems({ localDev })

  applyNavigation(menuItems)
}
