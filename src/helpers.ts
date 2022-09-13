export function make2DArray(colsN: number, rowsN: number): any[][] {
  const arr = new Array(colsN);

  for (let i = 0; i < arr.length; i++) arr[i] = new Array(rowsN);

  return arr;
}

export function map2d(
  grid: any[][],
  callback: (col: number, row: number) => any
) {
  for (let col = 0; col < grid.length; col++)
    for (let row = 0; row < grid[0].length; row++) {
      callback(col, row);
    }
}
