import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as cmsStore from '../services/cmsStore'
import { useCmsAuth } from './CmsAuthContext'

const CmsContext = createContext(null)

export function CmsProvider({ children }) {
  const { currentUser } = useCmsAuth()
  const [version, setVersion] = useState(0)

  // Core state snapshots
  const [settings, setSettings] = useState(() => cmsStore.getSettings())
  const [pages, setPages] = useState(() => cmsStore.getPages(false))
  const [menus, setMenus] = useState(() => cmsStore.getMenus())
  const [megaMenus, setMegaMenus] = useState(() => cmsStore.getMegaMenus())
  const [media, setMedia] = useState(() => cmsStore.getMedia())
  const [reusableBlocks, setReusableBlocks] = useState(() => cmsStore.getReusableBlocks())
  const [redirects, setRedirects] = useState(() => cmsStore.getRedirects())

  // Refresh all state from store
  const refreshData = useCallback(() => {
    setSettings(cmsStore.getSettings())
    setPages(cmsStore.getPages(false))
    setMenus(cmsStore.getMenus())
    setMegaMenus(cmsStore.getMegaMenus())
    setMedia(cmsStore.getMedia())
    setReusableBlocks(cmsStore.getReusableBlocks())
    setRedirects(cmsStore.getRedirects())
    setVersion((v) => v + 1)
  }, [])

  // Listen to storage events across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('crosslife_cms_')) {
        refreshData()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [refreshData])

  // Helpers
  const getPage = useCallback(
    (slugOrId) => {
      if (!slugOrId) return null
      if (slugOrId.startsWith('/')) {
        return cmsStore.getPageBySlug(slugOrId)
      }
      return cmsStore.getPageById(slugOrId) || cmsStore.getPageBySlug(slugOrId)
    },
    [version]
  )

  const getSections = useCallback(
    (pageId) => {
      return cmsStore.getSectionsByPageId(pageId)
    },
    [version]
  )

  const getMenu = useCallback(
    (slug) => {
      return cmsStore.getMenuBySlug(slug)
    },
    [version]
  )

  const getMegaMenu = useCallback(
    (navItemId) => {
      return cmsStore.getMegaMenuByNavId(navItemId)
    },
    [version]
  )

  const getBlock = useCallback(
    (blockId) => {
      return cmsStore.getReusableBlockById(blockId)
    },
    [version]
  )

  // Mutators
  const saveSettings = async (newSettings) => {
    const res = await cmsStore.saveSettings(newSettings, currentUser)
    refreshData()
    return res
  }

  const savePage = async (pageData) => {
    const res = await cmsStore.savePage(pageData, currentUser)
    refreshData()
    return res
  }

  const trashPage = async (id) => {
    const res = await cmsStore.trashPage(id, currentUser)
    refreshData()
    return res
  }

  const restorePage = async (id) => {
    const res = await cmsStore.restorePage(id, currentUser)
    refreshData()
    return res
  }

  const deletePagePermanently = async (id) => {
    const res = await cmsStore.deletePagePermanently(id, currentUser)
    refreshData()
    return res
  }

  const duplicatePage = async (id) => {
    const res = await cmsStore.duplicatePage(id, currentUser)
    refreshData()
    return res
  }

  const saveSection = async (sectionData) => {
    const res = await cmsStore.saveSection(sectionData, currentUser)
    refreshData()
    return res
  }

  const deleteSection = async (id) => {
    const res = await cmsStore.deleteSection(id, currentUser)
    refreshData()
    return res
  }

  const duplicateSection = async (id) => {
    const res = await cmsStore.duplicateSection(id, currentUser)
    refreshData()
    return res
  }

  const reorderSections = async (pageId, orderedIds) => {
    const res = await cmsStore.reorderSections(pageId, orderedIds, currentUser)
    refreshData()
    return res
  }

  const saveMediaItem = async (item) => {
    const res = await cmsStore.saveMediaItem(item, currentUser)
    refreshData()
    return res
  }

  const deleteMediaItem = async (id) => {
    const res = await cmsStore.deleteMediaItem(id, currentUser)
    refreshData()
    return res
  }

  const saveMenu = async (menuData) => {
    const res = await cmsStore.saveMenu(menuData, currentUser)
    refreshData()
    return res
  }

  const saveMegaMenu = async (megaData) => {
    const res = await cmsStore.saveMegaMenu(megaData, currentUser)
    refreshData()
    return res
  }

  const saveReusableBlock = async (blockData) => {
    const res = await cmsStore.saveReusableBlock(blockData, currentUser)
    refreshData()
    return res
  }

  const deleteReusableBlock = async (id) => {
    const res = await cmsStore.deleteReusableBlock(id, currentUser)
    refreshData()
    return res
  }

  const saveRedirect = async (redirData) => {
    const res = await cmsStore.saveRedirect(redirData, currentUser)
    refreshData()
    return res
  }

  const deleteRedirect = async (id) => {
    const res = await cmsStore.deleteRedirect(id, currentUser)
    refreshData()
    return res
  }

  return (
    <CmsContext.Provider
      value={{
        version,
        settings,
        pages,
        menus,
        megaMenus,
        media,
        reusableBlocks,
        redirects,
        refreshData,
        // Query helpers
        getPage,
        getSections,
        getMenu,
        getMegaMenu,
        getBlock,
        // Actions
        saveSettings,
        savePage,
        trashPage,
        restorePage,
        deletePagePermanently,
        duplicatePage,
        saveSection,
        deleteSection,
        duplicateSection,
        reorderSections,
        saveMediaItem,
        deleteMediaItem,
        saveMenu,
        saveMegaMenu,
        saveReusableBlock,
        deleteReusableBlock,
        saveRedirect,
        deleteRedirect,
      }}
    >
      {children}
    </CmsContext.Provider>
  )
}

export function useCms() {
  const context = useContext(CmsContext)
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider')
  }
  return context
}
