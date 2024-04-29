<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="information_payload.first_name"
          label="First Name"
          @blur="$v.information_payload.first_name.$touch()"
          :error-messages="errorMessages.information_payload.first_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="information_payload.middle_name"
          label="Middle Name"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="information_payload.last_name"
          label="Last Name"
          @blur="$v.information_payload.last_name.$touch()"
          :error-messages="errorMessages.information_payload.last_name"
          type="email"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="information_payload.email"
          label="Email"
          @blur="$v.information_payload.email.$touch()"
          :error-messages="errorMessages.information_payload.email"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="information_payload.role"
          :items="roles"
          label="Role"
          @blur="$v.information_payload.role.$touch()"
          :error-messages="errorMessages.information_payload.role"
        ></v-select>
      </v-col>
      <v-col cols="12" v-if="information_payload.role === 'DOCTOR'">
        <v-autocomplete
          :items="specialties"
          v-model="information_payload.specialty"
          label="Specialty"
          item-text="name"
          @blur="$v.information_payload.specialty.$touch()"
          :error-messages="errorMessages.information_payload.specialty"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-btn block dark class="primary" @click="proceedWithStepper"
          >Proceed</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserManagementMixin from "../../../mixins/Validation/ManagementValidation/UserManagement";
export default {
  name: "InformationStepper",
  props: ["roles", "specialties"],
  mixins: [UserManagementMixin],
  data: () => ({
    information_payload: {
      first_name: null,
      middle_name: null,
      last_name: null,
      role: null,
      specialty: null,
      email: null,
    },
    stepper: 1,
  }),
  methods: {
    proceedWithStepper() {
      this.$v.information_payload.$touch();

      if (!this.$v.information_payload.$invalid) {
        this.$emit("payload", this.information_payload);
        this.$emit("stepper", (this.stepper = 2));
        this.$v.information_payload.$reset();
      }
    },
    resetValidations() {
      this.$v.information_payload.$reset();
      this.information_payload = {
        first_name: null,
        middle_name: null,
        last_name: null,
        role: null,
        specialty: null,
        email: null,
      };
    },
  },
};
</script>

<style scoped></style>
