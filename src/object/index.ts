export const pickObject = <
  T extends Record<PropertyKey, unknown>,
  K extends keyof T
>(
  obj: T,
  keys: K[]
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(o => keys.includes(o[0] as K))
  ) as Pick<T, K>
}

export const omitObject = <
  T extends Record<PropertyKey, unknown>,
  K extends keyof T
>(
  obj: T,
  keys: K[]
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(o => !keys.includes(o[0] as K))
  ) as Omit<T, K>
}
