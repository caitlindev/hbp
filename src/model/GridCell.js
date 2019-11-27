export default class GridCell {
  constructor(data) {
    this.data = data
  }

  getID() {
    return this.data.id
  }

  getColSpan() {
    return this.data.colSpan
  }

  getRowSpan() {
    return this.data.rowSpan
  }

  getBodyContent() {
    return this.data.bodyContent
  }
}
