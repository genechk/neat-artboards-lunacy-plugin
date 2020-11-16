/** Updates spatial coordinates for each element
 *  using grid parameters calculated in previous steps.
 *  Conditionally updates parent page
 */
export const applyLayout = (
  elements,
  gridParams,
  normalizedCols,
  x = 0,
  y = 0,
  gutter = 40,
  parent = null
) =>
  elements.reduce(
    (updateData, element) => {
      const { frame } = element
      let { nextX, nextY, currentCol, currentRow } = updateData
      frame.x = nextX
      frame.y = nextY

      if (parent) {
        element.parent = parent
      }

      if (currentCol < normalizedCols) {
        nextX += frame.width + gutter
        console.log(nextX)
        currentCol += 1
      } else {
        nextX = x
        nextY += gridParams[currentRow].height + gutter
        currentRow += 1
        currentCol = 0
      }
      return { nextX, nextY, currentCol, currentRow }
    },
    {
      nextX: x,
      nextY: y,
      currentCol: 0,
      currentRow: 0,
    }
  )
