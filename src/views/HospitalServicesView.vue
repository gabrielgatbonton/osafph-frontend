<template>
  <div>
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Services</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
            <AddServiceDialog />
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ServicesTable :services="getHospitalServices" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ServicesTable from '@/components/Hospital-Service/Services-Table.vue'
import AddServiceDialog from '@/components/Hospital-Service/AddServiceDialog.vue';
export default {
    components: {
        ServicesTable,
        AddServiceDialog,
    },
    methods: {
        ...mapActions("services", ["fetchServicesById", "addHospitalService"]),
        requestServices(){
            const id = this.$route.params.id;
            this.fetchServicesById(id);
        },
        addService(){

        }
    },
    computed: {
        ...mapGetters("services", ["getHospitalServices"])
    },
    watch: {
        // getHospitalServices(value) {
        //     console.log("success: ", value);
        // }
    },
    created() {
        this.requestServices();
    }
}
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>