<template>
  <v-container fluid class="mx-auto">
    <v-row
      justify="center"
      v-if="!hospitalService && dialysis_machines && dialysis_packages"
    >
      <v-col cols="12" class="px-0">
        <v-stepper flat v-model="stepper" non-linear>
          <v-stepper-header class="elevation-0">
            <v-stepper-step step="1" editable :complete="stepper > 1">
              Sessions
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" editable>
              Insights & Funding
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="px-0">
              <SessionInputs
                :medical_sites="medical_sites"
                :dialysis_packages="dialysis_packages"
                :dialysis_machines="dialysis_machines"
                @validationSuccess="checkValidationSession"
                @payload="assignPayload"
                @stepper="updateStepper"
                ref="sessionInputs"
              />
            </v-stepper-content>
            <v-stepper-content step="2" class="px-0">
              <InformationInputs
                :data="payload"
                :crowd_fundings="crowd_fundings"
                ref="informationInputs"
                @validationSuccess="checkValidationInformation"
                @payload="assignPayload"
                @submitForm="$emit('submitForm')"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>

      <!-- <v-col cols="12">
        <v-tabs centered grow>
          <v-tab>Information</v-tab>
          <v-tab>Sessions</v-tab>
          <v-tab-item eager>
            <InformationInputs
              v-if="!hospitalService && dialysis_packages"
              :crowd_fundings="crowd_fundings"
              :medical_sites="medical_sites"
              :dialysis_packages="dialysis_packages"
              ref="informationInputs"
              @validationSuccess="checkValidationInformation"
              @payload="assignPayload"
            />
          </v-tab-item>
          <v-tab-item eager>
            <SessionInputs
              :dialysis_machines="dialysis_machines"
              @validationSuccess="checkValidationSession"
              @payload="assignPayload"
              ref="sessionInputs"
            />
          </v-tab-item>
        </v-tabs>
      </v-col> -->
    </v-row>
    <v-row v-if="hospitalService && dialysis_machines">
      <v-col cols="12" class="px-0">
        <EditInputs
          :hospitalService="hospitalService"
          :medical_sites="medical_sites"
          :dialysis_machines="dialysis_machines"
          @payload="assignPayload"
          @validationSuccess="checkValidationEdit"
          ref="editInputs"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EditInputs from "./Dialysis Formats/EditInputs.vue";
import InformationInputs from "./Dialysis Formats/InformationInputs.vue";
import SessionInputs from "./Dialysis Formats/SessionInputs.vue";
export default {
  name: "DialysisFormat",
  props: {
    crowd_fundings: {
      type: Array,
      required: true,
    },
    medical_sites: {
      type: Array,
      required: true,
    },
    hospitalService: {
      type: Object,
      required: false,
    },
  },
  components: {
    EditInputs,
    InformationInputs,
    SessionInputs,
  },
  data: () => ({
    payload: {},
    validation_1: false,
    validation_2: false,
    validation_edit: false,
    stepper: 1,
  }),
  methods: {
    ...mapActions("dialysis", ["fetchEnums"]),
    touchValidations() {
      if (!this.hospitalService) {
        this.$refs.informationInputs.touchValidations();
        this.$refs.sessionInputs.touchValidations();
      } else {
        this.$refs.editInputs.touchValidations();
      }

      if ((this.validation_1 && this.validation_2) || this.validation_edit) {
        this.pushToParent();
        this.$emit("validationSuccess", true);
        this.resetValidations();
      }
    },
    resetValidations() {
      this.validation_1 = false;
      this.validation_2 = false;
      this.validation_edit = false;

      if (!this.hospitalService) {
        this.$refs.informationInputs.resetValidations();
        this.$refs.sessionInputs.resetValidations();
      } else {
        this.$refs.editInputs.resetValidations();
      }
    },
    assignPayload(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          // Use this.$set to add reactive properties
          this.$set(this.payload, key, payload[key]);
        }
      }
    },
    pushToParent() {
      this.$emit("payload", this.payload);
    },
    checkValidationInformation(value) {
      this.validation_1 = value;
    },
    checkValidationSession(value) {
      this.validation_2 = value;
    },
    checkValidationEdit(value) {
      this.validation_edit = value;
    },
    updateStepper(stepper) {
      this.stepper = stepper;
    },
  },
  computed: {
    ...mapState("dialysis", ["dialysis_machines", "dialysis_packages"]),
  },
  created() {
    this.fetchEnums();
  },
};
</script>

<style scoped></style>
