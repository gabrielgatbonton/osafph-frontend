<template>
  <div>
    <v-container v-if="data">
      <v-row no-gutters>
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card rounded="lg" flat style="background-color: #f1f5fb">
                  <v-container>
                    <v-row dense class="ma-2">
                      <v-col cols="auto">
                        <v-avatar
                          color="
                            white
                          "
                        >
                          <v-icon color="blue darken-1">
                            mdi-medical-bag
                          </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          REGISTRANT'S HOSPITAL SERVICES
                        </div>
                        <div class="text-caption grey--text">
                          Services Availed
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="ma-2">
                      <v-col
                        cols="12"
                        class="py-0"
                        v-for="(service, index) in services"
                        :key="index"
                      >
                        <v-expansion-panels popout class="my-1">
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <v-container class="py-1">
                                <v-row>
                                  <v-col cols="auto" class="px-0">
                                      <v-icon :color="serviceStatusColor(service.status)">
                                        {{ serviceStatus(service.status) }}
                                      </v-icon>
                                  </v-col>
                                  <v-col cols="auto" class="py-0">
                                    <div
                                      class="text-subtitle-2 font-weight-bold"
                                    >
                                      {{ service.service_type }}
                                    </div>
                                    <div class="text-subtitle-2">
                                      {{ service.scheduled_date }}
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-row>
                                <v-col
                                  cols="12"
                                  md="6"
                                  sm="6"
                                  v-for="(detail, index) in service.details"
                                  :key="'detail-' + index"
                                >
                                  <div class="ma-2">
                                    <div class="text-subtitle-2 grey--text">
                                      {{ detail.title }}
                                    </div>
                                    <div class="text-h5">
                                      {{ detail.content }}
                                    </div>
                                  </div>
                                </v-col>
                                <v-col cols="12">
                                  <v-divider class="mx-3"></v-divider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                  sm="6"
                                  v-for="(detail, index) in service.dates"
                                  :key="'date-' + index"
                                >
                                  <div class="ma-2">
                                    <div class="text-subtitle-2 grey--text">
                                      {{ detail.title }}
                                    </div>
                                    <div class="text-h5">
                                      {{ detail.content }}
                                    </div>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  props: ["data"],
  data: () => ({}),
  computed: {
    services() {
      if (!this.data || !Array.isArray(this.data)) {
        return []; // Return an empty array if data is not available or not an array
      }

      return this.data.map((item) => ({
        service_type: item.service_type,
        scheduled_date: format(
          parseISO(item.scheduled_date),
          "MMMM dd, yyyy"
        ).toUpperCase(),
        status: item.status,
        details: [
          {
            title: "Service ID",
            content: item.id,
          },
          {
            title: "Status",
            content: item.status,
          },
          {
            title: "Service Availed",
            content: item.service_type,
          },
          {
            title: "Serviceable Availed",
            content: item.serviceable_type_name,
          },
        ],
        dates: [
          {
            title: "Scheduled Date",
            content: format(
              parseISO(item.scheduled_date),
              "MMMM dd, yyyy"
            ).toUpperCase(),
          },
          {
            title: "Scheduled Time",
            content: format(
              parseISO(`${item.scheduled_date}T${item.scheduled_time}`),
              "h:mm a"
            ),
          },
          {
            title: "Doctor in Charge",
            content: `${item.doctor_last_name}, ${item.doctor_first_name}`,
          },
          {
            title: "Doctor Specialty",
            content: item.doctor_specialty,
          },
        ],
      }));
    },
  },
  methods: {
    serviceStatus(service) {
      return service === "COMPLETED"
        ? "mdi-check"
        : service === "UNATTENDED"
        ? "mdi-alert-circle-outline"
        : service === "PENDING"
        ? "mdi-clock-outline"
        : "";
    },
    serviceStatusColor(service) {
      return service === "COMPLETED"
        ? "success"
        : service === "UNATTENDED"
        ? "error"
        : service === "PENDING"
        ? "warning"
        : "";
    },
  },
  mounted() {
    console.log("Registrant Services: ", this.data);
  },
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid lightgray;
  height: 20px; /* Adjust the height to the desired vertical connection length */
  margin-left: 30px; /* Add some spacing and center the divider */
}
</style>
