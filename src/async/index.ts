/**
 * Controls the concurrency of executing tasks.
 * Allows a limited number of tasks to run simultaneously.
 *
 * @template T - The type of the result returned by the tasks.
 * @param {(() => Promise<T>)[]} fns - An array of functions that return a Promise.
 * @param {number} limit - The maximum number of tasks that can run concurrently.
 * @returns {Promise<PromiseSettledResult<T>[]>} - A Promise that resolves to an array of results for each task,
 * where each result is a PromiseSettledResult indicating whether the task was fulfilled or rejected.
 *
 * @example
 * const tasks = [
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000)),
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 500)),
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 2000)),
 * ];
 *
 * limitConcurrency(tasks, 2).then(results => {
 *   console.log(results); // Outputs the results of the tasks
 * });
 */
export const limitConcurrency = <T>(
  fns: (() => Promise<T>)[] = [],
  limit = 2
): Promise<PromiseSettledResult<T>[]> => {
  const result: Promise<T>[] = []
  const tasks: {
    task: () => Promise<T>
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: unknown) => void
  }[] = []
  let runningCount = 0

  const add = (task: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      tasks.push({ task, resolve, reject })
      run()
    })
  }

  const run = () => {
    while (runningCount < limit && tasks.length > 0) {
      const topItem = tasks.shift()
      if (topItem) {
        const { task, resolve, reject } = topItem
        runningCount += 1
        Promise.resolve(task())
          .then(resolve, reject)
          .finally(() => {
            runningCount -= 1
            run()
          })
      }
    }
  }

  for (const fn of fns) {
    result.push(add(fn))
  }

  return Promise.allSettled(result)
}
