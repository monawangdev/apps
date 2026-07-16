# Complete Markdown Example

This document exercises the full CommonMark feature set in a single file.

## Headings

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Emphasis

*Italic*, **bold**, ***bold italic***, ~~strikethrough~~, and `inline code`.

## Lists

### Unordered

- Apple
- Banana
  - Nested child
  - Another child
- Cherry

### Ordered

1. First
2. Second
   1. Nested ordered
   2. Nested ordered two
3. Third

### Task list

- [x] Done task
- [ ] Pending task
- [ ] Another pending

## Links and Images

[Inline link](https://example.com)

[Reference link][ref]

[ref]: https://example.org "Reference title"

![Alt text](https://example.com/image.png "Image title")

## Blockquotes

> First level quote.
> Continued line.
>
> > Nested quote.

## Code

Inline `const x = 1;` code.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

```python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## Tables

| Name  | Role     | Active |
| :---- | :------: | -----: |
| Alice | Admin    | Yes    |
| Bob   | Editor   | No     |
| Carol | Viewer   | Yes    |

## Horizontal Rule

---

## Footnotes

Here is a footnote reference.[^1]

[^1]: Here is the footnote definition.

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## HTML Blocks

<div class="note">
  <p>Raw HTML is preserved as-is.</p>
</div>

## Autolinks

Visit <https://example.com> or email <test@example.com>.
