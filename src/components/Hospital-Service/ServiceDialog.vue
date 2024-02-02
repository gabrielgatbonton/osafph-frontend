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
                :items="service_types"
                item-text="name"
                @change="(value) => initService(value)"
                @blur="$v.payload.service_type.$touch()"
                :error-messages="errorMessages.service_type"
              ></v-autocomplete>
            </v-col>
            <GeneralFormat
              v-if="
                payload.service_type !== 'DIALYSIS' &&
                payload.service_type !== null
              "
              ref="generalFormat"
              :services_choices="services_choices"
              :crowd_fundings="crowd_fundings"
              :medical_sites="hospitals"
              :hospitalService="hospitalService"
              :type="payload.service_type"
              v-on:payload="assignPayload"
              v-on:validationSuccess="checkValidation"
            />
            <DialysisFormat
              v-if="
                payload.service_type === 'DIALYSIS' &&
                payload.service_type !== null
              "
              ref="dialysisFormat"
              :crowd_fundings="crowd_fundings"
              :hospitalService="hospitalService"
              :medical_sites="hospitals"
              v-on:payload="assignPayload"
              v-on:validationSuccess="checkValidation"
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
// import { format, parse } from "date-fns";
import { mapActions, mapState } from "vuex";
import GeneralFormat from "./Service Format/GeneralFormat.vue";
import DialysisFormat from "./Service Format/DialysisFormat.vue";
import ServiceDialogMixin from "../../mixins/Validation/ServiceRequestValidation/ServiceDialog";
export default {
  mixins: [ServiceDialogMixin],
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
    validation: false,
    minDate: new Date().toISOString().slice(0, 10),
  }),
  components: {
    GeneralFormat,
    DialysisFormat,
  },
  methods: {
    ...mapActions("services_choices", ["fetchData"]),
    initService(service) {
      if (service === "CONSULTATION") {
        this.services_choices = this.specialties;
      } else if (service === "DIAGNOSTIC") {
        this.services_choices = this.diagnostic_types;
      } else if (service === "LABORATORY") {
        this.services_choices = this.laboratory_types;
      }
    },
    assignPayload(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          this.payload[key] = payload[key];
        }
      }
      // console.log("Passed Data", this.payload);
    },
    submitForm() {
      if (this.hospitalService) {
        this.$v.$touch();

        if (this.payload.service_type !== "DIALYSIS") {
          // Call the touchValidations method in the child component
          this.$refs.generalFormat.touchValidations();
        } else {
          this.$refs.dialysisFormat.touchValidations();
        }

        if (!this.$v.$invalid && this.validation) {
          this.$emit(
            "updateService",
            this.payload,
            this.citizen_id,
            this.hospital_service_id
          );
          this.validation = false;
          this.$v.$reset();
        }
      } else {
        this.$v.$touch();

        if (this.payload.service_type !== "DIALYSIS") {
          // Call the touchValidations method in the child component
          this.$refs.generalFormat.touchValidations();
        } else {
          this.$refs.dialysisFormat.touchValidations();
        }

        if (!this.$v.$invalid && this.validation) {
          this.$emit("submitForm", this.payload);
          this.validation = false;
          this.$v.$reset();
        }
      }
    },
    checkValidation(value) {
      this.validation = value;
    },
  },
  computed: {
    ...mapState("services_choices", [
      "service_types",
      "specialties",
      "laboratory_types",
      "diagnostic_types",
      "hospitals",
      "crowd_fundings",
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
        this.$v.$reset();
        //Reset Validations prior closing.
        if (
          this.payload.service_type !== null &&
          this.payload.service_type !== "DIALYSIS"
        ) {
          this.$refs.generalFormat.resetValidations();
        } else if (
          this.payload.service_type !== null &&
          this.payload.service_type === "DIALYSIS"
        ) {
          this.$refs.dialysisFormat.resetValidations();
        }

        //Emit Update to Parent Component
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
