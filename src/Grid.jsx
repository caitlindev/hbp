import React from 'react'

/**
 * Sets the positions of the given cell in the 2D array, accounting for row and column spans
 * 
 * @param {Array.<Array.<GridCell>>} gridAreas 2D array reference
 * @param {[Number, Number]} position The row/column coordinates from top-left
 * @param {GridCell} cell 
 */
const setCellPosition = (gridAreas, position, cell) => {
  const [row, col] = position
  if (gridAreas[row]) {
    if (!gridAreas[row][col]) {
      gridAreas[row][col] = cell
      return true
    }
  }

  return false
}

const findNextAvailable = (gridAreas, row, col, numColumns) => {
  if (!gridAreas[row][col]) {
    // console.log(gridAreas[row][col])
    return [row, col] // make pointer[1] in the cells loop = newSpot

  } else {
    col++
    if (col >= numColumns) {
      col = 0
      row++
      
      // keeps calling itself on next open position until one is empty
      findNextAvailable(gridAreas, row, col, numColumns)
    }
  }
}

/**
 * Determines where each cell will live in 2D space. Returns the 2D array of cells
 * 
 * @param {Number} numColumns 
 * @param {Array.<GridCell>} cells 
 */
const determineCellPositions = (numColumns, cells) => {
  const numAreas = cells.reduce((sum, cell) => sum + (cell.getColSpan() * cell.getRowSpan()), 0)
  const numRows = Math.ceil(numAreas / numColumns)

  // pre-populate a 2D array with correct number of columns and sufficient rows
  const gridAreas = []
  
  for (let i = 0; i < numRows; i++) {
    gridAreas.push(new Array(numColumns))
  }

  // iterate through each cell and set the proper positions in the array
  let pointer = [0, 0]
  
  cells.forEach(cell => {
    const [row, col] = pointer
    const colSpan = cell.getColSpan()
    const rowSpan = cell.getRowSpan()

    // --------- WRITE CODE HERE ----------

    for (let j = 0; j < colSpan; j++) {
      for (let r = 0; r < rowSpan; r++) {

        // find next available
        console.log(findNextAvailable(gridAreas, (pointer[0]+r), pointer[1], numColumns))

        setCellPosition(gridAreas, [pointer[0] + r, pointer[1]], cell)
      }
      
      pointer[1]++
      if (pointer[1] >= numColumns) {
        pointer[1] = 0
        pointer[0]++
      }
    }
  })
  
  // Compare against `End Result.json`
  // console.log("gridAreas", gridAreas)

  return gridAreas
}

// This is the actual Grid component
export default ({content}) => {
  const cellIDPrefix = 'CELL_'
  const numColumns = content.getNumberOfColumns()
  const cells = content.getCells()
  const gridAreas = determineCellPositions(numColumns, cells)
  const renderedCells = []
  let columnWidths = content.getColumnWidths()

  if (!columnWidths) {
    columnWidths = new Array(numColumns).fill('1')
  }
  columnWidths = columnWidths.map(width => width.includes('px') ? width : width + 'fr').join(' ')
  
  const gridStyles = {
    display: 'grid',
    msGridColumns: columnWidths,
    gridTemplateColumns: columnWidths,  
    // format by cell ID:
    gridTemplateAreas: '\'' + gridAreas.map(row => row.map(cell => cellIDPrefix + cell.getID()).join(' ')).join('\' \'') + '\'', 
  }

  return (
    <div className="grid" style={gridStyles}>
      {gridAreas.map((row, rowIndex) => row.map((cell, columnIndex) => {
        if (!renderedCells.includes(cell)) {    
          const key = cellIDPrefix + cell.getID()

          renderedCells.push(cell)
          
          const cellStyles = {
            msGridRow: rowIndex + 1,
            msGridColumn: columnIndex + 1, 
            msGridColumnSpan: cell.getColSpan(),
            msGridRowSpan: cell.getRowSpan(),
            gridArea: key
          }

          return (
            <div 
              key={key} 
              className={`grid__cell grid__cell-colspan-${cell.getColSpan()} grid__cell-rowspan-${cell.getRowSpan()} grid__column-${columnIndex} grid__row-${rowIndex}`}
              style={cellStyles}
            >
              {cell.getBodyContent()}
            </div>
          )
        }
        return null
      }))}
    </div>
  )
}
