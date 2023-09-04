<template>
  <v-container v-if="data">
    <v-row class="mx-16">
      <v-col cols="12">
        <v-tabs centered class="red">
          <v-tab>Personal Details</v-tab>
          <v-tab>Booster History</v-tab>
          <v-tab-item>
            <PersonalDetails :data="data" />
          </v-tab-item>
          <v-tab-item>
            <BoosterHistory :data="data" />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonalDetails from "./PersonalDetails.vue";
import BoosterHistory from "./BoosterHistory.vue";
export default {
  props: ["data"],
  components: {
    PersonalDetails,
    BoosterHistory,
  },
  watch:{
    // booster(value){
    //   console.log("DATATABS:", value)
    // }
  }
};
</script>

<style></style>
