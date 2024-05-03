<template>
  <div>
    <v-card>
      <v-container fluid class="mx-auto" v-if="payload">
        <v-row class="mx-2">
          <v-col cols="12" class="py-0">
            <v-checkbox
              v-model="checkbox"
              label="For Janssen Vaccination"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-col cols="6">
            <v-select
              v-model="vaccineOne.dose"
              :value="vaccineOne.dose"
              label="Dose"
              :items="checkJanssenDose.doseOne"
              @blur="$v.vaccineOne.dose.$touch()"
              :error-messages="errorMessages.vaccineOne.dose"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineOne.vaccination_date"
              hint="Format (January 04, 2023)"
              label="Date"
              @blur="$v.vaccineOne.vaccination_date.$touch()"
              :error-messages="errorMessages.vaccineOne.vaccination_date"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="vaccineOne.vaccine"
              :value="vaccineOne.vaccine"
              label="Vaccine"
              :items="checkJanssenVaccine"
              @blur="$v.vaccineOne.vaccine.$touch()"
              :error-messages="errorMessages.vaccineOne.vaccine"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineOne.lot_number"
              :value="vaccineOne.lot_number"
              label="Lot no."
              @blur="$v.vaccineOne.lot_number.$touch()"
              :error-messages="errorMessages.vaccineOne.lot_number"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.vaccination_site"
              :value="vaccineOne.vaccination_site"
              label="Vaccination Site"
              @blur="$v.vaccineOne.vaccination_site.$touch()"
              :error-messages="errorMessages.vaccineOne.vaccination_site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.healthcare_professional"
              :value="vaccineOne.healthcare_professional"
              label="Healthcare Professional"
              @blur="$v.vaccineOne.healthcare_professional.$touch()"
              :error-messages="errorMessages.vaccineOne.healthcare_professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.healthcare_professional_license_number"
              :value="vaccineOne.healthcare_professional_license_number"
              label="Healthcare Professional License Number"
              @blur="
                $v.vaccineOne.healthcare_professional_license_number.$touch()
              "
              :error-messages="
                errorMessages.vaccineOne.healthcare_professional_license_number
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="showDeleteButton.vaccineOne">
            <v-btn
              @click="deleteVaccine(vaccineOne.id)"
              color="error"
              dark
              block
              outlined
            >
              Delete Vaccine
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="ma-5" v-if="checkJanssen"></v-divider>
        <v-row class="mx-2" v-if="checkJanssen">
          <v-col cols="6">
            <v-select
              v-model="vaccineTwo.dose"
              :value="vaccineTwo.dose"
              label="Dose"
              :items="checkJanssenDose.doseTwo"
              @blur="$v.vaccineTwo.dose.$touch()"
              :error-messages="errorMessages.vaccineTwo.dose"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineTwo.vaccination_date"
              hint="Format (January 04, 2023)"
              label="Date"
              @blur="$v.vaccineTwo.vaccination_date.$touch()"
              :error-messages="errorMessages.vaccineTwo.vaccination_date"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="vaccineTwo.vaccine"
              :value="vaccineTwo.vaccine"
              label="Vaccine"
              :items="checkJanssenVaccine"
              @blur="$v.vaccineTwo.vaccine.$touch()"
              :error-messages="errorMessages.vaccineTwo.vaccine"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :value="vaccineTwo.lot_number"
              v-model="vaccineTwo.lot_number"
              label="Lot no."
              @blur="$v.vaccineTwo.lot_number.$touch()"
              :error-messages="errorMessages.vaccineTwo.lot_number"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="vaccineTwo.vaccination_site"
              v-model="vaccineTwo.vaccination_site"
              label="Vaccination Site"
              @blur="$v.vaccineTwo.vaccination_site.$touch()"
              :error-messages="errorMessages.vaccineTwo.vaccination_site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineTwo.healthcare_professional"
              :value="vaccineTwo.healthcare_professional"
              label="Healthcare Professional"
              @blur="$v.vaccineTwo.healthcare_professional.$touch()"
              :error-messages="errorMessages.vaccineTwo.healthcare_professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineTwo.healthcare_professional_license_number"
              :value="vaccineTwo.healthcare_professional_license_number"
              label="Healthcare Professional License Number"
              @blur="
                $v.vaccineTwo.healthcare_professional_license_number.$touch()
              "
              :error-messages="
                errorMessages.vaccineTwo.healthcare_professional_license_number
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="showDeleteButton.vaccineTwo">
            <v-btn
              @click="deleteVaccine(vaccineTwo.id)"
              color="error"
              dark
              block
              outlined
            >
              Delete Vaccine
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-btn
              @click="submitData"
              :loading="loadingStatus"
              color="primary"
              dark
              block
            >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import VaccinationMixin from "@/mixins/VaccinationValidation";
