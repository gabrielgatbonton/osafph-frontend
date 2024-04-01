<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="credentials_payload.username"
          label="Username"
          @blur="$v.credentials_payload.username.$touch()"
          :error-messages="errorMessages.credentials_payload.username"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="credentials_payload.password"
          label="Password"
          :type="show_1 ? 'text' : 'password'"
          :append-icon="show_1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_1 = !show_1"
          @blur="$v.credentials_payload.password.$touch()"
          :error-messages="errorMessages.credentials_payload.password"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="credentials_payload.password_confirmation"
          label="Confirm Password"
          :type="show_2 ? 'text' : 'password'"
          :append-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_2 = !show_2"
          @blur="$v.credentials_payload.password_confirmation.$touch()"
          :error-messages="
            errorMessages.credentials_payload.password_confirmation
          "
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn block dark class="blue darken-4" @click="submitForm"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserManagementMixin from "../../../mixins/Validation/ManagementValidation/UserManagement";
export default {
  name: "CredentialsStepper",
  mixins: [UserManagementMixin],
  data: () => ({
    credentials_payload: {
      username: null,
      password: null,
      password_confirmation: null,
    },
    show_1: false,
    show_2: false,
  }),
  methods: {
    submitForm() {
      console.log(this.$v);
      this.$v.credentials_payload.$touch();

      if (!this.$v.credentials_payload.$invalid) {
        this.$emit("payload", this.credentials_payload);
        this.$emit("submitForm", true);
        this.$v.credentials_payload.$reset();
      }
    },
    resetValidations() {
      this.$v.credentials_payload.$reset();
      this.credentials_payload = {
        username: null,
        password: null,
        password_confirmation: null,
      };
    },
  },
};
</script>

<style scoped></style>
