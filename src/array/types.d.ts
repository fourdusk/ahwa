export type TreeNode<T, K extends number | string> = T & {
  [_K in K]: TreeNode<T, K>[]
}
