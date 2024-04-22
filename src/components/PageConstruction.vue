<template>
  <v-container
    style="height: 100%; width: 100%"
    class="d-flex justify-center align-center"
  >
    <v-row>
      <v-col cols="12">
        <div
          class="d-flex"
          :class="{
            'flex-column-reverse justify-center align-center':
              $vuetify.breakpoint.smAndDown,
            'justify-center align-center': !$vuetify.breakpoint.smAndDown,
          }"
        >
          <div class="pa-4">
            <div
              class="text-h2"
              :class="{ 'text-center text-h3': $vuetify.breakpoint.smAndDown }"
            >
              Under<br />Construction
            </div>
            <div
              class="h-line"
              :class="{ 'mx-auto': $vuetify.breakpoint.smAndDown }"
            ></div>
            <div
              class="text-body-1 pa-1 mt-6"
              :class="{ 'pa-3 text-center': $vuetify.breakpoint.smAndDown }"
            >
              Updates are currently underway. Thank you for your patience as we
              enhance our site to serve you better.
            </div>
          </div>
          <div class="pa-4" :style="{'width: 500px': !$vuetify.breakpoint.smAndDown}">
            <img style="max-width: 100%; max-height: 100%" :src="imgSource" alt="Construction Image">
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
export default {
  name: "PageConstruction",
  data: () => ({
    imgSource: require("@/assets/ConstructionWorker.jpg"),
  }),
};
</script>

<style scoped>
.h-line {
  width: 100px;
  height: 5px;
  background: green;
  margin: 1rem 0;
}
</style>
