<template>
  <div class="dropdown" @click="toggleActive" :class="{active}">
    <slot></slot>
    <div class="dropdown-icon">
      <slot name="icon">
        <i class="fa fa-caret-down"></i>
      </slot>
    </div>
    <div class="dropdown-options">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data: () => ({
    active: false,
  }),
  watch: {
    active(newValue, oldValue) {
      if (!newValue)
        document.removeEventListener('click', this.onDocumentClick);
    }
  },
  methods: {
    toggleActive() {
      if (this.active = !this.active)
        document.addEventListener('click', this.onDocumentClick);
    },
    onDocumentClick(event) {
      if (this.$el.contains(event.target)) return;
      this.active = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    .dropdown-options {
      display: none;
    }

    &.active {
      .dropdown-options {
        display: block;
      }

      .dropdown-icon {
        transform: rotate(180deg);
      }
    }
  }
</style>
