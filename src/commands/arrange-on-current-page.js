import { getSelectedDocument } from 'sketch/dom'
import { getInputFromUser, INPUT_TYPE } from 'sketch/ui'
import { getAllArtboardsOnPage } from '../main/get-artboards'
import { arrangeIntoGrid } from '../main/arrange-into-grid'

export default function () {
  getInputFromUser(
    'Set number of columns',
    {
      description:
        'Artboards will be arranged into grid based on that number',
      initialValue: 8,
      type: INPUT_TYPE.string,
    },
    (err, cols) => {
      if (err) {
        // most likely the user canceled the input
        return
      }

      const page = getSelectedDocument().selectedPage
      const artboards = Array.from(getAllArtboardsOnPage(page))
      arrangeIntoGrid(artboards, +cols, null, 40)
    }
  )
}
