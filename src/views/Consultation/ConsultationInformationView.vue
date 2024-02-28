<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1" v-if="consultation">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Consultations</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" v-if="buttonPermissions.form">
          <v-btn
            dark
            class="mr-3"
            :color="buttonProperties.consultationForm.color"
            :class="{ 'disabled-button': disabled }"
            @click="alterConsultation"
            >{{ buttonProperties.consultationForm.title }}</v-btn
          >
        </v-col>
        <v-col cols="auto" class="mr-3" v-if="buttonPermissions.delete">
          <v-btn class="error" @click="deleteActivator" dark
            ><v-icon left>mdi-trash-can</v-icon>Delete Form</v-btn
          >
        </v-col>
        <v-col cols="auto" v-if="buttonPermissions.files">
          <v-btn
            dark
            class="mr-3"
            :color="buttonProperties.files.color"
            :class="{ 'disabled-button': disabled }"
            @click="proceedToFiles"
            >{{ buttonProperties.files.title }}</v-btn
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
                <PreviousConsultationsComponent
                  :previousConsultations="previousConsultations"
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
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import DeleteDialog from "@/mixins/DeleteDialog";
import ServiceStatusComponent from "@/components/Reusable Components/ServiceStatusComponent.vue";
import PatientInformationComponent from "@/components/Reusable Components/PatientInformationComponent.vue";
import PatientServiceComponent from "@/components/Reusable Components/PatientServiceComponent.vue";
import PreviousConsultationsComponent from "@/components/Reusable Components/PreviousConsultationsComponent.vue";
export default {
  name: "ConsultationInformationView",
  mixins: [DeleteDialog, ErrorAlertsLogic],
  data: () => ({
    routeID: null,
    loading: false,
    disabled: false,
  }),
  components: {
    ReusableDeleteDialog,
    ServiceStatusComponent,
    PatientInformationComponent,
    PatientServiceComponent,
    PreviousConsultationsComponent,
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
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        this.fetchAdminConsultationById(consultation_id)
          .then(() => {
            this.fetchAdminConsultationFormById(consultation_id);
          })
          .catch((error) => {
            console.error("Error fetching Consultation Data for Admin:", error);
          });
      } else if (this.userRole === "DOCTOR") {
        this.fetchConsultationById(consultation_id)
          .then(() => {
            // if (
            //   !this.getConsultationForm &&
            //   this.getConsultation.hospital_service.status === "COMPLETED"
            // ) {
            //   this.fetchConsultationFormById(consultation_id);
            // }
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
  },
  created() {
    this.fetchConsultation();
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapGetters("consultations", {
      consultation: "getConsultation",
      consultation_form: "getConsultationForm",
      previous_consultations: "getPreviousConsultations",
    }),
    ...function () {
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        return mapGetters("admin_consultations", {
          consultation: "getAdminConsultation",
          consultation_form: "getAdminConsultationForm",
          previous_consultations: "getAdminPreviousConsultations",
        });
      } else {
        return mapGetters("admin_consultations", {
          consultation: "getAdminConsultation",
          consultation_form: "getAdminConsultationForm",
          previous_consultations: "getAdminPreviousConsultations",
        });
      }
    },
    buttonProperties() {
      let consultation_title = null;
      let consultation_color = null;
      let files_title = null;
      let files_color = null;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        consultation_title = "Edit Consultation Form";
        consultation_color = "blue darken-4";
      } else if (this.userRole === "DOCTOR") {
        files_color = "blue darken-4";
        consultation_color = "blue darken-4";
        if (this.consultation.hospital_service.status === "IN PROGRESS") {
          consultation_title = "Add Consultation Form";
        } else if (this.consultation.hospital_service.status === "COMPLETED") {
          files_title = "Upload Files";
        }
      }
      return {
        consultationForm: {
          title: consultation_title,
          color: consultation_color,
        },
        files: {
          title: files_title,
          color: files_color,
        },
      };
    },
    buttonPermissions() {
      let form = true;
      let files = true;
      let remove = true;

      if (this.userRole === "ADMIN") {
        files = false;
        if (this.consultation.hospital_service.status === "PENDING") {
          remove = false;
        }
      } else if (this.userRole === "DOCTOR") {
        remove = false;
        if (this.consultation.hospital_service.status === "IN PROGRESS") {
          files = false;
        } else if (this.consultation.hospital_service.status === "COMPLETED") {
          form = false;
        } else {
          form = false;
          files = false;
        }
      } else if (this.userRole === "ROOT") {
        files = false;
        if (this.consultation.hospital_service.status === "PENDING") {
          remove = false;
        }
      }

      return {
        form: form,
        files: files,
        delete: remove,
      };
    },
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
            title: "Municipality",
            content: this.consultation.citizen.municipality,
          },
          {
            title: "Barangay",
            content: this.consultation.citizen.barangay,
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
    previousConsultations() {
      if (
        !this.previous_consultations ||
        !Array.isArray(this.previous_consultations)
      ) {
        return [];
      }
      return this.previous_consultations.map((item) => ({
        consultation_date: format(
          parseISO(item.consultation_date),
          "MMMM dd, yyyy"
        ),
        subjectives: [
          {
            title: "Chief Complaint",
            content: item.chief_complaint
              ? item.chief_complaint
              : "None Specified",
          },
          {
            title: "History Of Present Illness",
            content: Array.isArray(item.history_of_present_illness)
              ? item.history_of_present_illness.join(", ")
              : item.history_of_present_illness,
          },
          {
            title: "Past Medical History",
            content: Array.isArray(item.past_medical_history)
              ? item.past_medical_history.join(", ")
              : item.past_medical_history,
          },
          {
            title: "Family Medical History",
            content: Array.isArray(item.family_medical_history)
              ? item.family_medical_history.join(", ")
              : item.family_medical_history,
          },
        ],
        objectives: [
          {
            title: "Blood Pressure",
            content: item.blood_pressure,
          },
          {
            title: "Heart Rate",
            content: item.heart_rate,
          },
          {
            title: "Respiratory Rate",
            content: item.respiratory_rate,
          },
          {
            title: "Temperature",
            content: item.temperature,
          },
          {
            title: "Oxygen Saturation",
            content: item.oxygen_saturation,
          },
          {
            title: "Weight",
            content: item.weight,
          },
          {
            title: "height",
            content: item.height,
          },
          {
            title: "Body Mass Index",
            content: item.body_mass_index,
          },
          {
            title: "Pertinent Findings",
            content: item.pertinent_findings,
          },
        ],
        assessments: [
          {
            title: "Diagnosis",
            content: item.diagnosis,
          },
        ],
        plans: [
          {
            title: "Diagnostics",
            content: Array.isArray(item.diagnostic_type)
              ? item.diagnostic_type.join(", ")
              : item.diagnostic_type,
          },
          {
            title: "Medications",
            content: item.medications,
          },
          {
            title: "Referrals",
            content: item.referral,
          },
          {
            title: "Others",
            content: item.others ? item.others : "None Specified",
          },
          {
            title: "",
            content: "",
          },
          {
            title: "Follow Up Date",
            content: format(parseISO(item.follow_up_date), "MMMM dd, yyyy"),
          },
          {
            title: "Fit To Work Starting",
            content: format(
              parseISO(item.fit_to_work_starting),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "May Rest For",
            content: item.may_rest_for,
          },
        ],
      }));
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
