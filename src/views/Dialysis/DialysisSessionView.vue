<template>
  <div>
    <v-container fluid class="ma-1" v-if="session">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Dialysis Center</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn dark class="blue darken-4 mr-3">Upload Files</v-btn>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { format, parseISO } from "date-fns";
import PatientServiceComponent from "@/components/Reusable/PatientServiceComponent.vue";
import PatientInformationComponent from "@/components/Reusable/PatientInformationComponent.vue";
import ServiceStatusComponent from "@/components/Reusable/ServiceStatusComponent.vue";
export default {
  name: "DialysisSessionView",
  data: () => ({
    session: null,
  }),
  components: {
    PatientServiceComponent,
    PatientInformationComponent,
    ServiceStatusComponent,
  },
  methods: {
    ...mapActions("dialysis_sessions", ["fetchDialysisSessionById"]),
    fetchSessionData() {
      const id = this.$route.params.id;
      this.fetchDialysisSessionById(id).catch((error) => {
        console.error("Error Fetching Session Data", error);
      });
    },
  },
  computed: {
    ...mapGetters("dialysis_sessions", ["getDialysisSession"]),
    serviceInformation() {
      return {
        header: {
          title: "Patient Dialysis",
          icon: "mdi-account",
        },
        info: [
          {
            title: "Dialysis ID",
            content: this.session.dialysis_session_id,
          },
          {
            title: "Session",
            content: this.session.session,
          },
          {
            title: "Dialysis Machine",
            content: this.session.dialysis_machine,
          },
          {
            title: "Cost of Service",
            content: `PHP ${
              this.session.hospital_service.service_fee
                ? this.session.hospital_service.service_fee
                : "XXXX"
            }`,
          },
        ],
        remarks: [
          {
            title: "Remarks",
            content: this.session.hospital_service.remarks,
          },
        ],
        items_availed: {
          service_type: this.session.hospital_service.service_type,
          items: this.session.dialysis_items,
        },
      };
    },
    patientInformation() {
      return {
        header: {
          title: "Patient Information",
          icon: "mdi-folder-multiple",
        },
        image_url: this.$url + this.session.citizen.image_url,
        info: [
          {
            title: "Patient Name",
            content: this.session.citizen.full_name,
          },
          {
            title: "Age",
            content: this.session.citizen.age,
          },
          {
            title: "Sex",
            content: this.session.citizen.sex,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(this.session.citizen.date_of_birth),
              "MMMM dd, yyyy"
            ),
          },
          {
            title: "Address",
            content: this.session.citizen.address,
          },
        ],
        additional_info: [
          {
            title: "Civil Status",
            content: this.session.citizen.civil_status,
          },
          {
            title: "Religion",
            content: this.session.citizen.religion,
          },
          {
            title: "Occupation",
            content: this.session.citizen.occupation
              ? this.session.citizen.occupation
              : "None Specified",
          },
          {
            title: "Nationality",
            content: this.session.citizen.nationality,
          },
        ],
      };
    },
    serviceStatus() {
      //Assign Date Released Value and Logic.
      let date_released_data = this.session.hospital_service.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.session.hospital_service.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;

      return {
        status: this.session.hospital_service.status,
        scheduledDate: {
          title: "Scheduled Date",
          content: format(
            parseISO(this.session.hospital_service.scheduled_date),
            "MMMM dd, yyyy"
          ),
        },
        dateReleased: date_released_data,
        messages: {
          pending: "Dialysis session is pending...",
          inProgress: "Dialysis session is in progress...",
          unattended: "Dialysis session was unattended...",
          completed: "Dialysis session was successfully completed...",
        },
      };
    },
  },
  watch: {
    getDialysisSession(value) {
      this.session = value;
    },
  },
  created() {
    this.fetchSessionData();
  },
};
</script>

<style scoped></style>
