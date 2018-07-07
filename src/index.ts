import { Application } from 'pixi.js'
import { Cell, ICellContructor } from './Cell';

const APP = new Application({
  width: 900,
  height: 600,
  powerPreference: "high-performance",
})

document.body.appendChild(APP.view)
document.addEventListener('contextmenu', e => e.preventDefault())

function make2DArray(colsN: number, rowsN: number) {
  const arr = new Array(colsN)

  for (let i = 0; i < arr.length; i++)
    arr[i] = new Array(rowsN)

  return arr
}

const RESO = 2
const cols = APP.view.width / RESO
const rows = APP.view.height / RESO
const grid = make2DArray(cols, rows)

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

// faster than .map()
for (let i = 0; i < cols; i++)
  for (let j = 0; j < rows; j++) {

    const cell = grid[i][j]

    cell.visible = true
  }

// APP.view.addEventListener('click', e => mousePressed(e))

// function notGrowConditions(state, numNeightbours, cell) {
//   if (!state && numNeightbours == 4) {
//     cell.visible = true;
//   }
//   else if (state && (numNeightbours < 4 || numNeightbours > 6))
//     cell.visible = false;
//   else
//     cell.visible = state;
// }

// function growConditions(state, numNeightbours, cell) {
//   if (!state && numNeightbours == 3) {
//     cell.visible = !cell.visible;
//   }
//   else if (state && (numNeightbours == 0)) {
//     neightbours(grid, cell.col, cell.row, (neiX, neiY) => grid[neiX][neiY].visible = !grid[neiX][neiY].visible);
//     //state = false;
//   }
//   else if (state && (numNeightbours < 4 || numNeightbours > 7))
//     cell.visible = !cell.visible;
//   else
//     cell.visible = state;
// }

// function mousePressed(e) {
//   const Target = e.target

//   if (Target == APP.view) {
//     const Col = Math.floor(e.pageX / RESO)
//     const Row = Math.floor(e.pageY / RESO)

//     const Cell = grid[Col][Row]
//     console.log(Cell)
//     Cell.visible = !Cell.visible
//   }
// }

// function countNeightbours(grid, x, y) {
//   let sum = 0
//   for (let i = -1; i < 2; i++) {
//     for (let j = -1; j < 2; j++) {
//       let col = (x + i + cols) % cols
//       let row = (y + j + rows) % rows

//       sum += grid[col][row].visible
//     }
//   }

//   sum -= grid[x][y].visible
//   return sum
// }

// function neightbours(grid, x, y, cb) {
//   for (let i = -1; i < 2; i++) {
//     for (let j = -1; j < 2; j++) {
//       let col = (x + i + cols) % cols
//       let row = (y + j + rows) % rows

//       cb(col, row)
//     }
//   }
// }
