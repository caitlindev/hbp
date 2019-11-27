export default class Grid {
  constructor(data) {
    this.data = data
  }

  getTitle() {
    return this.data.title
  }

  getNumberOfColumns() {
    return this.data.numColumns
  }

  getColumnWidths() {
    return this.data.columnWidths
  }

  getCells() {
    return this.data.cells
  }
}
