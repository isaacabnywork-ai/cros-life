import {
  INITIAL_GLOBAL_SETTINGS,
  INITIAL_MENUS,
  INITIAL_MEGA_MENUS,
  INITIAL_PAGES,
  INITIAL_PAGE_SECTIONS,
  INITIAL_MEDIA,
  INITIAL_REUSABLE_BLOCKS,
  INITIAL_REDIRECTS,
  INITIAL_USERS,
} from '../data/seedData.js'
import { supabase, isSupabaseConfigured } from './supabaseClient.js'
import { logActivity } from './activityLogger.js'

const PREFIX = 'crosslife_cms_'
const memoryStore = new Map()

function getStorageItem(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
  } catch {}
  return memoryStore.get(key) || null
}

function setStorageItem(key, value) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
      return
    }
  } catch {}
  memoryStore.set(key, value)
}

function readStorage(key, fallback) {
  try {
    const raw = getStorageItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e)
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    setStorageItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e)
  }
}

// -----------------------------------------------------------------------------
// STORE INITIALIZATION (Self-Seeding)
// -----------------------------------------------------------------------------
export function initializeCmsStore() {
  if (!getStorageItem(PREFIX + 'initialized')) {
    writeStorage('settings', INITIAL_GLOBAL_SETTINGS)
    writeStorage('menus', INITIAL_MENUS)
    writeStorage('mega_menus', INITIAL_MEGA_MENUS)
    writeStorage('pages', INITIAL_PAGES)
    writeStorage('sections', INITIAL_PAGE_SECTIONS)
    writeStorage('media', INITIAL_MEDIA)
    writeStorage('reusable_blocks', INITIAL_REUSABLE_BLOCKS)
    writeStorage('redirects', INITIAL_REDIRECTS)
    writeStorage('users', INITIAL_USERS)
    writeStorage('revisions', [])
    writeStorage('trash', [])
    writeStorage('initialized', 'true')
    logActivity('System initialized with default CrossLife website content', 'system', 'CrossLife CMS')
  }
}

// Ensure initialized
initializeCmsStore()

// =============================================================================
// 1. GLOBAL SETTINGS
// =============================================================================
export function getSettings() {
  return readStorage('settings', INITIAL_GLOBAL_SETTINGS)
}

export async function saveSettings(newSettings, user = null) {
  const current = getSettings()
  // Save revision
  createRevision('settings', 'default', current, user?.name || 'Admin', 'Updated Global Settings')
  writeStorage('settings', newSettings)
  await logActivity('Updated Global Settings', 'settings', 'Global Settings', user)

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('global_settings').upsert({ id: 'default', ...newSettings })
    } catch (err) {
      console.warn('Supabase sync error for settings:', err)
    }
  }
  return newSettings
}

// =============================================================================
// 2. PAGES
// =============================================================================
export function getPages(includeTrashed = false) {
  const pages = readStorage('pages', INITIAL_PAGES)
  if (includeTrashed) return pages
  return pages.filter((p) => p.status !== 'trash')
}

export function getPageById(id) {
  const pages = readStorage('pages', INITIAL_PAGES)
  return pages.find((p) => p.id === id) || null
}

export function getPageBySlug(slug) {
  const pages = readStorage('pages', INITIAL_PAGES)
  const normalizedSlug = slug.startsWith('/') ? slug : '/' + slug
  return pages.find((p) => p.slug === normalizedSlug && p.status !== 'trash') || null
}

export async function savePage(pageData, user = null) {
  const pages = readStorage('pages', INITIAL_PAGES)
  const isNew = !pageData.id || !pages.some((p) => p.id === pageData.id)

  const timestamp = new Date().toISOString()
  const pageId = pageData.id || `page-${Date.now()}`

  let pageToSave = {
    ...pageData,
    id: pageId,
    updated_at: timestamp,
    updated_by: user?.name || 'Admin',
  }

  if (isNew) {
    pageToSave.created_at = timestamp
    pageToSave.created_by = user?.name || 'Admin'
    pageToSave.status = pageData.status || 'draft'
  }

  // Create revision of previous state if editing
  if (!isNew) {
    const existing = pages.find((p) => p.id === pageId)
    if (existing) {
      createRevision('page', pageId, existing, user?.name || 'Admin', `Saved version before edit`)
    }
  }

  let updatedPages
  if (isNew) {
    updatedPages = [...pages, pageToSave]
  } else {
    updatedPages = pages.map((p) => (p.id === pageId ? pageToSave : p))
  }

  writeStorage('pages', updatedPages)
  await logActivity(
    isNew ? `Created page "${pageToSave.title}"` : `Updated page "${pageToSave.title}"`,
    'page',
    pageToSave.title,
    user
  )

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('pages').upsert([pageToSave])
    } catch (err) {
      console.warn('Supabase sync error for page:', err)
    }
  }

  return pageToSave
}

