<template>
  <div class="dropdown" @click="toggleDown" :class="{active: down}">
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
    down: false,
  }),
  methods: {
    toggleDown() {
      this.down = !this.down;
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
