import { QuadTree } from './quadtree';

QuadTree.QT_NODE_CAPACITY = 4;

class Rectangle {
  constructor(boundingBox) {
    this.boundingBox = boundingBox
  }

  getBoundingBox() {
    return this.boundingBox
  }
}

describe('Quadtree', () => {
  let quadTree;

  beforeEach(() => {
    quadTree = new QuadTree({ top: 0, left: 0, bottom: 10, right: 10 });
  });

  test('Should subdivide', () => {
    quadTree.subdivide();
    expect(quadTree.nodes[0].boundary).toEqual({ top: 0, left: 0, bottom: 5, right: 5 });
    expect(quadTree.nodes[1].boundary).toEqual({ top: 0, left: 5, bottom: 5, right: 10 });
    expect(quadTree.nodes[2].boundary).toEqual({ top: 5, left: 0, bottom: 10, right: 5 });
    expect(quadTree.nodes[3].boundary).toEqual({ top: 5, left: 5, bottom: 10, right: 10 });
  });

  test('should not insert point outside boundary', () => {
    expect(quadTree.insert(new Rectangle({ top: 11, left: 11, bottom: 12, right: 12 }))).toBeFalsy();
    expect(quadTree.nodes.length).toBe(0);
  });

  test('should insert point if it doesn\'t have any subdivisions', () => {
    const rectangle = new Rectangle({ top: 4, left: 4, bottom: 6, right: 6 });
    expect(quadTree.insert(rectangle)).toBeTruthy();
    expect(quadTree.items[0]).toBe(rectangle);
    expect(quadTree.nodes.length).toBe(0);
  });

  describe('Saturated tree', () => {
    const r1 = new Rectangle({ top: 4, left: 4, bottom: 6, right: 6 });
    const r2 = new Rectangle(  {top: 4, left: 4, bottom: 6, right: 6 });
    const r3 = new Rectangle({ top: 4, left: 4, bottom: 6, right: 6 });
    const r4 = new Rectangle({ top: 4, left: 4, bottom: 6, right: 6 });

    beforeEach(() => {
      quadTree.insert(r1);
      quadTree.insert(r2);
      quadTree.insert(r3);
      quadTree.insert(r4);
    });

    test('should subdivide and insert in north west quad', () => {
      const rectangle = new Rectangle({ top: 1, left: 1, bottom: 4, right: 4 });
      quadTree.insert(rectangle);

      expect(quadTree.nodes[0].items[0]).toBe(rectangle);
      expect(quadTree.nodes[1].items.length).toBe(0);
      expect(quadTree.nodes[2].items.length).toBe(0);
      expect(quadTree.nodes[3].items.length).toBe(0);
    });

    test('should subdivide and insert in north east quad', () => {
      const rectangle = new Rectangle({ top: 1, left: 6, bottom: 4, right: 9 });
      quadTree.insert(rectangle);

      expect(quadTree.nodes[0].items.length).toBe(0);
      expect(quadTree.nodes[1].items[0]).toBe(rectangle);
      expect(quadTree.nodes[2].items.length).toBe(0);
      expect(quadTree.nodes[3].items.length).toBe(0);
    });

    test('should subdivide and insert in south west quad', () => {
      const rectangle = new Rectangle({ left: 1, top: 6, bottom: 9, right: 4 });
      quadTree.insert(rectangle);

      expect(quadTree.nodes[0].items.length).toBe(0);
      expect(quadTree.nodes[1].items.length).toBe(0);
      expect(quadTree.nodes[2].items[0]).toBe(rectangle);
      expect(quadTree.nodes[3].items.length).toBe(0);
    });

    test('should subdivide and insert in south east quad', () => {
      const rectangle = new Rectangle({ left: 6, top: 6, bottom: 9, right: 9 });
      quadTree.insert(rectangle);

      expect(quadTree.nodes[0].items.length).toBe(0);
      expect(quadTree.nodes[1].items.length).toBe(0);
      expect(quadTree.nodes[2].items.length).toBe(0);
      expect(quadTree.nodes[3].items[0]).toBe(rectangle);
    });

    test('should subdivide and insert straddling rectangle in all child nodes', () => {
      const rectangle = new Rectangle({ left: 4, top: 4, bottom: 6, right: 6 });
      quadTree.insert(rectangle);

      expect(quadTree.items.length).toBe(4);

      expect(quadTree.nodes[0].items[0]).toBe(rectangle);
      expect(quadTree.nodes[1].items[0]).toBe(rectangle);
      expect(quadTree.nodes[2].items[0]).toBe(rectangle);
      expect(quadTree.nodes[3].items[0]).toBe(rectangle);
    });

    test('should subdivide and insert straddling rectangle in north child nodes', () => {
      const rectangle = new Rectangle({left: 4, top: 2, bottom: 4, right: 6})
      quadTree.insert(rectangle);

      expect(quadTree.items.length).toBe(4);
      expect(quadTree.nodes[0].items[0]).toBe(rectangle);
      expect(quadTree.nodes[1].items[0]).toBe(rectangle);
      expect(quadTree.nodes[2].items.length).toBe(0);
      expect(quadTree.nodes[3].items.length).toBe(0);
    })

    test('should subdivide and insert straddling rectangle in south child nodes', () => {
      const rectangle = new Rectangle({left: 4, top: 6, bottom: 8, right: 6})
      quadTree.insert(rectangle);

      expect(quadTree.items.length).toBe(4);
      expect(quadTree.nodes[0].items.length).toBe(0);
      expect(quadTree.nodes[1].items.length).toBe(0);
      expect(quadTree.nodes[2].items[0]).toBe(rectangle);
      expect(quadTree.nodes[3].items[0]).toBe(rectangle);
    })

    test('should subdivide and insert straddling rectangle in west child nodes', () => {
      const rectangle = new Rectangle({left: 2, top: 4, bottom: 6, right: 4})
      quadTree.insert(rectangle);

      expect(quadTree.items.length).toBe(4);
      expect(quadTree.nodes[0].items[0]).toBe(rectangle);
      expect(quadTree.nodes[1].items.length).toBe(0);
      expect(quadTree.nodes[2].items[0]).toBe(rectangle);
      expect(quadTree.nodes[3].items.length).toBe(0);
    })

    test('should subdivide and insert straddling rectangle in east child nodes', () => {
      const rectangle = new Rectangle({left: 6, top: 4, bottom: 6, right: 8})
      quadTree.insert(rectangle);

      expect(quadTree.items.length).toBe(4);
      expect(quadTree.nodes[0].items.length).toBe(0);
      expect(quadTree.nodes[1].items[0]).toBe(rectangle);
      expect(quadTree.nodes[2].items.length).toBe(0);
      expect(quadTree.nodes[3].items[0]).toBe(rectangle);
    })
  });

  describe('query rectangles by point', () => {
    describe('single rectangle', () => {
      const rectangle = new Rectangle({ top: 4, left: 4, bottom: 6, right: 6 });

      beforeEach(() => {
        quadTree.insert(rectangle);
      });

      test('should find rectangle inside', () => {
        const results = quadTree.queryPoint({ x: 5, y: 5 });
        expect([...results]).toEqual([rectangle]);
      });

      test('should miss rectangle outside point', () => {
        const results = quadTree.queryPoint({ x: 2, y: 2 });
        expect([...results]).toEqual([]);
      });
    });

    describe('multiple rectangles', () => {
      const r1 = new Rectangle({ id: 'r1', top: 4, left: 4, bottom: 6, right: 6 });
      const r2 = new Rectangle( { id: 'r2', top: 4, left: 4, bottom: 6, right: 6 });
      const r3 = new Rectangle({ id: 'r3', top: 4, left: 4, bottom: 6, right: 6 });
      const r4 = new Rectangle({ id: 'r4', top: 4, left: 4, bottom: 6, right: 6 });
      const r5 = new Rectangle({ id: 'r5', top: 1, left: 1, bottom: 3, right: 3 });
      const r6 = new Rectangle({ id: 'r6', top: 1, left: 7, bottom: 3, right: 9 });
      const r7 = new Rectangle({ id: 'r7', top: 2, left: 5, bottom: 7, right: 10 });
      const r8 = new Rectangle({ id: 'r8', top: 7, left: 0, bottom: 10, right: 3 });
      const r9 = new Rectangle({ id: 'r9', top: 7, left: 0, bottom: 10, right: 3 });
      const r10 = new Rectangle({ id: 'r10', top: 7, left: 0, bottom: 10, right: 3 });
      const r11 = new Rectangle({ id: 'r11', top: 7, left: 0, bottom: 10, right: 3 });
      const r12 = new Rectangle({ id: 'r12', top: 9, left: 0, bottom: 10, right: 1 });
      const r13 = new Rectangle({ id: 'r13', top: 6, left: 0, bottom: 10, right: 3 });

      beforeEach(() => {
        quadTree.insert(r1);
        quadTree.insert(r2);
        quadTree.insert(r3);
        quadTree.insert(r4);
        quadTree.insert(r5);
        quadTree.insert(r6);
        quadTree.insert(r7);
        quadTree.insert(r8);
        quadTree.insert(r9);
        quadTree.insert(r10);
        quadTree.insert(r11);
        quadTree.insert(r12);
        quadTree.insert(r13);
      });

      test('should find rectangles', () => {
        expect([...quadTree.queryPoint({ x: 4.5, y: 4.5 })]).toEqual([r1, r2, r3, r4]);
        expect([...quadTree.queryPoint({ x: 5, y: 5 })]).toEqual([r1, r2, r3, r4, r7]);
        expect([...quadTree.queryPoint({ x: 7.5, y: 2.5 })]).toEqual([r6, r7]);
        expect([...quadTree.queryPoint({ x: 0.5, y: 9.5 })]).toEqual([r8, r9, r10, r11, r12, r13]);
        expect([...quadTree.queryPoint({ x: 2, y: 2 })]).toEqual([r5]);
        expect([...quadTree.queryPoint({ x: 0.5, y: 0.5 })]).toEqual([]);
      });

      test('should clear rectangles', () => {
        quadTree.clear();
        expect(quadTree.nodes.length).toBe(0);
        expect(quadTree.items.length).toBe(0);
      });
    });
  });
});