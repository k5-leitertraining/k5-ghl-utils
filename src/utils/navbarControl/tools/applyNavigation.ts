import { CustomMenuItem } from '../data/getCustomMenuItems'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __NUXT__: {
      data: {
        pageData: {
          elements: NavMenuElement[]
        }
      }
    }
  }
}

type ValueWrapper<T> = {
  value: T
}

type NavMenuElement = {
  extra: {
    nodeId: string
    menuItems: ValueWrapper<NuxtMenuItem[]>
  }
  id: string
  meta: string
  tagName: string
}

type NuxtMenuItem = {
  id: string
  title: string
  goTo: 'url'
  url: string
  goToId: string
  openInNewTab: boolean
  childs: NuxtMenuItem[]
}

const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const toNuxtMenuItem = (customMenuItem: CustomMenuItem): NuxtMenuItem => {
  return {
    id: generateId(),
    title: customMenuItem.label,
    goTo: 'url',
    url: customMenuItem.url,
    goToId: '',
    openInNewTab: false,
    childs: customMenuItem.children?.map(toNuxtMenuItem) ?? [],
  }
}

export const applyNavigation = (menuItems: CustomMenuItem[]) => {
  console.log(menuItems)

  const navMenuElement = window.__NUXT__.data.pageData.elements.find(
    (e) => e.meta === 'nav-menu',
  )
  if (!navMenuElement) {
    console.error('Error when applying navigation: nav-menu element not found')
    return
  }
  navMenuElement.extra.menuItems.value = navMenuElement.extra.menuItems.value =
    menuItems.map(toNuxtMenuItem)
}
