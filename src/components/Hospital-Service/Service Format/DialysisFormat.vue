<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.hospital"
          label="Medical Site"
          :items="medical_sites"
          item-text="name"
          @blur="$v.payload.hospital.$touch()"
          :error-messages="errorMessages.hospital"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.dialysis_machine"
          label="Dialysis Machine"
          :items="dialysis_machines"
          item-text="name"
          @blur="$v.payload.dialysis_machine.$touch()"
          :error-messages="errorMessages.dialysis_machine"
        ></v-autocomplete>
      </v-col>
      <CreateInputs
        v-if="!hospitalService && dialysis_packages"
        :crowd_fundings="crowd_fundings"
        :dialysis_packages="dialysis_packages"
        @payload="assignPayload"
        @validationSuccess="checkValidation"
        ref="createInputs"
      />
      <EditInputs
        v-if="hospitalService"
        :hospitalService="hospitalService"
        @payload="assignPayload"
        @validationSuccess="checkValidation"
        ref="editInputs"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DialysisFormatMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/DialysisFormat";
import CreateInputs from "./Dialysis Formats/CreateInputs.vue";
import EditInputs from "./Dialysis Formats/EditInputs.vue";
export default {
  name: "DialysisFormat",
  mixins: [DialysisFormatMixin],
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
    CreateInputs,
    EditInputs,
  },
  data: () => ({
    payload: {
      hospital: null,
      dialysis_machine: null,
    },
    validation: false,
  }),
  methods: {
    ...mapActions("dialysis", ["fetchEnums"]),
    touchValidations() {
      this.$v.$touch();

      if (!this.hospitalService) {
        this.$refs.createInputs.touchValidations();
      } else {
        this.$refs.editInputs.touchValidations();
      }

      if (!this.$v.$invalid && this.validation) {
        this.pushToParent();
        this.$emit("validationSuccess", true);
        this.resetValidations();
      }
    },
    resetValidations() {
      this.$v.$reset();
      this.validation = false;

      if (!this.hospitalService) {
        this.$refs.createInputs.resetValidations();
      } else {
        this.$refs.editInputs.resetValidations();
      }
    },
    assignPayload(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          this.payload[key] = payload[key];
        }
      }
    },
    pushToParent() {
      this.$emit("payload", this.payload);
    },
    checkValidation(value) {
      this.validation = value;
    },
    checkEditData() {
      if (this.hospitalService) {
        this.payload.hospital = this.hospitalService.hospitalService.hospital;
        this.payload.dialysis_machine =
          this.hospitalService.hospitalService.dialysis_machine.name;
      }
    },
  },
  computed: {
    ...mapState("dialysis", ["dialysis_machines", "dialysis_packages"]),
  },
  watch: {
    hospitalService: {
      handler(newVal) {
        if (newVal) {
          this.checkEditData();
        }
      },
      deep: true,
    },
  },
  created() {
    this.fetchEnums();
  },
  mounted() {
    this.checkEditData();
  },
};
</script>

<style scoped></style>
