import { getCustomMenuItems } from './data/getCustomMenuItems'
import { loadNavbarStyle } from './style/loadNavbarStyle'
import { constantlyApplyNavigation } from './tools/applyNavigation'

export const navbarControl = async ({ localDev = false } = {}) => {
  await loadNavbarStyle()

  const menuItems = await getCustomMenuItems({ localDev })

  constantlyApplyNavigation(menuItems)
}
