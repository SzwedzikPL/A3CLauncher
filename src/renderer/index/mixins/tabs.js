export default {
  data: () => ({
    currentTabComponent: null
  }),
  methods: {
    switchLocation(target) {
      const component = target.shift();
      const end = target.length === 0;

      if (this.currentTabComponent === component) {
        if (!end) this.$refs.currentComponent.switchLocation(target);
      } else {
        this.switchTab(component);
        if (!end) this.$nextTick(() => {
          this.$refs.currentComponent.switchLocation(target);
        });
      }
    },
    tabActive(tab) {
      return this.currentTabComponent === tab;
    },
    switchTab(tab) {
      this.currentTabComponent = tab;
    }
  },
};
