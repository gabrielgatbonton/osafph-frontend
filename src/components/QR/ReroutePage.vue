<template>
  <div>
    <div>
      <v-img
        class="mx-auto mt-15 slide-down"
        width="300"
        src="../../assets/OSAFPH LOGO.png"
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
    <DataTabs :data="getRegistrant" v-bind:booster="getBoosterInformation" />
  </div>
</template>

<script>
import DataTabs from "./DataTabs.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DataTabs,
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrantId", "fetchBoosterInformation"]),
    fetchData() {
      const id = this.$route.params.id;
      this.fetchRegistrantId(id).catch((error) => {
        console.error("Error fetching data in ReroutePage:", error);
      });
      this.fetchBoosterInformation(id).catch((error) => {
        console.error("Error fetching data in ReroutePage:", error);
      });
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant", "getBoosterInformation"]),
  },
  created() {
    this.fetchData();
  },
  watch:{
    getBoosterInformation(value){
      console.log("REroute: ", value)
    }
  }
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