<template>
  <button type="button" class="btn btn-link" @click="openLink" :disabled="opening">
    <span class="btn-spinner spinner-border"></span>
    <span class="btn-content">
      <slot>
        {{ name }} <i class="fa fa-external-link"></i>
      </slot>
    </span>
  </button>
</template>

<script>
import log from '@/utils/log';

export default {
  name: 'LinkButton',
  props: {
    name: String,
    link: String,
  },
  data: () => ({
    opening: false,
  }),
  methods: {
    openLink() {
      this.opening = true;
      this.$root.openLink(this.link).then(url => {
        this.$emit('opened');
        log.debug('Opened link', this.link, url);
        // Give OS some time for opening default browser
        setTimeout(() => {
          this.opening = false;
        }, 1000);
      }).catch(error => {
        log.error('Error opening link', this.link, error);
        this.opening = false;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .btn-link {
    position: relative;
    color: #595959;
    font-weight: 300;
    font-size: 13px;
    background: #000;

    &:hover, &:focus, &:active {
      color: #969696;
    }

    & > .btn-spinner {
      display: none;
    }

    &:disabled {
      & > .btn-content {
        opacity: 0;
      }

      & > .btn-spinner {
        display: block;
        position: absolute;
        width: 1.4rem;
        height: 1.4rem;
        top: calc(50% - 0.7rem);
        left: calc(50% - 0.7rem);
      }
    }
  }
</style>
