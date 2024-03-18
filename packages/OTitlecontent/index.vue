<template>
  <div :id="name" class="form-anchor">
    <div class="form-anchor__title">
      {{ title }}
    </div>
    <div class="form-anchor__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    name: String,
  },
};
</script>
