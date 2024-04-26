<template>
  <v-row>
    <v-col cols="12">
      <v-card
        :class="{
          warning: status.title === 'PENDING' || status.title === 'WALK-IN',
          error: status.title === 'UNATTENDED',
          success: status.title === 'COMPLETED',
          indigo: status.title === 'IN PROGRESS',
        }"
      >
        <v-container>
          <v-row justify="center" class="pa-2">
            <v-col align-self="center" cols="12">
              <div class="my-3 d-flex justify-space-between">
                <v-avatar color="white">
                  <v-icon :color="iconColor"> mdi-message-processing </v-icon>
                </v-avatar>
                <v-icon
                  v-if="
                    userRole === 'DOCTOR' || userRole === 'DIALYSIS_ENCODER'
                  "
                  @click="initToggleProgress"
                  large
                  dark
                  class="px-2"
                  >{{
                    toggle_status
                      ? "mdi-toggle-switch-outline"
                      : "mdi-toggle-switch-off-outline"
                  }}</v-icon
                >
              </div>
              <div class="my-3 text-h4 text-left white--text">
                {{ status.title }}
              </div>
              <div class="text-subtitle-1 white--text">
                {{ status.message }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="blue darken-1">
        <v-container>
          <v-row justify="center" class="pa-2">
            <v-col align-self="center" cols="12">
              <div class="my-3">
                <v-avatar color="white">
                  <v-icon color="blue darken-1"> mdi-calendar-search </v-icon>
                </v-avatar>
              </div>
              <div class="mt-4">
                <div class="text-subtitle-2 white--text">
                  {{ serviceStatus.scheduledDate.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ serviceStatus.scheduledDate.content }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="serviceStatus.dateReleased">
      <v-card class="blue darken-1">
        <v-row justify="center" class="ma-2">
          <v-col align-self="center" cols="12">
            <div class="my-3">
              <v-avatar color="white">
                <v-icon color="blue darken-1"> mdi-check </v-icon>
              </v-avatar>
            </div>
            <div class="my-4">
              <div class="text-subtitle-2 white--text">
                {{ serviceStatus.dateReleased.title }}
              </div>
              <div class="text-h4 text-left white--text">
                {{ serviceStatus.dateReleased.content }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      v-if="serviceStatus.items_availed.service_type === 'DIALYSIS'"
    >
      <v-card>
        <v-card-title class="blue darken-1 white--text">
          <v-icon dark class="mr-2">{{ serviceStatus.header.icon }}</v-icon>
          {{ serviceStatus.header.title }}
        </v-card-title>
        <v-expansion-panels accordion focusable>
          <v-expansion-panel
            v-for="(info, packIndex) in serviceStatus.items_availed.packages"
            :key="packIndex"
          >
            <v-expansion-panel-header>
              <div>
                <v-btn color="red darken-4" icon :ripple="false">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </div>
              <p class="text-button my-auto">{{ info.name }}</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                    v-for="(item, itemIndex) in info.dialysis_items"
                    :key="itemIndex"
                  >
                    <ul>
                      <li>
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="d-flex justify-center align-center">
          <v-btn color="blue darken-4" icon :ripple="false">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      v-if="serviceStatus.items_availed.service_type === 'DIALYSIS'"
    >
      <v-card>
        <v-card-title class="blue darken-1 white--text">
          <v-icon dark class="mr-2">{{
            serviceStatus.header_dialysis.icon
          }}</v-icon>
          {{ serviceStatus.header_dialysis.header_title }}
        </v-card-title>
        <v-card-text>
          <v-row
            class="mt-1"
            v-for="(
              sessionsInfo, infoIndex
            ) in serviceStatus.scheduled_dialysis_sessions"
            :key="infoIndex"
          >
            <v-col cols="12" md="6">
              <div class="text-subtitle-1 font-italic font-weight-light">
                {{ serviceStatus.header_dialysis.date }}
              </div>
              <div class="text-h5 black--text">
                {{ sessionsInfo.scheduled_date_session }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-subtitle-1 font-italic font-weight-light">
                {{ serviceStatus.header_dialysis.status }}
              </div>
              <div
                class="text-h5 font-italic"
                :class="{
                  'orange--text': sessionsInfo.dialysis_session_status === 'PENDING' ||
                  sessionsInfo.dialysis_session_status === 'WALK-IN',
                  'red--text': sessionsInfo.dialysis_session_status === 'UNATTENDED',
                  'green--text': sessionsInfo.dialysis_session_status === 'COMPLETED',
                  'indigo--text': sessionsInfo.dialysis_session_status === 'IN PROGRESS',
                }"
              >
                {{ sessionsInfo.dialysis_session_status }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServiceStatusComponent",
  props: ["serviceStatus", "services"],
  data: () => ({
    toggle_status: false,
  }),
  methods: {
    initToggleProgress() {
      this.toggle_status = !this.toggle_status;
      if (this.toggle_status) {
        this.$emit("toggleProgress", "IN PROGRESS");
      } else {
        this.$emit("toggleProgress", this.serviceStatus.original_status);
      }
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    status() {
      let status = null;
      let message = null;
      if (
        this.serviceStatus.status === "PENDING" ||
        this.serviceStatus.status === "WALK-IN"
      ) {
        status = this.serviceStatus.status;
        message = this.serviceStatus.messages.pending;
      } else if (this.serviceStatus.status === "IN PROGRESS") {
        status = this.serviceStatus.status;
        message = this.serviceStatus.messages.inProgress;
      } else if (this.serviceStatus.status === "UNATTENDED") {
        status = this.serviceStatus.status;
        message = this.serviceStatus.messages.unattended;
      } else if (this.serviceStatus.status === "COMPLETED") {
        status = this.serviceStatus.status;
        message = this.serviceStatus.messages.completed;
      }

      return {
        title: status,
        message: message,
      };
    },
    iconColor() {
      let iconColor = null;
      if (
        this.serviceStatus.status === "PENDING" ||
        this.serviceStatus.status === "WALK-IN"
      ) {
        iconColor = "warning";
      } else if (this.serviceStatus.status === "UNATTENDED") {
        iconColor = "error";
      } else if (this.serviceStatus.status === "COMPLETED") {
        iconColor = "success";
      } else if (this.serviceStatus.status === "IN PROGRESS") {
        iconColor = "indigo";
      }
      return iconColor;
    },
  },
  watch: {
    serviceStatus: {
      immediate: true,
      handler(value) {
        if (value.status === "IN PROGRESS" || value.status === "COMPLETED") {
          this.toggle_status = true;
        } else {
          this.toggle_status = false;
        }
        console.log(value);
      },
    },
  },
};
</script>

<style scoped></style>
