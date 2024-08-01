<template>
  <div class="component-flex">
    <header-component id="home" />

    <SectionOne id="services" />
    <SectionTwo />

    <footer-component id="footer" />
  </div>
</template>

<script>
import SectionOne from "./SectionOne.vue";
import SectionTwo from "./SectionTwo.vue";
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from "./FooterComponent.vue";
export default {
  name: "MarketingComponent",
  components: {
    SectionOne,
    SectionTwo,
    HeaderComponent,
    FooterComponent,
    // SectionThree,
  },
};
</script>

<style scoped>
.component-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
