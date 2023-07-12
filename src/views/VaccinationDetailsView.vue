<template>
  <div>
    <v-container fluid class="ma-1 mx-auto" v-if="info">
      <v-row>
        <v-col cols="auto">
          <span class="title">Registrant Vaccine Information</span>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="grey lighten-2"
              ><v-icon left>mdi-needle</v-icon>Vaccine</v-card-title
            >
            <v-container fluid>
              <v-row class="my-n4 mx-2">
                <v-col cols="1">
                  <v-text-field
                    :value="dose_1"
                    v-model="dose_1"
                    label="Dose"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
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
                      v-model="date_1"
                      @input="menu_1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="vaccine_1"
                    :value="vaccine_1"
                    label="Vaccine"
                    :items="vaccines"
                    placeholder="Choose..."
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="lot_number_1"
                    :value="lot_number_1"
                    label="Lot no."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="vaccination_site_1"
                    :value="vaccination_site_1"
                    label="Vaccination Site"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="my-n4 mx-2">
                <v-col cols="1">
                  <v-text-field
                    :value="dose_2"
                    v-model="dose_2"
                    label="Dose"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
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
                      v-model="date_2"
                      @input="menu_2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="vaccine_2"
                    :value="vaccine_2"
                    label="Vaccine"
                    :items="vaccines"
                    placeholder="Choose..."
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :value="lot_number_2"
                    v-model="lot_number_2"
                    label="Lot no."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :value="vaccination_site_2"
                    v-model="vaccination_site_2"
                    label="Vaccination Site"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn @click="submit()" :loading="loading" class="blue" dark
                >Submit</v-btn
              >
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  data: () => ({
    dose_1: null,
    date_1: null,
    vaccine_1: null,
    lot_number_1: null,
    vaccination_site_1: null,
    dose_2: null,
    date_2: null,
    vaccine_2: null,
    lot_number_2: null,
    vaccination_site_2: null,
    vaccine_id: null,
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
    info: null,
    loading: false,
  }),
  methods: {
    async fetchVaccination() {
      const id = this.$route.params.id;
      try {
        await this.$store.dispatch("registrants/fetchVaccineInformation", id);
      } catch (error) {
        console.error(
          "Error fetching Vaccination Information, component:",
          error
        );
      }
    },
    async submit() {
        const id = this.$route.params.id; // Update this line
      try {
        this.loading = true;
        const data1 = [
          {
            dose: this.dose_1,
            vaccination_date: this.date_1,
            vaccine_name: this.vaccine_1,
            lot_no: this.lot_number_1,
            site_name: this.vaccination_site_1,
          },
        ];
        // const data2 = [
        //   {
        //     dose: this.dose_2,
        //     vaccination_date: this.date_2,
        //     vaccine_name: this.vaccine_2,
        //     lot_no: this.lot_number_2,
        //     site_name: this.vaccination_site_2,
        //   },
        // ];

        await this.$store.dispatch("registrants/updateVaccineInformation", {
          id: id,
          data: data1,
        });
        this.loading = false;
      } catch (error) {
        console.error("Error submitting vaccine information:", error);
      }
    },
  },
  computed: {
    ...mapGetters("registrants", ["getVaccineInformation"]),
    formattedDate1() {
      return this.date_1 ? format(parseISO(this.date_1), "MMMM d, yyyy") : "";
    },
    formattedDate2() {
      return this.date_2 ? format(parseISO(this.date_2), "MMMM d, yyyy") : "";
    },
  },
  mounted() {
    this.fetchVaccination();
  },
  watch: {
    getVaccineInformation(value) {
      console.log("watch:", value);
      this.info = value;
    },
    info(value) {
      console.log("info:", value);
      if (value && value.vaccinationStat && value.vaccinationStat.length < 2) {
        this.dose_1 = value.vaccinationStat[0].dose;
        this.date_1 = value.vaccinationStat[0].vaccination_date;
        this.vaccine_1 = value.vaccinationStat[0].vaccine_name;
        this.lot_number_1 = value.vaccinationStat[0].lot_no;
        this.vaccination_site_1 = value.vaccinationStat[0].site_name;
        this.vaccine_id = value.vaccinationStat[0].id        
      }
      if(value && value.vaccinationStat && value.vaccinationStat.length > 1){
        this.dose_1 = value.vaccinationStat[0].dose;
        this.date_1 = value.vaccinationStat[0].vaccination_date;
        this.vaccine_1 = value.vaccinationStat[0].vaccine_name;
        this.lot_number_1 = value.vaccinationStat[0].lot_no;
        this.vaccination_site_1 = value.vaccinationStat[0].site_name;
        this.dose_2 = value.vaccinationStat[1].dose;
        this.date_2 = value.vaccinationStat[1].vaccination_date;
        this.vaccine_2 = value.vaccinationStat[1].vaccine_name;
        this.lot_number_2 = value.vaccinationStat[1].lot_no;
        this.vaccination_site_2 = value.vaccinationStat[1].site_name;

      }
    },
  },
};
</script>

<style scoped></style>
