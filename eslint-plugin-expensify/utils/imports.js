function addNamedImport(context, fixer, importNode, importName, importPath, importAsType = false) {
  const fixes = [];
  
  if (importNode) {
      const alreadyImported = importNode.specifiers.some(
          specifier => specifier.imported.name === importName
      );

      if(!alreadyImported) {
          const lastSpecifier = importNode.specifiers[importNode.specifiers.length - 1];

          // Add ValueOf to existing type-fest import
          fixes.push(fixer.insertTextAfter(lastSpecifier, `, ${importName}`));
      }
  } else {
      // Add import if it doesn't exist
      fixes.push(
          fixer.insertTextBefore(
              context.getSourceCode().ast.body[0],
              `import ${importAsType ? "type " : ""}{${importName}} from '${importPath}';\n`
          )
      );
  }

  return fixes;
}

module.exports = {
  addNamedImport
};
