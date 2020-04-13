import {getComponentSource, onComponentCreated} from '@/utils/tabs';

export default {
  data: () => ({
    updatingSetting: false,
  }),
  created: onComponentCreated,
  computed: {
    fieldErrors() {
      const fields = {};
      this.$store.state.session.errors.forEach(error => {
        if (error.source !== this.$options._source) return;
        if (!error.params || !error.params.field) return;

        const field = error.params.field;
        if (!fields[field]) fields[field] = [];
        fields[field].push(error.message);
      });
      return fields;
    },
    selectDirDialog(varName, title, defaultPath) {
      this.$root.selectDirDialog({title, defaultPath}).then(data => {
        if (data.canceled || !data.filePaths.length) return;

        this.updatingSetting = true;
        this.$store.dispatch('app/updateSetting', {
          key: varName,
          value: data.filePaths[0],
        }).then(() => {
          this.updatingSetting = false;
        });
      });
    }
  },
  _source: null,
};
