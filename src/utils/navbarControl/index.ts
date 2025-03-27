import { getCustomMenuItems } from './data/getCustomMenuItems'
import { loadNavbarStyle } from './style/loadNavbarStyle'
import { constantlyApplyNavigation } from './tools/applyNavigation'

const DISABLE_SYNC = true

export const navbarControl = async ({ localDev = false } = {}) => {
  await loadNavbarStyle()

  if (DISABLE_SYNC) return

  const menuItems = await getCustomMenuItems({ localDev })
  constantlyApplyNavigation(menuItems)
}
