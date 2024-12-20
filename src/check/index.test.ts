import { describe, expect, it } from 'vitest'
import {
  checkArraysEqual,
  checkObjectsEqual,
  checkType,
  isArray,
  isAsyncFunction,
  isBoolean,
  isDate,
  isEmpty,
  isEqual,
  isFunction,
  isMap,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPromise,
  isSet,
  isStrictEmpty,
  isString,
  isSymbol,
  isUndefined,
  isWeakMap,
  isWeakSet
} from './index'

describe('checkType', () => {
  it('should return true for matching types', () => {
    expect(checkType(123, 'Number')).toBe(true)
    expect(checkType('test', 'String')).toBe(true)
    expect(checkType({}, 'Object')).toBe(true)
    expect(checkType([], 'Array')).toBe(true)
    expect(checkType(null, 'Null')).toBe(true)
    expect(checkType(undefined, 'Undefined')).toBe(true)
  })

  it('should return false for non-matching types', () => {
    expect(checkType(123, 'String')).toBe(false)
    expect(checkType('test', 'Number')).toBe(false)
    expect(checkType({}, 'Array')).toBe(false)
    expect(checkType([], 'Object')).toBe(false)
    expect(checkType(undefined, 'Null')).toBe(false)
  })
})

describe('isUndefined', () => {
  it('should return true for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return false for defined values', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined([])).toBe(false)
  })
})

describe('isNull', () => {
  it('should return true for null values', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull([])).toBe(false)
  })
})

describe('isNullOrUndefined', () => {
  it('should return true for null or undefined values', () => {
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined(undefined)).toBe(true)
  })

  it('should return false for defined values', () => {
    expect(isNullOrUndefined(0)).toBe(false)
    expect(isNullOrUndefined('')).toBe(false)
    expect(isNullOrUndefined({})).toBe(false)
    expect(isNullOrUndefined([])).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true for finite numbers', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(-123)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber(Number.NaN)).toBe(false)
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(false)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
  })
})

describe('isString', () => {
  it('should return true for string values', () => {
    expect(isString('test')).toBe(true)
    expect(isString('')).toBe(true)
  })

  it('should return false for non-string values', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
  })
})

describe('isBoolean', () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('should return false for non-boolean values', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean(Symbol('symbol'))).toBe(false)
  })
})

describe('isObject', () => {
  it('should return true for object values', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(new Date())).toBe(false)
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    expect(isObject(/(abc)/)).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject(new Set())).toBe(false)
  })

  it('should return false for non-object values', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(Symbol('symbol'))).toBe(false)
  })
})

describe('isSymbol', () => {
  it('should return true for symbol values', () => {
    expect(isSymbol(Symbol('test'))).toBe(true)
    expect(isSymbol(Symbol.for('test'))).toBe(true)
  })

  it('should return false for non-symbol values', () => {
    expect(isSymbol(123)).toBe(false)
    expect(isSymbol('string')).toBe(false)
    expect(isSymbol(true)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol({})).toBe(false)
    expect(isSymbol([])).toBe(false)
  })
})

describe('isSet', () => {
  it('should return true for Set instances', () => {
    expect(isSet(new Set())).toBe(true)
    expect(isSet(new Set([1, 2, 3]))).toBe(true)
  })

  it('should return false for non-Set values', () => {
    expect(isSet(123)).toBe(false)
    expect(isSet('string')).toBe(false)
    expect(isSet(true)).toBe(false)
    expect(isSet(null)).toBe(false)
    expect(isSet(undefined)).toBe(false)
    expect(isSet({})).toBe(false)
    expect(isSet([])).toBe(false)
    expect(isSet(Symbol('symbol'))).toBe(false)
  })
})

describe('isWeakSet', () => {
  it('should return true for WeakSet instances', () => {
    expect(isWeakSet(new WeakSet())).toBe(true)
    expect(isWeakSet(new WeakSet([{}]))).toBe(true)
  })

  it('should return false for non-WeakSet values', () => {
    expect(isWeakSet(123)).toBe(false)
    expect(isWeakSet('string')).toBe(false)
    expect(isWeakSet(true)).toBe(false)
    expect(isWeakSet(null)).toBe(false)
    expect(isWeakSet(undefined)).toBe(false)
    expect(isWeakSet({})).toBe(false)
    expect(isWeakSet([])).toBe(false)
    expect(isWeakSet(Symbol('symbol'))).toBe(false)
    expect(isWeakSet(new Set())).toBe(false)
  })
})

