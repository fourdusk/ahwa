import { isNumber } from '@/check/index'

export const fixDecimal = (num: number, digit = 0) => {
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

export const summate = (nums: number[]) => {
  if (!Array.isArray(nums)) {
    throw new Error('First param is not array')
  }
  const numList = nums.filter(n => isNumber(n))
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
  for (const n of nums) {
    sum += fixDecimal(n * scale, 0)
  }
  return sum / scale
}

export const multiply = (nums: number[]) => {
  if (!Array.isArray(nums)) {
    throw new Error('First param is not array')
  }
  const numList = nums.filter(n => isNumber(n))
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
    sum *= fixDecimal(n * scale)
  }
  return sum / scale ** numList.length
}
