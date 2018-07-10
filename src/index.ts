import { Application } from 'pixi.js'
import { Cell, ICellContructor } from './Cell';
import { make2DArray, map2d } from './helpers';

const APP = new Application({
  width: 1000,
  height: 700,
  forceFXAA: true,
  powerPreference: "high-performance",
})

document.body.appendChild(APP.view)
document.addEventListener('contextmenu', e => e.preventDefault())

const RESO = 5
const cols = APP.view.width / RESO
const rows = APP.view.height / RESO

const grid: Cell[][] = make2DArray(cols, rows)

console.log({ grid })
console.log(`Rendered ${cols} Columns and ${rows} Rows`)

map2d(grid, (col, row) => {
  const x = col * RESO
  const y = row * RESO

  const cellOptions: ICellContructor = {
    grid,
    x,
    y,
    w: RESO - 1,
    h: RESO - 1,
    col,
    row,
  }

  grid[col][row] = new Cell(cellOptions)

  grid[col][row].visible = false

  APP.stage.addChild(grid[col][row])

})

const ticker = APP.ticker.add((delta) => {
  // console.log(Math.round(ticker.FPS))

  map2d(grid, (col, row) => {

    const cell = grid[col][row]

    if (true) growConditions(cell);
    // else notGrowConditions(cell);
  })
})

ticker.minFPS = 30

APP.view.addEventListener('mousedown', (e) => {
  const cell = click(e)
  cell!.visible = !cell!.visible

  // APP.view.addEventListener('mousemove', event => {})
})

function growConditions(cell: Cell) {
  const numNeightbours = cell.countActiveNeighbors()
  const active = cell.visible

  if (active && numNeightbours === 0)
    cell.neighborhood().all.map(cell => cell.visible = true)
  else if (active && numNeightbours < 2 && numNeightbours > 3)
    cell.visible = false
  else if (!active && numNeightbours == 3)
    cell.visible = true
}

function click(e: MouseEvent) {
  if (e.target !== APP.view) return

  const Col = Math.floor(e.pageX / RESO)
  const Row = Math.floor(e.pageY / RESO)

  return grid[Col][Row]
}