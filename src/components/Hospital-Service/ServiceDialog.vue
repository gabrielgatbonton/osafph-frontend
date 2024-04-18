<template>
  <div>
    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-medical-bag</v-icon
          >{{ hospitalService ? "Edit" : "Add" }} Medical Service</v-card-title
        >
        <v-container fluid class="py-8 mx-auto overflow-scroll">
          <v-row
            :class="{
              'mx-1': $vuetify.breakpoint.xs,
              'mx-4': !$vuetify.breakpoint.xs,
            }"
          >
            <v-col cols="12">
              <v-autocomplete
                v-model="payload.service_type"
                label="Service Type"
                :items="service_types"
                item-text="name"
                @change="(value) => initService(value)"
                @blur="$v.payload.service_type.$touch()"
                :error-messages="errorMessages.service_type"
                :disabled="disabledValue"
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
              :disabled="disabledValue"
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
              :disabled="disabledValue"
              v-on:payload="assignPayload"
              v-on:validationSuccess="checkValidation"
              @submitForm="submitForm"
            />
            <v-col
              cols="12"
              v-if="
                (payload.service_type !== null &&
                  payload.service_type === 'DIALYSIS' &&
                  hospitalService) ||
                (payload.service_type !== 'DIALYSIS' &&
                  payload.service_type !== null)
              "
            >
              <v-btn
                dark
                block
                color="blue darken-4"
                :class="{ 'disabled-button': disabledValue }"
                @click="submitForm"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { format, parse } from "date-fns";
import { mapActions, mapState, mapGetters } from "vuex";
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
    ...mapActions("services_choices", ["fetchEnums"]),
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
    ...mapGetters("login", ["userRole"]),
    disabledValue() {
      let status = false;
      if (
        this.hospitalService &&
        this.hospitalService.data.status === "IN PROGRESS" &&
        this.userRole === "ENCODER"
      ) {
        status = true;
      }
      return status;
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
        console.log(value);
        this.citizen_id = value.data.citizen_id;
        this.hospital_service_id = value.data.id;
        this.payload.service_type = value.data.service_type;
        this.initService(value.data.service_type);
      }
    },
  },
  created() {
    this.fetchEnums();
  },
};
</script>

<style scoped>
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
</style>
