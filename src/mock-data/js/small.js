/**
 * Small JS fixture (~10KB)
 * Basic variables, functions, and control flow.
 */

const CONFIG = {
  appName: 'demo',
  version: '1.0.0',
  maxRetries: 3,
  timeout: 5000,
  features: ['search', 'sort', 'export'],
};

function formatNumber(value, decimals = 2) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '—';
  }
  return value.toFixed(decimals);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: (step = 1) => {
      count += step;
      return count;
    },
    decrement: (step = 1) => {
      count -= step;
      return count;
    },
    getValue: () => count,
  };
}

class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.listeners.has(event)) return;
    const handlers = this.listeners.get(event);
    const index = handlers.indexOf(handler);
    if (index !== -1) handlers.splice(index, 1);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) return;
    this.listeners.get(event).forEach((handler) => handler(payload));
  }
}

async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    return [];
  }
}

function processUsers(users) {
  return users
    .filter((user) => user.active)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export { CONFIG, formatNumber, clamp, debounce, createCounter, EventEmitter, fetchUsers, processUsers };
