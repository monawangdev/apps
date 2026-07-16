/**
 * Comments fixture
 * Showcases various JavaScript comment styles for syntax highlighting.
 */

// Single-line comment at the top of the file
const API_VERSION = 'v2';

/**
 * JSDoc-style block comment.
 * @param {string} name - The user name.
 * @param {number} age - The user age.
 * @returns {string} A formatted greeting.
 */
function greet(name, age) {
  /* Inline block comment: validate inputs */
  if (!name || age < 0) {
    throw new Error('Invalid input'); // inline line comment
  }

  /*
   * Multi-line block comment explaining the formatting logic.
   * The template combines the name and age on a single line.
   */
  const message = `Hello ${name}, you are ${age} years old.`;

  /* Multi-line block comment that spans
     more than one physical line without stars on every line. */
  return message;
}

// TODO: add support for more locales
// FIXME: handle null age gracefully
// NOTE: this function is used by the dashboard module

/*
Uncomment to enable debug logging.
console.log('greet', greet('Alice', 30));
*/

const url = 'https://example.com/api'; // trailing URL in line comment
const regex = /https?:\/\//; // this line comment follows a regex literal

// Edge case: comment characters inside strings should not be treated as comments
const notAComment = "// this is inside a string";
const alsoNotAComment = '/* neither is this */';
const templateNotAComment = `${notAComment} and ${alsoNotAComment}`;

/**
 * Nested-looking comment markers are not actually nested in JS.
 * The first */ ends the block, so what follows is code again.
 */
const tricky = 1; /* this is a trailing block */ + 2;

export { greet, API_VERSION, url, regex, notAComment, alsoNotAComment, templateNotAComment, tricky };
