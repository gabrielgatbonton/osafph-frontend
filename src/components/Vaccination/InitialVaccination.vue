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
        <v-row class="mx-2" v-if="checkJanssen">
          <v-col cols="6">
            <v-select
              v-model="vaccineOne.dose"
              :value="vaccineOne.dose"
              label="Dose"
              :items="checkJanssenDose"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineOne.vaccination_date"
              hint="Format (January 04, 2023)"
              label="Date"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="vaccineOne.vaccine"
              :value="vaccineOne.vaccine"
              label="Vaccine"
              :items="checkJanssenVaccine"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineOne.lot_number"
              :value="vaccineOne.lot_number"
              label="Lot no."
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.vaccination_site"
              :value="vaccineOne.vaccination_site"
              label="Vaccination Site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.healthcare_professional"
              :value="vaccineOne.healthcare_professional"
              label="Healthcare Professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineOne.healthcare_professional_license_number"
              :value="vaccineOne.healthcare_professional_license_number"
              label="Healthcare Professional License Number"
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
        <v-row class="mx-2">
          <v-col cols="6">
            <v-select
              v-model="vaccineTwo.dose"
              :value="vaccineTwo.dose"
              label="Dose"
              :items="checkJanssenDose"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="vaccineTwo.vaccination_date"
              hint="Format (January 04, 2023)"
              label="Date"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="vaccineTwo.vaccine"
              :value="vaccineTwo.vaccine"
              label="Vaccine"
              :items="checkJanssenVaccine"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :value="vaccineTwo.lot_number"
              v-model="vaccineTwo.lot_number"
              label="Lot no."
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="vaccineTwo.vaccination_site"
              v-model="vaccineTwo.vaccination_site"
              label="Vaccination Site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineTwo.healthcare_professional"
              :value="vaccineTwo.healthcare_professional"
              label="Healthcare Professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="vaccineTwo.healthcare_professional_license_number"
              :value="vaccineTwo.healthcare_professional_license_number"
              label="Healthcare Professional License Number"
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
              Save
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
      this.vaccines = [];
      // this.$v.$touch();

      if (this.checkbox) {
        this.vaccines.push(this.vaccineTwo);
      } else {
        if (this.vaccineOne.dose !== null) {
          this.vaccines.push(this.vaccineOne);
          if (this.vaccineTwo.dose !== null) {
            this.vaccines.push(this.vaccineTwo);
          }
        }
      }
      this.$emit("submitData", this.vaccines);
      // if (!this.$v.$invalid) {
      //   this.$emit("submitData", this.vaccines);
      // }
    },
    deleteVaccine(vaccine_id) {
      //Emit the event which needs to be deleted
      this.$emit("delete-vaccine", vaccine_id);
      //Reset the chosen vaccine to null
      this.resetVariables(vaccine_id);
    },
    updateVariables(value) {
      if (value.length === 1 && value[0]?.vaccine_name === "JANSSEN") {
        this.checkbox = true;
        value.forEach((item) => {
          this.vaccineTwo = {
            dose: item.dose,
            vaccination_date: format(
              parseISO(item.vaccination_date),
              "MMMM dd, yyyy"
            ),
            vaccine: item.vaccine_name,
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
            vaccination_date: format(
              parseISO(objectOne.vaccination_date),
              "MMMM dd, yyyy"
            ),
            vaccine: objectOne.vaccine_name,
            lot_number: objectOne.lot_no,
            vaccination_site: objectOne.site_name,
            healthcare_professional: objectOne.healthcare_professional,
            healthcare_professional_license_number:
              objectOne.healthcare_professional_license_number,
            id: objectOne.id,
          };

          this.vaccineTwo = {
            dose: objectTwo.dose,
            vaccination_date: format(
              parseISO(objectTwo.vaccination_date),
              "MMMM dd, yyyy"
            ),
            vaccine: objectTwo.vaccine_name,
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
      let doses = [];
      if (this.checkbox === true) {
        doses = ["2"];
      } else {
        doses = ["1", "2"];
      }
      return doses;
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
        if (item.dose === "2") {
          vaccineTwo = true;
        } else if (item.dose === "1" && this.payload.length === 1) {
          vaccineOne = true;
        } else {
          vaccineOne = false;
          vaccineTwo = false;
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
      deep: true,
      handler(value) {
        this.updateVariables(value);
      },
    },
  },
};
</script>
