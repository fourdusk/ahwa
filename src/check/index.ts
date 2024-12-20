/**
 * Checks the type of a value.
 *
 * @param {unknown} val - The value to check.
 * @param {string} type - The type to check against.
 * @returns {boolean} - True if the value is of the specified type, false otherwise.
 */
export const checkType = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

/**
 * Checks if a value is undefined.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is undefined} - True if the value is undefined.
 */
export const isUndefined = (val: unknown): val is undefined => {
  return val === undefined
}

/**
 * Checks if a value is null.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is null} - True if the value is null.
 */
export const isNull = (val: unknown): val is null => {
  return val === null
}

/**
 * Checks if a value is either null or undefined.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is null | undefined} - True if the value is null or undefined.
 */
export const isNullOrUndefined = (val: unknown): val is null | undefined => {
  return isNull(val) || isUndefined(val)
}

/**
 * Checks if a value is a number.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is number} - True if the value is a finite number.
 */
export const isNumber = (val: unknown): val is number => {
  return checkType(val, 'Number') && Number.isFinite(val) && !Number.isNaN(val)
}

/**
 * Checks if a value is a string.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is string} - True if the value is a string.
 */
export const isString = (val: unknown): val is string => {
  return checkType(val, 'String')
}

/**
 * Checks if a value is a boolean.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is boolean} - True if the value is a boolean.
 */
export const isBoolean = (val: unknown): val is boolean => {
  return checkType(val, 'Boolean')
}

/**
 * Checks if a value is an object.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Record<PropertyKey, unknown>} - True if the value is an object.
 */
export const isObject = (val: unknown): val is Record<PropertyKey, unknown> => {
  return checkType(val, 'Object')
}

/**
 * Checks if a value is a symbol.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is symbol} - True if the value is a symbol.
 */
export const isSymbol = (val: unknown): val is symbol => {
  return checkType(val, 'Symbol')
}

/**
 * Checks if a value is a Set.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Set<unknown>} - True if the value is a Set.
 */
export const isSet = (val: unknown): val is Set<unknown> => {
  return checkType(val, 'Set')
}

/**
 * Checks if a value is a WeakSet.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is WeakSet<object>} - True if the value is a WeakSet.
 */
export const isWeakSet = (val: unknown): val is WeakSet<object> => {
  return checkType(val, 'WeakSet')
}

/**
 * Checks if a value is a Map.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Map<unknown, unknown>} - True if the value is a Map.
 */
export const isMap = (val: unknown): val is Map<unknown, unknown> => {
  return checkType(val, 'Map')
}

/**
 * Checks if a value is a WeakMap.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is WeakMap<object, unknown>} - True if the value is a WeakMap.
 */
export const isWeakMap = (val: unknown): val is WeakMap<object, unknown> => {
  return checkType(val, 'WeakMap')
}

/**
 * Checks if a value is an array.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is unknown[]} - True if the value is an array.
 */
export const isArray = (val: unknown): val is unknown[] => {
  return checkType(val, 'Array')
}

/**
 * Checks if a value is a function.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is () => unknown} - True if the value is a function.
 */
export const isFunction = (val: unknown): val is () => unknown => {
  return checkType(val, 'Function')
}

/**
 * Checks if a value is a Date object.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Date} - True if the value is a Date object.
 */
export const isDate = (val: unknown): val is Date => {
  return checkType(val, 'Date')
}

/**
 * Checks if a value is empty.
 *
 * A value is considered empty if it is null, undefined, or an empty string.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is null | undefined | ''} - True if the value is empty.
 */
export const isEmpty = (val: unknown): val is null | undefined | '' => {
  return isNullOrUndefined(val) || (isString(val) && val.trim() === '')
}

/**
 * Checks if a value is strictly empty.
 *
 * A value is considered strictly empty if it is null, undefined, an empty string, or an empty array.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is null | undefined | unknown[] | string} - True if the value is strictly empty.
 */
export const isStrictEmpty = (
  val: unknown
): val is null | undefined | unknown[] | string => {
  return isEmpty(val) || (isArray(val) && val.length === 0)
}

/**
 * Checks if a value is a Promise.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Promise<unknown>} - True if the value is a Promise.
 */
export const isPromise = <T>(val: unknown): val is Promise<T> => {
  return checkType(val, 'Promise')
}

/**
 * Checks if a value is an AsyncFunction.
 *
 * @param {unknown} val - The value to check.
 * @returns {val is Promise<unknown>} - True if the value is an AsyncFunction.
 */
export const isAsyncFunction = <T>(val: unknown): val is Promise<T> => {
  return checkType(val, 'AsyncFunction')
}

/**
 * Checks if two objects are equal.
 *
 * @param {Record<PropertyKey, unknown>} obj1 - The first object to compare.
 * @param {Record<PropertyKey, unknown>} obj2 - The second object to compare.
 * @returns {boolean} - True if the objects are equal, false otherwise.
 */
export const checkObjectsEqual = (
  obj1: Record<PropertyKey, unknown>,
  obj2: Record<PropertyKey, unknown>
) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (
      !(
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        isEqual(obj1[key], obj2[key])
      )
    ) {
      return false
    }
  }
  return true
}

/**
 * Checks if two arrays are equal.
 *
 * @param {unknown[]} arr1 - The first array to compare.
 * @param {unknown[]} arr2 - The second array to compare.
 * @returns {boolean} - True if the arrays are equal, false otherwise.
 */
export const checkArraysEqual = (arr1: unknown[], arr2: unknown[]) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!isEqual(arr1[i], arr2[i])) {
      return false
    }
  }

  return true
}

/**
 * Checks if two values are equal.
 *
 * This function performs a deep comparison of the two values. It handles
 * primitive types, objects, arrays, and special cases like NaN.
 *
 * @param {unknown} value1 - The first value to compare.
 * @param {unknown} value2 - The second value to compare.
 * @returns {boolean} - True if the values are equal, false otherwise.
 */
export const isEqual = (value1: unknown, value2: unknown) => {
  if (Number.isNaN(value1) && Number.isNaN(value2)) {
    return true
  }

  if (value1 === value2) {
    return true
  }

  if (isObject(value1) && isObject(value2)) {
    return checkObjectsEqual(value1, value2)
  }

  if (isArray(value1) && isArray(value2)) {
    return checkArraysEqual(value1, value2)
  }
  return false
}
