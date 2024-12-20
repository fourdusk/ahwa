import { describe, expect, it } from 'vitest'
import { buildTree, flattenTree, uniqueArray } from './index'

describe('flattenTree', () => {
  it('should flatten a tree structure into a flat list (depth-first)', () => {
    const tree = [
      { id: 1, children: [{ id: 2 }, { id: 3 }] },
      { id: 4, children: [{ id: 5 }] }
    ]
    const result = flattenTree(tree)
    expect(result).toEqual([
      { id: 1, children: [{ id: 2 }, { id: 3 }] },
      { id: 2 },
      { id: 3 },
      { id: 4, children: [{ id: 5 }] },
      { id: 5 }
    ])
  })

  it('should flatten a tree structure into a flat list (breadth-first)', () => {
    const tree = [
      { id: 1, children: [{ id: 2 }, { id: 3 }] },
      { id: 4, children: [{ id: 5 }] }
    ]
    const result = flattenTree(tree, { isDepthFirst: false })
    expect(result).toEqual([
      { id: 1, children: [{ id: 2 }, { id: 3 }] },
      { id: 4, children: [{ id: 5 }] },
      { id: 2 },
      { id: 3 },
      { id: 5 }
    ])
  })

  it('should return an empty array when given an empty tree', () => {
    const result = flattenTree([])
    expect(result).toEqual([])
  })
})

describe('buildTree', () => {
  it('should build a tree structure from a flat list', () => {
    const list = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
      { id: 4, parentId: 2 },
      { id: 5, parentId: null }
    ]
    const result = buildTree(list)
    expect(result).toEqual([
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [{ id: 4, parentId: 2, children: [] }]
          },
          { id: 3, parentId: 1, children: [] }
        ]
      },
      { id: 5, parentId: null, children: [] }
    ])
  })

  it('should handle a list with no parent-child relationships', () => {
    const list = [
      { id: 1, parentId: null },
      { id: 2, parentId: null }
    ]
    const result = buildTree(list)
    expect(result).toEqual([
      { id: 1, parentId: null, children: [] },
      { id: 2, parentId: null, children: [] }
    ])
  })

  it('should return an empty array when given an empty list', () => {
    const result = buildTree([])
    expect(result).toEqual([])
  })
})

describe('uniqueArray', () => {
  it('should return an array with unique objects based on a specified property', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ]
    const result = uniqueArray(arr, 'id')
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ])
  })

  it('should return an empty array when given an empty array', () => {
    const result = uniqueArray([], 'id')
    expect(result).toEqual([])
  })

  it('should handle an array with no duplicates', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
    const result = uniqueArray(arr, 'id')
    expect(result).toEqual(arr)
  })
})
