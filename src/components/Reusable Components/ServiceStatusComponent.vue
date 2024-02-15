<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-card
          :class="{
            warning: status.title === 'PENDING',
            error: status.title === 'UNATTENDED',
            success: status.title === 'COMPLETED',
            indigo: status.title === 'IN PROGRESS',
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ServiceStatusComponent",
  props: ["serviceStatus"],
  data: () => ({}),
  methods: {},
  computed: {
    status() {
      let status = null;
      let message = null;
      if (this.serviceStatus.status === "PENDING") {
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
      if (this.serviceStatus.status === "PENDING") {
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
};
</script>

<style scoped></style>
