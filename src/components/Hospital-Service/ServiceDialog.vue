<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-medical-bag</v-icon
          >{{ hospitalService ? "Edit" : "Add" }} Medical Service</v-card-title
        >
        <v-container fluid class="py-8 mx-auto overflow-scroll">
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
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.hospital"
                label="Medical Site"
                :items="getHospitals"
                item-text="name"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.scheduled_date"
                label="Scheduled Date"
                hint="Format (January 04, 2023)"
              ></v-text-field>
              <!-- <v-menu
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
              </v-menu> -->
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.crowd_funding"
                label="Crowd Funding"
                :items="crowd_funding_choices"
              ></v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" v-if="hospitalService">
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
            </v-col> -->
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
            <v-col cols="12">
              <div class="text-right">
                <v-btn dark class="blue darken-4" @click="submitForm"
                  >Submit</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
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
      crowd_funding: null,
      remarks: null,
      hospital: null,
    },
    date_released: null,
    status: null,
    selects: {
      serviceable_type: null,
    },
    citizen_id: null,
    hospital_service_id: null,
    services_choices: null,
    hospital_choices: null,
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
    // filterDoctor(value) {
    //   const serviceable = this.services_choices.find(
    //     (serviceable) => serviceable.id === value
    //   );
    //   if (serviceable) {
    //     this.payload.serviceable_type = serviceable.name;
    //   }
    //   const data = this.getDoctors.find((doctor) => doctor.doctor_id === value);
    //   if (data) {
    //     this.doctor_choices = [data];
    //   }
    // },
    submitForm() {
      if (this.hospitalService) {
        //Attached the other variables to payload for updating service.
        this.payload.status = this.status;
        this.payload.date_released = this.date_released;
        this.payload.serviceable_type = this.selects.serviceable_type;

        this.$emit(
          "updateService",
          this.payload,
          this.citizen_id,
          this.hospital_service_id
        );
      } else {
        this.payload.serviceable_type = this.selects.serviceable_type;
        this.$emit("submitForm", this.payload);
      }
    },
  },
  computed: {
    ...mapGetters("services_choices", [
      "getHospitals",
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
        console.log("EDIT: ", value);
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
            this.selects.serviceable_type = serviceable.name;
          }
        }
        // this.payload.serviceable_type =
        //   value.hospitalService.serviceable_type_name;

        // const doctor = this.doctor_choices.find(
        //   (doctor) => doctor.doctor_id === value.hospitalService.doctor_id
        // );
        // if (doctor) {
        //   this.payload.doctor = doctor.doctor_id;
        // }
        this.payload.hospital = value.hospitalService.hospital;
        this.payload.scheduled_date = value.hospitalService.scheduled_date;
        this.payload.remarks = value.hospitalService.remarks;
        this.date_released = value.hospitalService.date_released;
        //Add Location Here
        this.status = value.hospitalService.status;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
</style>
