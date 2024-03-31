import { required, requiredIf } from "vuelidate/lib/validators";
export default {
  validations: {
    password_payload: {
      new_password: { required },
      new_password_confirmation: { required },
    },
    user_payload: {
      first_name: { required },
      middle_name: {},
      last_name: { required },
      role: { required },
      specialty: {
        required: requiredIf((value) => {
          return value && value.role === "DOCTOR";
        }),
      },
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
          errors.user_payload.first_name.push("First Name is required");
      }

      errors.user_payload.last_name = [];
      if (this.user_payload.last_name.$dirty) {
        !this.user_payload.last_name.required &&
          errors.user_payload.last_name.push("Last Name is required");
      }

      errors.user_payload.role = [];
      if (this.user_payload.role.$dirty) {
        !this.user_payload.role.required &&
          errors.user_payload.role.push("Role is required");
      }

      errors.user_payload.specialty = [];
      if (this.user_payload.specialty.$dirty) {
        !this.user_payload.specialty.required &&
          errors.user_payload.specialty.push("Specialty is required");
      }

      errors.user_payload.username = [];
      if (this.user_payload.username.$dirty) {
        !this.user_payload.username.required &&
          errors.user_payload.username.push("Username is required");
      }

      errors.user_payload.password = [];
      if (this.$v.user_payload.password.$dirty) {
        !this.$v.user_payload.password.required &&
          errors.user_payload.password.push("Password is required");
      }

      errors.user_payload.password_confirmation = [];
      if (this.$v.user_payload.password_confirmation.$dirty) {
        !this.$v.user_payload.password_confirmation.required &&
          errors.user_payload.password_confirmation.push("Confirm Password");
      }

      //New Password Error Messages
      errors.password_payload.new_password = [];
      if (this.$v.password_payload.new_password.$dirty) {
        !this.$v.password_payload.new_password.required &&
          errors.password_payload.new_password.push("New Password is required");
      }

      errors.password_payload.new_password_confirmation = [];
      if (this.$v.password_payload.new_password_confirmation.$dirty) {
        !this.$v.password_payload.new_password_confirmation.required &&
          errors.password_payload.new_password_confirmation.push(
            "Confirm New Password"
          );
      }
      console.log(errors);
      return errors;
    },
  },
};
