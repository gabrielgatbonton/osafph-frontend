<template>
  <v-container
    style="height: 100%;"
    class="d-flex justify-center align-center"
    :style="`max-width: ${breakpointVal};`"
  >
    <v-row>
      <v-col cols="12">
        <div
          class="d-flex"
          :class="{
            'flex-column-reverse justify-center align-center': isSmAndDown,
            'justify-center align-center': !isSmAndDown,
          }"
        >
          <div class="pa-4">
            <div
              class="text-h2"
              :class="{ 'text-center text-h3': isSmAndDown }"
            >
              Under<br />Construction
            </div>
            <div class="h-line" :class="{ 'mx-auto': isSmAndDown }"></div>
            <div
              class="text-body-1 pa-1 mt-6"
              :class="{ 'pa-3 text-center': isSmAndDown }"
            >
              Updates are currently underway. Thank you for your patience as we
              enhance our site to serve you better.
            </div>
          </div>
          <div class="pa-4">
            <img
              :style="styleImage"
              :src="imgSource"
              alt="Construction Image"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- <v-container>
      <v-row
        justify="center"
        align="center"
        align-content="center"
        class="my-auto"
        style="height: 100%"
      >
        <v-col cols="6">
          <div class="text-h2 pa-4 mx-auto" style="width: 400px">
            Under <br />Construction
          </div>
        </v-col>
        <v-col cols="6">
          <v-img max-width="500" :src="imgSource" eager contain></v-img>
        </v-col>
      </v-row>
    </v-container> -->
</template>

<script>
import ContainerBreakpoint from '@/mixins/ContainerBreakpoint';
export default {
  name: "PageConstruction",
  data: () => ({
    imgSource: require("@/assets/ConstructionWorker.jpg"),
    isSmAndDown: false,
    styleImage: "",
  }),
  mixins: [ContainerBreakpoint],
  computed: {
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    size: {
      handler: function (newVal) {
        if (newVal.smAndDown) {
          this.isSmAndDown = true;
          this.styleImage = "max-width: 100%; max-height: 100%";
        } else {
          this.isSmAndDown = false;
          this.styleImage = "max-width: 500px; max-height: 500px";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.h-line {
  width: 100px;
  height: 5px;
  background: #ff4949;
  margin: 1rem 0;
}
</style>
