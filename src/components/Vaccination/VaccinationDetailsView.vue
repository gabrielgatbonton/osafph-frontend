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
                <v-tab v-if="vaccinationInformation.length > 1">Booster</v-tab>
                <v-tab-item>
                  <InitialVaccination
                    v-on:submitData="submitVaccine"
                    :payload="vaccinationInformation"
                    :loadingStatus="loading_vaccine"
                  />
                </v-tab-item>
                <v-tab-item>
                  <BoosterVaccination
                    v-on:submitData="submitBooster"
                    :payload="boosterInformation"
                    :loadingStatus="loading_booster"
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
import { format, parse } from "date-fns";
import { mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  components: {
    InitialVaccination,
    BoosterVaccination,
  },
  data: () => ({
    dialog: false,
    loading_vaccine: false,
    loading_booster: false,
  }),
  methods: {
    ...mapActions("registrants", [
      "fetchVaccineInformation",
      "updateVaccineInformation",
      "fetchBoosterInformation",
      "updateBoosterInformation",
    ]),
    submitVaccine(data) {
      this.loading_vaccine = true;
      let data1 = null;
      let data2 = null;
      if (
        this.vaccinationInformation[0]?.id &&
        this.vaccinationInformation[1]?.id
      ) {
        data1 = {
          dose: data.dose_1,
          vaccination_date: format(
            parse(data.date_1, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
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
          vaccination_date: data.date_2
            ? format(
                parse(data.date_2, "MMMM dd, yyyy", new Date()),
                "yyyy-MM-d"
              )
            : null,
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
          vaccination_date: format(
            parse(data.date_1, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          vaccine_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
        };
        data2 = {
          dose: data.dose_2,
          vaccination_date: data.date_2
            ? format(
                parse(data.date_2, "MMMM dd, yyyy", new Date()),
                "yyyy-MM-d"
              )
            : null,
          vaccine_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
        };
      }

      const payload = {
        vaccines: [data1, data2],
      };

      this.updateVaccineInformation({
        id: this.id,
        data: payload,
      })
        .catch((error) => {
          console.error("Error submitting vaccine information:", error);
        })
        .finally(() => {
          this.loading_vaccine = false;
          this.dialog = false;
        });
    },
    submitBooster(data) {
      this.loading_booster = true;
      let data1 = null;
      let data2 = null;
      if (this.boosterInformation[0]?.id && this.boosterInformation[1]?.id) {
        data1 = {
          dose: data.dose_1,
          booster_date: format(
            parse(data.date_1, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
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
          booster_date: data.date_2
            ? format(
                parse(data.date_2, "MMMM dd, yyyy", new Date()),
                "yyyy-MM-d"
              )
            : null,
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
          booster_date: format(
            parse(data.date_1, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          booster_name: data.vaccine_1,
          lot_no: data.lot_number_1,
          site_name: data.vaccination_site_1,
          healthcare_professional: data.healthcare_professional_1,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_1,
        };
        data2 = {
          dose: data.dose_2,
          booster_date: data.date_2
            ? format(
                parse(data.date_2, "MMMM dd, yyyy", new Date()),
                "yyyy-MM-d"
              )
            : null,
          booster_name: data.vaccine_2,
          lot_no: data.lot_number_2,
          site_name: data.vaccination_site_2,
          healthcare_professional: data.healthcare_professional_2,
          healthcare_professional_license_number:
            data.healthcare_professional_license_number_2,
        };
      }

      const payload = {
        boosters: [data1, data2],
      };

      this.updateBoosterInformation({
        id: this.id,
        data: payload,
      })
        .catch((error) => {
          console.error("Error submitting vaccine information:", error);
        })
        .finally(() => {
          this.loading_booster = false;
          this.dialog = false;
        });
    },
    fetchData() {
      this.fetchVaccineInformation(this.id).catch((error) => {
        console.error("VaccinationDetails Component Vaccination Error:", error);
      });
      this.fetchBoosterInformation(this.id).catch((error) => {
        console.error("VaccinationDetails Component Booster Error:", error);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapState("registrants", {
      vaccinationInformation: "vaccinationDetails",
      boosterInformation: "boosterDetails",
    }),
  },
};
</script>
