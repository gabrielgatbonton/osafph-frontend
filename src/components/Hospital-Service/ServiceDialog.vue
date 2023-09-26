<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-medical-bag</v-icon>Add Medical
          Service</v-card-title
        >
        <v-container fluid class="mx-auto">
          <v-row class="mx-4">
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.service_type"
                label="Service Type"
                :items="services"
                @change="(value) => initService(value)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="selects.serviceable_type"
                label="Serviceable Type"
                :items="services_choices"
                item-text="name"
                item-value="id"
                @change="(value) => filterDoctor(value)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.doctor"
                label="Doctor in Charge"
                :items="doctor_choices"
                item-text="full_name"
                item-value="doctor_id"
              ></v-autocomplete>
            </v-col>
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
                  v-model="payload.scheduled_date"
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
                  v-model="payload.scheduled_time"
                  full-width
                  @click:minute="menu_2 = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" v-if="hospitalService">
              <v-menu
                max-width="290"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                v-model="menu_3"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate2"
                    v-on="on"
                    v-bind="attrs"
                    label="Date Released"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_released"
                  :min="minDate"
                  @input="menu_3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" v-if="hospitalService">
              <v-menu
                v-model="menu_4"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedTime2"
                    v-model="formattedTime2"
                    label="Time Released"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="time_released"
                  full-width
                  @click:minute="menu_4 = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.remarks"
                label="Remarks"
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-if="hospitalService">
              <v-autocomplete
                v-model="status"
                label="Status"
                :items="statuses"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark class="blue darken-4" @click="submitForm">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Object,
      required: false,
    },
    hospitalService: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    menu_1: false,
    menu_2: false,
    menu_3: false,
    menu_4: false,
    payload: {
      service_type: null,
      serviceable_type: null,
      scheduled_date: null,
      scheduled_time: null,
      remarks: null,
      doctor: null,
    },
    date_released: null,
    time_released: null,
    status: null,
    selects: {
      serviceable_type: null,
    },
    citizen_id: null,
    hospital_service_id: null,
    services_choices: null,
    doctor_choices: null,
    services: ["CONSULTATION", "DIAGNOSTIC", "LABORATORY"],
    statuses: ["PENDING", "UNATTENDED", "COMPLETED"],
    minDate: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    ...mapActions("services_choices", ["fetchData"]),
    initService(service) {
      if (service === "CONSULTATION") {
        this.services_choices = this.getSpecialties;
      } else if (service === "DIAGNOSTIC") {
        this.services_choices = this.getDiagnosticTypes;
      } else if (service === "LABORATORY") {
        this.services_choices = this.getLaboratoryTypes;
      }
    },
    filterDoctor(value) {
      const serviceable = this.services_choices.find(
        (serviceable) => serviceable.id === value
      );
      if (serviceable) {
        this.payload.serviceable_type = serviceable.name;
      }
      const data = this.getDoctors.find((doctor) => doctor.doctor_id === value);
      if (data) {
        this.doctor_choices = [data];
      }
    },
    submitForm() {
      if (this.hospitalService) {
        //Attached the other variables to payload for updating service.
        this.payload.status = this.status;
        this.payload.time_released = this.time_released;
        this.payload.date_released = this.date_released;

        this.$emit(
          "updateService",
          this.payload,
          this.citizen_id,
          this.hospital_service_id
        );
      } else {
        this.$emit("submitForm", this.payload);
      }
    },
  },
  computed: {
    ...mapGetters("services_choices", [
      "getDoctors",
      "getSpecialties",
      "getLaboratoryTypes",
      "getDiagnosticTypes",
    ]),
    formattedDate1() {
      return this.payload.scheduled_date
        ? format(parseISO(this.payload.scheduled_date), "MMMM d, yyyy")
        : "";
    },
    formattedDate2() {
      return this.date_released
        ? format(parseISO(this.date_released), "MMMM d, yyyy")
        : "";
    },
    formattedTime1() {
      return this.payload.scheduled_time
        ? format(
            parseISO(
              `${this.payload.scheduled_date}T${this.payload.scheduled_time}`
            ),
            "h:mm a"
          )
        : "";
    },
    formattedTime2() {
      return this.time_released
        ? format(
            parseISO(`${this.date_released}T${this.time_released}`),
            "h:mm a"
          )
        : "";
    },
  },
  watch: {
    activator(newValue) {
      this.dialog = newValue;
    },
    //Reset for Adding
    reset(value) {
      this.payload = value;
      this.selects.serviceable_type = null;
    },
    dialog(value) {
      if (value === false) {
        this.$emit("dialogResponse", value);
      }
    },
    hospitalService(value) {
      if (value) {
        this.citizen_id = value.hospitalService.citizen_id;
        this.hospital_service_id = value.hospitalService.id;
        this.payload.service_type = value.hospitalService.service_type;
        this.initService(value.hospitalService.service_type);

        if (this.services_choices) {
          const serviceable = this.services_choices.find(
            (serviceable) =>
              serviceable.name === value.hospitalService.serviceable_type_name
          );
          if (serviceable) {
            this.selects.serviceable_type = serviceable.id;
            this.filterDoctor(serviceable.id);
          }
        }
        this.payload.serviceable_type =
          value.hospitalService.serviceable_type_name;

        const doctor = this.doctor_choices.find(
          (doctor) => doctor.doctor_id === value.hospitalService.doctor_id
        );
        if (doctor) {
          this.payload.doctor = doctor.doctor_id;
        }
        this.payload.scheduled_date = value.hospitalService.scheduled_date;
        this.payload.scheduled_time = value.hospitalService.scheduled_time;
        this.payload.remarks = value.hospitalService.remarks;
        this.date_released = value.hospitalService.date_released;
        this.time_released = value.hospitalService.time_released;
        this.status = value.hospitalService.status;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
