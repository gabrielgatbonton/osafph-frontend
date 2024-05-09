<template>
  <v-row>
    <v-col cols="12">
      <!-- <v-card
        :class="{
          warning: status.title === 'PENDING' || status.title === 'WALK-IN',
          error: status.title === 'UNATTENDED',
          success: status.title === 'COMPLETED',
          indigo: status.title === 'IN PROGRESS',
        }"
        class="primary"
      > -->
      <v-card flat class="gradient-background rounded-card">
        <v-container>
          <v-row justify="center" class="pa-2">
            <v-col align-self="center" cols="12">
              <div class="my-3 d-flex justify-space-between">
                <div class="d-flex align-center">
                  <v-avatar color="primary">
                    <v-icon color="white"> mdi-message-processing </v-icon>
                  </v-avatar>
                  <div class="ml-3 text-h5 text-left white--text">
                    <p class="white--text pa-0 ma-0" :class="{'text-h5': !$vuetify.breakpoint.xs, 'text-body-1': $vuetify.breakpoint.xs}"> 
                      {{ status.title }}
                    </p>
                    <p class="white--text pa-0 ma-0" :class="{'text-subtitle-1': !$vuetify.breakpoint.xs, 'text-body-2': $vuetify.breakpoint.xs}">
                      {{ status.message }}
                    </p>
                  </div>
                </div>
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
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card outlined class="rounded-card colored-border">
        <v-container>
          <v-row justify="center" class="pa-2">
            <v-col align-self="center" cols="12">
              <div class="my-3 d-flex justify-space-between">
                <div class="d-flex align-center">
                  <v-avatar color="primary">
                    <v-icon color="white"> mdi-calendar-search </v-icon>
                  </v-avatar>
                  <div class="ml-3 text-h5 text-left">
                    <p class="text-subtitle-2 font-weight-bold pa-0 ma-0">
                      {{ serviceStatus.scheduledDate.title }}
                    </p>
                    <p class="text-h5 primary--text pa-0 ma-0">
                      {{ serviceStatus.scheduledDate.content }}
                    </p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="serviceStatus.dateReleased">
      <v-card outlined class="bordered-card colored-border">
        <v-container>
          <v-row justify="center" class="pa-2">
            <v-col align-self="center" cols="12">
              <div class="my-3 d-flex justify-space-between">
                <div class="d-flex align-center">
                  <v-avatar color="primary">
                    <v-icon color="white"> mdi-check </v-icon>
                  </v-avatar>
                  <div class="ml-3 text-h5 text-left">
                    <p class="text-subtitle-2 font-weight-bold pa-0 ma-0">
                      {{ serviceStatus.dateReleased.title }}
                    </p>
                    <p class="text-h5 primary--text pa-0 ma-0">
                      {{ serviceStatus.dateReleased.content }}
                    </p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      v-if="serviceStatus.items_availed.service_type === 'DIALYSIS'"
    >
      <v-card outlined class="rounded-card colored-border">
        <v-container fluid class="py-4">
          <v-row dense justify="center" class="ma-2">
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <p class="text-subtitle-1 black--text font-weight-bold">
                  {{ serviceStatus.header.title.toUpperCase() }}
                </p>
                <PackagesDialog :dialysis_packages="showDialysisPackages" />
              </div>
            </v-col>
            <v-col align-self="center" cols="12">
              <v-expansion-panels flat accordion focusable>
                <v-expansion-panel
                  v-for="(info, packIndex) in serviceStatus.items_availed
                    .packages"
                  :key="packIndex"
                >
                  <v-expansion-panel-header class="py-0">
                    <p class="text-button my-0 py-0">{{ info.name }}</p>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container>
                      <v-row v-if="$vuetify.breakpoint.lg">
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
                      <v-row v-else>
                        <v-col>
                          <span
                            v-for="(item, itemIndex) in info.dialysis_items"
                            :key="itemIndex"
                            >{{ item }}{{ itemIndex < info.dialysis_items.length - 1 ? ", " : ""}}</span
                          >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      v-if="serviceStatus.items_availed.service_type === 'DIALYSIS'"
    >
      <v-card outlined class="bordered-card colored-border">
        <v-container fluid class="py-4">
          <v-row dense justify="center" class="ma-2">
            <!-- <v-icon class="mr-2">{{
                  serviceStatus.header_dialysis.icon
                }}</v-icon> -->
            <v-col cols="12">
              <p class="text-subtitle-1 py-0 my-0 black--text font-weight-bold">
                {{ serviceStatus.header_dialysis.header_title }}
              </p>
            </v-col>

            <v-col cols="12">
              <v-container fluid class="py-4">
                <v-card flat>
                  <v-row
                    no-gutters
                    :class="{
                      'mb-3': $vuetify.breakpoint.xs,
                    }"
                  >
                    <v-col cols="12" md="6" sm="6">
                      <v-card-subtitle class="py-0"
                        >Available Sessions</v-card-subtitle
                      >
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-card-text class="py-0 font-weight-bold">
                        {{ serviceStatus.header_dialysis.sessions_available }}
                      </v-card-text>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-card-subtitle class="py-0">
                        {{ serviceStatus.header_dialysis.time }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-card-text class="py-0 font-weight-bold">
                        {{ serviceStatus.header_dialysis.time_value }}
                      </v-card-text>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-card-subtitle class="py-0">
                        {{ serviceStatus.header_dialysis.machine_num }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-card-text class="py-0 font-weight-bold">
                        {{ serviceStatus.header_dialysis.machine_value }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
            </v-col>

            <v-col align-self="center" cols="12">
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Date Scheduled</th>
                        <th class="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          sessionsInfo, infoIndex
                        ) in serviceStatus.scheduled_dialysis_sessions"
                        :key="infoIndex"
                      >
                        <td>{{ sessionsInfo.scheduled_date_session }}</td>
                        <td
                          :class="{
                            'orange--text':
                              sessionsInfo.dialysis_session_status ===
                                'PENDING' ||
                              sessionsInfo.dialysis_session_status ===
                                'WALK-IN',
                            'red--text':
                              sessionsInfo.dialysis_session_status ===
                              'UNATTENDED',
                            'green--text':
                              sessionsInfo.dialysis_session_status ===
                              'COMPLETED',
                            'indigo--text':
                              sessionsInfo.dialysis_session_status ===
                              'IN PROGRESS',
                          }"
                        >
                          {{ sessionsInfo.dialysis_session_status }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import PackagesDialog from "../Dialysis/PackagesDialog.vue";
export default {
  name: "ServiceStatusComponent",
  props: ["serviceStatus"],
  data: () => ({
    toggle_status: false,
  }),
  components: {
    PackagesDialog,
  },
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
    showDialysisPackages() {
      return this.serviceStatus.dialysis_session_packages;
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
      },
    },
    "serviceStatus.status": {
      handler(newVal) {
        this.serviceStatus.scheduled_dialysis_sessions.forEach((date) => {
          if (
            this.serviceStatus.scheduledDate.content ===
            date.scheduled_date_session
          ) {
            date.dialysis_session_status = newVal;
          }
        });
      },
    },
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 12px !important;
}
.gradient-background {
  background-image: linear-gradient(to right, #a40e32, #db4a41);
  color: white;
}
.colored-border {
  border: 1px solid #ffd1d1 !important;
}

.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
</style>
