const forceReprint = (node) => {
  /* eslint-disable no-param-reassign */
  node.original = null;
  /* eslint-disable no-param-reassign */
};

const reprintInit = path => forceReprint(path.value.init);

const reprintValue = path => forceReprint(path.value.value);

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

const transform = (file, api, { printOptions = {} }) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const options = Object.assign(printOptions, {
    trailingComma: true,
    wrapColumn: 0,
  });

  const declaredObjects = root
    .find(...declaredObj(j));

  declaredObjects.forEach(reprintInit);

  const objProperties = root
    .find(...objProperty(j));

  objProperties.forEach(reprintValue);

  const declaredArrays = root
    .find(...declaredArray(j));

  declaredArrays.forEach(reprintInit);

  const arrayProperties = root
    .find(...arrayProperty(j));

  arrayProperties.forEach(reprintValue);

  return root.toSource(options);
};

module.exports = transform;
