<template>
  <div>
    <v-alert
      type="success"
      dismissible
      >{{ message }}</v-alert
    >
  </div>
</template>

<script>
export default {
    props: ['message'],
};
</script>

<style scoped>
</style>
