<template>
  <v-container fluid class="mx-auto" v-if="data">
    <v-row>
      <v-col cols="12">
        <v-card
          :class="{
            warning: status.title === 'PENDING',
            error: status.title === 'UNATTENDED',
            success: status.title === 'COMPLETED',
          }"
        >
          <v-row justify="center" class="ma-2 pb-2">
            <v-col align-self="center" cols="12">
              <div class="my-3">
                <v-avatar color="white">
                  <v-icon :color="iconColor"> mdi-message-processing </v-icon>
                </v-avatar>
              </div>
              <div class="my-3 text-h4 text-left white--text">
                {{ status.title }}
              </div>
              <div class="text-subtitle-1 white--text">
                {{ status.message }}
                <v-progress-circular
                  size="18"
                  width="3"
                  v-if="isLoading"
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-n4">
        <v-card class="blue darken-1">
          <v-row justify="center" class="ma-2 pb-2">
            <v-col align-self="center" cols="12">
              <div class="my-3">
                <v-avatar color="white">
                  <v-icon color="blue darken-1"> mdi-calendar-search </v-icon>
                </v-avatar>
              </div>
              <div class="mt-4">
                <div class="text-subtitle-2 white--text">
                  {{ scheduledDate.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ scheduledDate.content }}
                </div>
              </div>
              <div class="mt-4">
                <div class="text-subtitle-2 white--text">
                  {{ scheduledTime.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ scheduledTime.content }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-n4" v-if="dateReleased && timeReleased">
        <v-card class="blue darken-1">
          <v-row justify="center" class="ma-2 pb-2">
            <v-col align-self="center" cols="12">
              <div class="my-3">
                <v-avatar color="white">
                  <v-icon color="blue darken-1"> mdi-check </v-icon>
                </v-avatar>
              </div>
              <div class="my-4">
                <div class="text-subtitle-2 white--text">
                  {{ dateReleased.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ dateReleased.content }}
                </div>
              </div>
              <div class="my-4">
                <div class="text-subtitle-2 white--text">
                  {{ timeReleased.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ timeReleased.content }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  props: ["data"],
  data: () => ({
    isLoading: false,
    iconColor: null,
  }),
  methods: {
    checkStatus() {
      if (this.data.hospitalService.status === "PENDING") {
        this.isLoading = true;
        this.iconColor = "warning";
      } else if (this.data.hospitalService.status === "UNATTENDED") {
        this.isLoading = false;
        this.iconColor = "error";
      } else if (this.data.hospitalService.status === "COMPLETED") {
        this.isLoading = false;
        this.iconColor = "success";
      }
      console.log(this.iconColor);
    },
  },
  computed: {
    status() {
      let status = null;
      let message = null;
      if (this.data.hospitalService.status === "PENDING") {
        status = this.data.hospitalService.status;
        message = "Application is still pending...";
      } else if (this.data.hospitalService.status === "UNATTENDED") {
        status = this.data.hospitalService.status;
        message = "Applicant was unable to attend...";
      } else if (this.data.hospitalService.status === "COMPLETED") {
        status = this.data.hospitalService.status;
        message = "Service was successfully completed...";
      }

      return {
        title: status,
        message: message,
      };
    },
    scheduledDate() {
      return {
        title: "Scheduled Date",
        content: format(
          parseISO(this.data.hospitalService.scheduled_date),
          "MMMM dd, yyyy"
        ),
      };
    },
    scheduledTime() {
      return {
        title: "Scheduled Time",
        content: format(
          parseISO(
            `${this.data.hospitalService.scheduled_date}T${this.data.hospitalService.scheduled_time}`
          ),
          "h:mm a"
        ),
      };
    },
    dateReleased() {
      return this.data.hospitalService.date_released
        ? {
            title: "Date Released",
            content: format(
              parseISO(this.data.hospitalService.date_released),
              "MMMM dd, yyyy"
            ),
          }
        : false;
    },
    timeReleased() {
      return this.data.hospitalService.time_released
        ? {
            title: "Time Released",
            content: format(
              parseISO(
                `${this.data.hospitalService.date_released}T${this.data.hospitalService.time_released}`
              ),
              "h:mm a"
            ),
          }
        : false;
    },
  },
  watch: {
    data(value) {
      console.log(value);
    },
  },
  mounted() {
    this.checkStatus();
  },
  updated() {
    this.checkStatus();
  },
};
</script>

<style scoped></style>
