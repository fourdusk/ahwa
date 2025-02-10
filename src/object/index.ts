/**
 * Picks specified properties from an object.
 *
 * @template T - The type of the object from which properties will be picked.
 * @template K - The type of the keys to be picked.
 * @param {T} obj - The object from which to pick properties.
 * @param {K[]} keys - An array of keys representing the properties to pick.
 * @returns {Pick<T, K>} - A new object containing only the picked properties.
 */
export const pickProps = <
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

/**
 * Omits specified properties from an object.
 *
 * @template T - The type of the object from which properties will be omitted.
 * @template K - The type of the keys to be omitted.
 * @param {T} obj - The object from which to omit properties.
 * @param {K[]} keys - An array of keys representing the properties to omit.
 * @returns {Omit<T, K>} - A new object containing all properties except the omitted ones.
 */
export const omitProps = <
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
