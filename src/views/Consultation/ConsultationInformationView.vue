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
            class="mr-3"
            :color="buttonColor"
            :class="{ 'disabled-button': disabled }"
            @click="alterConsultation"
            ><v-icon dark left v-if="buttonIcon !== null">{{
              buttonIcon
            }}</v-icon
            >{{ formButtonTitle }}</v-btn
          >
        </v-col>
        <v-col cols="auto" v-if="auth.delete">
          <v-btn class="error" @click="deleteActivator" dark
            ><v-icon>mdi-trash-can</v-icon>Delete Form</v-btn
          >
        </v-col>
        <v-col cols="auto" v-if="auth.files">
          <v-btn
            dark
            class="mr-3"
            :color="filesButtonColor"
            :class="{ 'disabled-button': disabled }"
            @click="proceedToFiles"
            ><v-icon dark left v-if="filesButtonIcon !== null">{{
              filesButtonIcon
            }}</v-icon
            >{{ filesButtonTitle }}</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12" class="mt-n1">
                <PatientServiceComponent
                  :serviceInformation="serviceInformation"
                />
              </v-col>
              <v-col cols="12">
                <PatientInformationComponent
                  :patientInformation="patientInformation"
                />
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
          <ServiceStatusComponent :serviceStatus="serviceStatus" />
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
import { format, parseISO } from "date-fns";
import PreviousConsultations from "../../components/Consultation/PreviousConsultations.vue";
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import DeleteDialog from "@/mixins/DeleteDialog";
import ServiceStatusComponent from "@/components/Reusable/ServiceStatusComponent.vue";
import PatientInformationComponent from "@/components/Reusable/PatientInformationComponent.vue";
import PatientServiceComponent from "@/components/Reusable/PatientServiceComponent.vue";
export default {
  name: "ConsultationInformationView",
  mixins: [DeleteDialog, ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    consultation: null,
    consultation_form: null,
    loading: false,
    auth: {
      consultationForm: true,
      delete: false,
      files: true,
    },
    disabled: false,
    formButtonTitle: null,
    buttonColor: null,
    buttonIcon: null,
    filesButtonTitle: null,
    filesButtonColor: null,
    filesButtonIcon: null,
  }),
  components: {
    ReusableDeleteDialog,
    PreviousConsultations,
    ServiceStatusComponent,
    PatientInformationComponent,
    PatientServiceComponent,
  },
  methods: {
    ...mapActions("consultations", [
      "fetchConsultationById",
      "fetchConsultationFormById",
      "completeConsultationToId",
    ]),
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
        return this.fetchConsultationById(consultation_id)
          .then(() => {
            if (this.consultation.hospital_service.status === "COMPLETED") {
              this.fetchConsultationFormById(consultation_id);
            }
          })
          .catch((error) => {
            console.error(
              "Error fetching Consultation Data for Doctor:",
              error
            );
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
    proceedToFiles() {
      if (this.userRole === "DOCTOR") {
        return this.$router.push({
          name: "consultation-files",
        });
      }
    },
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.formButtonTitle = "Edit Consultation Form";
      } else if (this.userRole === "DOCTOR") {
        this.buttonColor = "blue darken-4";
        this.filesButtonColor = "blue darken-4";
        if (this.consultation.hospital_service.status === "IN PROGRESS") {
          this.formButtonTitle = "Add Consultation Form";
          this.buttonIcon = null;
          this.auth.files = false;
        } else if (this.consultation.hospital_service.status === "COMPLETED") {
          this.auth.consultationForm = false;
          this.filesButtonTitle = "Upload Files";
          this.filesButtonIcon = null;
        } else {
          this.auth.consultationForm = false;
          this.auth.files = false;
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
    },
    getAdminConsultation(value) {
      this.consultation = value.consultation;
      console.log(value.consultation);
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
    serviceInformation() {
      return {
        header: {
          title: "Patient Consultation",
          icon: "mdi-account",
        },
        info: [
          {
            title: "Consultation ID",
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
        remarks: [
          {
            title: "Remarks",
            content: this.consultation.hospital_service.remarks
              ? this.consultation.hospital_service.remarks
              : "None",
          },
        ],
        items_availed: {
          service_type: false,
          items: null,
        },
      };
    },
    patientInformation() {
      return {
        header: {
          title: "Patient Information",
          icon: "mdi-folder-multiple",
        },
        image_url: this.$url + this.consultation.citizen.image_url,
        info: [
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
          {
            title: "Address",
            content: this.consultation.citizen.address,
          },
        ],
        additional_info: [
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
            content: this.consultation.citizen.occupation
              ? this.consultation.citizen.occupation
              : "None Specified",
          },
          {
            title: "Nationality",
            content: this.consultation.citizen.nationality,
          },
        ],
      };
    },
    serviceStatus() {
      //Assign Date Released Value and Logic.
      let date_released_data = this.consultation.hospital_service.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.consultation.hospital_service.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;

      //Conditional for General Format and Dialysis Format Messages
      let messages = null;

      if (this.consultation.hospital_service.status !== "DIALYSIS") {
        messages = {
          pending: "Requested Service is pending...",
          inProgress: "Requested Service is in progress...",
          unattended: "Requested Service was unattended...",
          completed: "Requested Service was successfully completed...",
        };
      } else {
        messages = {
          pending: "Consultation is pending...",
          inProgress: "Consultation is in progress...",
          unattended: "Consultation was unattended...",
          completed: "Consultation was successfully completed...",
        };
      }

      return {
        status: this.consultation.hospital_service.status,
        scheduledDate: {
          title: "Scheduled Date",
          content: format(
            parseISO(this.consultation.hospital_service.scheduled_date),
            "MMMM dd, yyyy"
          ),
        },
        dateReleased: date_released_data,
        messages: messages,
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
