<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-3" color="blue darken-4" dark v-bind="attrs" v-on="on">
          Add Service
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-medical-bag</v-icon>Add Medical
          Service</v-card-title
        >
        <v-container fluid class="mx-auto">
          <v-row class="mx-4">
            <v-col cols="12">
              <v-autocomplete
                v-model="service_type"
                label="Service Type"
                :items="services"
                @change="(value) => initService(value)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="serviceable_type"
                label="Serviceable Type"
                :items="services_types.selected"
              ></v-autocomplete>
            </v-col>
            <!-- <v-col cols="12">
              <v-autocomplete
                v-model="doctor"
                label="Doctor in Charge"
                :items="doctor"
              ></v-autocomplete>
            </v-col> -->
            <v-col cols="6">
              <v-menu
                max-width="290"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                v-model="menu_1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate1"
                    v-on="on"
                    v-bind="attrs"
                    label="Scheduled Date"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="scheduled_date"
                  :min="minDate"
                  @input="menu_1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu_2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedTime1"
                    v-model="formattedTime1"
                    label="Scheduled Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="scheduled_time"
                  full-width
                  @click:minute="menu_2 = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="remarks" label="Remarks"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark class="blue darken-4" @click="submitForm()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    menu_1: false,
    menu_2: false,
    service_type: null,
    serviceable_type: null,
    scheduled_date: null,
    scheduled_time: null,
    remarks: null,
    services_types: {
      selected: null,
      laboratories: ["PCR", "RAPID ANTIGEN", "RAPID ANTIBODY", "OT"],
      diagnostics: ["X-RAY", "ULTRASOUND", "MAMMOGRAM"],
      consultations: ["OB", "PHYSICIAN", "CARDIOLOGY"],
    },
    services: ["CONSULTATION", "DIAGNOSTIC", "LABORATORY"],
    minDate: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    ...mapActions("services", ["addHospitalService"]),
    initService(service) {
      if (service === "CONSULTATION") {
        this.services_types.selected = this.services_types.consultations;
      } else if (service === "DIAGNOSTIC") {
        this.services_types.selected = this.services_types.diagnostics;
      } else if (service === "LABORATORY") {
        this.services_types.selected = this.services_types.laboratories;
      }
    },
    submitForm() {
      const id = this.$route.params.id;
      let data = {};
      if (this.service_type === "CONSULTATION") {
        data = {
          service_type: this.service_type,
          specialty: this.serviceable_type,
          scheduled_date: this.scheduled_date,
          scheduled_time: this.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: this.remarks,
        };
      } else if (this.service_type === "DIAGNOSTIC") {
        data = {
          service_type: this.service_type,
          diagnostic_type: this.serviceable_type,
          scheduled_date: this.scheduled_date,
          scheduled_time: this.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: this.remarks,
        };
      } else if (this.service_type === "LABORATORY") {
        data = {
          service_type: this.service_type,
          laboratory_type: this.serviceable_type,
          scheduled_date: this.scheduled_date,
          scheduled_time: this.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: this.remarks,
        };
      }

      return this.addHospitalService({
        id: id,
        data: data,
      })
        .then(() => {
          this.service_type = null;
          this.serviceable_type = null;
          this.scheduled_date = null;
          this.scheduled_time = null;
          this.remarks = null;
        })
        .catch((error) => {
          console.error(
            "Error in Adding Service in AddServiceDialog Component",
            error
          );
        })
        .finally(() => (this.dialog = false));
    },
  },
  computed: {
    formattedDate1() {
      return this.scheduled_date
        ? format(parseISO(this.scheduled_date), "MMMM d, yyyy")
        : "";
    },
    formattedTime1() {
      return this.scheduled_time
        ? format(parseISO(`${this.scheduled_date}T${this.scheduled_time}`), "h:mm a")
        : "";
    },
  },
};
</script>

<style></style>
