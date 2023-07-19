<template>
  <div>
    <v-alert
      type="error"
      dismissible
      @input="showAlert = false"
      >{{ title }} and verification failed. Please try again.</v-alert
    >
  </div>
</template>

<script>
export default {
    props: ['title']
};
</script>

<style scoped></style>