export async function trashPage(id, user = null) {
  const pages = readStorage('pages', INITIAL_PAGES)
  const page = pages.find((p) => p.id === id)
  if (!page) return false

  const updatedPages = pages.map((p) => (p.id === id ? { ...p, status: 'trash', updated_at: new Date().toISOString() } : p))
  writeStorage('pages', updatedPages)

  // Track in trash table
  const trashItems = readStorage('trash', [])
  const newTrash = [
    {
      id: `trash-${Date.now()}`,
      entity_type: 'page',
      entity_id: id,
      title: page.title,
      trashed_at: new Date().toISOString(),
      trashed_by: user?.name || 'Admin',
    },
    ...trashItems,
  ]
  writeStorage('trash', newTrash)

  await logActivity(`Moved page "${page.title}" to Trash`, 'page', page.title, user)
  return true
}

export async function restorePage(id, user = null) {
  const pages = readStorage('pages', INITIAL_PAGES)
  const page = pages.find((p) => p.id === id)
  if (!page) return false

  const updatedPages = pages.map((p) => (p.id === id ? { ...p, status: 'draft', updated_at: new Date().toISOString() } : p))
  writeStorage('pages', updatedPages)

  const trashItems = readStorage('trash', [])
  writeStorage(
    'trash',
    trashItems.filter((t) => !(t.entity_type === 'page' && t.entity_id === id))
  )

  await logActivity(`Restored page "${page.title}" from Trash`, 'page', page.title, user)
  return true
}

export async function deletePagePermanently(id, user = null) {
  const pages = readStorage('pages', INITIAL_PAGES)
  const page = pages.find((p) => p.id === id)
  const title = page?.title || id

  writeStorage(
    'pages',
    pages.filter((p) => p.id !== id)
  )

  // Also remove its sections
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  writeStorage(
    'sections',
    sections.filter((s) => s.page_id !== id)
  )

  const trashItems = readStorage('trash', [])
  writeStorage(
    'trash',
    trashItems.filter((t) => !(t.entity_type === 'page' && t.entity_id === id))
  )

  await logActivity(`Permanently deleted page "${title}"`, 'page', title, user)
  return true
}

