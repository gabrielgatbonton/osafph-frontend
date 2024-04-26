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
                    <p class="text-h5 white--text pa-0 ma-0">
                      {{ status.title }}
                    </p>
                    <p class="text-subtitle-1 white--text pa-0 ma-0">
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
      <v-card outlined class="rounded-card colored-border">
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
          <v-row class="mt-1">
            <v-col
              cols="12"
              md="7"
              class="text-subtitle-1 font-italic font-weight-light"
            >
              {{ serviceStatus.header_dialysis.date }}
            </v-col>
            <v-col
              cols="12"
              md="5"
              class="text-subtitle-1 font-italic font-weight-light"
            >
              {{ serviceStatus.header_dialysis.status }}
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
    packageInformation: {
      handler(value) {
        console.log(value);
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
</style>
