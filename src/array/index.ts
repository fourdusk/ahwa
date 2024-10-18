export const treeToList = <T extends Record<string | number, unknown>>(
  tree: T[] = [],
  props = { childrenKey: 'children', isDepthFirst: true }
) => {
  const { childrenKey, isDepthFirst } = props
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

export const listToTree = <
  T extends {
    [key: string | number]: unknown
  }
>(
  list: T[] = [],
  props = { parentId: 'parentId', childrenId: 'id', childrenKey: 'children' }
) => {
  const { parentId, childrenId, childrenKey } = props
  const result = [] as (
    | T
    | {
        [K in typeof childrenKey]: T
      }
  )[]
  const pIdMap: {
    [key: number | string]: T
  } = {}

  for (const item of list) {
    pIdMap[item[childrenId] as string | number] = item
  }

  for (const item of list) {
    if (item[parentId]) {
      const mapIem = pIdMap[item[parentId] as string | number] as {
        [key: number | string]: T[]
      }
      if (Array.isArray(mapIem[childrenKey])) {
        mapIem[childrenKey].push(pIdMap[item[childrenId] as string | number])
      } else {
        mapIem[childrenKey] = [pIdMap[item[childrenId] as string | number]]
      }
    } else {
      result.push(pIdMap[item[childrenId] as string | number])
    }
  }

  return result
}
