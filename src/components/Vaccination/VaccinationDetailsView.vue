<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" block dark v-bind="attrs" v-on="on">
          Vaccination Details
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary pb-4 white--text"
          ><v-icon dark left>mdi-needle</v-icon>Registrant Vaccine
          Information</v-card-title
        >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-tabs centered>
                <v-tab>Vaccination</v-tab>
                <v-tab v-if="boosterUnlock">Booster</v-tab>
                <v-tab-item>
                  <InitialVaccination
                    @submitData="submitVaccine"
                    @delete-vaccine="deleteVaccine"
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
    ...mapActions("registrant_vaccines", [
      "fetchVaccineInformation",
      "updateVaccineInformation",
      "fetchBoosterInformation",
      "updateBoosterInformation",
      "deleteVaccineById",
    ]),
    submitVaccine(data) {
      this.loading_vaccine = true;
      let payload = {
        vaccines: [],
      };

      data.forEach((item) => {
        let vaccine = {
          id: item.id,
          dose: item.dose,
          vaccination_date: format(
            parse(item.vaccination_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          lot_no: item.lot_number,
          healthcare_professional: item.healthcare_professional,
          healthcare_professional_license_number:
            item.healthcare_professional_license_number,
          site_name: item.vaccination_site,
          vaccine_name: item.vaccine,
        };
        if (item.id === null) {
          delete vaccine.id;
        }
        payload.vaccines.push(vaccine);
      });

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
    deleteVaccine(vaccine_id) {
      //Delete Vaccine through the store.
      this.deleteVaccineById({
        id: this.id,
        vaccine_id: vaccine_id,
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
    ...mapState("registrant_vaccines", {
      vaccinationInformation: "vaccinationDetails",
      boosterInformation: "boosterDetails",
    }),
    boosterUnlock() {
      return (
        this.vaccinationInformation.length > 1 ||
        this.vaccinationInformation[0]?.vaccine_name === "JANSSEN"
      );
    },
  },
};
</script>
