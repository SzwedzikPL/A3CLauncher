export default {
  props: {
    ready: Boolean
  },
  watch: {
    ready(isReady) {
      if (isReady) this.$nextTick(() => this.onWindowReady());
    }
  },
  methods: {
    initWindow() {
      console.log(this.$options.name, 'Missing method initWindow');
    },
    onWindowReady() {
      console.log(this.$options.name, 'Missing method onWindowReady');
    }
  },
  destroyed() {
    // Use $parent for calling event because emit
    // won't work after component destruction.
    const parent = this.$parent;

    // Give chrome some time to refresh & cache pixels of
    // current window without page component.
    // This fixes blink of previous page component after
    // showing window.
    setTimeout(() => parent.hideWindow(), 200);
  },
  _isWindow: true,
}
