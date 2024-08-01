<template>
  <v-container class="mb-10">
    <v-row>
      <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
        <p class="mb-0 mt-10 font-weight-medium text-h4">Soon to Rise</p>
      </v-col>
      <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
        <p class="mb-0 text-subtitle-1">
          We are dedicated to serve you best medical facility
        </p>
      </v-col>

      <v-col class="mt-8 mb-10">
        <v-row>
          <v-col cols="6"
            ><v-img :src="front" class="rounded-lg"></v-img
          ></v-col>
          <v-col cols="6"
            ><v-img :src="adminImage" class="rounded-lg"></v-img
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import adminImage from "@/assets/marketing/admin-office.png";
import front from "@/assets/marketing/front-view.png";
export default {
  name: "SectionTwo",
  data() {
    return {
      adminImage,
      front,
    };
  },
};
</script>

<style scoped></style>
