import {getComponentSource} from '@/utils/tabs';

export default {
  data: () => ({
    tabs: [],
    currentTabComponent: null
  }),
  created() {
    if (this._source) return;
    this._source = getComponentSource(this);
  },
  computed: {
    tabErrors() {
      const errors = this.$store.state.session.errors;
      const tabErrors = {};
      const sourcePrefix = this._source || '';

      this.tabs.forEach(tabName => {
        const source = sourcePrefix ? `${sourcePrefix}.${tabName}` : tabName;
        tabErrors[tabName] = errors.some(error => error.source.startsWith(source));
      });

      return tabErrors;
    }
  },
  methods: {
    switchLocation(target) {
      const component = target.shift();
      const finalLocation = target.length === 0;

      if (this.currentTabComponent !== component) {
        this.switchTab(component);
        if (!finalLocation)
          this.$nextTick(() => this.$refs.currentComponent.switchLocation(target));
      } else if (!finalLocation)
        this.$refs.currentComponent.switchLocation(target);
    },
    tabActive(tab) {
      return this.currentTabComponent === tab;
    },
    switchTab(tab) {
      this.currentTabComponent = tab;
    }
  },
};
