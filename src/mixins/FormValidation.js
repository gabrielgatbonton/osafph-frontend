import {
  required,
  maxLength,
  minLength,
  requiredIf,
} from "vuelidate/lib/validators";
import { isBefore, subYears } from "date-fns";
export default {
  validations: {
    data: {
      //Category Section
      category: {
        required,
      },
      identification_card: { required },
      type_of_id: {
        required: requiredIf((value) => {
          return value && value.identification_card === "GOVERNMENT_ISSUED_ID";
        }),
      },
      other_id: {
        required: requiredIf((value) => {
          return value && value.identification_card === "GOVERNMENT_ISSUED_ID";
        }),
      },
      id_number: { required },

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
      sex: { required },
      civil_status: { required },
      contact_number: { required, minLength: minLength(11) },
      tin_number: { maxLength: maxLength(12), minLength: minLength(9) },
      passport_number: { required },
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

      //CATEGORY SECTION
      errors.category = [];
      if (this.$v.data.category.$dirty) {
        !this.$v.data.category.required &&
          errors.category.push("Category is required");
      }
      errors.identification_card = [];
      if (this.$v.data.identification_card.$dirty) {
        !this.$v.data.identification_card.required &&
          errors.identification_card.push("Identification Card is required");
      }
      errors.id_number = [];
      if (this.$v.data.id_number.$dirty) {
        !this.$v.data.id_number.required &&
          errors.id_number.push("Id Number is required");
      }
      errors.type_of_id = [];
      if (this.$v.data.type_of_id.$dirty) {
        !this.$v.data.type_of_id.required &&
          errors.type_of_id.push("Type of Id is required");
      }
      errors.other_id = [];
      if (this.$v.data.other_id.$dirty) {
        !this.$v.data.other_id.required &&
          errors.other_id.push("Other Id is required");
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
        !this.$v.data.passport_number.required &&
          errors.passport_number.push("Passport Number is required");
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
