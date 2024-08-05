<template>
  <v-container class="mx-auto">
    <v-row class="mb-5">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="20" color="primary">mdi-medical-bag</v-icon>
          <p class="text-subtitle-1 font-weight-bold pa-0 my-0 ml-2">
            Emergency Details
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-n5">
        <v-text-field
          :value="data.emergency_name"
          v-model="data.emergency_name"
          label="Contact Person's Name"
          @blur="$v.data.emergency_name.$touch()"
          outlined
          :error-messages="errorMessages.emergency_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="mt-n5">
        <v-text-field
          :value="data.emergency_number"
          v-model="data.emergency_number"
          label="Contact Person's Number"
          type="number"
          outlined
          :error-messages="errorMessages.emergency_number"
          hide-spin-buttons
          counter="11"
          @blur="$v.data.emergency_number.$touch()"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <div class="w-full d-flex">
          <v-btn class="primary ml-auto" @click="continueForm">Proceed</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmergencySectionValidation from "@/mixins/Validation/RegistrationFormValidation/EmergencySectionValidation";
export default {
  name: "EmergencySection",
  mixins: [EmergencySectionValidation],
  props: {
    editData: {
      required: false,
    },
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
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit("data", this.data);
        this.$emit("stepper", (this.stepper = 5));
      }
    },
    asyncPayload() {
      if (this.editData) {
        this.$emit("data", this.data);
      }
    },
  },
  watch: {
    editData(value) {
      this.data = Object.assign({}, this.data, value);
    },
  },
};
</script>

<style scoped></style>
