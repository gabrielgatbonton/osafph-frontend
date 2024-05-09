import {
  required,
  requiredIf,
  minLength,
  sameAs,
  email,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  validations: {
    password_payload: {
      new_password: { required, minLength: minLength(6) },
      new_password_confirmation: {
        required,
        sameAs: sameAs((value) => {
          return value.new_password;
        }),
      },
    },
    information_payload: {
      first_name: { required },
      middle_name: {},
      last_name: { required },
      email: { email },
      role: { required },
      specialty: {
        required: requiredIf((value) => {
          return value && value.role === "DOCTOR";
        }),
      },
    },
    credentials_payload: {
      username: { required, maxLength: maxLength(15) },
      password: { required },
      password_confirmation: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {
        information_payload: {},
        credentials_payload: {},
        password_payload: {},
      };

      //Create User Errors
      errors.information_payload.first_name = [];
      if (this.$v.information_payload.first_name.$dirty) {
        !this.$v.information_payload.first_name.required &&
          errors.information_payload.first_name.push("First Name is required");
      }

      errors.information_payload.last_name = [];
      if (this.$v.information_payload.last_name.$dirty) {
        !this.$v.information_payload.last_name.required &&
          errors.information_payload.last_name.push("Last Name is required");
      }

      errors.information_payload.email = [];
      if (this.$v.information_payload.email.$dirty) {
        !this.$v.information_payload.email.email &&
          errors.information_payload.email.push("A valid email is required");
      }

      errors.information_payload.role = [];
      if (this.$v.information_payload.role.$dirty) {
        !this.$v.information_payload.role.required &&
          errors.information_payload.role.push("Role is required");
      }

      errors.information_payload.specialty = [];
      if (this.$v.information_payload.specialty.$dirty) {
        !this.$v.information_payload.specialty.required &&
          errors.information_payload.specialty.push("Specialty is required");
      }

      errors.credentials_payload.username = [];
      if (this.$v.credentials_payload.username.$dirty) {
        !this.$v.credentials_payload.username.required &&
          errors.credentials_payload.username.push("Username is required");
        !this.$v.credentials_payload.username.maxLength &&
          errors.credentials_payload.username.push(
            "Must not exceed 15 characters"
          );
      }

      errors.credentials_payload.password = [];
      if (this.$v.credentials_payload.password.$dirty) {
        !this.$v.credentials_payload.password.required &&
          errors.credentials_payload.password.push("Password is required");
      }

      errors.credentials_payload.password_confirmation = [];
      if (this.$v.credentials_payload.password_confirmation.$dirty) {
        !this.$v.credentials_payload.password_confirmation.required &&
          errors.credentials_payload.password_confirmation.push(
            "Confirm Password"
          );
      }

      //New Password Error Messages
      errors.password_payload.new_password = [];
      if (this.$v.password_payload.new_password.$dirty) {
        !this.$v.password_payload.new_password.required &&
          errors.password_payload.new_password.push("New Password is required");
        !this.$v.password_payload.new_password.minLength &&
          errors.password_payload.new_password.push(
            "A minimun of 6 characters is required"
          );
      }

      errors.password_payload.new_password_confirmation = [];
      if (this.$v.password_payload.new_password_confirmation.$dirty) {
        !this.$v.password_payload.new_password_confirmation.required &&
          errors.password_payload.new_password_confirmation.push(
            "Confirm New Password"
          );
        !this.$v.password_payload.new_password_confirmation.sameAs &&
          errors.password_payload.new_password_confirmation.push(
            "New Password must match"
          );
      }
      return errors;
    },
  },
};
