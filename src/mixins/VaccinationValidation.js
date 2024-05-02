import { required, } from "vuelidate/lib/validators";
// import { isBefore, subYears } from "date-fns";
export default {
  validations: {
    vaccineOne: {
      dose: { required },
      vaccination_date: { required },
      vaccine: { required },
      lot_number: { required },
      vaccination_site: { required },
      healthcare_professional: { required },
      healthcare_professional_license_number: { required },
      id: { required },
    },
    vaccineTwo: {
      dose: { required },
      vaccination_date: { required },
      vaccine: { required },
      lot_number: { required },
      vaccination_site: { required },
      healthcare_professional: { required },
      healthcare_professional_license_number: { required },
      id: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      //Dose 1
      errors.vaccineOne.dose = [];
      if (this.$v.vaccineOne.dose.$dirty) {
        !this.$v.vaccineOne.dose.required &&
          errors.dose_1.push("Dose is required");
      }

      // //Dose 2
      // errors.dose_2 = [];
      // if (this.$v.responses.dose_2.$dirty) {
      //   !this.$v.responses.dose_2.required &&
      //     errors.dose_2.push("Dose is required");
      // }

      //Date 1
      errors.vaccineOne.vaccination_date = [];
      if (this.$v.responses.date_1.$dirty) {
        !this.$v.responses.date_1.required &&
          errors.date_1.push("Date is required");
      }

      // //Date 2
      // errors.date_2 = [];
      // if (this.$v.responses.date_2.$dirty) {
      //   !this.$v.responses.date_2.required &&
      //     errors.date_2.push("Date is required");
      // }

      //Vaccination 1
      errors.vaccine_1 = [];
      if (this.$v.responses.vaccine_1.$dirty) {
        !this.$v.responses.vaccine_1.required &&
          errors.vaccine_1.push("Vaccine is required");
      }

      // //Vaccination 2
      // errors.vaccine_2 = [];
      // if (this.$v.responses.vaccine_2.$dirty) {
      //   !this.$v.responses.vaccine_2.required &&
      //     errors.vaccine_2.push("Vaccine is required");
      // }

      //Lot number 1
      errors.lot_number_1 = [];
      if (this.$v.responses.lot_number_1.$dirty) {
        !this.$v.responses.lot_number_1.required &&
          errors.lot_number_1.push("Lot number is required");
      }

      // //Lot number 2
      // errors.lot_number_2 = [];
      // if (this.$v.responses.lot_number_2.$dirty) {
      //   !this.$v.responses.lot_number_2.required &&
      //     errors.lot_number_2.push("Lot number is required");
      // }

      //Vaccine Site 1
      errors.vaccination_site_1 = [];
      if (this.$v.responses.vaccination_site_1.$dirty) {
        !this.$v.responses.vaccination_site_1.required &&
          errors.vaccination_site_1.push("Vaccination site is required");
      }

      // //Vaccine Site 2
      // errors.vaccination_site_2 = [];
      // if (this.$v.responses.vaccination_site_2.$dirty) {
      //   !this.$v.responses.vaccination_site_2.required &&
      //     errors.vaccination_site_2.push("Vaccination site is required");
      // }

      //Healthcare 1
      errors.healthcare_professional_1 = [];
      if (this.$v.responses.healthcare_professional_1.$dirty) {
        !this.$v.responses.healthcare_professional_1.required &&
          errors.healthcare_professional_1.push(
            "Healthcare professional is required"
          );
      }

      // //Healthcare 2
      // errors.healthcare_professional_2 = [];
      // if (this.$v.responses.healthcare_professional_2.$dirty) {
      //   !this.$v.responses.healthcare_professional_2.required &&
      //     errors.healthcare_professional_2.push(
      //       "Healthcare professional is required"
      //     );
      // }

      //Healthcare Professional License 1
      errors.healthcare_professional_license_number_1 = [];
      if (this.$v.responses.healthcare_professional_license_number_1.$dirty) {
        !this.$v.responses.healthcare_professional_license_number_1.required &&
          errors.healthcare_professional_license_number_1.push(
            "License number is required"
          );
      }

      // //Healthcare Professional License 2
      // errors.healthcare_professional_license_number_2 = [];
      // if (this.$v.responses.healthcare_professional_license_number_2.$dirty) {
      //   !this.$v.responses.healthcare_professional_license_number_2.required &&
      //     errors.healthcare_professional_license_number_2.push(
      //       "License number is required"
      //     );
      // }

      return errors;
    },
  },
};
