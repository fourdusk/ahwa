export const isType = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

export const isUndefined = (val: unknown): val is undefined => {
  return val === undefined
}

export const isNull = (val: unknown): val is null => {
  return val === null
}

export const isNullOrUndefined = (val: unknown): val is null | undefined => {
  return isNull(val) || isUndefined(val)
}

export const isNumber = (val: unknown): val is number => {
  return isType(val, 'Number') && Number.isFinite(val) && !Number.isNaN(val)
}

export const isString = (val: unknown): val is string => {
  return isType(val, 'String')
}

export const isBoolean = (val: unknown): val is boolean => {
  return isType(val, 'Boolean')
}

export const isObject = (val: unknown): val is Record<PropertyKey, unknown> => {
  return isType(val, 'Object')
}

export const isSymbol = (val: unknown): val is symbol => {
  return isType(val, 'Symbol')
}

export const isSet = (val: unknown): val is Set<unknown> => {
  return isType(val, 'Set')
}

export const isWeakSet = (val: unknown): val is WeakSet<object> => {
  return isType(val, 'WeakSet')
}

export const isMap = (val: unknown): val is Map<unknown, unknown> => {
  return isType(val, 'Map')
}

export const isWeakMap = (val: unknown): val is WeakMap<object, unknown> => {
  return isType(val, 'WeakMap')
}

export const isArray = (val: unknown): val is unknown[] => {
  return isType(val, 'Array')
}

export const isFunction = (val: unknown): val is () => unknown => {
  return isType(val, 'Function')
}

export const isDate = (val: unknown): val is Date => {
  return isType(val, 'Date')
}

export const isEmpty = (val: unknown): val is null | undefined | string => {
  return isNullOrUndefined(val) || (isString(val) && val.trim() === '')
}

export const isStrictEmpty = (
  val: unknown
): val is null | undefined | unknown[] | string => {
  return isEmpty(val) || (isArray(val) && val.length === 0)
}

export const isPromise = <T>(val: unknown): val is Promise<T> => {
  return isType(val, 'Promise')
}

export const isAsyncFunction = <T>(val: unknown): val is Promise<T> => {
  return isType(val, 'AsyncFunction')
}

export const objectIsEqual = (
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

export const arrayIsEqual = (arr1: unknown[], arr2: unknown[]) => {
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

export const isEqual = (value1: unknown, value2: unknown) => {
  if (Number.isNaN(value1) && Number.isNaN(value2)) {
    return true
  }

  if (value1 === value2) {
    return true
  }

  if (isObject(value1) && isObject(value2)) {
    return objectIsEqual(value1, value2)
  }

  if (isArray(value1) && isArray(value2)) {
    return arrayIsEqual(value1, value2)
  }
  return false
}
