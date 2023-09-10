<template>
  <div>
    <div>
      <v-img
        class="mx-auto mt-15 slide-down"
        width="300"
        src="../../assets/OSAFPH LOGO.png"
        contain
      ></v-img>
    </div>
    <div>
      <div class="text-center my-5 text-subtitle-1 slide-down">
        Office of the Special Adviser for Flagship Programs for Health
      </div>
      <div class="text-center my-5 text-h3 slide-down">
        Official COVID-19 Vaccination Record
      </div>
    </div>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <div v-if="getPublicData && getPublicImage && getPublicSignature" class="my-auto text-right slide-down">
            <FrontBackCardJavaScript
              :getPublicImage="getPublicImage"
              :getPublicSignature="getPublicSignature"
              :registrant="getPublicData"
            />
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <DataTabs :data="getPublicData" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DataTabs from "./DataTabs.vue";
import FrontBackCardJavaScript from "../Card/FrontBackCardJavaScript.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DataTabs,
    FrontBackCardJavaScript,
  },
  methods: {
    ...mapActions("registrants", [
      "fetchRegistrantId",
      "fetchBoosterInformation",
      "fetchPublicCitizenRecord",
    ]),
    ...mapActions("card", ["fetchPublicImage", "fetchPublicSignature"]),
    fetchData() {
      const id = this.$route.params.hub_registrant_id;
      this.fetchPublicCitizenRecord(id).catch((error) => {
        console.error("Error fetching Public Citizen Record @ Reroute:", error);
      });
      // this.fetchRegistrantId(id).catch((error) => {
      //   console.error("Error fetching data in ReroutePage:", error);
      // });
      // this.fetchBoosterInformation(id).catch((error) => {
      //   console.error("Error fetching data in ReroutePage:", error);
      // });
    },
  },
  computed: {
    ...mapGetters("registrants", [
      "getRegistrant",
      "getBoosterInformation",
      "getPublicData",
    ]),
    ...mapGetters("card", ["getPublicImage", "getPublicSignature"]),
  },
  created() {
    this.fetchData();
  },
  watch: {
    getPublicData(value) {
      console.log("Success Public Data: ", value);
      if (value.citizen.hub_registrant_id) {
        this.fetchPublicImage(value.citizen.id);
        this.fetchPublicSignature(value.citizen.id);
      }
    },
    // getRegistrant(value) {
    //   console.log("Registrant: ", value);
    // },
    // getBoosterInformation(value) {
    //   console.log("Booster: ", value);
    // },
  },
};
</script>

<style scoped>
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.slide-down {
  animation: slideDown 1.5s ease-out;
}
</style>
