<template>
  <v-container v-if="data">
    <v-row>
      <v-col cols="12">
        <v-tabs centered>
          <v-tab>Personal Details</v-tab>
          <v-tab>Services Availed</v-tab>
          <v-tab-item>
            <PersonalDetails :data="data" />
          </v-tab-item>
          <v-tab-item>
            <RegistrantServices :data="services"/>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonalDetails from "./PersonalDetails.vue";
import RegistrantServices from "./RegistrantServices.vue";
export default {
  props: ["data", "services"],
  components: {
    PersonalDetails,
    RegistrantServices,
  },
  watch:{
    // booster(value){
    //   console.log("DATATABS:", value)
    // }
  }
};
</script>

<style></style>
