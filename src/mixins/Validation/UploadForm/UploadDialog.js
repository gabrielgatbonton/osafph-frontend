import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      file_name: {},
      document_type: { required },
      file: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.document_type = [];
      if (this.$v.payload.document_type.$dirty) {
        !this.$v.payload.document_type.required &&
          errors.document_type.push("Document Type is required");
      }

      errors.file = [];
      if (this.$v.payload.file.$dirty) {
        !this.$v.payload.file.required && errors.file.push("File is required");
      }

      return errors;
    },
  },
};