describe('isMap', () => {
  it('should return true for Map instances', () => {
    expect(isMap(new Map())).toBe(true)
    expect(
      isMap(
        new Map([
          [1, 'one'],
          [2, 'two']
        ])
      )
    ).toBe(true)
  })

  it('should return false for non-Map values', () => {
    expect(isMap(123)).toBe(false)
    expect(isMap('string')).toBe(false)
    expect(isMap(true)).toBe(false)
    expect(isMap(null)).toBe(false)
    expect(isMap(undefined)).toBe(false)
    expect(isMap({})).toBe(false)
    expect(isMap([])).toBe(false)
    expect(isMap(Symbol('symbol'))).toBe(false)
    expect(isMap(new Set())).toBe(false)
  })
})

describe('isWeakMap', () => {
  it('should return true for WeakMap instances', () => {
    expect(isWeakMap(new WeakMap())).toBe(true)
    expect(isWeakMap(new WeakMap([[{}, 'value']]))).toBe(true)
  })

  it('should return false for non-WeakMap values', () => {
    expect(isWeakMap(123)).toBe(false)
    expect(isWeakMap('string')).toBe(false)
    expect(isWeakMap(true)).toBe(false)
    expect(isWeakMap(null)).toBe(false)
    expect(isWeakMap(undefined)).toBe(false)
    expect(isWeakMap({})).toBe(false)
    expect(isWeakMap([])).toBe(false)
    expect(isWeakMap(Symbol('symbol'))).toBe(false)
    expect(isWeakMap(new Map())).toBe(false)
  })
})

describe('isArray', () => {
  it('should return true for array values', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(['a', 'b', 'c'])).toBe(true)
    expect(isArray(new Array())).toBe(true)
  })

  it('should return false for non-array values', () => {
    expect(isArray(123)).toBe(false)
    expect(isArray('string')).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(Symbol('symbol'))).toBe(false)
    expect(isArray(new Map())).toBe(false)
    expect(isArray(new Set())).toBe(false)
  })
})

describe('isFunction', () => {
  it('should return true for function values', () => {
    expect(isFunction(() => [])).toBe(true)
    expect(isFunction(() => [])).toBe(true)
    expect(isFunction(async () => [])).toBe(false)
    expect(isFunction(class MyClass {})).toBe(true)
  })

  it('should return false for non-function values', () => {
    expect(isFunction(123)).toBe(false)
    expect(isFunction('string')).toBe(false)
    expect(isFunction(true)).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(Symbol('symbol'))).toBe(false)
  })
})

describe('isDate', () => {
  it('should return true for Date instances', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2023-01-01'))).toBe(true)
  })

  it('should return false for non-Date values', () => {
    expect(isDate(123)).toBe(false)
    expect(isDate('string')).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
    expect(isDate(Symbol('symbol'))).toBe(false)
  })
})

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(false)
    expect(isEmpty({})).toBe(false)
  })

  it('should return false for non-empty values', () => {
    expect(isEmpty('test')).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
})

describe('isStrictEmpty', () => {
  it('should return true for strictly empty values', () => {
    expect(isStrictEmpty(null)).toBe(true)
    expect(isStrictEmpty(undefined)).toBe(true)
    expect(isStrictEmpty('')).toBe(true)
    expect(isStrictEmpty([])).toBe(true)
  })

  it('should return false for non-strictly empty values', () => {
    expect(isStrictEmpty({})).toBe(false)
    expect(isStrictEmpty('test')).toBe(false)
    expect(isStrictEmpty([1, 2, 3])).toBe(false)
    expect(isStrictEmpty(0)).toBe(false)
    expect(isStrictEmpty(false)).toBe(false)
    expect(isStrictEmpty(new Map())).toBe(false)
    expect(isStrictEmpty(new Set())).toBe(false)
  })
})

describe('isPromise', () => {
  it('should return true for Promise instances', () => {
    expect(isPromise(new Promise(resolve => resolve(1)))).toBe(true)
    expect(isPromise(Promise.resolve())).toBe(true)
  })

  it('should return false for non-Promise values', () => {
    expect(isPromise(123)).toBe(false)
    expect(isPromise('string')).toBe(false)
    expect(isPromise(true)).toBe(false)
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise({})).toBe(false)
    expect(isPromise([])).toBe(false)
    expect(isPromise(Symbol('symbol'))).toBe(false)
    expect(isPromise(new Map())).toBe(false)
    expect(isPromise(new Set())).toBe(false)
  })
})

describe('isAsyncFunction', () => {
  it('should return true for async function instances', () => {
    expect(isAsyncFunction(async () => [])).toBe(true)
  })

  it('should return false for non-async function values', () => {
    expect(isAsyncFunction(() => [])).toBe(false)
    expect(isAsyncFunction(123)).toBe(false)
    expect(isAsyncFunction('string')).toBe(false)
    expect(isAsyncFunction(true)).toBe(false)
    expect(isAsyncFunction(null)).toBe(false)
    expect(isAsyncFunction(undefined)).toBe(false)
    expect(isAsyncFunction({})).toBe(false)
    expect(isAsyncFunction([])).toBe(false)
    expect(isAsyncFunction(Symbol('symbol'))).toBe(false)
  })
})

