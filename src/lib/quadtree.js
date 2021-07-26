// http://what-when-how.com/Tutorial/topic-174dp6f/Developing-Games-With-Ruby-173.html

export class QuadTree {
  // Arbitrary constant to indicate how many elements can be stored in this quad
  // tree node
  static QT_NODE_CAPACITY = 10;
  static QT_MAX_DEPTH = 10

  static containsPoint(source, point) {
    return point.x >= source.left
      && point.x <= source.right
      && point.y >= source.top
      && point.y <= source.bottom;
  }

  static containsRectangle(source, rectangle) {
    return source.left <= rectangle.left
      && source.right >= rectangle.right
      && source.top <= rectangle.top
      && source.bottom >= rectangle.bottom;
  }

  static intersectsRectangle(r1, r2) {
    return !(r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
  }

  constructor(boundary) {
    this.boundary = boundary;

    // Rectangles in this quad tree node
    this.items = [];

    // Children
    this.nodes = [];
  }

  // The `level` arg is currently only used to make sure overflowing items are
  // not lost
  insert(item, level = 0) {
    if (!QuadTree.intersectsRectangle(this.boundary, item.getBoundingBox())) {
      return false // object cannot be inserted
    }

    if (level === QuadTree.QT_MAX_DEPTH || (this.items.length < QuadTree.QT_NODE_CAPACITY && this.nodes.length === 0)) {
      this.items.push(item);
      return true;
    }

    if (this.nodes.length === 0) {
      this.subdivide();
    }

    level += 1
    const handled = this.nodes.reduce((acc, node) => {
      return node.insert(item, level) || acc
    }, false)

    if (!handled) {
      this.items.push(item);
    }

    return true;
  }

  queryPoint(point) {
    if (!QuadTree.containsPoint(this.boundary, point)) {
      return new Set();
    }

    const elementsAtPoint = this.items.filter(item => {
      return QuadTree.containsPoint(item.getBoundingBox(), point);
    });

    if (this.nodes.length === 0) {
      return new Set(elementsAtPoint);
    }

    return new Set([
      ...elementsAtPoint,
      ...this.nodes.flatMap(node => [...node.queryPoint(point)]),
    ]);
  }

  clear() {
    this.nodes = []
    this.items = []
  }

  subdivide() {
    const { top, left, bottom, right } = this.boundary;

    const northWest = { left, top, bottom: top + (bottom - top) / 2, right: left + (right - left) / 2 };
    const northEast = { left: left + (right - left) / 2, top, bottom: top + (bottom - top) / 2, right };
    const southWest = { left, top: top + (bottom - top) / 2, bottom, right: left + (right - left) / 2 };
    const southEast = { left: left + (right - left) / 2, top: top + (bottom - top) / 2, bottom, right };

    this.nodes = [
      new QuadTree(northWest),
      new QuadTree(northEast),
      new QuadTree(southWest),
      new QuadTree(southEast),
    ];
  }
}