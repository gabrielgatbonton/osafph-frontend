<template>
  <v-row no-gutters v-if="services" class="mt-3">
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
                      <v-icon color="primary"> mdi-medical-bag </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="auto" class="pt-2">
                    <div class="text-subtitle-2 font-weight-bold">
                      HOSPITAL SERVICES
                    </div>
                    <div class="text-caption grey--text">Services Availed</div>
                  </v-col>
                </v-row>
                <v-row dense class="ma-2">
                  <v-col cols="12">
                    <div class="d-flex justify-space-between align-center">
                      <v-text-field
                        label="Search"
                        prepend-icon="mdi-magnify"
                        class="mr-4"
                        v-model="search"
                      ></v-text-field>
                      <v-btn
                        v-if="!$vuetify.breakpoint.xs"
                        class="primary"
                        dark
                        @click="activator"
                        >Filter</v-btn
                      >
                      <v-btn
                        v-else
                        dark
                        class="mr-3"
                        color="primary"
                        icon
                        @click="activator"
                        ><v-icon>mdi-filter-multiple</v-icon></v-btn
                      >
                    </div>
                    <FilterDialog
                      @filterQuery="(params) => assignParams(params)"
                      :activator="dialog"
                      @dialogResponse="resetActivator"
                      :type_of_filter="type_of_filter"
                      :slot_activator="slot_activator"
                    />
                  </v-col>
                  <v-col cols="12" v-if="mappedServices.length > 0">
                    <v-row>
                      <v-col
                        cols="12"
                        class="py-0"
                        v-for="(service, index) in mappedServices"
                        :key="index"
                      >
                        <template>
                          <v-expansion-panels class="mb-1">
                            <v-expansion-panel>
                              <v-expansion-panel-header>
                                <v-container class="py-1">
                                  <v-row>
                                    <v-col cols="auto" class="px-0">
                                      <v-icon
                                        :color="
                                          serviceStatusColor(service.status)
                                        "
                                      >
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
                                    v-if="
                                      public_files &&
                                      public_files.data.length > 0
                                    "
                                  >
                                    <div
                                      class="d-inline-block mt-2"
                                      v-for="(chip, chipIndex) in public_files
                                        .data[index]"
                                      :key="chipIndex"
                                    >
                                      <v-chip
                                        class="mr-2"
                                        @click="
                                          proceedToFileView(
                                            service.hospital_service_id,
                                            chip.id
                                          )
                                        "
                                        ><v-icon left color="blue darken-4"
                                          >mdi-image</v-icon
                                        >{{ chip.document_type }}</v-chip
                                      >
                                    </div>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    md="6"
                                    sm="6"
                                    v-for="(detail, index) in service.details"
                                    :key="'detail-' + index"
                                    :search="search"
                                  >
                                    <div class="ma-2">
                                      <div class="text-subtitle-2 grey--text">
                                        {{ detail.title }}
                                      </div>
                                      <div
                                        class="text-h6 text-sm-h5 font-weight-regular"
                                      >
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
                                      <div
                                        class="text-h6 text-sm-h5 font-weight-regular"
                                      >
                                        {{ detail.content }}
                                      </div>
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </template>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-else cols="12">
                    <p class="subtitle-2 text-center grey--text">
                      No Pending or Walk-in Services Available
                    </p>
                  </v-col>
                </v-row>
                <v-pagination
                  :length="pageComputer(services)"
                  v-model="page"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  class="mt-4"
                ></v-pagination>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import FilterDialog from "@/components/Filter/FilterDialog.vue";
import ViewFileMixin from "../../mixins/Consultation Files/ViewFile";
export default {
  props: ["services", "public_files"],
  mixins: [ViewFileMixin],
  data: () => ({
    page: 1,
    total_items: null,
    search: "",
    slot_activator: false,
    dialog: false,
    type_of_filter: "SERVICES AVAILED INDEX",
    query_params: {},
    searchTimeout: null,
  }),
  components: {
    FilterDialog,
  },
  computed: {
    mappedServices() {
      if (!this.services && !Array.isArray(this.services.data)) {
        return []; // Return an empty array if data is not available or not an array
      }

      return this.services.data.map((item) => ({
        citizen_id: item.citizen_id,
        hospital_service_id: item.id,
        service_type: item.service_type,
        scheduled_date: format(
          parseISO(item.scheduled_date),
          "MMMM dd, yyyy"
        ).toUpperCase(),
        status: item.status,
        public_files: [],
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
            content: item.serviceable_type_name
              ? item.serviceable_type_name
              : "N/A",
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
            title: "Doctor in Charge",
            content:
              item.doctor_last_name && item.doctor_first_name
                ? `${item.doctor_last_name}, ${item.doctor_first_name}`
                : "N/A",
          },
          {
            title: "Doctor Specialty",
            content: item.doctor_specialty,
          },
          {
            title: "Facility",
            content: item.hospital,
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
        : service === "WALK-IN"
        ? "mdi-walk"
        : service === "IN PROGRESS"
        ? "mdi-progress-clock"
        : "";
    },
    serviceStatusColor(service) {
      return service === "COMPLETED"
        ? "success"
        : service === "UNATTENDED"
        ? "error"
        : service === "PENDING"
        ? "warning"
        : service === "WALK-IN" || service === "IN PROGRESS"
        ? "blue darken-4"
        : "";
    },
    pageComputer(data) {
      return Math.ceil(data.meta.total / 10);
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    assignParams(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          const value = payload[key];
          if (value === null) {
            // if value is null, delete in query_params
            this.$delete(this.query_params, key);
          } else {
            // if property has data, add to query_params
            this.$set(this.query_params, key, value);
          }
        }
      }
      this.$emit("query_params", this.query_params);
    },
    proceedToFileView(hospital_service_id, file_id) {
      this.$router
        .push({
          name: "public-file-view",
          query: {
            citizen_id: JSON.stringify("public-viewing"),
            file_id: JSON.stringify(file_id),
            hospital_service_id: JSON.stringify(hospital_service_id),
          },
        })
        .catch((error) => {
          console.error("Error Moving to Next Route:", error);
        });
    },
  },
  watch: {
    page: {
      deep: true,
      handler(value) {
        if (value > 1) {
          this.query_params.page = value;
        } else {
          delete this.query_params.page;
        }

        this.$emit("query_params", this.query_params);
      },
    },
    search: {
      deep: true,
      handler(value) {
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
          this.query_params.search = value;
          this.$emit("query_params", this.query_params);
        }, 300);
      },
    },
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