export async function duplicatePage(id, user = null) {
  const page = getPageById(id)
  if (!page) return null

  const newId = `page-${Date.now()}`
  const newTitle = `${page.title} (Copy)`
  let newSlug = `${page.slug}-copy`

  // Ensure unique slug
  const allPages = getPages(true)
  let counter = 1
  while (allPages.some((p) => p.slug === newSlug)) {
    counter++
    newSlug = `${page.slug}-copy-${counter}`
  }

  const duplicatedPage = {
    ...page,
    id: newId,
    title: newTitle,
    slug: newSlug,
    status: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: user?.name || 'Admin',
  }

  // Duplicate sections
  const sections = getSectionsByPageId(id)
  const duplicatedSections = sections.map((s, idx) => ({
    ...s,
    id: `sec-${Date.now()}-${idx}`,
    page_id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))

  const allSections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  writeStorage('sections', [...allSections, ...duplicatedSections])

  const updatedPages = [...readStorage('pages', INITIAL_PAGES), duplicatedPage]
  writeStorage('pages', updatedPages)

  await logActivity(`Duplicated page "${page.title}" as "${newTitle}"`, 'page', newTitle, user)
  return duplicatedPage
}

// =============================================================================
// 3. PAGE SECTIONS
// =============================================================================
export function getSectionsByPageId(pageId) {
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  return sections
    .filter((s) => s.page_id === pageId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function getSectionById(id) {
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  return sections.find((s) => s.id === id) || null
}

export async function saveSection(sectionData, user = null) {
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  const isNew = !sectionData.id || !sections.some((s) => s.id === sectionData.id)

  const timestamp = new Date().toISOString()
  const sectionId = sectionData.id || `sec-${Date.now()}`

  let sectionToSave = {
    ...sectionData,
    id: sectionId,
    updated_at: timestamp,
  }

  if (isNew) {
    sectionToSave.created_at = timestamp
    sectionToSave.status = sectionData.status || 'published'
    sectionToSave.visibility = sectionData.visibility || { desktop: true, tablet: true, mobile: true }
    sectionToSave.schedule = sectionData.schedule || { publish_from: null, publish_until: null }
  }

  let updatedSections
  if (isNew) {
    // Put at end of order
    const pageSections = sections.filter((s) => s.page_id === sectionData.page_id)
    sectionToSave.order = sectionData.order ?? pageSections.length + 1
    updatedSections = [...sections, sectionToSave]
  } else {
    updatedSections = sections.map((s) => (s.id === sectionId ? sectionToSave : s))
  }

  writeStorage('sections', updatedSections)
  await logActivity(
    isNew ? `Added section (${sectionToSave.type})` : `Updated section (${sectionToSave.type})`,
    'section',
    sectionToSave.type,
    user
  )

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('page_sections').upsert([sectionToSave])
    } catch (err) {
      console.warn('Supabase sync error for section:', err)
    }
  }

  return sectionToSave
}

export async function reorderSections(pageId, orderedSectionIds, user = null) {
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)

  const updatedSections = sections.map((s) => {
    if (s.page_id === pageId) {
      const idx = orderedSectionIds.indexOf(s.id)
      if (idx !== -1) {
        return { ...s, order: idx + 1, updated_at: new Date().toISOString() }
      }
    }
    return s
  })

  writeStorage('sections', updatedSections)
  await logActivity(`Reordered sections on page`, 'section', pageId, user)
  return true
}

export async function deleteSection(id, user = null) {
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  const target = sections.find((s) => s.id === id)
  if (!target) return false

  const updated = sections.filter((s) => s.id !== id)
  writeStorage('sections', updated)

  await logActivity(`Deleted section (${target.type})`, 'section', target.type, user)
  return true
}

