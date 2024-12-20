import { isEmpty } from '@/check/index'
import type { TreeNode } from './types'

/**
 * Flattens a tree structure into a flat list.
 *
 * @template T - The type of the objects in the tree.
 * @param {T[]} tree - An array representing the tree structure.
 * @param {{ childrenKey?: keyof T; isDepthFirst?: boolean }} [props] - Optional properties to customize the conversion.
 * @returns {T[]} - A flat array of objects from the tree.
 */
export const flattenTree = <
  T extends Record<string | number, unknown>,
  C extends keyof T
>(
  tree: T[] = [],
  props?: { childrenKey?: C; isDepthFirst?: boolean }
) => {
  const { childrenKey = 'children', isDepthFirst = true } = props ?? {}
  const stack = tree.slice()
  const result: T[] = []
  while (stack.length > 0) {
    const topItem = stack.shift()
    if (topItem) {
      result.push(topItem)
      const children = topItem[childrenKey]
      if (Array.isArray(children)) {
        if (isDepthFirst) {
          stack.unshift(...children)
        } else {
          stack.push(...children)
        }
      }
    }
  }
  return result
}

/**
 * Builds a tree structure from a flat list.
 *
 * @template T - The type of the objects in the list.
 * @param {T[]} list - An array representing the flat list.
 * @param {{ parentId?: keyof T; id?: keyof T; childrenKey?: string; judgeParentIdFn?: (item: T) => boolean }} [props] - Optional properties to customize the conversion.
 * @returns {TreeNode<T, string>[]} - A tree structure represented as an array of nodes.
 */
export const buildTree = <
  T extends Record<number | string, any>,
  K extends keyof T & (number | string),
  C extends number | string = 'children'
>(
  list: T[],
  props?: {
    parentId?: K
    id?: K
    childrenKey?: C
    judgeParentIdFn?: (item: T) => boolean
  }
): TreeNode<T, C>[] => {
  const {
    parentId = 'parentId',
    id = 'id',
    childrenKey = 'children',
    judgeParentIdFn = (item: T) => isEmpty(item[parentId])
  } = props ?? {}
  const result: TreeNode<T, C>[] = []
  const idMap: {
    [key: number | string]: TreeNode<T, C>
  } = {}

  for (const item of list) {
    idMap[item[id]] = { ...item, [childrenKey]: [] }
  }

  for (const item of list) {
    const pId = item[parentId]
    const cId = item[id]
    if (judgeParentIdFn(item)) {
      result.push(idMap[cId] as TreeNode<T, C>)
    } else {
      const mapItem = idMap[pId]
      mapItem[childrenKey].push(idMap[cId])
    }
  }

  return result
}

/**
 * Returns a new array with unique objects based on a specified property.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} arr - An array of objects from which duplicates will be removed.
 * @param {keyof T} prop - The property used to determine uniqueness.
 * @returns {T[]} - A new array with duplicates removed.
 */
export const uniqueArray = <
  T extends Record<number | string, any>,
  K extends keyof T
>(
  arr: T[],
  prop: K
) => {
  const uniqueItems: T[] = []
  return arr.filter(item => {
    return !uniqueItems.includes(item[prop]) && uniqueItems.push(item[prop])
  })
}
