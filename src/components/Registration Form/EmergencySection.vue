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
          :value="data.emergency_name"
          v-model="data.emergency_name"
          label="Contact Person's Name"
          @blur="$v.data.emergency_name.$touch()"
          :error-messages="errorMessages.emergency_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="data.emergency_number"
          v-model="data.emergency_number"
          label="Contact Person's Number"
          type="number"
          @blur="$v.data.emergency_number.$touch()"
          :error-messages="errorMessages.emergency_number"
          counter="11"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12">
        <v-btn dark block class="blue darken-4" @click="continueForm"
          >Proceed</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmergencySectionValidation from '@/mixins/Validation/RegistrationFormValidation/EmergencySectionValidation';
export default {
  name: "EmergencySection",
  mixins: [EmergencySectionValidation],
  props: {
    editData: {
      required: false,
    }
  },
  data: () => ({
    data: {
      emergency_name: null,
      emergency_number: null,
    },
    stepper: 4,
  }),
  methods: {
    continueForm() {
      this.$emit("data", this.data);
      this.$emit("stepper", (this.stepper = 5));
    },
  },
  watch: {
    editData(value) {
      this.data = Object.assign({}, this.data, value);
    }
  }
};
</script>

<style scoped></style>
@/mixins/Validation/RegistrationFormValidation/EmergencySectionValidation