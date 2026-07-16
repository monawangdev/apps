/**
 * Async module fixture
 * Fetch wrappers, promise helpers, and async utilities.
 */

const DEFAULT_TIMEOUT = 10000;
const RETRYABLE_STATUSES = [408, 429, 500, 502, 503, 504];

async function fetchWithTimeout(url, options = {}) {
  const { timeout = DEFAULT_TIMEOUT } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url, options = {}) {
  const { retries = 3, ...fetchOptions } = options;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);
      if (attempt < retries && RETRYABLE_STATUSES.includes(response.status)) {
        throw new Error(`Retryable status: ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  }

  throw lastError;
}

function createPromisePool(tasks, concurrency = 4) {
  const results = new Array(tasks.length);
  let index = 0;

  async function runNext() {
    const currentIndex = index++;
    if (currentIndex >= tasks.length) return;
    try {
      results[currentIndex] = { status: 'fulfilled', value: await tasks[currentIndex]() };
    } catch (error) {
      results[currentIndex] = { status: 'rejected', reason: error };
    }
    await runNext();
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, runNext);
  return Promise.all(workers).then(() => results);
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function allSettledWithTimeout(promises, timeout) {
  return Promise.all(
    promises.map((promise) =>
      Promise.race([
        promise.then((value) => ({ status: 'fulfilled', value })),
        promise.catch((reason) => ({ status: 'rejected', reason })),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeout)
        ).catch((reason) => ({ status: 'rejected', reason })),
      ])
    )
  );
}

export {
  DEFAULT_TIMEOUT,
  RETRYABLE_STATUSES,
  fetchWithTimeout,
  fetchWithRetry,
  createPromisePool,
  deferred,
  allSettledWithTimeout,
};
