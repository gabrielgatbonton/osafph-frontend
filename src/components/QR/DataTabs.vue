<template>
  <v-row justify="center" v-if="data">
    <v-col cols="12">
      <v-tabs centered>
        <v-tab>Personal Details</v-tab>
        <v-tab>Services Availed</v-tab>
        <v-tab-item>
          <PersonalDetails :data="data" />
        </v-tab-item>
        <v-tab-item>
          <RegistrantServices
            @query_params="(params) => $emit('query_params', params)"
            :data="services"
            :public_files="public_files"
          />
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import PersonalDetails from "./PersonalDetails.vue";
import RegistrantServices from "./RegistrantServices.vue";
export default {
  props: ["data", "services", "public_files"],
  components: {
    PersonalDetails,
    RegistrantServices,
  },
};
</script>

<style></style>
