<template>
  <div class="component-flex">
    <!-- Header -->
    <header-component />

    <!-- Footer -->
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "./FooterComponent.vue";
import HeaderComponent from "./HeaderComponent.vue";
export default {
  name: "MarketingComponent",
  components: { HeaderComponent, FooterComponent },
};
</script>

<style scoped>
.component-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