export default {
  props: ["payload", "loadingStatus"],
  mixins: [VaccinationMixin],
  data: () => ({
    vaccineOne: {
      dose: null,
      vaccination_date: null,
      vaccine: null,
      lot_number: null,
      vaccination_site: null,
      healthcare_professional: null,
      healthcare_professional_license_number: null,
      id: null,
    },
    vaccineTwo: {
      dose: null,
      vaccination_date: null,
      vaccine: null,
      lot_number: null,
      vaccination_site: null,
      healthcare_professional: null,
      healthcare_professional_license_number: null,
      id: null,
    },
    vaccines: [],
    checkbox: false,
  }),
  methods: {
    submitData() {
      // Reset Payload Data
      let checkInvalidity = null;
      this.vaccines = [];
      this.$v.$touch();

      if (this.checkbox) {
        checkInvalidity = this.$v.vaccineOne.$invalid;
        this.vaccines.push(this.vaccineOne);
      } else {
        this.$v.$touch();
        checkInvalidity = this.$v.$invalid;
        if (this.vaccineOne.dose !== null) {
          this.vaccines.push(this.vaccineOne);
          if (this.vaccineTwo.dose !== null) {
            this.vaccines.push(this.vaccineTwo);
          }
        }
      }
      if (!checkInvalidity) {
        this.$emit("submitData", this.vaccines);
      }
    },
    deleteVaccine(vaccine_id) {
      //Emit the event which needs to be deleted
      this.$emit("delete-vaccine", vaccine_id);
      //Reset the chosen vaccine to null
      this.resetVariables(vaccine_id);
      this.$v.$reset();
    },
    updateVariables(value) {
      if (value.length === 1 && value[0]?.booster_name === "JANSSEN") {
        this.checkbox = true;
        value.forEach((item) => {
          this.vaccineOne = {
            dose: item.dose,
            vaccination_date: format(
              parseISO(item.booster_date),
              "MMMM dd, yyyy"
            ),
            vaccine: item.booster_name,
            lot_number: item.lot_no,
            vaccination_site: item.site_name,
            healthcare_professional: item.healthcare_professional,
            healthcare_professional_license_number:
              item.healthcare_professional_license_number,
            id: item.id ? item.id : null,
          };
        });
      } else {
        if (value && value.length > 0) {
          // If data has more than no value in length
          const objectOne = value[0];
          const objectTwo = value[1];

          this.vaccineOne = {
            dose: objectOne.dose,
            vaccination_date: objectOne.booster_date
              ? format(parseISO(objectOne.booster_date), "MMMM dd, yyyy")
              : null,
            vaccine: objectOne.booster_name,
            lot_number: objectOne.lot_no,
            vaccination_site: objectOne.site_name,
            healthcare_professional: objectOne.healthcare_professional,
            healthcare_professional_license_number:
              objectOne.healthcare_professional_license_number,
            id: objectOne.id,
          };

          this.vaccineTwo = {
            dose: objectTwo.dose,
            vaccination_date: objectTwo.booster_date
              ? format(parseISO(objectTwo.booster_date), "MMMM dd, yyyy")
              : null,
            vaccine: objectTwo.booster_name,
            lot_number: objectTwo.lot_no,
            vaccination_site: objectTwo.site_name,
            healthcare_professional: objectTwo.healthcare_professional,
            healthcare_professional_license_number:
              objectTwo.healthcare_professional_license_number,
            id: objectTwo.id,
          };
        }
      }
    },
    resetVariables(vaccine_id) {
      //Reset the values whichever vaccine
      if (this.vaccineOne.id === vaccine_id) {
        this.vaccineOne = {
          dose: null,
          vaccination_date: null,
          vaccine: null,
          lot_number: null,
          vaccination_site: null,
          healthcare_professional: null,
          healthcare_professional_license_number: null,
          id: null,
        };
      }
      if (this.vaccineTwo.id === vaccine_id) {
        this.vaccineTwo = {
          dose: null,
          vaccination_date: null,
          vaccine: null,
          lot_number: null,
          vaccination_site: null,
          healthcare_professional: null,
          healthcare_professional_license_number: null,
          id: null,
        };
      }
    },
  },
  computed: {
    checkJanssen() {
      return this.checkbox === true ? false : true;
    },
    checkJanssenDose() {
      let doseOne = ["3"];
      let doseTwo = [];
      if (this.checkbox === true) {
        doseOne = ["4"];
      } else if (this.vaccineOne.dose === "3") {
        doseTwo = ["4"];
      } 
      return {
        doseOne: doseOne,
        doseTwo: doseTwo,
      };
    },
    checkJanssenVaccine() {
      let vaccines = [
        "ASTRAZENECA",
        "BIOTECH",
        "MODERNA",
        "PFIZER",
        "SINOPHARM",
        "SINOVAC",
        "SPUTNIC V",
      ];
      if (this.checkbox === true) {
        vaccines = ["JANSSEN"];
      }
      return vaccines;
    },
    showDeleteButton() {
      let vaccineOne = false;
      let vaccineTwo = false;
      this.payload.forEach((item) => {
        if (item.dose === "4" && item.booster_name === "JANSSEN") {
          vaccineOne = true;
        } 

        if (item.dose === "3") {
          vaccineOne = true;
        }
        if (item.dose === "4" && this.payload.length === 2) {
          vaccineTwo = true;
          vaccineOne = false;
        }
      });
      return {
        vaccineOne: vaccineOne,
        vaccineTwo: vaccineTwo,
      };
    },
  },
  watch: {
    payload: {
      immediate: true,
      handler(value) {
        this.updateVariables(value);
      },
    },
  },
};
</script>
