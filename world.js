class World {
  constructor(worldMap) {
    try {
      const width = worldMap[0].length;
      const height = worldMap.length;
      this.grid = new Grid(width, height);
      this.fillGrid(worldMap);
    } catch(e) {
      console.error('Wrong map format!');
    }
  }

  fillGrid(worldMap) {
    this.grid.forEach((x, y) => {
      const symbol = worldMap[y][x];
      if (symbol === 'x') {
        const cell = this.grid.getCell(x, y);
        cell.isAlive = true;
      }
    });
  }

  toString() {
    return this.grid.toString();
  }

  tick() {
    const updatedGrid = new Grid(this.grid.width, this.grid.height);
    this.grid.forEach((x, y) => {
      const cell = this.grid.getCell(x, y);
      const updatedCell = this.grid.getUpdatedCell(cell);
      updatedGrid.setCell(updatedCell);
    });
    this.grid = updatedGrid;
  }
}