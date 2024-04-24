<template>
  <div>
    <v-container>
      <v-row align-content="center">
        <v-col cols="12">
          <v-img
            class="mx-auto mt-15 slide-down"
            width="300"
            src="../../assets/OSAFPH LOGO.png"
            contain
          ></v-img>
        </v-col>
        <v-col cols="12">
          <div class="text-center text-subtitle-1 slide-down">
            Office of the Special Adviser for Flagship Programs for Health
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-center text-h3 slide-down">
            Official COVID-19 Vaccination Record
          </div>
        </v-col>
      </v-row>
      <v-row dense class="mt-5">
        <v-col cols="12">
          <div v-if="getPublicData" class="my-auto text-center slide-down">
            <PrintQRJavaScript :registrant="getPublicData" />
          </div>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <DataTabs
            :data="getPublicData"
            :services="getPublicHospitalServices"
            :public_files="public_files"
            @query_params="updateFetch"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DataTabs from "./DataTabs.vue";
import PrintQRJavaScript from "../Card/PrintQRJavaScript.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ReroutePage",
  components: {
    DataTabs,
    PrintQRJavaScript,
  },
  methods: {
    ...mapActions("registrants", ["fetchPublicCitizenRecord"]),
    ...mapActions("services", ["fetchPublicServicesById"]),
    ...mapActions("public_files", ["fetchPublicFiles", "resetPublicFiles"]),
    fetchData() {
      const storedId = sessionStorage.getItem("hub_registrant_id");
      this.fetchPublicCitizenRecord(storedId)
        .catch((error) => {
          console.error(
            "Error fetching Public Citizen Record @ Reroute:",
            error
          );
        })
        .finally(() => {
          // // Remove the parameter from the URL without navigation
          // const route = { ...this.$route }; // Create a copy of the route object
          // delete route.params.hub_registrant_id; // Remove the parameter
          // this.$router.replace(route); // Replace the route
        });
    },

    updateFetch(query_params) {
      this.fetchPublicServicesById({
        id: this.getPublicData.citizen.id,
        queryParams: query_params,
      });
    },
  },
  computed: {
    ...mapGetters("registrants", ["getPublicData"]),
    ...mapGetters("services", ["getPublicHospitalServices"]),
    ...mapState("public_files", {
      public_files: "public_files",
    }),
  },
  created() {
    this.fetchData();
  },
  watch: {
    getPublicData(value) {
      if (value.citizen.hub_registrant_id) {
        this.fetchPublicServicesById({ id: value.citizen.id });
      }
    },
    getPublicHospitalServices: {
      deep: true,
      handler(value) {
        let query_params = {
          hospital_service_ids: [],
        };
        let citizen_id = value.data[0].citizen_id;
        value.data.forEach((item) => {
          query_params.hospital_service_ids.push(item.id)
        });
        this.fetchPublicFiles({
            citizen_id: citizen_id,
            queryParams: query_params,
          });
      },
    },
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
