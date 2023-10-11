<template>
  <div>
    <SubmissionAlert v-if="showAlert" :title="title" />
    <ErrorAlert v-if="showError" :title="title" />
    <v-container fluid class="ma-1" v-if="consultation">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Consultations</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" v-if="auth.consultationForm">
          <v-btn
            dark
            class="blue darken-4 mr-3"
            :class="{ 'disabled-button': disabled }"
            @click="alterConsultation"
            ><v-icon dark left>mdi-square-edit-outline</v-icon
            >{{ auth.consultationFormTitle }}</v-btn
          >
        </v-col>
        <v-col cols="auto" v-if="auth.delete">
          <v-btn class="error" @click="deleteActivator" dark
            ><v-icon>mdi-trash-can</v-icon>Delete Form</v-btn
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
                        <v-row no-gutters>
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
                                <div class="ma-2">
                                  <v-row>
                                    <v-col
                                      cols="6"
                                      v-for="(
                                        info, index
                                      ) in patient_information.additional_information"
                                      :key="index"
                                    >
                                      <div class="text-subtitle-1 grey--text">
                                        {{ info.title }}
                                      </div>
                                      <div class="text-h5">
                                        {{ info.content }}
                                      </div>
                                    </v-col>
                                  </v-row>
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
    <ReusableDeleteDialog
      :activator="deleteDialog"
      v-on:dialogResponse="resetActivator"
      v-on:deleteItem="deleteConsultationForm"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationInformationContinutation from "./ConsultationInformationContinuation.vue";
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import DeleteDialog from "@/mixins/DeleteDialog";
import { format, parseISO } from "date-fns";
export default {
  mixins: [DeleteDialog, ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    consultation: null,
    consultation_form: null,
    loading: false,
    auth: {
      consultationForm: false,
      consultationFormTitle: null,
      delete: false,
    },
    disabled: false,
  }),
  components: {
    ConsultationInformationContinutation,
    ReusableDeleteDialog,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultationById"]),
    ...mapActions("admin_consultations", [
      "fetchAdminConsultationById",
      "fetchAdminConsultationFormById",
      "deleteAdminConsultationFormById",
    ]),
    fetchConsultation() {
      const consultation_id = this.$route.params.consultation_id;
      console.log(consultation_id);
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        return this.fetchAdminConsultationById(consultation_id)
          .then(() => {
            this.fetchAdminConsultationFormById(consultation_id);
          })
          .catch((error) => {
            console.error("Error fetching Consultation Data for Admin:", error);
          });
      } else if (this.userRole === "DOCTOR") {
        return this.fetchConsultationById(consultation_id).catch((error) => {
          console.error("Error fetching Consultation Data for Doctor:", error);
        });
      }
    },
    alterConsultation() {
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        return this.$router.push({
          name: "edit-consultation-form",
          query: {
            data: JSON.stringify(this.consultation),
            consultation_form: JSON.stringify(this.consultation_form),
          },
        });
      } else if (this.userRole === "DOCTOR") {
        return this.$router.push({
          name: "add-consultation-form",
          query: {
            data: JSON.stringify(this.consultation),
          },
        });
      }
    },
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.auth.consultationFormTitle = "Edit Consultation Form";
        this.auth.consultationForm = true;
      } else if (this.userRole === "DOCTOR") {
        this.auth.consultationForm = true;
        this.auth.consultationFormTitle = "Add Consultation Form";
        if (this.consultation.hospital_service.status === "COMPLETED") {
          this.disabled = true;
        }
      } else if (this.userRole === "ROOT") {
        this.auth.delete = true;
        if (this.consultation.hospital_service.status === "PENDING") {
          this.auth.delete = false;
        }
      }
    },
    deleteConsultationForm() {
      this.loading = true;
      this.deleteAdminConsultationFormById({
        consultation_id: this.consultation_form.consultation_id,
        consultation_form_id: this.consultation_form.consultation_form_id,
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "citizens-consultations" });
        })
        .catch((error) => {
          console.log("Error Proceding with delete:", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
    checkAlerts() {
      if (this.getShowAlert) {
        let value = this.getShowAlert;
        this.showAlert = value.alert;
        this.title = value.message;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      } else if (this.getShowError) {
        let value = this.getShowAlert;
        this.showAlert = value.alert;
        this.title = value.message;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    },
  },
  created() {
    this.fetchConsultation();
  },
  mounted() {
    this.checkAlerts();
  },
  updated() {
    this.userRolePermissions();
  },
  watch: {
    getConsultation(value) {
      this.consultation = value.consultation;
      console.log(value.consultation)
    },
    getAdminConsultation(value) {
      this.consultation = value.consultation;
    },
    getAdminConsultationForm(value) {
      this.consultation_form = value;
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapGetters("consultations", ["getConsultation"]),
    ...mapGetters("admin_consultations", [
      "getAdminConsultation",
      "getAdminConsultationForm",
    ]),
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
            title: "Age",
            content: this.consultation.citizen.age,
          },
          {
            title: "Sex",
            content: this.consultation.citizen.sex,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(this.consultation.citizen.birthday),
              "MMMM dd, yyyy"
            ),
          },
        ],
        additional_information: [
          {
            title: "Address",
            content: this.consultation.citizen.address,
          },
          {
            title: "Civil Status",
            content: this.consultation.citizen.civil_status,
          },
          {
            title: "Religion",
            content: this.consultation.citizen.religion,
          },
          {
            title: "Occupation",
            content: this.consultation.citizen.occupation,
          },
          {
            title: "Nationality",
            content: this.consultation.citizen.nationality,
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

<style scoped>
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
</style>
