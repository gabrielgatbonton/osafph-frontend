<template>
  <div class="route-container">
    <marketing-component />
  </div>
</template>

<script>
import MarketingComponent from "@/components/Marketing/MarketingComponent.vue";
export default {
  name: "MarketingView",
  components: { MarketingComponent },
  data: () => ({

  }),
};
</script>

<style scoped>
.route-container {
  height: 100%;
}
</style>
