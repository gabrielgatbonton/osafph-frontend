<template>
  <div>
    <v-alert
      type="success"
      dismissible
      @input="showAlert = false"
      >Successfully {{ title }} Information</v-alert
    >
  </div>
</template>

<script>
export default {
    props: ['title'],
};
</script>

<style scoped>
</style>
