import {
  ParticleContainer,
  Sprite,
  Texture,
  Renderer,
  Ticker,
  Container,
} from "pixi.js";
import { Cell, ICellContructor } from "./Cell";
import { make2DArray, map2d } from "./helpers";

const view = document.querySelector("canvas");
if (!view) throw new Error("No canvas found");

const APP = new Renderer({
  view,
  width: window.innerWidth,
  height: window.innerHeight,
  powerPreference: "high-performance",
  antialias: false,
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

const RESO = 3;
const cols = Math.round(APP.view.width / RESO);
const rows = Math.round(APP.view.height / RESO);

const grid: Cell[][] = make2DArray(cols, rows);

console.log({ grid });
console.log(`Rendered ${cols} Columns and ${rows} Rows`);
console.log(`Width: ${APP.view.width}, Height: ${APP.view.height}`);

const container = new Container();

map2d(grid, (col, row) => {
  const x = col * RESO;
  const y = row * RESO;

  const cellOptions: ICellContructor = {
    grid,
    x,
    y,
    w: RESO - 1,
    h: RESO - 1,
    col,
    row,
  };

  grid[col][row] = new Cell(cellOptions);

  container.addChild(grid[col][row]);
});

Ticker.system.add(() => {
  setTimeout(() => {
    map2d(grid, (col, row) => {
      const cell = grid[col][row];

      growConditions(cell);
    });
  });

  APP.render(container);
});

view.addEventListener("mousedown", (e) => {
  const cell = click(e);
  if (!cell) return;

  cell!.visible = !cell!.visible;
});

function growConditions(cell: Cell) {
  const numNeightbours = cell.countActiveNeighbors();
  const state = cell.visible;

  if (!state && numNeightbours === 3) cell.visible = !cell.visible;
  else if (state && numNeightbours === 0)
    cell
      .neighborhood()
      .all.map((neighbor) => (neighbor.visible = !neighbor.visible));
  else if (state && (numNeightbours < 4 || numNeightbours > 7))
    cell.visible = !cell.visible;
  else cell.visible = state;
}

function click(e: MouseEvent) {
  const Col = Math.floor(e.pageX / RESO);
  const Row = Math.floor(e.pageY / RESO);

  return grid[Col][Row];
}
