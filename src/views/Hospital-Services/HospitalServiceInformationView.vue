<template>
  <div>
    <SubmissionAlert v-if="showAlert" :title="title" />
    <ErrorAlert v-if="showError" :title="title" />
    <v-container fluid class="ma-1" v-if="registrant && service">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">Registrant Hospital Service Information</span>
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
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-folder-multiple</v-icon
                    >Category</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row
                      v-for="(info, index) in categories"
                      :key="index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" class="">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-human-greeting-variant</v-icon
                    >Personal Information</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row
                      v-for="(info, index) in personal_informations"
                      :key="'personal_information-' + index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                    <v-divider class="ma-3"></v-divider>
                    <div class="mx-4">Emergency Information</div>
                    <v-row
                      v-for="(info, index) in emergency"
                      :key="'emergency' + index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n1">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-map-marker</v-icon
                    >Address</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row v-for="info in address" :key="info.title" no-gutters>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
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
      console.log(value);
      this.service = value;
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    ...mapGetters("login", ["userRole"]),
    categories() {
      return [
        {
          title: "Category of the Target Eligible Population",
          content: this.registrant.citizen.category.description,
        },
        {
          title: "Hub Id Number",
          content: this.registrant.citizen.hub_registrant_number,
        },
      ];
    },
    personal_informations() {
      return [
        {
          title: "Full Name",
          content: `${this.registrant.citizen.last_name.toUpperCase()}, 
          ${this.registrant.citizen.first_name.toUpperCase()} 
          ${
            this.registrant.citizen.middle_name
              ? " " + this.registrant.citizen.middle_name.toUpperCase()
              : ""
          } 
          ${
            this.registrant.citizen.suffix
              ? " " + this.registrant.citizen.suffix.toUpperCase()
              : ""
          }`,
        },
        {
          title: "Date of Birth",
          content: this.registrant.citizen.birthday,
        },
        {
          title: "Gender",
          content: this.registrant.citizen.gender,
        },
        {
          title: "Civil Status",
          content: this.registrant.citizen.civil_status,
        },
        {
          title: "Blood Type",
          content: this.registrant.citizen.blood_type,
        },
        {
          title: "Contact No",
          content: this.registrant.citizen.contact_number,
        },
        {
          title: "Tin No",
          content: this.registrant.citizen.tin_number,
        },
        {
          title: "Passport No",
          content: this.registrant.citizen.passport_number,
        },
      ];
    },
    emergency() {
      return [
        {
          title: "Full Name",
          content: this.registrant.citizen.emergency_name,
        },
        {
          title: "Contact No",
          content: this.registrant.citizen.emergency_number,
        },
      ];
    },
    address() {
      return [
        {
          title: "Unit/Building/House No./Purok/Street/Subdivision",
          content: this.registrant.citizen.address,
        },
        {
          title: "Barangay",
          content: this.registrant.citizen.barangay.barangay_name,
        },
        {
          title: "Municipality",
          content:
            this.registrant.citizen.barangay.municipality.municipality_name,
        },
        {
          title: "Province",
          content:
            this.registrant.citizen.barangay.municipality.province
              .province_name,
        },
      ];
    },
    serviceInformation() {
      return [
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