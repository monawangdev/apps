/**
 * @file jsdoc-comprehensive.js
 * @description Comprehensive JSDoc test fixture covering all major tag types.
 * @version 1.0.0
 * @since 2024-01-01
 * @author John Doe <john@example.com>
 * @copyright Copyright (c) 2024 Example Corp
 * @license MIT
 *
 * @see {@link https://jsdoc.app} for official JSDoc documentation
 * @see {@link https://github.com/jsdoc/jsdoc} GitHub repository
 * @tutorial getting-started
 */

/**
 * @module jsdoc-comprehensive
 * @description Module demonstrating all JSDoc tag types for syntax highlighting tests.
 * @requires lodash
 * @requires path
 */

import _ from 'lodash';
import path from 'path';

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - User's full name
 * @property {number} age - User's age in years
 * @property {string} [email] - Optional email address
 * @property {Array<string>} roles - List of assigned roles
 * @property {Object} metadata - Additional user metadata
 * @property {Date} metadata.createdAt - Account creation timestamp
 * @property {Date} [metadata.updatedAt] - Last update timestamp
 */

/**
 * @typedef {Object} ApiResponse
 * @template T
 * @property {boolean} success - Whether request succeeded
 * @property {T} data - Response payload
 * @property {string} [message] - Optional status message
 * @property {number} timestamp - Unix timestamp
 */

/**
 * @callback FilterCallback
 * @param {User} user - User to evaluate
 * @param {number} index - Array index
 * @returns {boolean} Whether user matches filter criteria
 */

/**
 * @callback TransformCallback
 * @param {User} user - User to transform
 * @returns {Object} Transformed user object
 */

/**
 * @class
 * @classdesc Base user management class with CRUD operations.
 * @extends EventEmitter
 * @param {Object} config - Configuration object
 * @param {string} config.baseUrl - API base URL
 * @param {number} [config.timeout=5000] - Request timeout in milliseconds
 * @param {Object} [config.headers] - Default request headers
 *
 * @example
 * const manager = new UserManager({
 *   baseUrl: 'https://api.example.com',
 *   timeout: 10000
 * });
 *
 * @example
 * // With custom headers
 * const manager = new UserManager({
 *   baseUrl: 'https://api.example.com',
 *   headers: { 'X-API-Key': 'secret' }
 * });
 */
class UserManager {
    /**
     * @constructor
     * @param {Object} config - Configuration object
     * @param {string} config.baseUrl - API base URL
     * @param {number} [config.timeout=5000] - Request timeout in ms
     */
    constructor(config) {
        /**
         * @private
         * @type {string}
         * @description Base API endpoint URL
         */
        this.baseUrl = config.baseUrl;

        /**
         * @private
         * @type {number}
         * @description Request timeout in milliseconds
         * @default 5000
         */
        this.timeout = config.timeout || 5000;

        /**
         * @protected
         * @type {Object<string, string>}
         * @description HTTP headers for requests
         */
        this.headers = config.headers || {};

        /**
         * @private
         * @type {Map<string, User>}
         * @description In-memory user cache
         */
        this._cache = new Map();
    }

    /**
     * Retrieve a user by ID.
     *
     * @public
     * @async
     * @param {string} userId - Unique user identifier
     * @param {Object} [options] - Query options
     * @param {boolean} [options.forceRefresh=false] - Bypass cache
     * @param {Array<string>} [options.fields] - Fields to include
     * @returns {Promise<User>} User object
     *
     * @throws {TypeError} If userId is not a string
     * @throws {Error} If user not found
     * @throws {NetworkError} If request fails
     *
     * @fires UserManager#userLoaded
     * @listens CacheManager#cacheInvalidated
     *
     * @example
     * // Basic usage
     * const user = await manager.getUser('user-123');
     *
     * @example
     * // With options
     * const user = await manager.getUser('user-123', {
     *   forceRefresh: true,
     *   fields: ['name', 'email']
     * });
     *
     * @see UserManager#getAllUsers
     * @see {@link https://api.example.com/docs/users} API documentation
     */
    async getUser(userId, options = {}) {
        if (typeof userId !== 'string') {
            throw new TypeError('userId must be a string');
        }

        const cacheKey = `${userId}:${JSON.stringify(options)}`;

        if (!options.forceRefresh && this._cache.has(cacheKey)) {
            return this._cache.get(cacheKey);
        }

        const response = await fetch(`${this.baseUrl}/users/${userId}`, {
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout)
        });

