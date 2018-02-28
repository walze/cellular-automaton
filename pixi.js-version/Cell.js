class Cell extends PIXI.Graphics {
  constructor(obj) {
    super()

    this.col = obj.col
    this.row = obj.row

    this.beginFill(`0x${obj.color || 'FFFFFF'}`);
    this.drawRect(obj.x, obj.y, obj.w, obj.h);
    this.endFill();
  }
}