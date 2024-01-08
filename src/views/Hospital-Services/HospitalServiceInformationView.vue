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
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-medical-bag</v-icon>Hospital Service
                    Information</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        md="6"
                        sm="6"
                        v-for="(info, index) in serviceInformation"
                        :key="index"
                      >
                        <div class="ma-2">
                          <div class="text-subtitle-2 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">{{ info.content }}</div>
                        </div>
                      </v-col>
                      <v-col cols="12" class="mt-3">
                        <v-expansion-panels>
                          <v-expansion-panel
                            v-for="(info, index) in expansionRemarks"
                            :key="index"
                          >
                            <v-expansion-panel-header>
                              <div class="text-subtitle-1 font-weight-bold">
                                {{ info.title }}
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              {{ info.content }}
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <PatientInformation :data="registrant" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="4">
          <HospitalServiceInformationContinutation :data="getHospitalService" />
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
      :hospitalService="getHospitalService"
      v-on:dialogResponse="resetActivator"
      v-on:updateService="submitForm"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      if (this.userRole === "ADMIN") {
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
      // console.log(value);
      this.service = value;
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    ...mapGetters("login", ["userRole"]),
    serviceInformation() {
      let data = null;
      if (this.service.hospitalService.status === "COMPLETED") {
        data = [
          {
            title: "Service ID",
            content: this.service.hospitalService.id,
          },
          {
            title: "Health Professional",
            content: `${this.service.hospitalService.doctor_last_name}, ${this.service.hospitalService.doctor_first_name} ${this.service.hospitalService.doctor_middle_name}`,
          },
          {
            title: "Service Availed",
            content: this.service.hospitalService.service_type,
          },
          {
            title: "Serviceable Availed",
            content: this.service.hospitalService.serviceable_type_name,
          },
          {
            title: "Consultation Form Status",
            content: "UNACCOMPLISHED",
          },
        ];
      } else {
        data = [
          {
            title: "Service ID",
            content: this.service.hospitalService.id,
          },
          {
            title: "Health Professional",
            content: `${this.service.hospitalService.doctor_last_name}, ${this.service.hospitalService.doctor_first_name} ${this.service.hospitalService.doctor_middle_name}`,
          },
          {
            title: "Service Availed",
            content: this.service.hospitalService.service_type,
          },
          {
            title: "Serviceable Availed",
            content: this.service.hospitalService.serviceable_type_name,
          },
        ];
      }
      return data;
    },
    expansionRemarks() {
      return [
        {
          title: "Remarks",
          content: this.service.hospitalService.remarks,
        },
      ];
    },
  },
};
</script>
