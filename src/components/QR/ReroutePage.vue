<template>
    <div>
      <!-- Logos and Stuff, Buttons -->
      <DataTabs :data="getRegistrant" />
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
      ...mapActions("registrants", ["fetchRegistrantId"]),
      fetchData() {
        const id = this.$route.params.id;
        this.fetchRegistrantId(id).catch((error) => {
          console.error("Error fetching data in ReroutePage:", error);
        });
      },
    },
    computed: {
      ...mapGetters("registrants", ["getRegistrant"]),
    },
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style></style>
  