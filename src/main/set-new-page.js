import { Page } from 'sketch/dom'

/** Sets the new target page that will be assigned
 *  as parent to the processed artboards
 */
export const setNewPage = (document, name = 'Artboards') => {
  // search the target page in existing pages
  const pages = document.pages.filter(page => page.name === name)
  // return either the existing page or a new page
  if (pages.length === 0) {
    const aggregatorPage = new Page({ name })
    aggregatorPage.parent = document
    return aggregatorPage
  } else {
    return pages[0]
  }
}
