export const concurrencyControl = <T>(
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
