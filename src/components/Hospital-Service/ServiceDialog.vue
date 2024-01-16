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
            <GeneralFormat
              v-if="
                payload.service_type !== 'DIALYSIS' &&
                payload.service_type !== null
              "
              :services_choices="services_choices"
              :crowd_fundings="getCrowdFundings"
              :medical_sites="getHospitals"
              :hospitalService="hospitalService"
              v-on:payload="assignPayload"
            />
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
import { format, parse } from "date-fns";
import { mapActions, mapGetters } from "vuex";
import GeneralFormat from "./Service Format/GeneralFormat.vue";
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
    payload: {
      service_type: null,
    },
    citizen_id: null,
    hospital_service_id: null,
    services_choices: null,
    services: ["CONSULTATION", "DIAGNOSTIC", "LABORATORY", "DIALYSIS"],
    minDate: new Date().toISOString().slice(0, 10),
  }),
  components: {
    GeneralFormat,
  },
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
    assignPayload(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          this.payload[key] = payload[key];
        }
      }
      console.log("Passed Data", this.payload);
    },
    submitForm() {
      const parsedDate = parse(
        this.payload.scheduled_date,
        "MMMM dd, yyyy",
        new Date()
      );
      const parsedDate_2 = parse(
        this.payload.date_released,
        "MMMM dd, yyyy",
        new Date()
      );
      const formattedDate = format(parsedDate, "yyyy-MM-d");
      const formattedDate_2 = format(parsedDate_2, "yyyy-MM-d");

      if (this.hospitalService) {
        this.payload.scheduled_date = formattedDate;
        this.payload.date_released = formattedDate_2;
        this.$emit(
          "updateService",
          this.payload,
          this.citizen_id,
          this.hospital_service_id
        );
      } else {
        this.payload.scheduled_date = formattedDate;
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
      "getCrowdFundings",
    ]),
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
