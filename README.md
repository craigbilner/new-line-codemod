# Newline codemod

Break objects and arrays onto new lines and add a trailing comma

## willChange

```js
const foo = [1,2,3];
```

will become

```js
const foo = [
  1,
  2,
  3,
];
```

```js
const bar = {
  foo: [1, 2, 3]
};
```

will become

```js
const bar = {
  foo: [
    1,
    2,
    3,
  ],
};
```

```js
const foo = { a: 1, b: 2, c: 3 };
```

will become

```js
const foo = {
  a: 1,
  b: 2,
  c: 3,
};
```

```js
const bar = { a: { a: 1, b: 2, c: 3 } };
```

will become

```js
const bar = {
  a: {
    a: 1,
    b: 2,
    c: 3,
  },
};
```

## wontChange

```js
const foo = ([ a, b, c, ...args ]) => {};

const bar = foo([1, 2, 3]);

const foo = ({ a, b, c, ...args }) => {};

const bar = foo({ a: 1, b: 2, c: 3 });
```