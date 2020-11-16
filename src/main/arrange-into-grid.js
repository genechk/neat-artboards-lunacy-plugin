import { applyLayout } from './apply-layout'
import {
  normalizeInput,
  calculateGridParams,
  calculateTotalWidthAndHeight,
} from './calculations'

/** Takes an array of elements and rearranges them into grid
 *  @param elements {object[]}
 *  @param cols {number} – number of columns in grid.
 *  @param rows {number} – number of rows in grid. Ignored when `cols` is specified
 *  @param gutter {number} – distance between elements
 *  @param toNewPage {boolean} – if true changes elements’ parent to `newPageName`
 *  @param newPageName {string} – custom name for new page
 */
export const arrangeIntoGrid = (
  elements,
  cols = 8,
  rows,
  gutter = 40,
  parent
) => {
  // 1. Validate and normalize input data
  const { total, normalizedRows, normalizedCols } = normalizeInput(
    elements,
    cols,
    rows,
    gutter
  )

  // 2. Calculate each row’s total width and height
  const gridParams = calculateGridParams(
    elements,
    normalizedCols,
    normalizedRows
  )

  // 3. Get the greatest total width and height to center content in the document
  const [totalWidth, totalHeight] = calculateTotalWidthAndHeight(
    gridParams,
    normalizedRows,
    gutter
  )

  // 4. Calculate grid anchor position
  const initialX = totalWidth / -2
  const initialY = totalHeight / -2

  // 5. Update each artboard’s `x`, `y` and parent based on previous calculations
  // (Side effects)
  applyLayout(
    elements,
    gridParams,
    normalizedCols,
    initialX,
    initialY,
    gutter,
    parent
  )
}
