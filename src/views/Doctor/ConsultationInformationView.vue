<template>
  <div>
    <SubmissionAlert v-if="showAlert" :title="title" />
    <ErrorAlert v-if="showError" :title="title" />
    <v-container fluid class="ma-1" v-if="consultation">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Consultations</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="blue darken-4 mr-3" @click="addConsultation"
            ><v-icon dark left>mdi-square-edit-outline</v-icon>Add
            Consultation</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12" class="mt-n1">
                <v-card flat outlined>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-account</v-icon>Patient
                    Consultation</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        md="6"
                        sm="6"
                        v-for="(info, index) in serviceInformation.service"
                        :key="index"
                      >
                        <div class="ma-2">
                          <div class="text-subtitle-1 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">{{ info.content }}</div>
                        </div>
                      </v-col>
                      <v-col cols="12" class="mt-3">
                        <v-expansion-panels>
                          <v-expansion-panel
                            v-for="(info, index) in serviceInformation.address"
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
                <v-card flat outlined>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-folder-multiple</v-icon>Patient
                    Information</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row no-gutters>
                      <v-col cols="12" md="4">
                        <div class="text-center">
                          <v-avatar
                            rounded="lg"
                            size="175"
                            class="my-3"
                            color="blue darken-4"
                          >
                            <v-img
                              max-height="170"
                              max-width="170"
                              :src="patient_information.image_url"
                            ></v-img>
                          </v-avatar>
                        </div>
                      </v-col>
                      <v-col cols="12" md="8" sm="12" xs="12">
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                            sm="6"
                            v-for="(
                              info, index
                            ) in patient_information.information"
                            :key="index"
                          >
                            <div class="ma-2">
                              <div class="text-subtitle-1 grey--text">
                                {{ info.title }}
                              </div>
                              <div class="text-h5">{{ info.content }}</div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12">
                        <div class="my-2">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header>
                                <div class="text-subtitle-1 font-weight-bold">
                                  Additional Information
                                </div>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <div
                                  v-for="(
                                    info, index
                                  ) in patient_information.additional_information"
                                  :key="index"
                                >
                                  <div class="ma-2">
                                    <div class="text-subtitle-1 grey--text">
                                      {{ info.title }}
                                    </div>
                                    <div class="text-h5">
                                      {{ info.content }}
                                    </div>
                                  </div>
                                </div>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="4">
          <ConsultationInformationContinutation :data="consultation" />
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader
      v-else
      type="list-item-avatar-three-line, image, article"
      class="mx-5 my-10"
      height="auto"
    ></v-skeleton-loader>
    <!-- <ServiceDialog
        :activator="dialog"
        :hospitalService="getHospitalService"
        v-on:dialogResponse="resetActivator"
        v-on:updateService="submitForm"
      /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationInformationContinutation from "./ConsultationInformationContinuation.vue";
// import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import { format, parseISO } from "date-fns";
export default {
  mixins: [ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    consultation: null,
    loading: false,
  }),
  components: {
    ConsultationInformationContinutation,
    // ServiceDialog,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultationById"]),
    fetchConsultation() {
      const consultation_id = this.$route.params.consultation_id;
      return this.fetchConsultationById(consultation_id).catch((error) => {
        console.error("Error fetching Consultation Data:", error);
      });
    },
    addConsultation() {
      this.$router.push({ name: "add-consultation-form" });
    },
  },
  created() {
    this.fetchConsultation();
  },
  watch: {
    getConsultation(value) {
      console.log("GET:", value);
      this.consultation = value.consultation;
      console.log("CONSULTATION: ", this.consultation);
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapGetters("consultations", ["getConsultation"]),
    patient_information() {
      return {
        image_url: this.$url + this.consultation.citizen.image_url,
        information: [
          {
            title: "Patient Name",
            content: `${this.consultation.citizen.last_name}, ${
              this.consultation.citizen.first_name
            } ${
              this.consultation.citizen.middle_name
                ? this.consultation.citizen.middle_name
                : ""
            } ${
              this.consultation.citizen.suffix
                ? this.consultation.citizen.suffix
                : ""
            }`,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(this.consultation.citizen.birthday),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "Sex",
            content: this.consultation.citizen.sex,
          },
          {
            title: "Civil Status",
            content: this.consultation.citizen.civil_status,
          },
        ],
        additional_information: [
          {
            title: "Address",
            content: this.consultation.citizen.address,
          },
        ],
      };
    },
    serviceInformation() {
      let serviceable_title = null;
      if (this.consultation.hospital_service.service_type) {
        serviceable_title =
          this.consultation.hospital_service.service_type
            .charAt(0)
            .toUpperCase() +
          this.consultation.hospital_service.service_type
            .slice(1)
            .toLowerCase();
      }
      return {
        service: [
          {
            title: `${serviceable_title} ID`,
            content: this.consultation.id,
          },
          {
            title: "Status",
            content: this.consultation.hospital_service.status,
          },
          {
            title: "Service Availed",
            content: this.consultation.hospital_service.service_type,
          },
          {
            title: "Serviceable Availed",
            content: this.consultation.specialty.name,
          },
        ],
        address: [
          {
            title: "Remarks",
            content: this.consultation.hospital_service.remarks,
          },
        ],
      };
    },
  },
};
</script>
