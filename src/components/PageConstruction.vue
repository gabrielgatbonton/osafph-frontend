<template>
  <div style="height: 100%; width: 100%;">
    <div class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
      <div class="text-h2 pa-4" style="width: 400px">
        Under <br />Construction
      </div>
      <div>
        <v-img max-width="500" :src="imgSource" eager contain></v-img>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  name: "PageConstruction",
  data: () => ({
    imgSource: require("@/assets/ConstructionWorker.jpg"),
  }),
};
</script>

<style scoped></style>
