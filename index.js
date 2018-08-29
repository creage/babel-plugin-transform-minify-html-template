function minify(quasis) {
  const elements = quasis.filter(element => element.type === 'TemplateElement');

  ['raw', 'cooked'].forEach(type => {
    elements.forEach(element => {
      element.value[type] = element.value[type]
        .replace(/[\n\t\r\s]*</gm, '<')
        .replace(/>[\n\t\r\s]*/gm, '>')
        .replace(/\s{2,}>/gm, '>')
        .replace(/\s{2,}/gm, ' ');
    });
  });
}

module.exports = api => {
  api.assertVersion(7);

  const t = api.types;

  return {
    visitor: {
      CallExpression(path) {
        const node = path.node;

        if (t.isIdentifier(node.callee, { name: 'html' })) {
          if (t.isTemplateLiteral(node.arguments[0])) {
            minify(node.arguments[0].quasis);
            path.replaceWith(node.arguments[0]);
          } else if (t.isTaggedTemplateExpression(node.arguments[0])) {
            minify(node.arguments[0].quasi.quasis);
            path.replaceWith(node.arguments[0]);
          }
        }
      },
      TaggedTemplateExpression(path) {
        const node = path.node;

        if (t.isIdentifier(node.tag, { name: 'html' })) {
          minify(node.quasi.quasis);
          path.replaceWith(node.quasi);
        }
      }
    }
  };
};
