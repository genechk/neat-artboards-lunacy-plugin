import { getSelectedDocument } from 'sketch/dom'
import { getInputFromUser, message, INPUT_TYPE } from 'sketch/ui'
import { getAllArtboardsInSelection } from '../main/get-artboards'
import { arrangeIntoGrid } from '../main/arrange-into-grid'

export default function () {
  const document = getSelectedDocument()
  const selection = document.selectedLayers

  if (selection.isEmpty) {
    message('Nothing is selected')
    return
  }

  const artboards = getAllArtboardsInSelection(selection.layers)

  if (artboards.length === 0) {
    message('You haven’t selected any artboards')
    return
  }

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

      arrangeIntoGrid(artboards, +cols, null, 40)
    }
  )
}
