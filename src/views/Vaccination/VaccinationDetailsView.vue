<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue darken-4" block dark v-bind="attrs" v-on="on">
          Vaccination Details
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-needle</v-icon>Registrant Vaccine
          Information</v-card-title
        >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-tabs centered>
                <v-tab>Vaccination</v-tab>
                <v-tab>Booster</v-tab>
                <v-tab-item>
                  <InitialVaccination
                    v-on:submitData="submitVaccine"
                    :payload="getVaccineInformation"
                  />
                </v-tab-item>
                <v-tab-item>
                  <BoosterVaccination
                    v-on:submitData="submitBooster"
                    :payload="getBoosterInformation"
                  />
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InitialVaccination from "./InitialVaccination.vue";
import BoosterVaccination from "./BoosterVaccination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  components: {
    InitialVaccination,
    BoosterVaccination,
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    ...mapActions("registrants", [
      "fetchVaccineInformation",
      "updateVaccineInformation",
      "fetchBoosterInformation",
      "updateBoosterInformation"
    ]),
    submitVaccine(data) {
      this.loading = true;
      let data1 = null;
      let data2 = null;
      if (data.vaccine_id_1 || data.vaccine_id_2) {
        data1 = {
          dose: data.dose_1,
          vaccination_date: data.date_1,
          vaccine_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
          id: data.vaccine_id_1,
        };
        data2 = {
          dose: data.dose_2,
          vaccination_date: data.date_2,
          vaccine_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
          id: data.vaccine_id_2,
        };
      } else {
        data1 = {
          dose: data.dose_1,
          vaccination_date: data.date_1,
          vaccine_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
        };
        data2 = {
          dose: data.dose_2,
          vaccination_date: data.date_2,
          vaccine_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
        };
      }
      this.updateVaccineInformation({
        id: this.id,
        data: [data1, data2],
      })
        .catch((error) => {
          console.error("Error submitting vaccine information:", error);
        })
        .finally(() => {
          (this.loading = false), (this.dialog = false);
        });
    },
    submitBooster(data) {
      this.loading = true;
      let data1 = null;
      let data2 = null;
      if (data.vaccine_id_1 || data.vaccine_id_2) {
        data1 = {
          dose: data.dose_1,
          booster_date: data.date_1,
          booster_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
          id: data.vaccine_id_1,
        };
        data2 = {
          dose: data.dose_2,
          booster_date: data.date_2,
          booster_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
          id: data.vaccine_id_2,
        };
      } else {
        data1 = {
          dose: data.dose_1,
          booster_date: data.date_1,
          booster_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
        };
        data2 = {
          dose: data.dose_2,
          booster_date: data.date_2,
          booster_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
        };
      }
      this.updateBoosterInformation({
        id: this.id,
        data: [data1, data2],
      })
        .catch((error) => {
          console.error("Error submitting vaccine information:", error);
        })
        .finally(() => {
          (this.loading = false), (this.dialog = false);
        });
    },
    // async submit() {
    //   const id = this.id; // Update this line
    //   let data1 = null;
    //   let data2 = null;
    //   try {
    //     this.loading = true;
    //     if (this.vaccine_id_1 || this.vaccine_id_2) {
    //       data1 = {
    //         dose: this.dose_1,
    //         vaccination_date: this.date_1,
    //         vaccine_name: this.vaccine_1,
    //         lot_no: this.lot_number_1,
    //         site_name: this.vaccination_site_1,
    //         id: this.vaccine_id_1,
    //       };
    //       data2 = {
    //         dose: this.dose_2,
    //         vaccination_date: this.date_2,
    //         vaccine_name: this.vaccine_2,
    //         lot_no: this.lot_number_2,
    //         site_name: this.vaccination_site_2,
    //         id: this.vaccine_id_2,
    //       };
    //     } else {
    //       data1 = {
    //         dose: this.dose_1,
    //         vaccination_date: this.date_1,
    //         vaccine_name: this.vaccine_1,
    //         lot_no: this.lot_number_1,
    //         site_name: this.vaccination_site_1,
    //       };
    //       data2 = {
    //         dose: this.dose_2,
    //         vaccination_date: this.date_2,
    //         vaccine_name: this.vaccine_2,
    //         lot_no: this.lot_number_2,
    //         site_name: this.vaccination_site_2,
    //       };
    //     }

    //     return this.$store
    //       .dispatch("registrants/updateVaccineInformation", {
    //         id: id,
    //         data: [data1, data2],
    //       })
    //       .then((this.loading = false), (this.dialog = false))
    //       .catch((error) => {
    //         console.error("Error submitting vaccine information:", error);
    //       });
    //   } catch (error) {
    //     console.error("Error submitting vaccine information:", error);
    //   }
    // },
    fetchData() {
      this.fetchVaccineInformation(this.id).catch((error) => {
        console.error("VaccinationDetails Component Vaccination Error:", error);
      });
      this.fetchBoosterInformation(this.id).catch((error) => {
        console.error("VaccinationDetails Component Booster Error:", error);
      });
    },
  },
  mounted(){
    this.fetchData();
  },
  computed: {
    ...mapGetters("registrants", ["getVaccineInformation", "getBoosterInformation"]),
  },
  watch: {
    // getVaccineInformation(value){
    //   console.log("VaccineInformation", value);
    // },
    // getBoosterInformation(value){
    //   console.log("BoosterInformation", value);
    // }
  }
};
</script>