export async function duplicateSection(id, user = null) {
  const section = getSectionById(id)
  if (!section) return null

  const newSection = {
    ...section,
    id: `sec-${Date.now()}`,
    order: (section.order || 0) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  await saveSection(newSection, user)
  return newSection
}

// =============================================================================
// 4. MEDIA LIBRARY
// =============================================================================
export function getMedia() {
  return readStorage('media', INITIAL_MEDIA)
}

export async function saveMediaItem(mediaItem, user = null) {
  const media = getMedia()
  const exists = media.some((m) => m.id === mediaItem.id)

  let updatedMedia
  if (exists) {
    updatedMedia = media.map((m) => (m.id === mediaItem.id ? mediaItem : m))
  } else {
    updatedMedia = [mediaItem, ...media]
  }

  writeStorage('media', updatedMedia)
  await logActivity(`Uploaded media file "${mediaItem.filename}"`, 'media', mediaItem.filename, user)
  return mediaItem
}

export async function deleteMediaItem(id, user = null) {
  const media = getMedia()
  const item = media.find((m) => m.id === id)
  writeStorage(
    'media',
    media.filter((m) => m.id !== id)
  )
  await logActivity(`Deleted media file "${item?.filename || id}"`, 'media', item?.filename || id, user)
  return true
}

// =============================================================================
// 5. MENUS & MEGA MENUS
// =============================================================================
export function getMenus() {
  return readStorage('menus', INITIAL_MENUS)
}

export function getMenuBySlug(slug) {
  const menus = getMenus()
  return menus.find((m) => m.slug === slug) || null
}

export async function saveMenu(menuData, user = null) {
  const menus = getMenus()
  const updated = menus.map((m) => (m.id === menuData.id || m.slug === menuData.slug ? menuData : m))
  writeStorage('menus', updated)
  await logActivity(`Updated navigation menu "${menuData.title}"`, 'menu', menuData.title, user)
  return menuData
}

export function getMegaMenus() {
  return readStorage('mega_menus', INITIAL_MEGA_MENUS)
}

export function getMegaMenuByNavId(navItemId) {
  const list = getMegaMenus()
  return list.find((m) => m.nav_item_id === navItemId && m.enabled) || null
}

export async function saveMegaMenu(megaMenuData, user = null) {
  const list = getMegaMenus()
  const exists = list.some((m) => m.id === megaMenuData.id || m.nav_item_id === megaMenuData.nav_item_id)
  let updated
  if (exists) {
    updated = list.map((m) =>
      m.id === megaMenuData.id || m.nav_item_id === megaMenuData.nav_item_id ? megaMenuData : m
    )
  } else {
    updated = [...list, megaMenuData]
  }
  writeStorage('mega_menus', updated)
  await logActivity(`Updated Mega Menu "${megaMenuData.nav_item_label}"`, 'mega_menu', megaMenuData.nav_item_label, user)
  return megaMenuData
}

// =============================================================================
// 6. REUSABLE BLOCKS
// =============================================================================
export function getReusableBlocks() {
  return readStorage('reusable_blocks', INITIAL_REUSABLE_BLOCKS)
}

export function getReusableBlockById(id) {
  const blocks = getReusableBlocks()
  return blocks.find((b) => b.id === id) || null
}

export async function saveReusableBlock(blockData, user = null) {
  const blocks = getReusableBlocks()
  const isNew = !blockData.id || !blocks.some((b) => b.id === blockData.id)
  const id = blockData.id || `block-${Date.now()}`
  const toSave = {
    ...blockData,
    id,
    updated_at: new Date().toISOString(),
    created_at: blockData.created_at || new Date().toISOString(),
  }

  let updated
  if (isNew) {
    updated = [...blocks, toSave]
  } else {
    updated = blocks.map((b) => (b.id === id ? toSave : b))
  }

  writeStorage('reusable_blocks', updated)
  await logActivity(`Saved reusable block "${toSave.name}"`, 'reusable_block', toSave.name, user)
  return toSave
}

export async function deleteReusableBlock(id, user = null) {
  const blocks = getReusableBlocks()
  const b = blocks.find((item) => item.id === id)
  writeStorage(
    'reusable_blocks',
    blocks.filter((item) => item.id !== id)
  )
  await logActivity(`Deleted reusable block "${b?.name || id}"`, 'reusable_block', b?.name || id, user)
  return true
}

// =============================================================================
// 7. REDIRECTS
// =============================================================================
export function getRedirects() {
  return readStorage('redirects', INITIAL_REDIRECTS)
}

export async function saveRedirect(redirectData, user = null) {
  const list = getRedirects()
  const id = redirectData.id || `redir-${Date.now()}`
  const toSave = { ...redirectData, id, created_at: redirectData.created_at || new Date().toISOString() }

  const exists = list.some((r) => r.id === id)
  const updated = exists ? list.map((r) => (r.id === id ? toSave : r)) : [...list, toSave]

  writeStorage('redirects', updated)
  await logActivity(`Configured redirect: ${toSave.source_url} -> ${toSave.target_url}`, 'redirect', toSave.source_url, user)
  return toSave
}

export async function deleteRedirect(id, user = null) {
  const list = getRedirects()
  writeStorage(
    'redirects',
    list.filter((r) => r.id !== id)
  )
  await logActivity(`Deleted redirect`, 'redirect', id, user)
  return true
}

export function matchRedirect(path) {
  const list = getRedirects()
  const cleanPath = path.toLowerCase().trim()
  return list.find((r) => r.enabled && r.source_url.toLowerCase().trim() === cleanPath) || null
}

// =============================================================================
// 8. REVISIONS
// =============================================================================
export function getRevisions(entityType, entityId) {
  const revisions = readStorage('revisions', [])
  return revisions.filter((r) => r.entity_type === entityType && r.entity_id === entityId)
}

export function createRevision(entityType, entityId, data, author = 'Admin', note = '') {
  const revisions = readStorage('revisions', [])
  const revision = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    entity_type: entityType,
    entity_id: entityId,
    data,
    author,
    note,
    created_at: new Date().toISOString(),
  }
  // Store up to 50 revisions total
  writeStorage('revisions', [revision, ...revisions].slice(0, 50))
  return revision
}

