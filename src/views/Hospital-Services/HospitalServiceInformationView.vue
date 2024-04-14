<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="ma-1" v-if="registrant && service">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Hospital Service</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" v-if="editButtonProperties">
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            dark
            class="blue darken-4 mr-3"
            @click="activator(id, hospital_service_id)"
            ><v-icon dark left>mdi-square-edit-outline</v-icon>Edit</v-btn
          >
          <v-btn
            v-else
            class="mr-3"
            color="blue darken-4"
            dark
            icon
            @click="activator(id, hospital_service_id)"
            ><v-icon> mdi-square-edit-outline </v-icon></v-btn
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
    <ServiceDialog
      :activator="dialog"
      :hospitalService="service"
      v-on:dialogResponse="resetEditActivator"
      v-on:updateService="submitForm"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { format, parseISO } from "date-fns";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import EditServiceMixin from "@/mixins/Hospital-Service/EditService";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PatientInformationComponent from "@/components/Reusable Components/PatientInformationComponent.vue";
import PatientServiceComponent from "@/components/Reusable Components/PatientServiceComponent.vue";
import ServiceStatusComponent from "@/components/Reusable Components/ServiceStatusComponent.vue";
export default {
  mixins: [EditServiceMixin, ErrorAlertsLogic],
  data: () => ({
    loading: false,
    id: null,
    hospital_service_id: null,
  }),
  components: {
    ServiceDialog,
    PatientServiceComponent,
    PatientInformationComponent,
    ServiceStatusComponent,
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrantId"]),
    fetchRegistrant() {
      this.id = this.$route.params.id;
      this.hospital_service_id = this.$route.params.hospital_service_id;

      return this.fetchRegistrantId(this.id)
        .then(() => {
          this.fetchHospitalServiceById({
            id: this.id,
            hospital_service_id: this.hospital_service_id,
          });
        })
        .catch((error) => {
          console.error(
            "Error fetching Registrant and Hospital Service Data:",
            error
          );
        });
    },
  },
  created() {
    this.fetchRegistrant();
  },
  watch: {
    service: {
      handler(value) {
        console.log(value);
      }
    }
  },
  computed: {
    ...mapState("registrants", {
      registrant: "registrant",
    }),
    ...mapState("services", {
      service: "hospitalService",
    }),
    ...mapGetters("login", ["userRole"]),
    editButtonProperties() {
      let edit = false;
      if (this.userRole === "ADMIN" || this.userRole === "ENCODER") {
        edit = true;
      }
      return edit;
    },
    serviceInformation() {
      let items_availed = null;
      let title = null;
      let second_column = {
        title: null,
        content: null,
      };
      let fourth_column = {
        title: null,
        content: null,
      };
      if (this.service.data.service_type !== "DIALYSIS") {
        items_availed = this.service.data.service_type;
        title = "Hospital Service Information";
        second_column = {
          title: "Health Professional",
          content: `${this.service.data.doctor_last_name}, ${this.service.data.doctor_first_name} ${this.service.data.doctor_middle_name}`,
        };
        fourth_column = {
          title: "Serviceable Availed",
          content: this.service.data.serviceable_type_name,
        }
      } else {
        items_availed = {
          service_type: this.service.data.service_type,
          packages: this.service.data.dialysis_packages,
        };
        title = "Dialysis Service Information";
        second_column = {
          title: "Dialysis Site",
          content: this.service.data.hospital,
        };
        fourth_column = {
          title: "Session Time",
          content: this.service.data.session,
        }
      }

      return {
        header: {
          title: title,
          icon: "mdi-medical-bag",
        },
        info: [
          {
            title: "Service ID",
            content: this.service.data.id,
          },
          {
            title: second_column.title,
            content: second_column.content,
          },
          {
            title: "Service Availed",
            content: this.service.data.service_type,
          },
          {
            title: fourth_column.title,
            content: fourth_column.content,
          },
        ],
        remarks: [
          {
            title: "Remarks",
            content: this.service.data.remarks
              ? this.service.data.remarks
              : "None",
          },
        ],
        items_availed: items_availed,
      };
    },
    patientInformation() {
      return {
        header: {
          title: "Patient Information",
          icon: "mdi-folder-multiple",
        },
        image_url: this.$url + this.registrant.citizen.citizen_file.image_url,
        info: [
          {
            title: "Patient Name",
            content: `${this.registrant.citizen.last_name}, ${
              this.registrant.citizen.first_name
            } ${
              this.registrant.citizen.middle_name
                ? this.registrant.citizen.middle_name
                : ""
            } ${
              this.registrant.citizen.suffix
                ? this.registrant.citizen.suffix
                : ""
            }`,
          },
          {
            title: "Age",
            content: this.registrant.citizen.age,
          },
          {
            title: "Sex",
            content: this.registrant.citizen.sex,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(this.registrant.citizen.birthday),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "Municipality",
            content:
              this.registrant.citizen.barangay.municipality.municipality_name,
          },
          {
            title: "Barangay",
            content: this.registrant.citizen.barangay.barangay_name,
          },
          {
            title: "Address",
            content: this.registrant.citizen.address,
          },
        ],
        additional_info: [
          {
            title: "Civil Status",
            content: this.registrant.citizen.civil_status,
          },
          {
            title: "Religion",
            content: this.registrant.citizen.religion,
          },
          {
            title: "Occupation",
            content: this.registrant.citizen.occupation
              ? this.registrant.citizen.occupation
              : "None Specified",
          },
          {
            title: "Nationality",
            content: this.registrant.citizen.nationality,
          },
        ],
      };
    },
    serviceStatus() {
      //Assign Date Released Value and Logic.
      let date_released_data = this.service.data.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.service.data.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;

      //Conditional for General Format and Dialysis Format Messages
      let messages = null;

      if (this.service.data.service_type !== "DIALYSIS") {
        messages = {
          pending: "Requested Service is pending...",
          inProgress: "Requested Service is in progress...",
          unattended: "Requested Service was unattended...",
          completed: "Requested Service was successfully completed...",
        };
      } else {
        messages = {
          pending: "Dialysis session is pending...",
          inProgress: "Dialysis session is in progress...",
          unattended: "Dialysis session was unattended...",
          completed: "Dialysis session was successfully completed...",
        };
      }

      return {
        status: this.service.data.status,
        scheduledDate: {
          title: "Scheduled Date",
          content: format(
            parseISO(this.service.data.scheduled_date),
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
