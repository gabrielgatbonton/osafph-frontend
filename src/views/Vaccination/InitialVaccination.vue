<template>
  <div>
    <v-card>
      <v-container fluid class="mx-auto" v-if="responses">
        <v-row class="mx-2">
          <v-col cols="12" class="py-0">
            <v-checkbox v-model="checkbox" label="For Janssen Vaccination"></v-checkbox>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.dose_1"
              :value="responses.dose_1"
              label="Dose"
              :items="checkJanssenDose"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-menu
              max-width="290"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
              v-model="menu_1"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate1"
                  v-on="on"
                  v-bind="attrs"
                  label="Date"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="responses.date_1"
                @input="menu_1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.vaccine_1"
              :value="responses.vaccine_1"
              label="Vaccine"
              :items="vaccines"
              placeholder="Choose..."
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="responses.lot_number_1"
              :value="responses.lot_number_1"
              label="Lot no."
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.vaccination_site_1"
              :value="responses.vaccination_site_1"
              label="Vaccination Site"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_1"
              :value="responses.healthcare_professional_1"
              label="Healthcare Professional"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="responses.healthcare_professional_license_number_1"
              :value="responses.healthcare_professional_license_number_1"
              label="Healthcare Professional License Number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="ma-5" v-if="checkJanssen"></v-divider>
        <v-row class="mx-2"  v-if="checkJanssen">
          <v-col cols="6">
            <v-select
              v-model="responses.dose_2"
              :value="responses.dose_2"
              label="Dose"
              :items="doses"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-menu
              max-width="290"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
              v-model="menu_2"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate2"
                  v-on="on"
                  v-bind="attrs"
                  label="Date"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="responses.date_2"
                @input="menu_2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="responses.vaccine_2"
              :value="responses.vaccine_2"
              label="Vaccine"
              :items="vaccines"
              placeholder="Choose..."
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
        <v-btn @click="submitData" class="blue darken-4" dark> Save </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// import { required } from "vuelidate/lib/validators";
// import { isBefore, subYears } from "date-fns";
export default {
  props: ["payload"],
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
    // validations: {
    //   responses: {
    //     dose_1: { required },
    //     date_1: { required },
    //     vaccine_1: { required },
    //     lot_number_1: { required },
    //     vaccination_site_1: { required },
    //     dose_2: { required },
    //     date_2: { required },
    //     vaccine_2: { required },
    //     lot_number_2: { required },
    //     vaccination_site_2: { required },
    //     vaccine_id_1: { required },
    //     vaccine_id_2: { required },
    //   },
    // },
    vaccines: [
      "ASTRAZENECA",
      "BIOTECH",
      "JANSSEN",
      "MODERNA",
      "PFIZER",
      "SINOPHARM",
      "SINOVAC",
      "SPUTNIC V",
    ],
    menu_1: false,
    menu_2: false,
    checkbox: false,
    // loading: false,
  }),
  methods: {
    submitData() {
      //   this.$v.$touch();

      //   if (!this.$v.$invalid) {
      this.$emit("submitData", this.responses);
      //   }
    },
    updateVariables() {
      if (this.payload && this.payload.vaccinationStat) {
        if (this.payload.vaccinationStat[0]) {
          this.responses.dose_1 = this.payload.vaccinationStat[0].dose;
          this.responses.date_1 =
            this.payload.vaccinationStat[0].vaccination_date;
          this.responses.vaccine_1 =
            this.payload.vaccinationStat[0].vaccine_name;
          this.responses.lot_number_1 = this.payload.vaccinationStat[0].lot_no;
          this.responses.vaccination_site_1 =
            this.payload.vaccinationStat[0].site_name;
          this.responses.healthcare_professional_1 =
            this.payload.vaccinationStat[0].healthcare_professional;
          this.responses.healthcare_professional_license_number_1 =
            this.payload.vaccinationStat[0].healthcare_professional_license_number;
          this.responses.vaccine_id_1 = this.payload.vaccinationStat[0].id;
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
        if (this.payload.vaccinationStat[1]) {
          this.responses.dose_2 = this.payload.vaccinationStat[1].dose;
          this.responses.date_2 =
            this.payload.vaccinationStat[1].vaccination_date;
          this.responses.vaccine_2 =
            this.payload.vaccinationStat[1].vaccine_name;
          this.responses.lot_number_2 = this.payload.vaccinationStat[1].lot_no;
          this.responses.vaccination_site_2 =
            this.payload.vaccinationStat[1].site_name;
          this.responses.healthcare_professional_2 =
            this.payload.vaccinationStat[1].healthcare_professional;
          this.responses.healthcare_professional_license_number_2 =
            this.payload.vaccinationStat[1].healthcare_professional_license_number;
          this.responses.vaccine_id_2 = this.payload.vaccinationStat[1].id;
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
    formattedDate1() {
      return this.responses.date_1
        ? format(parseISO(this.responses.date_1), "MMMM d, yyyy")
        : "";
    },
    formattedDate2() {
      return this.responses.date_2
        ? format(parseISO(this.responses.date_2), "MMMM d, yyyy")
        : "";
    },
    checkJanssen(){
      return this.checkbox === true ? false : true;
    },
    checkJanssenDose(){
      let doses = []
      if(this.checkbox === true){
        doses = ["2"];
      }
      else {
        doses = ["1", "2"];
      }
      return doses
    },
    // errorMessages() {
    //   const errors = {};

    //   errors.dose_1 = [];
    //   if (this.$v.responses.dose_1.$dirty) {
    //     !this.$v.data.category.required &&
    //       errors.category.push("Category is required");
    //   }

    //   return errors;
    // },
  },
  mounted() {
    // console.log(this.payload);
    this.updateVariables();
  },
};
</script>
