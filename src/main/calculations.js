/** Checks input type and calculates actual number of columns and rows
 *  based on amount of elements
 */
export const normalizeInput = (elements, cols, rows, gutter) => {
  // Check data types
  if (
    typeof elements !== 'object' ||
    !Array.isArray(elements) ||
    (typeof +cols !== 'number' && typeof +rows !== 'number') ||
    typeof +gutter !== 'number'
  ) {
    console.log(
      'Couldn’t calculate grid layout. Check input and try again'
    )
    console.log(typeof elements)
    console.log(Array.isArray(elements))
    console.log(typeof +cols)
    console.log(typeof +rows)
    console.log(typeof +gutter)
    throw new TypeError(
      'Couldn’t calculate grid layout. Check input and try again'
    )
  }

  // Ensures that there is at least 1 column,
  // but no more columns than actual elements
  const total = elements.length
  const normalizedCols = total < cols ? total : Math.ceil(cols) || 1
  // const lastRow = total % cols;

  // Calculates how many rows will elements take given the exact amount of columns
  // rows = (total - lastRow) / cols;
  // rows += lastRow ? 1 : 0;

  // Returns at least one row
  const normalizedRows = isFinite(cols) ? Math.ceil(total / cols) : 1
  return {
    total,
    normalizedRows,
    normalizedCols,
  }
}

/** Calculates each row’s minimal width and height based on elements params.
 *  Returns an array of objects corresponding to each row.
 *  Grid row parameters: height, width and gutter count
 */
export const calculateGridParams = (elements, cols, rows) =>
  elements.reduce((gridParams, element, i) => {
    const colIndex = i % cols
    const rowIndex = (i - colIndex) / cols
    const { frame } = element
    const rowParams = gridParams[rowIndex] || {
      width: 0,
      height: 0,
      gutterCount: 0,
    }

    // Keeps previously processed rows
    const staticGridParams = gridParams[rowIndex]
      ? gridParams.slice(0, -1)
      : gridParams
    return [
      ...staticGridParams,
      // Updates width, height and gutter count for current row
      {
        width: rowParams.width + frame.width,
        height:
          frame.height > rowParams.height
            ? frame.height
            : rowParams.height,
        gutterCount: ++rowParams.gutterCount,
      },
    ]
  }, [])

/** Uses grid parameters to calculate total width and height for that grid */
export const calculateTotalWidthAndHeight = (gridParams, rows, gutter) => {
  const vertGutter = gutter * (rows - 1)
  return gridParams.reduce(
    (tuple, rowParams) => {
      const [totalWidth, totalHeight] = tuple
      const { width, height, gutterCount } = rowParams
      const rowWidth = gutterCount * gutter + width

      return [
        totalWidth > rowWidth ? totalWidth : rowWidth,
        totalHeight + height,
      ]
    },
    [0, vertGutter]
  )
}
