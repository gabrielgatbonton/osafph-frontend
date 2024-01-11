import { required, requiredIf, maxLength } from "vuelidate/lib/validators";
export default {
  validations: {
    data: {
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
          return value && value.identification_card === "OTHERS";
        }),
      },
      id_number: { required, maxLength: maxLength(25) },
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
        !this.$v.data.id_number.maxLength &&
          errors.id_number.push("A minimun number of 11 digits is required");
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
      return errors;
    },
  },
};
