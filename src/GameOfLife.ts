export type Grid = Array<Array<boolean>>;

export function nextGeneration(grid: Grid): Grid {
  const newGrid: Array<Array<boolean>> = grid.map((line, x) => {
    return line.map((cell, y) => {
      const aliveNeighbors = getNbAliveNeighbors(grid, x, y);
      return getNewCell(cell, aliveNeighbors);
    })
  });
  return newGrid;
}

export function getNewCell(cell: boolean, aliveNeighbors: number) {
  if (aliveNeighbors < 2)
    return false;
  if (cell && aliveNeighbors === 2 || cell && aliveNeighbors === 3)
    return true;
  if (cell && aliveNeighbors > 3)
    return false;
  if (!cell && aliveNeighbors === 3)
    return true;
  return false;
}

export function getNbAliveNeighbors(grid: Grid, x: number, y: number): number {
  let count = 0;
  if (isAliveCell(grid, x - 1, y - 1)) count++;
  if (isAliveCell(grid, x - 1, y)) count++;
  if (isAliveCell(grid, x - 1, y + 1)) count++;
  if (isAliveCell(grid, x, y - 1)) count++;
  if (isAliveCell(grid, x, y + 1)) count++;
  if (isAliveCell(grid, x + 1, y - 1)) count++;
  if (isAliveCell(grid, x + 1, y)) count++;
  if (isAliveCell(grid, x + 1, y + 1)) count++;
  return count;
}

export function isAliveCell(grid: Grid, x: number, y: number): boolean {
  if (x < 0 || x >= getSizeX(grid)) {
    return false;
  }
  if (y < 0 || y >= getSizeY(grid)) {
    return false;
  }
  return grid[x][y];
}

export function getSizeX(grid: Grid): number {
  return grid[0] ? grid[0].length : 0;
}

export function getSizeY(grid: Grid): number {
  return grid ? grid.length : 0;
}