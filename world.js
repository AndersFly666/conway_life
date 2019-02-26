class World {
  constructor(width, height) {
    this.grid = new Grid(width, height);
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