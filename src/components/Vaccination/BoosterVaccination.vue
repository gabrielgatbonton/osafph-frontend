<template>
  <div>
    <v-card>
      <v-container fluid class="mx-auto" v-if="responses">
        <v-row class="mx-2">
          <v-col cols="12" class="py-0">
            <v-checkbox
              v-model="checkbox"
              label="For Janssen Vaccination"
            ></v-checkbox>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.dose_1"
              :value="responses.dose_1"
              label="Dose"
              :items="checkJanssenDose"
              @blur="$v.responses.dose_1.$touch()"
              :error-messages="errorMessages.dose_1"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="responses.date_1"
              hint="Format (January 04, 2023)"
              label="Date"
              @blur="$v.responses.date_1.$touch()"
              :error-messages="errorMessages.date_1"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.vaccine_1"
              :value="responses.vaccine_1"
              label="Vaccine"
              :items="checkJanssenVaccine"
              @blur="$v.responses.vaccine_1.$touch()"
              :error-messages="errorMessages.vaccine_1"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="responses.lot_number_1"
              :value="responses.lot_number_1"
              label="Lot no."
              @blur="$v.responses.lot_number_1.$touch()"
              :error-messages="errorMessages.lot_number_1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.vaccination_site_1"
              :value="responses.vaccination_site_1"
              label="Vaccination Site"
              @blur="$v.responses.vaccination_site_1.$touch()"
              :error-messages="errorMessages.vaccination_site_1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_1"
              :value="responses.healthcare_professional_1"
              label="Healthcare Professional"
              @blur="$v.responses.healthcare_professional_1.$touch()"
              :error-messages="errorMessages.healthcare_professional_1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_license_number_1"
              :value="responses.healthcare_professional_license_number_1"
              label="Healthcare Professional License Number"
              @blur="
                $v.responses.healthcare_professional_license_number_1.$touch()
              "
              :error-messages="
                errorMessages.healthcare_professional_license_number_1
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="ma-5" v-if="checkJanssen"></v-divider>
        <v-row class="mx-2" v-if="checkJanssen">
          <v-col cols="6">
            <v-select
              v-model="responses.dose_2"
              :value="responses.dose_2"
              label="Dose"
              :items="checkJanssenDose"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="responses.date_2"
              hint="Format (January 04, 2023)"
              label="Date"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.vaccine_2"
              :value="responses.vaccine_2"
              label="Vaccine"
              :items="checkJanssenVaccine"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :value="responses.lot_number_2"
              v-model="responses.lot_number_2"
              label="Lot no."
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="responses.vaccination_site_2"
              v-model="responses.vaccination_site_2"
              label="Vaccination Site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_2"
              :value="responses.healthcare_professional_2"
              label="Healthcare Professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_license_number_2"
              :value="responses.healthcare_professional_license_number_2"
              label="Healthcare Professional License Number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="submitData()"
          :loading="loadingStatus"
          class="blue darken-4"
          dark
        >
          Save
        </v-btn>
      </v-card-actions>
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
    responses: {
      dose_1: null,
      date_1: null,
      vaccine_1: null,
      lot_number_1: null,
      vaccination_site_1: null,
      healthcare_professional_1: null,
      healthcare_professional_license_number_1: null,
      dose_2: null,
      date_2: null,
      vaccine_2: null,
      lot_number_2: null,
      vaccination_site_2: null,
      healthcare_professional_2: null,
      healthcare_professional_license_number_2: null,
      vaccine_id_1: null,
      vaccine_id_2: null,
    },
    checkbox: false,
    // loading: false,
  }),
  methods: {
    submitData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("submitData", this.responses);
      }
    },
    updateVariables() {
      if (this.payload) {
        if (this.payload[0]) {
          if (this.payload[0].booster_name === "JANSSEN") {
            this.checkbox = true;
            this.responses.dose_1 = this.payload[0].dose;
            this.responses.date_1 = format(
              parseISO(this.payload[0].booster_date),
              "MMMM dd, yyyy"
            );
            this.responses.vaccine_1 = this.payload[0].booster_name;
            this.responses.lot_number_1 = this.payload[0].lot_no;
            this.responses.vaccination_site_1 = this.payload[0].site_name;
            this.responses.healthcare_professional_1 =
              this.payload[0].healthcare_professional;
            this.responses.healthcare_professional_license_number_1 =
              this.payload[0].healthcare_professional_license_number;
            this.responses.vaccine_id_1 = this.payload[0].id;
          } else {
            this.responses.dose_1 = this.payload[0].dose;
            this.responses.date_1 = format(
              parseISO(this.payload[0].booster_date),
              "MMMM dd, yyyy"
            );
            this.responses.vaccine_1 = this.payload[0].booster_name;
            this.responses.lot_number_1 = this.payload[0].lot_no;
            this.responses.vaccination_site_1 = this.payload[0].site_name;
            this.responses.healthcare_professional_1 =
              this.payload[0].healthcare_professional;
            this.responses.healthcare_professional_license_number_1 =
              this.payload[0].healthcare_professional_license_number;
            this.responses.vaccine_id_1 = this.payload[0].id;
          }
        } else {
          this.responses.dose_1 = null;
          this.responses.date_1 = null;
          this.responses.vaccine_1 = null;
          this.responses.lot_number_1 = null;
          this.responses.vaccination_site_1 = null;
          this.responses.healthcare_professional_1 = null;
          this.responses.healthcare_professional_license_number_1 = null;
          this.responses.vaccine_id_1 = null;
        }
        if (this.payload[1]) {
          this.responses.dose_2 = this.payload[1].dose;
          this.responses.date_2 = this.payload[1].booster_date
            ? format(parseISO(this.payload[1].booster_date), "MMMM dd, yyyy")
            : null;
          this.responses.vaccine_2 = this.payload[1].booster_name;
          this.responses.lot_number_2 = this.payload[1].lot_no;
          this.responses.vaccination_site_2 = this.payload[1].site_name;
          this.responses.healthcare_professional_2 =
            this.payload[1].healthcare_professional;
          this.responses.healthcare_professional_license_number_2 =
            this.payload[1].healthcare_professional_license_number;
          this.responses.vaccine_id_2 = this.payload[1].id;
        } else {
          this.responses.dose_2 = null;
          this.responses.date_2 = null;
          this.responses.vaccine_2 = null;
          this.responses.lot_number_2 = null;
          this.responses.vaccination_site_2 = null;
          this.responses.healthcare_professional_2 = null;
          this.responses.healthcare_professional_license_number_2 = null;
          this.responses.vaccine_id_2 = null;
        }
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
        doses = ["4"];
      } else {
        doses = ["3", "4"];
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
  },
  watch: {
    payload: {
      immediate: true,
      handler() {
        this.updateVariables();
      },
    },
  },
};
</script>
