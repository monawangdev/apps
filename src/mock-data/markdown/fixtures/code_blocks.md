# Code Blocks

Fenced code with languages and indented code.

## JavaScript

```js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

users.forEach((u) => console.log(u.name));
```

## TypeScript

```ts
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User | undefined {
  return users.find((u) => u.id === id);
}
```

## Python

```python
import math

def hypotenuse(a, b):
    return math.sqrt(a ** 2 + b ** 2)
```

## No Language

```
plain text block
no syntax highlighting
```

## Indented Code

    function legacy() {
      return 42;
    }

## Code Inside List

- First item with code:

  ```json
  { "key": "value" }
  ```

- Second item.
