import { required, minLength, maxLength } from "vuelidate/lib/validators";

// const notSameAsContactNumber = (value, vm) => {
//   return value !== vm.data.contact_number;
// };

export default {
  validations: {
    data: {
      emergency_name: { required },
      emergency_number: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
      },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};
      // Contact Person field errors
      errors.emergency_name = [];
      if (this.$v.data.emergency_name.$dirty) {
        !this.$v.data.emergency_name.required &&
          errors.emergency_name.push("Contact Name is required");
      }

      // Contact Person Number field errors
      errors.emergency_number = [];
      if (this.$v.data.emergency_number.$dirty) {
        !this.$v.data.emergency_number.required &&
          errors.emergency_number.push("Contact Number is required");
        !this.$v.data.emergency_number.minLength &&
          errors.emergency_number.push(
            "A minimun number of 11 digits is required"
          );
        !this.$v.data.emergency_number.maxLength &&
          errors.emergency_number.push("Maximun length exceeded");
        // !this.$v.data.emergency_number.notSameAsContactNumber &&
        //   errors.emergency_number.push("Contact Number must not match");
      }
      return errors;
    },
  },
};
