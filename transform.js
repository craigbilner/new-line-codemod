const forceReprint = ({ node }) => {
  /* eslint-disable no-param-reassign */
  node.original = null;
  /* eslint-disable no-param-reassign */
};

const transform = (file, api, { printOptions = {} }) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const options = Object.assign(printOptions, {
    trailingComma: true,
    wrapColumn: 0,
  });

  root
    .find(j.ObjectExpression)
    .forEach(forceReprint);

  root
    .find(j.ArrayExpression)
    .forEach(forceReprint);

  return root.toSource(options);
};

module.exports = transform;
