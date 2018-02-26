document.addEventListener('contextmenu', event => event.preventDefault())

function make2DArray(cols, rows) {
  let arr = new Array(cols)

  for (let i = 0; i < arr.length; i++)
    arr[i] = new Array(rows)

  return arr
}

let grid
let cols
let rows
const RESO = 10
let counter = 0

p5.disableFriendlyErrors = true

function setup() {
  createCanvas(1700, 950)
  cols = width / RESO
  rows = height / RESO
  frameRate(29)
  grid = make2DArray(cols, rows)

  canvas.getContext('2d', { alpha: false })
  let ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  ctx.webkitImageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false

  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      let x = i * RESO
      let y = j * RESO

      grid[i][j] = new Cell({
        id: counter,
        x,
        y,
        w: RESO - 1,
        h: RESO - 1,
        col: i,
        row: j,
        active: false
      })

      counter++
    }

}

var grow = true


function draw() {
  clear()

  // faster than .map()
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {

      if (mouseIsPressed) {
        if (mouseButton === LEFT)
          grow = true
        if (mouseButton === RIGHT)
          grow = false
      }

      let cell = grid[i][j]

      let state = cell.active

      // count live neightbours
      let numNeightbours = countNeightbours(grid, cell.col, cell.row)


      if (grow)
        growConditions(state, numNeightbours, cell);
      else
        notGrowConditions(state, numNeightbours, cell);


      cell.render()
    }

}

function notGrowConditions(state, numNeightbours, cell) {
  if (!state && numNeightbours == 4) {
    cell.active = true;
  }
  else if (state && (numNeightbours < 4 || numNeightbours > 6))
    cell.active = false;
  else
    cell.active = state;
}

function growConditions(state, numNeightbours, cell) {
  if (!state && numNeightbours == 3) {
    cell.active = true;
  }
  else if (state && (numNeightbours == 0)) {
    neightbours(grid, cell.col, cell.row, (neiX, neiY) => grid[neiX][neiY].active = true);
    state = false;
  }
  else if (state && (numNeightbours < 4 || numNeightbours > 7))
    cell.active = false;
  else
    cell.active = state;
}

function mousePressed(e) {
  const Target = e.target

  if (Target == canvas) {
    const Col = floor(e.pageX / RESO)
    const Row = floor(e.pageY / RESO)

    const Cell = grid[Col][Row]
    console.log(Cell)
    Cell.active = !Cell.active
  }
}


function countNeightbours(grid, x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows

      sum += grid[col][row].active
    }
  }

  sum -= grid[x][y].active
  return sum
}

function neightbours(grid, x, y, cb) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows

      cb(col, row)
    }
  }
}

// neightbours(grid, 24, 40, (neiX, neiY) => {
//   console.log(neiX, neiY)
// })