        if (!response.ok) {
            throw new Error(`User not found: ${userId}`);
        }

        const user = await response.json();
        this._cache.set(cacheKey, user);

        /**
         * User loaded event.
         *
         * @event UserManager#userLoaded
         * @type {Object}
         * @property {User} user - Loaded user object
         * @property {boolean} fromCache - Whether loaded from cache
         */
        this.emit('userLoaded', { user, fromCache: false });

        return user;
    }

    /**
     * Get all users matching filter criteria.
     *
     * @public
     * @param {FilterCallback} filter - Filter function
     * @returns {Array<User>} Array of matching users
     *
     * @deprecated Use {@link UserManager#searchUsers} instead.
     * @since 1.0.0
     * @version 1.2.0
     *
     * @todo Add pagination support
     * @todo Implement streaming for large datasets
     *
     * @example
     * const activeUsers = manager.getAllUsers(user => user.active);
     */
    getAllUsers(filter) {
        const users = Array.from(this._cache.values());
        return filter ? users.filter(filter) : users;
    }

    /**
     * Search users with advanced query options.
     *
     * @public
     * @async
     * @param {Object} query - Search query object
     * @param {string} [query.name] - Name pattern to match
     * @param {number} [query.minAge] - Minimum age
     * @param {number} [query.maxAge] - Maximum age
     * @param {Array<string>} [query.roles] - Required roles
     * @param {Object} [pagination] - Pagination options
     * @param {number} [pagination.page=1] - Page number
     * @param {number} [pagination.limit=20] - Items per page
     * @returns {Promise<ApiResponse<Array<User>>>} Paginated results
     *
     * @generator
     * @yields {User} Each matching user
     *
     * @example
     * // Generator usage
     * for (const user of manager.searchUsers({ minAge: 18 })) {
     *   console.log(user.name);
     * }
     *
     * @example
     * // Async pagination
     * const { data, total } = await manager.searchUsers(
     *   { roles: ['admin'] },
     *   { page: 1, limit: 10 }
     * );
     */
    async *searchUsers(query, pagination = {}) {
        const { page = 1, limit = 20 } = pagination;
        const users = Array.from(this._cache.values());

        const filtered = users.filter(user => {
            if (query.name && !user.name.includes(query.name)) return false;
            if (query.minAge && user.age < query.minAge) return false;
            if (query.maxAge && user.age > query.maxAge) return false;
            if (query.roles && !query.roles.some(r => user.roles.includes(r))) return false;
            return true;
        });

        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);

        for (const user of paginated) {
            yield user;
        }
    }

    /**
     * Create a new user.
     *
     * @public
     * @async
     * @param {Object} userData - User data
     * @param {string} userData.name - User's full name
     * @param {number} userData.age - User's age
     * @param {string} [userData.email] - Email address
     * @param {Array<string>} [userData.roles=[]] - Initial roles
     * @returns {Promise<User>} Created user with generated ID
     *
     * @throws {ValidationError} If required fields missing
     * @throws {ConflictError} If user already exists
     *
     * @override
     * @abstract
     *
     * @example
     * const newUser = await manager.createUser({
     *   name: 'Alice Smith',
     *   age: 30,
     *   email: 'alice@example.com',
     *   roles: ['user', 'editor']
     * });
     */
    async createUser(userData) {
        if (!userData.name || !userData.age) {
            throw new Error('Name and age are required');
        }

        const user = {
            id: `user-${Date.now()}`,
            ...userData,
            metadata: {
                createdAt: new Date()
            }
        };

        this._cache.set(user.id, user);
        return user;
    }

    /**
     * Update user properties.
     *
     * @protected
     * @param {string} userId - User ID to update
     * @param {Partial<User>} updates - Properties to update
     * @returns {User} Updated user object
     *
     * @virtual
     *
     * @example
     * manager.updateUser('user-123', { age: 31 });
     */
    updateUser(userId, updates) {
        const user = this._cache.get(userId);
        if (!user) throw new Error('User not found');

        Object.assign(user, updates, {
            metadata: {
                ...user.metadata,
                updatedAt: new Date()
            }
        });

        return user;
    }

    /**
     * Delete a user.
     *
     * @private
     * @param {string} userId - User ID to delete
     * @returns {boolean} Whether deletion succeeded
     *
     * @readonly
     *
     * @example
     * const deleted = manager.deleteUser('user-123');
     */
    deleteUser(userId) {
        return this._cache.delete(userId);
    }

    /**
     * Get cache statistics.
     *
     * @static
     * @readonly
     * @type {Object}
     * @property {number} size - Number of cached users
     * @property {number} maxSize - Maximum cache size
     */
    static get cacheStats() {
        return {
            size: this._cache?.size || 0,
            maxSize: 1000
        };
    }
}

