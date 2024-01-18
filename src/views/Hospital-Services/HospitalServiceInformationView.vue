<template>
  <div>
    <SubmissionAlert v-if="showAlert" :title="title" />
    <ErrorAlert v-if="showError" :title="title" />
    <v-container fluid class="ma-1" v-if="registrant && service">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Hospital Service</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" v-if="auth.edit">
          <v-btn dark class="blue darken-4 mr-3" @click="activator"
            ><v-icon dark left>mdi-square-edit-outline</v-icon>Edit</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12" class="mt-n1">
                <PatientHospitalService :data="service"/>
              </v-col>
              <v-col cols="12">
                <PatientInformation :data="registrant" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="4">
          <HospitalServiceInformationContinutation :data="service" />
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader
      v-else
      type="list-item-avatar-three-line, image, article"
      class="mx-5 my-10"
      height="auto"
    ></v-skeleton-loader>
    <ServiceDialog
      :activator="dialog"
      :hospitalService="service"
      v-on:dialogResponse="resetActivator"
      v-on:updateService="submitForm"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PatientHospitalService from '@/components/Hospital-Service/PatientHospitalService.vue';
import PatientInformation from "../../components/Hospital-Service/PatientInformation.vue";
import HospitalServiceInformationContinutation from "./HospitalServiceInformationContinuatation.vue";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import EditServiceMixin from "@/mixins/Hospital-Service/EditService";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  mixins: [EditServiceMixin, ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    registrant: null,
    service: null,
    loading: false,
    auth: {
      edit: false,
    },
  }),
  components: {
    HospitalServiceInformationContinutation,
    ServiceDialog,
    PatientInformation,
    PatientHospitalService,
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrantId"]),
    fetchRegistrant() {
      const id = this.$route.params.id;
      const hospital_service_id = this.$route.params.hospital_service_id;
      return this.fetchRegistrantId(id)
        .then(() => {
          this.fetchHospitalServiceById({
            id: id,
            hospital_service_id: hospital_service_id,
          });
        })
        .catch((error) => {
          console.error(
            "Error fetching Registrant and Hospital Service Data:",
            error
          );
        });
    },
    activator() {
      const citizen_id = this.$route.params.id;
      const hospital_service_id = this.$route.params.hospital_service_id;

      this.dialog = !this.dialog;

      return this.fetchHospitalServiceById({
        id: citizen_id,
        hospital_service_id: hospital_service_id,
      }).catch((error) => {
        console.error(
          "Error fetching hospital service request in edit: ",
          error
        );
      });
    },
    userRolePermissions() {
      if (this.userRole === "ADMIN" || this.userRole === "ENCODER") {
        this.auth.edit = true;
      }
    },
  },
  created() {
    this.fetchRegistrant();
  },
  updated() {
    this.userRolePermissions();
  },
  watch: {
    getRegistrant(value) {
      // console.log("Get Registrant", value);
      const id = this.$route.params.id;
      this.registrant = value;
      this.routeID = id;
    },
    getHospitalService(value) {
      console.log(value);
      this.service = value;
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    ...mapGetters("login", ["userRole"]),
  },
};
</script>