export async function restoreRevision(revisionId, user = null) {
  const revisions = readStorage('revisions', [])
  const rev = revisions.find((r) => r.id === revisionId)
  if (!rev) return null

  if (rev.entity_type === 'page') {
    await savePage(rev.data, user)
  } else if (rev.entity_type === 'settings') {
    await saveSettings(rev.data, user)
  }
  await logActivity(`Restored revision from ${new Date(rev.created_at).toLocaleString()}`, 'revision', rev.entity_id, user)
  return rev
}

// =============================================================================
// 9. TRASH
// =============================================================================
export function getTrashItems() {
  return readStorage('trash', [])
}

// =============================================================================
// 10. USERS & ROLES
// =============================================================================
export function getUsers() {
  return readStorage('users', INITIAL_USERS)
}

export async function saveUser(userData, actor = null) {
  const users = getUsers()
  const id = userData.id || `user-${Date.now()}`
  const toSave = { ...userData, id, created_at: userData.created_at || new Date().toISOString() }

  const exists = users.some((u) => u.id === id)
  const updated = exists ? users.map((u) => (u.id === id ? toSave : u)) : [...users, toSave]

  writeStorage('users', updated)
  await logActivity(`Saved user account "${toSave.name}" (${toSave.role})`, 'user', toSave.name, actor)
  return toSave
}

export async function deleteUser(id, actor = null) {
  const users = getUsers()
  const target = users.find((u) => u.id === id)
  writeStorage(
    'users',
    users.filter((u) => u.id !== id)
  )
  await logActivity(`Removed user account "${target?.name || id}"`, 'user', target?.name || id, actor)
  return true
}

// =============================================================================
// 11. GLOBAL SEARCH
// =============================================================================
export function globalCmsSearch(query) {
  if (!query || query.trim().length === 0) return []
  const q = query.toLowerCase().trim()
  const results = []

  // Search Pages
  const pages = getPages(false)
  pages.forEach((p) => {
    if (p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)) {
      results.push({
        type: 'Page',
        title: p.title,
        subtitle: `Slug: ${p.slug} • Status: ${p.status}`,
        url: `/admin/pages/edit/${p.id}`,
      })
    }
  })

  // Search Sections
  const sections = readStorage('sections', INITIAL_PAGE_SECTIONS)
  sections.forEach((s) => {
    const heading = s.data?.title || s.data?.headlinePart1 || s.data?.kicker || s.type
    if (heading && heading.toLowerCase().includes(q)) {
      const page = pages.find((p) => p.id === s.page_id)
      results.push({
        type: 'Section',
        title: `${s.type.toUpperCase()}: ${heading}`,
        subtitle: `Page: ${page?.title || s.page_id}`,
        url: `/admin/pages/edit/${s.page_id}`,
      })
    }
  })

  // Search Media
  const media = getMedia()
  media.forEach((m) => {
    if (
      m.filename.toLowerCase().includes(q) ||
      (m.alt_text && m.alt_text.toLowerCase().includes(q)) ||
      (m.caption && m.caption.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'Media',
        title: m.filename,
        subtitle: `${m.alt_text || 'No alt text'} • ${m.type}`,
        url: `/admin/media`,
      })
    }
  })

  // Search Menus
  const menus = getMenus()
  menus.forEach((m) => {
    if (m.title.toLowerCase().includes(q) || m.slug.toLowerCase().includes(q)) {
      results.push({
        type: 'Menu',
        title: m.title,
        subtitle: `Slug: ${m.slug}`,
        url: `/admin/menus`,
      })
    }
  })

  // Search Reusable Blocks
  const blocks = getReusableBlocks()
  blocks.forEach((b) => {
    if (b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q)) {
      results.push({
        type: 'Reusable Block',
        title: b.name,
        subtitle: `Type: ${b.type}`,
        url: `/admin/blocks`,
      })
    }
  })

  return results
}
