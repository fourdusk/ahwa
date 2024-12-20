import { isNumber } from '@/check/index'

/**
 * Fixes the decimal of a number to a specified number of digits.
 *
 * @param {number} num - The number to be fixed.
 * @param {number} [digit=0] - The number of decimal places to keep. Defaults to 0.
 * @returns {number} - The number fixed to the specified number of decimal places.
 * @throws {Error} - Throws an error if the first or second parameter is not a number.
 */
export const roundToDecimal = (num: number, digit = 0) => {
  if (!isNumber(num)) {
    throw new Error('First param is not number')
  }
  if (!isNumber(digit)) {
    throw new Error('Second param is not number')
  }
  const finalNum =
    Math.round((num + Number.EPSILON) * 10 ** digit) / 10 ** digit
  return Number(finalNum.toFixed(digit))
}

/**
 * Sums an array of numbers, taking into account their decimal places.
 *
 * @param {unknown[]} nums - An array of numbers to be summed.
 * @returns {number | null} - The sum of the numbers, or null if no valid numbers are provided.
 * @throws {Error} - Throws an error if the first parameter is not an array.
 */
export const sumArray = (nums: unknown[]) => {
  if (!Array.isArray(nums)) {
    throw new Error('First param is not array')
  }
  const numList = nums.filter(n => isNumber(n)) as number[]
  if (numList.length === 0) {
    return null
  }
  const maxDigit = numList.reduce((prev, curr) => {
    const dotIndex = String(curr).indexOf('.')
    if (dotIndex !== -1) {
      const splitList = String(curr).split('.')
      const len = splitList[1].length
      if (len > prev) {
        return len
      }
      return prev
    }
    return prev
  }, 0)
  let sum = 0
  const scale = 10 ** maxDigit
  for (const n of numList) {
    sum += roundToDecimal(n * scale, 0)
  }
  return sum / scale
}

/**
 * Multiplies an array of numbers, taking into account their decimal places.
 *
 * @param {unknown[]} nums - An array of numbers to be multiplied.
 * @returns {number | null} - The product of the numbers, or null if no valid numbers are provided.
 * @throws {Error} - Throws an error if the first parameter is not an array.
 */
export const multiplyArray = (nums: unknown[]) => {
  if (!Array.isArray(nums)) {
    throw new Error('First param is not array')
  }
  const numList = nums.filter(n => isNumber(n)) as number[]
  if (numList.length === 0) {
    return null
  }
  const maxDigit = numList.reduce((prev, curr) => {
    const dotIndex = String(curr).indexOf('.')
    if (dotIndex !== -1) {
      const splitList = String(curr).split('.')
      const len = splitList[1].length
      if (len > prev) {
        return len
      }
      return prev
    }
    return prev
  }, 0)
  let sum = 1
  const scale = 10 ** maxDigit
  for (const n of numList) {
    sum *= roundToDecimal(n * scale)
  }
  return sum / scale ** numList.length
}
