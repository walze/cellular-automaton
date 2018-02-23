class Cell {
  constructor(obj) {
    this.id = obj.id
    this.x = obj.x
    this.y = obj.y
    this.w = obj.w
    this.h = obj.h
    this.col = obj.col
    this.row = obj.row
    this.active = obj.active
  }

  render() {
    if (this.active)
      rect(this.x, this.y, this.w, this.h)
  }
}