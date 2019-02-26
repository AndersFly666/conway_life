class Cell {
  constructor(x, y, isAlive = false) {
    this.vector = new Vector(x, y);
    this.isAlive = isAlive;
  }

  get x() {
    return this.vector.x;
  }

  get y() {
    return this.vector.y;
  }

  checkCoords(x, y) {
    return this.x === x && this.y === y;
  }
}
