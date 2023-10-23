import {
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { isBefore, subYears } from "date-fns";

const alphaWithSpaces = (value) => {
  return /^[A-Za-z\s]*$/.test(value);
};

export default {
  validations: {
    data: {
      last_name: { required, alphaWithSpaces, maxLength: maxLength(255) },
      first_name: { required, alphaWithSpaces, maxLength: maxLength(255) },
      middle_name: { alphaWithSpaces, maxLength: maxLength(255) },
      suffix: {},
      birthday: {
        required,
        validBirthday(value) {
          if (!value) return true; // Skip validation if no value provided
          const fiveYearsAgo = subYears(new Date(), 5);
          return isBefore(new Date(value), fiveYearsAgo);
        },
      },
      sex: { required },
      civil_status: { required },
      place_of_birth: { required },
      contact_number: { required, minLength: minLength(11), maxLength: maxLength(11) },
      blood_type: {},
      religion: {},
      nationality: { required },
      tin_number: { maxLength: maxLength(12), minLength: minLength(9) },
      passport_number: { },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};
      errors.last_name = [];
      if (this.$v.data.last_name.$dirty) {
        !this.$v.data.last_name.required &&
          errors.last_name.push("Last name is required");
        !this.$v.data.last_name.alphaWithSpaces &&
          errors.last_name.push("Only alphabetic characters are allowed");
        !this.$v.data.last_name.maxLength &&
          errors.last_name.push("Maximum of 255 characters only");
      }
      errors.first_name = [];
      if (this.$v.data.first_name.$dirty) {
        !this.$v.data.first_name.required &&
          errors.first_name.push("First name is required");
        !this.$v.data.first_name.alphaWithSpaces &&
          errors.first_name.push("Only alphabetic characters are allowed");
        !this.$v.data.first_name.maxLength &&
          errors.first_name.push("Maximum of 255 characters only");
      }
      errors.middle_name = [];
      if (this.$v.data.middle_name.$dirty) {
        !this.$v.data.middle_name.alphaWithSpaces &&
          errors.middle_name.push("Only alphabetic characters are allowed");
        !this.$v.data.middle_name.maxLength &&
          errors.middle_name.push("Maximum of 255 characters only");
      }
      errors.suffix = [];
      if (this.$v.data.suffix.$dirty) {
        // Suffix validations, if any
      }

      // Birthday field errors
      errors.birthday = [];
      if (this.$v.data.birthday.$dirty) {
        !this.$v.data.birthday.required &&
          errors.birthday.push("Birthday is required");
        !this.$v.data.birthday.validBirthday &&
          errors.birthday.push("Birthday must be at least five years ago");
      }

      // Sex field errors
      errors.sex = [];
      if (this.$v.data.sex.$dirty) {
        !this.$v.data.sex.required && errors.sex.push("Sex is required");
      }

      // Civil Status field errors
      errors.civil_status = [];
      if (this.$v.data.civil_status.$dirty) {
        !this.$v.data.civil_status.required &&
          errors.civil_status.push("Civil Status is required");
      }

      // Contact Number field errors
      errors.contact_number = [];
      if (this.$v.data.contact_number.$dirty) {
        !this.$v.data.contact_number.required &&
          errors.contact_number.push("Contact Number is required");
        !this.$v.data.contact_number.minLength &&
          errors.contact_number.push(
            "A minimun number of 11 digits is required"
          );
          !this.$v.data.contact_number.maxLength &&
          errors.contact_number.push(
            "Maximun length exceeded"
          );
      }

      // TIN field errors
      errors.tin_number = [];
      if (this.$v.data.tin_number.$dirty) {
        !this.$v.data.tin_number.maxLength &&
          errors.tin_number.push("TIN is capped 12 digits");
        !this.$v.data.tin_number.minLength &&
          errors.tin_number.push("TIN is required atleast 9 digits");
      }

      // Passport field errors
      errors.passport_number = [];
      if (this.$v.data.passport_number.$dirty) {
        // !this.$v.data.passport_number.required &&
        //   errors.passport_number.push("Passport Number is required");
      }

      // Blood Type field errors
      errors.blood_type = [];
      if (this.$v.data.blood_type.$dirty) {
        //Optional
      }

      errors.nationality = [];
      if (this.$v.data.nationality.$dirty) {
        !this.$v.data.nationality.required &&
          errors.nationality.push("Nationality is required");
      }

      return errors;
    },
  },
};
