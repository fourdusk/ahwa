import { describe, expect, it } from 'vitest'
import { limitConcurrency } from './index'

type PromiseSettledReturnType = {
  status: 'fulfilled' | 'rejected'
  value: any
  reason: any
}

const createTask = (result: string, delay: number) => {
  return () => new Promise(resolve => setTimeout(() => resolve(result), delay))
}

const createRejectedTask = (reason: string, delay: number) => {
  return () =>
    new Promise((_, reject) => setTimeout(() => reject(reason), delay))
}

describe('limitConcurrency', () => {
  it('should execute 6 tasks with a limit of concurrency (2) and maintain order', async () => {
    const tasks = [
      createTask('Task 1', 1000),
      createTask('Task 2', 500),
      createTask('Task 3', 2000),
      createTask('Task 4', 1500),
      createTask('Task 5', 300),
      createTask('Task 6', 800)
    ]

    const results = (await limitConcurrency(
      tasks,
      2
    )) as PromiseSettledReturnType[]

    expect(results).toHaveLength(6)
    expect(results.map(result => result.status)).toEqual([
      'fulfilled',
      'fulfilled',
      'fulfilled',
      'fulfilled',
      'fulfilled',
      'fulfilled'
    ])
    expect(
      results.map(result => result.status === 'fulfilled' && result.value)
    ).toEqual(['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6'])
  })

  it('should handle a mix of fulfilled and rejected tasks while maintaining order', async () => {
    const tasks = [
      createTask('Task 1', 1000),
      createRejectedTask('Error 1', 500),
      createTask('Task 2', 2000),
      createRejectedTask('Error 2', 1500),
      createTask('Task 3', 300),
      createTask('Task 4', 800)
    ]

    const results = (await limitConcurrency(
      tasks,
      2
    )) as PromiseSettledReturnType[]
    expect(results).toHaveLength(6)
    expect(results[0].status).toBe('fulfilled')
    expect(results[1].status).toBe('rejected')
    expect(results[1].reason).toBe('Error 1')
    expect(results[2].status).toBe('fulfilled')
    expect(results[3].status).toBe('rejected')
    expect(results[3].reason).toBe('Error 2')
    expect(results[4].status).toBe('fulfilled')
    expect(results[5].status).toBe('fulfilled')
  })

  it('should return an empty array when no tasks are provided', async () => {
    const results = await limitConcurrency([], 2)
    expect(results).toHaveLength(0)
  })

  it('should handle a single task', async () => {
    const tasks = [createTask('Single Task', 1000)]

    const results = (await limitConcurrency(
      tasks,
      2
    )) as PromiseSettledReturnType[]
    expect(results).toHaveLength(1)
    expect(results[0].status).toBe('fulfilled')
    expect(results[0].value).toBe('Single Task')
  })
})
