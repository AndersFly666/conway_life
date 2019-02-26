class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];

    this.init();
  }

  init() {
    this.forEach((x, y) => {
      const cell = new Cell(x ,y);
      this.cells.push(cell);
    });
  }

  forEach(callback) {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        callback(i, j);
      }
    }
  }

  getCell(x, y) {
    return this.cells.find(cell => cell.checkCoords(x, y));
  }
}
