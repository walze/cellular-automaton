import { Graphics } from 'pixi.js'

export interface ICellContructor {
  col: number
  row: number
  color?: string
  x: number
  y: number
  w: number
  h: number
}

export class Cell extends Graphics {

  public col: number
  public row: number

  constructor(obj: ICellContructor) {
    super()

    this.col = obj.col
    this.row = obj.row

    const color = Number(`0x${obj.color || 'FFFFFF'}`)

    this.beginFill(color);
    this.drawRect(obj.x, obj.y, obj.w, obj.h);
    this.endFill();
  }
}