describe('checkObjectsEqual', () => {
  it('should return true for equal objects with same properties and values', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for objects with different keys', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3, c: 4 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(false)
  })

  it('should return false for objects with different values', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(false)
  })

  it('should return false for objects with different lengths', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(false)
  })

  it('should return true for deeply equal objects', () => {
    const obj1 = { a: { c: 3 }, b: 2 }
    const obj2 = { a: { c: 3 }, b: 2 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for deeply different objects', () => {
    const obj1 = { a: { c: 3 }, b: 2 }
    const obj2 = { a: { c: 4 }, b: 2 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(false)
  })

  it('should return false for objects with different types', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: '1', b: 2 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(false)
  })

  it('should return true for empty objects', () => {
    const obj1 = {}
    const obj2 = {}
    expect(checkObjectsEqual(obj1, obj2)).toBe(true)
  })

  it('should return true for objects with same properties and values in different order', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 2, a: 1 }
    expect(checkObjectsEqual(obj1, obj2)).toBe(true)
  })

  it('should return true for nested objects with same properties and values in different order', () => {
    const obj1 = { a: { x: 1, y: 2 }, b: 2 }
    const obj2 = { b: 2, a: { y: 2, x: 1 } }
    expect(checkObjectsEqual(obj1, obj2)).toBe(true)
  })
})

describe('checkArraysEqual', () => {
  it('should return true for equal arrays with same elements', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    expect(checkArraysEqual(arr1, arr2)).toBe(true)
  })

  it('should return false for arrays with different lengths', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for arrays with different elements', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for deeply equal arrays', () => {
    const arr1 = [{ a: 1 }, { b: 2 }]
    const arr2 = [{ a: 1 }, { b: 2 }]
    expect(checkArraysEqual(arr1, arr2)).toBe(true)
  })

  it('should return false for deeply different arrays', () => {
    const arr1 = [{ a: 1 }, { b: 2 }]
    const arr2 = [{ a: 1 }, { b: 3 }]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for empty arrays', () => {
    const arr1: any[] = []
    const arr2: any[] = []
    expect(checkArraysEqual(arr1, arr2)).toBe(true)
  })

  it('should return true for arrays with same elements in different order', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [3, 2, 1]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for arrays of objects with same properties and values in different order', () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }]
    const arr2 = [{ c: 3 }, { a: 1, b: 2 }]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for arrays of objects with different properties', () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }]
    const arr2 = [{ c: 3 }, { a: 1, b: 3 }]
    expect(checkArraysEqual(arr1, arr2)).toBe(false)
  })
})

describe('isEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('test', 'test')).toBe(true)
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(undefined, undefined)).toBe(true)
  })

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual('test', 'TEST')).toBe(false)
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual(null, undefined)).toBe(false)
  })

  it('should return true for equal objects with same properties and values', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for objects with different keys', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2, c: 3 }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return false for objects with different values', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3 }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return true for objects with same properties and values in different order', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 2, a: 1 }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return true for deeply equal objects with same properties and values in different order', () => {
    const obj1 = { a: { x: 1, y: 2 }, b: 2 }
    const obj2 = { b: 2, a: { y: 2, x: 1 } }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for deeply different objects', () => {
    const obj1 = { a: { c: 3 }, b: 2 }
    const obj2 = { b: 2, a: { c: 4 } }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return true for equal arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    expect(isEqual(arr1, arr2)).toBe(true)
  })

  it('should return false for arrays with different lengths', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for arrays with different elements', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for arrays with same elements in different order', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [3, 2, 1]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for arrays of objects with same properties and values in different order', () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }]
    const arr2 = [{ c: 3 }, { a: 1, b: 2 }]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for arrays of objects with different properties', () => {
    const arr1 = [{ a: 1, b: 2 }, { c: 3 }]
    const arr2 = [{ c: 3 }, { a: 1, b: 3 }]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for nested arrays with same elements in different order', () => {
    const arr1 = [
      [1, 2],
      [3, 4]
    ]
    const arr2 = [
      [3, 4],
      [1, 2]
    ]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return false for nested arrays with different elements', () => {
    const arr1 = [
      [1, 2],
      [3, 4]
    ]
    const arr2 = [
      [3, 5],
      [1, 2]
    ]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for empty objects', () => {
    expect(isEqual({}, {})).toBe(true)
  })

  it('should return false for an empty object and a non-empty object', () => {
    expect(isEqual({}, { a: 1 })).toBe(false)
  })

  it('should return false for an empty array and a non-empty array', () => {
    expect(isEqual([], [1])).toBe(false)
  })

  it('should return true for two empty arrays', () => {
    expect(isEqual([], [])).toBe(true)
  })
})
