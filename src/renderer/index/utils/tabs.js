import log from '@/utils/log';

export function onComponentCreated() {
  if (this.$options._source !== null) return;
  this.$options._source = getComponentSource(this);
  log.debug('Component source:', this.$options.name, '=', `"${this.$options._source}"`);
}

export function getComponentSource(component) {
  const sourceParents = [];

  while (!component.$options._isWindow) {
    sourceParents.unshift(component.$options.name);
    component = component.$parent;
  }

  return sourceParents.join('.');
}
