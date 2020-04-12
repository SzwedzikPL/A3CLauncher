export function getComponentSource(component) {
  const sourceParents = [];

  while (component.$options.name !== 'Launcher') {
    sourceParents.unshift(component.$options.name);
    component = component.$parent;
  }

  return sourceParents.join('.');
}
