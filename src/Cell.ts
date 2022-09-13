import { Sprite, Texture } from "pixi.js";

export interface ICellContructor {
  grid: Cell[][];
  col: number;
  row: number;
  color?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface INeighbors {
  all: Cell[];
  top: {
    left: Cell;
    center: Cell;
    right: Cell;
  };
  center: {
    left: Cell;
    self: Cell;
    right: Cell;
  };
  bottom: {
    left: Cell;
    center: Cell;
    right: Cell;
  };
}

const c = new OffscreenCanvas(1, 1) as any as HTMLCanvasElement;
const ctx = c.getContext("2d") as any as CanvasRenderingContext2D;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1, 1);
const texture = Texture.from(c);

export class Cell extends Sprite {
  public readonly grid: Cell[][];
  public col: number;
  public row: number;
  private _neighborhood: INeighbors | null = null;
  visible = false;

  constructor(obj: ICellContructor) {
    super(texture);

    this.col = obj.col;
    this.row = obj.row;
    this.grid = obj.grid;

    this.x = obj.x;
    this.y = obj.y;
    this.width = obj.w;
    this.height = obj.h;
  }

  public countActiveNeighbors() {
    let sum = 0;

    this.neighborhood().all.map((neighbor) => {
      if (neighbor.visible) sum++;
    });

    return sum;
  }

  public neighborhood(): INeighbors {
    if (this._neighborhood) return this._neighborhood;

    const cols = this.grid.length;
    const rows = this.grid[0].length;

    const neighbors = {
      all: [] as Cell[],
      top: {
        left: this.grid[(this.col - 1 + cols) % cols][
          (this.row - 1 + rows) % rows
        ],
        center:
          this.grid[(this.col - 1 + cols) % cols][(this.row + rows) % rows],
        right:
          this.grid[(this.col - 1 + cols) % cols][(this.row + 1 + rows) % rows],
      },
      center: {
        left: this.grid[(this.col + cols) % cols][(this.row - 1 + rows) % rows],
        self: this,
        right:
          this.grid[(this.col + cols) % cols][(this.row + 1 + rows) % rows],
      },
      bottom: {
        left: this.grid[(this.col + 1 + cols) % cols][
          (this.row - 1 + rows) % rows
        ],
        center:
          this.grid[(this.col + 1 + cols) % cols][(this.row + rows) % rows],
        right:
          this.grid[(this.col + 1 + cols) % cols][(this.row + 1 + rows) % rows],
      },
    };

    neighbors.all = [
      neighbors.top.left,
      neighbors.top.center,
      neighbors.top.right,
      neighbors.center.left,
      neighbors.center.right,
      neighbors.bottom.left,
      neighbors.bottom.center,
      neighbors.bottom.right,
    ];

    this._neighborhood = neighbors;
    return neighbors;
  }
}
