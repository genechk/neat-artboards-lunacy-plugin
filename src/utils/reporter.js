/** Logs output results to Lunacy console */
export const reportResultsToConsole = elements => {
  console.log('==============================')
  console.log('Number of elements', elements.length)
  console.log('==============================')

  elements.forEach((element, i) => {
    console.log(`Artboard ${++i}: ${element.name}`)
    console.log('==============================')
    console.log('Number of child layers:', element.layers.length)
    const frame = element.frame
    console.log('Artboard frame:')
    console.log('x:', frame.x)
    console.log('y:', frame.y)
    console.log('width:', frame.width)
    console.log('height:', frame.height)
    console.log('==============================')
  })
}
