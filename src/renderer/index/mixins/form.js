import {getComponentSource} from '@/utils/tabs';

export default {
  created() {
    if (this._source) return;
    this._source = getComponentSource(this);
  },
  computed: {
    fieldErrors() {
      const fields = {};
      this.$store.state.session.errors.forEach(error => {
        if (error.source !== this._source) return;
        if (!error.params || !error.params.field) return;

        const field = error.params.field;
        if (!fields[field]) fields[field] = [];
        fields[field].push(error.message);
      });
      return fields;
    }
  },
}
