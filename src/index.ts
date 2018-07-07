import { Application } from 'pixi.js'
import { Cell, ICellContructor } from './Cell';

const APP = new Application({
  width: 1000,
  height: 700,
  powerPreference: "high-performance",
})

document.body.appendChild(APP.view)
document.addEventListener('contextmenu', e => e.preventDefault())

function make2DArray(colsN: number, rowsN: number): any[][] {
  const arr = new Array(colsN)

  for (let i = 0; i < arr.length; i++)
    arr[i] = new Array(rowsN)

  return arr
}

const RESO = 4
const cols = APP.view.width / RESO
const rows = APP.view.height / RESO
const grid: Cell[][] = make2DArray(cols, rows)

for (let i = 0; i < cols; i++)
  for (let j = 0; j < rows; j++) {
    const x = i * RESO
    const y = j * RESO

    const cellOptions: ICellContructor = {
      x,
      y,
      w: RESO - 1,
      h: RESO - 1,
      col: i,
      row: j,
    }

    grid[i][j] = new Cell(cellOptions)

    grid[i][j].visible = false

    APP.stage.addChild(grid[i][j])

  }

APP.ticker.add((delta) => {

  // faster than .map()
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {

      const cell = grid[i][j]

      const state = cell.visible

      // count live neightbours
      const numNeightbours = countNeightbours(grid, cell.col, cell.row)

      if (true)
        growConditions(state, numNeightbours, cell);
      else
        notGrowConditions(state, numNeightbours, cell);
    }

});

APP.view.addEventListener('click', e => mousePressed(e))

function notGrowConditions(state: boolean, numNeightbours: number, cell: Cell) {
  if (!state && numNeightbours === 4) {
    cell.visible = true;
  } else if (state && (numNeightbours < 4 || numNeightbours > 6))
    cell.visible = false;
  else
    cell.visible = state;
}

function growConditions(state: boolean, numNeightbours: number, cell: Cell) {
  if (!state && numNeightbours === 3) {
    cell.visible = !cell.visible;
  } else if (state && (numNeightbours === 0)) {
    neightbours(cell.col, cell.row, (neiX: number, neiY: number) => grid[neiX][neiY].visible = !grid[neiX][neiY].visible);
    // state = false;
  } else if (state && (numNeightbours < 4 || numNeightbours > 7))
    cell.visible = !cell.visible;
  else
    cell.visible = state;
}

function mousePressed(e: MouseEvent) {
  const Target = e.target

  if (Target === APP.view) {
    const Col = Math.floor(e.pageX / RESO)
    const Row = Math.floor(e.pageY / RESO)

    const cell = grid[Col][Row]
    console.log(cell)
    cell.visible = !cell.visible
  }
}

function countNeightbours(gridRef: Cell[][], x: number, y: number) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols
      const row = (y + j + rows) % rows

      sum += Number(gridRef[col][row].visible)
    }
  }

  sum -= Number(gridRef[x][y].visible)
  return sum
}

function neightbours(x: number, y: number, cb: (...args: any[]) => void) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols
      const row = (y + j + rows) % rows

      cb(col, row)
    }
  }
}
