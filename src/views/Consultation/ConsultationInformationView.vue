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
            >{{ formButtonTitle }}</v-btn
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
                <PatientConsultation :data="consultation" />
              </v-col>
              <v-col cols="12">
                <PatientInformation :data="consultation" />
              </v-col>
              <v-col cols="12">
                <PreviousConsultations
                  :data="consultation.previous_consultation_forms"
                />
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
import ConsultationInformationContinutation from "../../components/Consultation/ConsultationInformationContinuation.vue";
import PreviousConsultations from "../../components/Consultation/PreviousConsultations.vue";
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import DeleteDialog from "@/mixins/DeleteDialog";
import PatientInformation from "../../components/Consultation/PatientInformation.vue";
import PatientConsultation from "../../components/Consultation/PatientConsultation.vue";
export default {
  name: "ConsultationInformationView",
  mixins: [DeleteDialog, ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    consultation: null,
    consultation_form: null,
    loading: false,
    auth: {
      consultationForm: false,
      delete: false,
    },
    disabled: false,
    formButtonTitle: null,
  }),
  components: {
    ConsultationInformationContinutation,
    ReusableDeleteDialog,
    PreviousConsultations,
    PatientInformation,
    PatientConsultation,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultationById", "fetchConsultationFormById"]),
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
        return this.fetchConsultationById(consultation_id).then(() => {
          if (this.consultation.hospital_service.status === "COMPLETED") {
            this.fetchConsultationFormById(consultation_id);
          }
        }).catch((error) => {
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
        if (this.consultation.hospital_service.status === "COMPLETED") {
          return this.$router.push({
            name: "doctor-edit-consultation-form",
            query: {
              data: JSON.stringify(this.consultation),
              consultation_form: JSON.stringify(this.consultation_form),
            },
          });
        } else {
          return this.$router.push({
            name: "add-consultation-form",
            query: {
              data: JSON.stringify(this.consultation),
            },
          });
        }
      }
    },
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.formButtonTitle = "Edit Consultation Form";
        this.auth.consultationForm = true;
      } else if (this.userRole === "DOCTOR") {
        this.auth.consultationForm = true;
        if (this.consultation.hospital_service.status === "PENDING") {
          this.formButtonTitle = "Add Consultation Form";
        }
        if (this.consultation.hospital_service.status === "COMPLETED") {
          this.formButtonTitle = "Edit Consultation Form";
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
    },
    getConsultationForm(value) {
      this.consultation_form = value;
      console.log(value);
    },
    getAdminConsultation(value) {
      this.consultation = value.consultation;
      // console.log(value.consultation);
    },
    getAdminConsultationForm(value) {
      this.consultation_form = value;
      // console.log(this.consultation_form);
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapGetters("consultations", ["getConsultation", "getConsultationForm"]),
    ...mapGetters("admin_consultations", [
      "getAdminConsultation",
      "getAdminConsultationForm",
    ]),
  },
};
</script>

<style scoped>
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
</style>
