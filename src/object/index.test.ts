import { describe, expect, it } from 'vitest'
import { omitProperties, pickProperties } from './index'

describe('pickProperties', () => {
  it('should pick specified properties from an object', () => {
    const obj = { id: 1, name: 'Alice', age: 30 }
    const result = pickProperties(obj, ['id', 'name'])
    expect(result).toEqual({ id: 1, name: 'Alice' })
  })

  it('should return an empty object if no keys are specified', () => {
    const obj = { id: 1, name: 'Alice', age: 30 }
    const result = pickProperties(obj, [])
    expect(result).toEqual({})
  })

  it('should return an empty object if the object is empty', () => {
    const obj = {}
    const result = pickProperties(obj, [])
    expect(result).toEqual({})
  })

  it('should handle nested objects', () => {
    const obj = { id: 1, details: { name: 'Alice', age: 30 } }
    const result = pickProperties(obj, ['id', 'details'])
    expect(result).toEqual({ id: 1, details: { name: 'Alice', age: 30 } })
  })
})

describe('omitProperties', () => {
  it('should omit specified properties from an object', () => {
    const obj = { id: 1, name: 'Alice', age: 30 }
    const result = omitProperties(obj, ['age'])
    expect(result).toEqual({ id: 1, name: 'Alice' })
  })

  it('should return the same object if no keys are specified', () => {
    const obj = { id: 1, name: 'Alice', age: 30 }
    const result = omitProperties(obj, [])
    expect(result).toEqual(obj)
  })

  it('should return an empty object if the object is empty', () => {
    const obj = {}
    const result = omitProperties(obj, [])
    expect(result).toEqual({})
  })

  it('should handle nested objects', () => {
    const obj = { id: 1, details: { name: 'Alice', age: 30 } }
    const result = omitProperties(obj, ['details'])
    expect(result).toEqual({ id: 1 })
  })
})