/**
 * @interface DataTransformer
 * @description Interface for data transformation strategies.
 * @template T Input type
 * @template U Output type
 */

/**
 * @function
 * @name DataTransformer#transform
 * @param {T} input - Data to transform
 * @returns {U} Transformed data
 */

/**
 * @mixin TimestampMixin
 * @description Adds timestamp tracking to objects.
 */
const TimestampMixin = {
    /**
     * @member TimestampMixin#createdAt
     * @type {Date}
     * @instance
     */
    createdAt: new Date(),

    /**
     * @member TimestampMixin#updatedAt
     * @type {Date}
     * @instance
     */
    updatedAt: new Date(),

    /**
     * Touch the timestamp.
     *
     * @method TimestampMixin#touch
     * @instance
     * @returns {void}
     */
    touch() {
        this.updatedAt = new Date();
    }
};

/**
 * @namespace Utils
 * @description Utility functions for user management.
 * @global
 */
const Utils = {
    /**
     * Format user display name.
     *
     * @function
     * @memberof Utils
     * @param {User} user - User object
     * @param {Object} [options] - Format options
     * @param {boolean} [options.includeAge=false] - Include age in output
     * @returns {string} Formatted display name
     *
     * @inner
     *
     * @example
     * const name = Utils.formatDisplayName(user, { includeAge: true });
     * // => "Alice Smith (30)"
     */
    formatDisplayName(user, options = {}) {
        const { includeAge = false } = options;
        const name = user.name;
        return includeAge ? `${name} (${user.age})` : name;
    },

    /**
     * Validate email format.
     *
     * @function
     * @memberof Utils
     * @param {string} email - Email to validate
     * @returns {boolean} Whether email is valid
     *
     * @constant
     * @type {RegExp}
     * @default
     */
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    /**
     * @enum {string}
     * @readonly
     * @description User role constants
     */
    ROLES: {
        /** @type {string} Administrator role */
        ADMIN: 'admin',
        /** @type {string} Editor role */
        EDITOR: 'editor',
        /** @type {string} Viewer role */
        VIEWER: 'viewer'
    },

    /**
     * @constant
     * @type {number}
     * @default
     * @description Maximum cache size
     */
    MAX_CACHE_SIZE: 1000
};

/**
 * @type {Object<string, UserManager>}
 * @description Registry of user managers by environment
 */
const managerRegistry = {};

/**
 * @member {string}
 * @description Current API version
 * @constant
 * @default
 */
const API_VERSION = 'v2';

/**
 * Create a user manager instance with defaults.
 *
 * @function
 * @param {Partial<Object>} [overrides] - Configuration overrides
 * @returns {UserManager} Configured manager instance
 *
 * @example
 * const manager = createManager({ timeout: 10000 });
 */
function createManager(overrides = {}) {
    return new UserManager({
        baseUrl: 'https://api.example.com',
        timeout: 5000,
        ...overrides
    });
}

/**
 * Process users with transformation pipeline.
 *
 * @param {Array<User>} users - Users to process
 * @param {...TransformCallback} transforms - Transformation functions
 * @returns {Array<Object>} Transformed users
 *
 * @rest
 *
 * @example
 * const processed = processUsers(users,
 *   user => ({ ...user, fullName: user.name }),
 *   user => ({ ...user, ageGroup: user.age > 18 ? 'adult' : 'minor' })
 * );
 */
function processUsers(users, ...transforms) {
    return users.map(user =>
        transforms.reduce((acc, transform) => transform(acc), user)
    );
}

export {
    UserManager,
    Utils,
    managerRegistry,
    API_VERSION,
    createManager,
    processUsers,
    TimestampMixin
};

export default UserManager;
