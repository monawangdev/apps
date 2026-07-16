/**
 * Error handling fixture
 * Try/catch patterns, error classes, and validation helpers.
 */

class BaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

class NotFoundError extends BaseError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND');
    this.resource = resource;
    this.id = id;
  }
}

class ValidationError extends BaseError {
  constructor(message, field) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
  }
}

class ConflictError extends BaseError {
  constructor(message) {
    super(message, 'CONFLICT');
  }
}

function tryCatch(fn, onError) {
  try {
    return fn();
  } catch (error) {
    if (typeof onError === 'function') {
      return onError(error);
    }
    return null;
  }
}

async function tryCatchAsync(fn, onError) {
  try {
    return await fn();
  } catch (error) {
    if (typeof onError === 'function') {
      return onError(error);
    }
    return null;
  }
}

function assertNotEmpty(value, field) {
  if (value === undefined || value === null || value === '') {
    throw new ValidationError(`${field} is required`, field);
  }
}

function assertValidEmail(value, field = 'email') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new ValidationError(`${field} must be a valid email`, field);
  }
}

function assertInRange(value, min, max, field) {
  if (value < min || value > max) {
    throw new ValidationError(`${field} must be between ${min} and ${max}`, field);
  }
}

function handleApiError(error) {
  if (error instanceof NotFoundError) {
    return { status: 404, body: { error: error.message, code: error.code } };
  }
  if (error instanceof ValidationError) {
    return { status: 400, body: { error: error.message, code: error.code, field: error.field } };
  }
  if (error instanceof ConflictError) {
    return { status: 409, body: { error: error.message, code: error.code } };
  }
  return { status: 500, body: { error: 'Internal server error', code: 'INTERNAL_ERROR' } };
}

function safeJsonParse(input, fallback = null) {
  try {
    return JSON.parse(input);
  } catch (error) {
    return fallback;
  }
}

function wrapAsync(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export {
  BaseError,
  NotFoundError,
  ValidationError,
  ConflictError,
  tryCatch,
  tryCatchAsync,
  assertNotEmpty,
  assertValidEmail,
  assertInRange,
  handleApiError,
  safeJsonParse,
  wrapAsync,
};
