const forceReprint = (node) => {
  /* eslint-disable no-param-reassign */
  node.original = null;
  /* eslint-disable no-param-reassign */
};

const reprintNode = path => forceReprint(path.value);

const reprintInit = path => forceReprint(path.value.init);

const reprintValue = path => forceReprint(path.value.value);

const reprintElements = path =>
  path.node.elements.forEach(forceReprint);

const declaredObj = j => [
  j.VariableDeclarator,
  {
    init: {
      type: 'ObjectExpression',
    },
  },
];

const objProperty = j => [
  j.Property,
  {
    value: {
      type: 'ObjectExpression',
    },
  },
];

const funcProperty = j => [
  j.Property,
  {
    value: {
      type: 'FunctionExpression',
    },
  },
];

const declaredArray = j => [
  j.VariableDeclarator,
  {
    init: {
      type: 'ArrayExpression',
    },
  },
];

const arrayProperty = j => [
  j.Property,
  {
    value: {
      type: 'ArrayExpression',
    },
  },
];

const arrayElements = j => [
  j.ArrayExpression,
  {
    elements: [{
      type: 'ObjectExpression',
    }],
  },
];

const transform = (file, api, { printOptions = {} }) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const options = Object.assign(printOptions, {
    trailingComma: {
      objects: true,
      arrays: true,
      functions: false,
    },
    wrapColumn: 0,
  });

  const declaredObjects = root
    .find(...declaredObj(j));

  declaredObjects.forEach(reprintInit);

  const objProperties = root
    .find(...objProperty(j));

  objProperties.forEach(reprintValue);

  const funcProperties = root
    .find(...funcProperty(j));

  funcProperties.forEach(reprintNode);

  const declaredArrays = root
    .find(...declaredArray(j));

  declaredArrays.forEach(reprintInit);

  const arrayProperties = root
    .find(...arrayProperty(j));

  arrayProperties.forEach(reprintValue);

  const elementParents = root
    .find(...arrayElements(j));

  elementParents.forEach(reprintElements);

  return root.toSource(options);
};

module.exports = transform;
