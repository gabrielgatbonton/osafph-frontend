import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    password_payload: {
      new_password: { required },
      new_password_confirmation: { required },
    },
    user_payload: {
      first_name: { required },
      middle_name: null,
      last_name: { required },
      role: { required },
      specialty: { required },
      username: { required },
      password: { required },
      password_confirmation: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};
      //Create User Errors
      errors.user_payload.first_name = [];
      if (this.user_payload.first_name.$dirty) {
        !this.user_payload.first_name.required &&
          errors.name.push("First Name is required");
      }

      errors.user_payload.last_name = [];
      if (this.user_payload.last_name.$dirty) {
        !this.user_payload.last_name.required &&
          errors.name.push("Last Name is required");
      }

      errors.user_payload.role = [];
      if (this.user_payload.role.$dirty) {
        !this.user_payload.role.required &&
          errors.name.push("Role is required");
      }

      errors.user_payload.specialty = [];
      if (this.user_payload.specialty.$dirty) {
        !this.user_payload.specialty.required &&
          errors.name.push("Specialty is required");
      }

      errors.user_payload.username = [];
      if (this.user_payload.username.$dirty) {
        !this.user_payload.username.required &&
          errors.name.push("Username is required");
      }

      errors.user_payload.password = [];
      if (this.$v.user_payload.password.$dirty) {
        !this.$v.user_payload.password.required &&
          errors.name.push("Password is required");
      }

      errors.user_payload.password_confirmation = [];
      if (this.$v.user_payload.password_confirmation.$dirty) {
        !this.$v.user_payload.password_confirmation.required &&
          errors.name.push("Confirm Password");
      }

      //New Password Error Messages
      errors.password_payload.new_password = [];
      if (this.$v.password_payload.new_password.$dirty) {
        !this.$v.password_payload.new_password.required &&
          errors.name.push("New Password is required");
      }

      errors.password_payload.new_password_confirmation = [];
      if (this.$v.password_payload.new_password_confirmation.$dirty) {
        !this.$v.password_payload.new_password_confirmation.required &&
          errors.name.push("Confirm New Password");
      }

      return errors;
    },
  },
};
