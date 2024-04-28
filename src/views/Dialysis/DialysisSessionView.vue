<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="mx-auto" style="max-width: 85vw" v-if="session">
      <v-row>
        <v-col cols="auto">
          <span class="title">Dialysis Center</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="auto"
          v-if="buttonPermissions.complete"
          @click="completeDialysisSession"
          class="mr-3"
        >
          <v-btn dark color="success">Complete Session</v-btn>
        </v-col>
        <v-col cols="auto" v-if="buttonPermissions.files">
          <v-btn
            dark
            color="blue darken-4"
            class="mr-3"
            @click="proceedToFiles"
            >{{ buttonTitle ? "Uploaded Files" : "Upload Files" }}</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>

      <!-- Patient information -->
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto">
            <v-row>
              <v-col cols="12">
                <v-card
                  flat
                  rounded
                  class="card-light-bgColor rounded-card pa-4"
                >
                  <v-row>
                    <v-col cols="12" md="auto">
                      <v-card outlined color="transparent">
                        <v-img
                          class="grey darken-1 mx-auto"
                          :src="patientNameHeader?.image"
                          :key="patientNameHeader?.image"
                          max-height="100"
                          max-width="100"
                          style="transform: scaleX(-1)"
                        ></v-img>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      md="auto"
                      class="flex-grow-1 d-flex flex-column justify-center"
                    >
                      <p
                        class="text-h5 text-center text-md-left white--text font-weight-bold py-0 my-0"
                      >
                        {{ patientNameHeader?.name }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12">
                <PatientInformationComponent
                  :patientInformation="patientInformation"
                />
              </v-col>
              <v-col cols="12">
                <PatientServiceComponent
                  :serviceInformation="serviceInformation"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="4">
          <v-container class="mx-auto">
            <v-row>
              <v-col cols="12">
                <ServiceStatusComponent
                  @toggleProgress="toggleStatus"
                  :serviceStatus="serviceStatus"
                />
              </v-col>
            </v-row>
          </v-container>
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
import { mapActions, mapGetters, mapState } from "vuex";
import { format, parseISO } from "date-fns";
import PatientServiceComponent from "@/components/Reusable Components/PatientServiceComponent.vue";
import PatientInformationComponent from "@/components/Reusable Components/PatientInformationComponent.vue";
import ServiceStatusComponent from "@/components/Reusable Components/ServiceStatusComponent.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  name: "DialysisSessionView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    session: null,
  }),
  components: {
    PatientServiceComponent,
    PatientInformationComponent,
    ServiceStatusComponent,
  },
  methods: {
    ...mapActions("dialysis_sessions", [
      "fetchDialysisSessionById",
      "completeDialysisSessionById",
      "toggleServiceProgress",
      "fetchDialysisSessions",
    ]),
    ...mapActions("files", ["fetchFiles"]),
    fetchSessionData() {
      const id = this.$route.params.id;
      this.fetchDialysisSessionById(id).catch((error) => {
        console.error("Error Fetching Session Data", error);
      });
    },
    proceedToFiles() {
      if (this.userRole === "DIALYSIS_ENCODER") {
        return this.$router.push({
          name: "dialysis-files",
          params: { hospital_service_id: this.session.hospital_service.id },
        });
      }
    },
    completeDialysisSession() {
      this.completeDialysisSessionById(this.session.dialysis_session_id).catch(
        (error) => {
          console.error("Error Clicking Complete Button: ", error);
        }
      );
    },
    toggleStatus(status) {
      let payload = {
        status: status,
      };
      if (status) {
        if (this.userRole === "DIALYSIS_ENCODER") {
          this.toggleServiceProgress({
            id: this.session.dialysis_session_id,
            hospital_service_id: this.session.hospital_service.id,
            status: payload,
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters("dialysis_sessions", ["getDialysisSession"]),
    ...mapGetters("login", ["userRole"]),
    ...mapGetters("files", ["getFiles"]),
    ...mapState("dialysis_sessions", {
      dialysis_sessions: "dialysis_sessions",
    }),
    patientNameHeader() {
      if (!this.session) return;

      return {
        image: this.$url + this.session.citizen.image_url,
        name: this.session.citizen.full_name,
      };
    },
    buttonPermissions() {
      let files = false;
      let complete = false;

      if (this.userRole === "DIALYSIS_ENCODER") {
        if (this.session.hospital_service.status === "IN PROGRESS") {
          complete = true;
        } else if (this.session.hospital_service.status === "COMPLETED") {
          files = true;
        } else {
          files = false;
          complete = false;
        }
      }
      return {
        files: files,
        complete: complete,
      };
    },
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
            content: this.session.machine,
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
          packages: this.session.dialysis_packages,
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
            title: "Municipality",
            content: this.session.citizen.municipality,
          },
          {
            title: "Barangay",
            content: this.session.citizen.barangay,
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
      let scheduled_dialysis_sessions = [];
      let machine_value = null;
      let date_released_data = this.session.hospital_service.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.session.hospital_service.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;
      Object.keys(this.dialysis_sessions).forEach((item) => {
        if (item.includes("data")) {
          this.dialysis_sessions[item].forEach((info) => {
            if (this.session.citizen.full_name === info["citizen_full_name"]) {
              scheduled_dialysis_sessions.push({
                scheduled_date_session: format(
                  parseISO(info.scheduled_date),
                  "MMMM dd, yyyy"
                ),
                dialysis_session_status: info.status,
              });
            }
          });
        }
      });
      scheduled_dialysis_sessions.sort((a, b) => {
        const dateA = new Date(a.scheduled_date_session);
        const dateB = new Date(b.scheduled_date_session);
        return dateA - dateB;
      });

      switch (this.session.machine) {
        case "DIALYSIS MACHINE 3R":
          machine_value = "3R";
          break;
        case "DIALYSIS MACHINE 4R":
          machine_value = "4R";
          break;
        case "DIALYSIS MACHINE 5R":
          machine_value = "5R";
          break;
        case "DIALYSIS MACHINE 6R":
          machine_value = "6R";
          break;
        case "DIALYSIS MACHINE 7R":
          machine_value = "7R";
          break;
        case "DIALYSIS MACHINE 8R":
          machine_value = "8R";
          break;
        case "DIALYSIS MACHINE 9R":
          machine_value = "9R";
          break;
        case "DIALYSIS MACHINE 10R":
          machine_value = "10R";
          break;
        case "DIALYSIS MACHINE 2V":
          machine_value = "2V";
          break;
      }

      return {
        status: this.session.hospital_service.status,
        original_status: this.session.hospital_service.original_status,
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
        header: {
          title: "Packages Availed",
          icon: "mdi-hospital-box-outline",
        },
        items_availed: {
          service_type: this.session.hospital_service.service_type,
          packages: this.session.dialysis_packages,
        },
        header_dialysis: {
          header_title: "DIALYSIS",
          date: "Date Scheduled",
          status: "Status",
          icon: "mdi-iv-bag",
          time: "Time",
          time_value: this.session.session,
          sessions_available:
            scheduled_dialysis_sessions.length > 1
              ? `${scheduled_dialysis_sessions.length} sessions available`
              : `${scheduled_dialysis_sessions.length} session available`,
          machine_num: "Machine No.",
          machine_value: machine_value,
        },
        scheduled_dialysis_sessions: scheduled_dialysis_sessions,
      };
    },
    buttonTitle() {
      return this.getFiles.length > 0 ? true : false;
    },
  },
  watch: {
    getDialysisSession(value) {
      this.session = value;
      this.fetchFiles(this.session.hospital_service.id);
      console.log("getDialysisSession", value);
    },
    session(value) {
      console.log("session", value);
    },
    dialysis_sessions(value) {
      console.log("dialysis_sessions", value);
    },
  },
  created() {
    this.fetchSessionData();
    this.fetchDialysisSessions();
  },
};
</script>

<style scoped>
.card-light-bgColor {
  background-color: #ff4949;
}
.rounded-card {
  border-radius: 12px !important;
}
</style>
