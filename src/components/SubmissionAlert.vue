<template>
  <div>
    <v-alert
      type="success"
      dismissible
      :value="showAlert"
      @input="showAlert = false"
      >Successfully Saved {{ title }} Information</v-alert
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
