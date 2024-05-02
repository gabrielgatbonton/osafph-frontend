import { required, requiredIf } from "vuelidate/lib/validators";
// import { isBefore, subYears } from "date-fns";

const checkValues = (value) => {
  const test = Object.values(value).filter(
    (item) => item !== null && item !== ""
  );
  if (test.length > 0) {
    return true;
  } else {
    return false;
  }
};
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
      id: {},
    },
    vaccineTwo: {
      dose: { required: requiredIf((value) => checkValues(value)) },
      vaccination_date: { required: requiredIf((value) => checkValues(value)) },
      vaccine: { required: requiredIf((value) => checkValues(value)) },
      lot_number: { required: requiredIf((value) => checkValues(value)) },
      vaccination_site: { required: requiredIf((value) => checkValues(value)) },
      healthcare_professional: {
        required: requiredIf((value) => checkValues(value)),
      },
      healthcare_professional_license_number: {
        required: requiredIf((value) => checkValues(value)),
      },
      id: {},
    },
  },
  computed: {
    errorMessages() {
      const errors = {
        vaccineOne: {},
        vaccineTwo: {},
      };

      //Dose 1
      errors.vaccineOne.dose = [];
      if (this.$v.vaccineOne.dose.$dirty) {
        !this.$v.vaccineOne.dose.required &&
          errors.vaccineOne.dose.push("Dose is required");
      }

      //Dose 2
      errors.vaccineTwo.dose = [];
      if (this.$v.vaccineTwo.dose.$dirty) {
        !this.$v.vaccineOne.dose.required &&
          errors.vaccineTwo.dose.push("Dose 1 is required");
        !this.$v.vaccineTwo.dose.required &&
          errors.vaccineTwo.dose.push("Dose is required");
      }

      //Date 1
      errors.vaccineOne.vaccination_date = [];
      if (this.$v.vaccineOne.vaccination_date.$dirty) {
        !this.$v.vaccineOne.vaccination_date.required &&
          errors.vaccineOne.vaccination_date.push("Date is required");
      }

      //Date 2
      errors.vaccineTwo.vaccination_date = [];
      if (this.$v.vaccineTwo.vaccination_date.$dirty) {
        !this.$v.vaccineOne.vaccination_date.required &&
          errors.vaccineTwo.vaccination_date.push("Date 1 is required");
        !this.$v.vaccineTwo.vaccination_date.required &&
          errors.vaccineTwo.vaccination_date.push("Date is required");
      }

      //Vaccination 1
      errors.vaccineOne.vaccine = [];
      if (this.$v.vaccineOne.vaccine.$dirty) {
        !this.$v.vaccineOne.vaccine.required &&
          errors.vaccineOne.vaccine.push("Vaccine is required");
      }

      //Vaccination 2
      errors.vaccineTwo.vaccine = [];
      if (this.$v.vaccineTwo.vaccine.$dirty) {
        !this.$v.vaccineOne.vaccine.required &&
          errors.vaccineTwo.vaccine.push("Vaccine 1 is required");
        !this.$v.vaccineTwo.vaccine.required &&
          errors.vaccineTwo.vaccine.push("Vaccine is required");
      }

      //Lot number 1
      errors.vaccineOne.lot_number = [];
      if (this.$v.vaccineOne.lot_number.$dirty) {
        !this.$v.vaccineOne.lot_number.required &&
          errors.vaccineOne.lot_number.push("Lot number is required");
      }

      //Lot number 2
      errors.vaccineTwo.lot_number = [];
      if (this.$v.vaccineTwo.lot_number.$dirty) {
        !this.$v.vaccineOne.lot_number.required &&
          errors.vaccineTwo.lot_number.push("Lot number 1 is required");
        !this.$v.vaccineTwo.lot_number.required &&
          errors.vaccineTwo.lot_number.push("Lot number is required");
      }

      //Vaccine Site 1
      errors.vaccineOne.vaccination_site = [];
      if (this.$v.vaccineOne.vaccination_site.$dirty) {
        !this.$v.vaccineOne.vaccination_site.required &&
          errors.vaccineOne.vaccination_site.push(
            "Vaccination site is required"
          );
      }

      //Vaccine Site 2
      errors.vaccineTwo.vaccination_site = [];
      if (this.$v.vaccineTwo.vaccination_site.$dirty) {
        !this.$v.vaccineOne.vaccination_site.required &&
          errors.vaccineTwo.vaccination_site.push(
            "Vaccination site 1 is required"
          );
        !this.$v.vaccineTwo.vaccination_site.required &&
          errors.vaccineTwo.vaccination_site.push(
            "Vaccination site is required"
          );
      }

      //Healthcare 1
      errors.vaccineOne.healthcare_professional = [];
      if (this.$v.vaccineOne.healthcare_professional.$dirty) {
        !this.$v.vaccineOne.healthcare_professional.required &&
          errors.vaccineOne.healthcare_professional.push(
            "Healthcare professional is required"
          );
      }

      //Healthcare 2
      errors.vaccineTwo.healthcare_professional = [];
      if (this.$v.vaccineTwo.healthcare_professional.$dirty) {
        !this.$v.vaccineOne.healthcare_professional.required &&
          errors.vaccineTwo.healthcare_professional.push(
            "Healthcare professional 1 is required"
          );
        !this.$v.vaccineTwo.healthcare_professional.required &&
          errors.vaccineTwo.healthcare_professional.push(
            "Healthcare professional is required"
          );
      }

      //Healthcare Professional License 1
      errors.vaccineOne.healthcare_professional_license_number = [];
      if (this.$v.vaccineOne.healthcare_professional_license_number.$dirty) {
        !this.$v.vaccineOne.healthcare_professional_license_number.required &&
          errors.vaccineOne.healthcare_professional_license_number.push(
            "License number is required"
          );
      }

      //Healthcare Professional License 2
      errors.vaccineTwo.healthcare_professional_license_number = [];
      if (this.$v.vaccineTwo.healthcare_professional_license_number.$dirty) {
        !this.$v.vaccineOne.healthcare_professional_license_number.required &&
          errors.vaccineTwo.healthcare_professional_license_number.push(
            "License number 1 is required"
          );
        !this.$v.vaccineTwo.healthcare_professional_license_number.required &&
          errors.vaccineTwo.healthcare_professional_license_number.push(
            "License number is required"
          );
      }

      return errors;
    },
  },
};
