import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { isBefore, subYears } from "date-fns";
export default {
  validations: {
    data: {
      category: {
        required,
      },
      hub_registrant_number: {
        required,
      },
      passport_number: { required },
      last_name: { required },
      first_name: { required },
      middle_name: {},
      suffix: {},
      birthday: {
        required,
        validBirthday(value) {
          if (!value) return true; // Skip validation if no value provided
          const fiveYearsAgo = subYears(new Date(), 5);
          return isBefore(new Date(value), fiveYearsAgo);
        },
      },
      gender: { required },
      civil_status: { required },
      contact_number: { required, minLength: minLength(11) },
      tin_number: { maxLength: maxLength(12), minLength: minLength(9) },
      blood_type: { required },
      emergency_name: { required },
      emergency_number: {
        required,
        minLength: minLength(11),
        sameAsContactNumber: function (value) {
          return value !== this.data.contact_number;
        },
      },
      address: { required },
      province: { required },
      municipality: { required },
      barangay: { required },
      region: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      // Category field errors
      errors.category = [];
      if (this.$v.data.category.$dirty) {
        !this.$v.data.category.required &&
          errors.category.push("Category is required");
      }

      // Hub Registrant Number field errors
      errors.hub_registrant_number = [];
      if (this.$v.data.hub_registrant_number.$dirty) {
        !this.$v.data.hub_registrant_number.required &&
          errors.hub_registrant_number.push(
            "HUB Registrant Number is required"
          );
      }

      // Passport Number field errors
      errors.passport_number = [];
      if (this.$v.data.passport_number.$dirty) {
        !this.$v.data.passport_number.required &&
          errors.passport_number.push("Passport Number is required");
      }

      // Name fields errors
      errors.last_name = [];
      if (this.$v.data.last_name.$dirty) {
        !this.$v.data.last_name.required &&
          errors.last_name.push("Last name is required");
      }

      errors.first_name = [];
      if (this.$v.data.first_name.$dirty) {
        !this.$v.data.first_name.required &&
          errors.first_name.push("First name is required");
      }

      errors.middle_name = [];
      if (this.$v.data.middle_name.$dirty) {
        // Middle name validations, if any
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
      errors.gender = [];
      if (this.$v.data.gender.$dirty) {
        !this.$v.data.gender.required && errors.gender.push("Sex is required");
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
      }

      // TIN field errors
      errors.tin_number = [];
      if (this.$v.data.tin_number.$dirty) {
        !this.$v.data.tin_number.maxLength &&
          errors.tin_number.push("TIN is capped 12 digits");
        !this.$v.data.tin_number.minLength &&
          errors.tin_number.push("TIN is required atleast 9 digits");
      }

      // Blood Type field errors
      errors.blood_type = [];
      if (this.$v.data.blood_type.$dirty) {
        !this.$v.data.blood_type.required &&
          errors.blood_type.push("Blood Type is required");
      }

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
        !this.$v.data.emergency_number.sameAsContactNumber &&
          errors.emergency_number.push("Contact Number must not match");
      }

      // Address field errors
      errors.address = [];
      if (this.$v.data.address.$dirty) {
        !this.$v.data.address.required &&
          errors.address.push("Contact Number is required");
      }

      // Province field errors
      errors.province = [];
      if (this.$v.data.province.$dirty) {
        !this.$v.data.province.required &&
          errors.province.push("Province is required");
      }

      // Municipality field errors
      errors.municipality = [];
      if (this.$v.data.municipality.$dirty) {
        !this.$v.data.municipality.required &&
          errors.municipality.push("Municipality is required");
      }

      // Barangay field errors
      errors.barangay = [];
      if (this.$v.data.barangay.$dirty) {
        !this.$v.data.barangay.required &&
          errors.barangay.push("Barangay is required");
      }

      // Region field errors
      errors.region = [];
      if (this.$v.data.region.$dirty) {
        !this.$v.data.region.required &&
          errors.region.push("Region is required");
      }

      return errors;
    },
  },
};
