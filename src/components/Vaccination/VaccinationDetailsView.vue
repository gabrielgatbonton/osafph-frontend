<template>
  <div>
    <v-dialog v-model="dialog" max-width="600" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" block dark v-bind="attrs" v-on="on">
          See Details
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary pb-4 white--text"
          ><v-icon dark left>mdi-needle</v-icon>Registrant Vaccine
          Information</v-card-title
        >
        <v-container class="overflow-scroll">
          <v-row>
            <v-col cols="12">
              <v-tabs centered>
                <v-tab>Vaccination</v-tab>
                <v-tab v-if="boosterUnlock">Booster</v-tab>
                <v-tab-item>
                  <InitialVaccination
                    @submitData="submitVaccine"
                    @delete-vaccine="
                      (vac_id) => deleteVaccine('vaccination', vac_id)
                    "
                    :payload="vaccinationInformation"
                    :loadingStatus="loading_vaccine"
                  />
                </v-tab-item>
                <v-tab-item>
                  <BoosterVaccination
                    @submitData="submitBooster"
                    @delete-vaccine="
                      (vac_id) => deleteVaccine('booster', vac_id)
                    "
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
      "deleteBoosterById",
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
    deleteVaccine(type, vaccine_id) {
      //Delete Vaccine through the store.
      if (type === "vaccination") {
        this.deleteVaccineById({
          id: this.id,
          vaccine_id: vaccine_id,
        });
      } else if (type === "booster") {
        this.deleteBoosterById({
          id: this.id,
          vaccine_id: vaccine_id,
        });
      }
    },
    submitBooster(data) {
      this.loading_booster = true;
      let payload = {
        boosters: [],
      };

      data.forEach((item) => {
        let vaccine = {
          id: item.id,
          dose: item.dose,
          booster_date: format(
            parse(item.vaccination_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          lot_no: item.lot_number,
          healthcare_professional: item.healthcare_professional,
          healthcare_professional_license_number:
            item.healthcare_professional_license_number,
          site_name: item.vaccination_site,
          booster_name: item.vaccine,
        };
        if (item.id === null) {
          delete vaccine.id;
        }
        payload.boosters.push(vaccine);
      });

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

<style scoped>
.overflow-scroll {
  overflow-y: auto;
  max-height: 100%;
}
</style>
