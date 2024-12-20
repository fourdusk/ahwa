import { describe, expect, it } from 'vitest'
import { multiplyArray, roundToDecimal, sumArray } from './index'

describe('roundToDecimal', () => {
  it('should round a number to the specified number of decimal places', () => {
    expect(roundToDecimal(1.23456, 2)).toBe(1.23)
    expect(roundToDecimal(1.23456, 3)).toBe(1.235)
    expect(roundToDecimal(1.23456, 0)).toBe(1)
  })

  it('should throw an error if the first parameter is not a number', () => {
    expect(() => roundToDecimal('not a number' as any, 2)).toThrow(
      'First param is not number'
    )
  })

  it('should throw an error if the second parameter is not a number', () => {
    expect(() => roundToDecimal(1.23456, 'not a number' as any)).toThrow(
      'Second param is not number'
    )
  })

  it('should handle edge cases', () => {
    expect(roundToDecimal(0, 2)).toBe(0)
    expect(roundToDecimal(1.005, 2)).toBe(1.01)
    expect(roundToDecimal(1.004, 2)).toBe(1.0)
  })
})

describe('sumArray', () => {
  it('should sum an array of numbers', () => {
    expect(sumArray([1, 2, 3])).toBe(6)
    expect(sumArray([1.1, 2.2, 3.3])).toBe(6.6)
    expect(sumArray([-1, -2, -3])).toBe(-6)
  })

  it('should return null if no valid numbers are provided', () => {
    expect(sumArray([])).toBe(null)
    expect(sumArray(['not a number' as any])).toBe(null)
  })

  it('should handle decimal places correctly', () => {
    expect(sumArray([0.1, 0.2, 0.3])).toBe(0.6)
    expect(sumArray([0.1, 0.2, 0.3, 0.4])).toBe(1.0)
  })

  it('should handle mixed valid and invalid numbers', () => {
    expect(sumArray([1, 'not a number' as any, 2])).toBe(3)
    expect(sumArray([1, null, 2])).toBe(3)
  })
})

describe('multiplyArray', () => {
  it('should multiply an array of numbers', () => {
    expect(multiplyArray([1, 2, 3])).toBe(6)
    expect(multiplyArray([1.1, 2.2, 3.3])).toBeCloseTo(7.99, 2)
    expect(multiplyArray([-1, -2, -3])).toBe(-6)
    expect(multiplyArray([-1.1, 0, 2.2])).toBe(-0)
  })

  it('should return null if no valid numbers are provided', () => {
    expect(multiplyArray([])).toBe(null)
    expect(multiplyArray(['not a number' as any])).toBe(null)
  })

  it('should handle decimal places correctly', () => {
    expect(multiplyArray([0.1, 0.2, 0.3])).toBeCloseTo(0.006, 3)
    expect(multiplyArray([0.1, 0.2, 0.3, 0.4])).toBeCloseTo(0.0024, 4)
  })

  it('should handle mixed valid and invalid numbers', () => {
    expect(multiplyArray([1, 'not a number' as any, 2])).toBe(2)
    expect(multiplyArray([1, null, 2])).toBe(2)
  })
})
