<template>
  <v-container class="mx-auto mt-3 px-8">
    <v-row>
      <v-col cols="auto">
        <v-icon left>mdi-medical-bag</v-icon>
        <span>Emergency Details</span>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="emergency_name"
          v-model="emergency_name"
          label="Contact Person's Name"
          @blur="$v.emergency_name.$touch()"
          :error-messages="errorMessages.emergency_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="emergency_number"
          v-model="emergency_number"
          label="Contact Person's Number"
          type="number"
          @blur="$v.emergency_number.$touch()"
          :error-messages="errorMessages.emergency_number"
          counter="11"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormValidation from "@/mixins/FormValidation";
export default {
  name: "EmergencySection",
  mixins: [FormValidation],
  data: () => ({
    emergency_name: null,
    emergency_number: null,
  }),
};
</script>

<style scoped></style>
