<template>
  <div>
    <v-container>
      <v-row align-content="center">
        <v-col cols="12">
          <v-img
            class="mx-auto mt-15 slide-down"
            :width="imgWidth"
            :src="imgSrc"
            contain
          ></v-img>
        </v-col>
        <v-col cols="12" class="d-none d-md-block">
          <div class="text-center text-subtitle-1 slide-down">
            Office of the Special Adviser for Flagship Programs for Health
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-center text-h4 text-sm-h3 slide-down">
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
import DataTabs from "@/components/QR/DataTabs.vue";
import PrintQRJavaScript from "@/components/Card/PrintQRJavaScript.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ReroutePage",
  data: () => ({
    imgSrc: require("@/assets/OSAFPH LOGO.png"),
    imgWidth: "300",
  }),
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
      this.fetchPublicCitizenRecord(storedId);
    },
    updateFetch(query_params) {
      this.fetchPublicServicesById({
        id: this.getPublicData.citizen.hashed_id,
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
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    getPublicData(value) {
      if (value.citizen.hub_registrant_id) {
        this.fetchPublicServicesById({ id: value.citizen.hashed_id });
      }
    },
    getPublicHospitalServices: {
      deep: true,
      handler(value) {
        let query_params = {
          hospital_service_ids: [],
        };
        if (value.data.length > 0) {
          // Assign Hashed ID
          const hashed_id = sessionStorage.getItem("hub_registrant_id");
          
          value.data.forEach((item) => {
            query_params.hospital_service_ids.push(item.id);
          });
          this.fetchPublicFiles({
            citizen_id: hashed_id,
            queryParams: query_params,
          });
        }
      },
    },
    size: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        if (newVal.xs) {
          this.imgWidth = "250";
        } else {
          this.imgWidth = "300";
        }
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
