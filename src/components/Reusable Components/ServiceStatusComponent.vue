<template>
  <v-container fluid class="mx-auto">
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
          <v-row justify="center" class="ma-2 pb-2">
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
                  {{ serviceStatus.scheduledDate.title }}
                </div>
                <div class="text-h4 text-left white--text">
                  {{ serviceStatus.scheduledDate.content }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-n4" v-if="serviceStatus.dateReleased">
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
      <v-col cols="12" class="mt-n2">
        <v-card>
          <v-card-title class="blue darken-1 white--text">
            <v-icon dark class="mr-2">mdi-hospital-box-outline</v-icon>
            Packages Availed
          </v-card-title>
          <v-container>
            <v-row
              v-for="(info, packIndex) in packageInformation"
              :key="packIndex"
              class="mt-n3"
            >
              <v-col cols="12">
                <v-btn text @click="expandCollapse(packIndex)" width="100%"
                  >{{ info.name }}
                  <v-spacer></v-spacer>
                  <v-icon>{{packageInformation[packIndex].expand ? "mdi-chevron-down" : "mdi-chevron-up"}}</v-icon>
                </v-btn>
              </v-col>
              <v-expand-transition>
                <v-row
                  v-if="packageInformation[packIndex].expand"
                  class="ma-1 mt-n4"
                >
                  <v-col
                    cols="6"
                    v-for="(item, itemIndex) in info.items"
                    :key="itemIndex"
                  >
                    <ul>
                      <li>
                        {{ item }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-expand-transition>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServiceStatusComponent",
  props: ["serviceStatus"],
  data: () => ({
    toggle_status: false,
    packageInformation: [
      {
        name: "Package A",
        items: ["EPO", "Copay"],
        expand: false,
      },
      {
        name: "Package B",
        items: ["Dialyzer", "EPO", "Copay", "Laboratory"],
        expand: false,
      },
    ],
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
    expandCollapse(packIndex) {
      this.packageInformation[packIndex].expand =
        !this.packageInformation[packIndex].expand;
      console.log(this.packageInformation[packIndex].expand);
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

<style scoped></style>
