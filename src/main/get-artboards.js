export const getAllArtboardsOnPage = page => {
  const layers = page.layers
  return layers.filter(layer => layer.type === 'Artboard')
}

export const getAllArtboardsInTheDocument = document =>
  document.pages.reduce(
    (acc, page) => [...acc, ...getAllArtboardsOnPage(page)],
    []
  )

export const getAllArtboardsInSelection = selection =>
  Array.from(selection.filter(layer => layer.type === 'Artboard'))
