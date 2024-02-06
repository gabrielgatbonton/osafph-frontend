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
              :value="formattedDate_1"
              v-on="on"
              v-bind="attrs"
              label="Scheduled Date"
              readonly
              @blur="$v.payload.scheduled_date.$touch()"
              :error-messages="errorMessages.scheduled_date"
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
        <v-select
          :items="session_choices"
          label="Schedule Session"
          v-model="payload.scheduled_session"
          @blur="$v.payload.scheduled_session.$touch()"
          :error-messages="errorMessages.scheduled_session"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-menu
          max-width="290"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="menu_2"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedDate_2"
              v-on="on"
              v-bind="attrs"
              label="Date Released"
              readonly
              @blur="$v.payload.date_released.$touch()"
              :error-messages="errorMessages.date_released"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="payload.date_released"
            :min="minDate"
            @input="menu_2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="payload.status"
          label="Status"
          :items="statuses"
          @blur="$v.payload.status.$touch()"
          :error-messages="errorMessages.status"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="payload.remarks" label="Remarks"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditInputsMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/EditInputs";
import { format, parseISO } from "date-fns";
export default {
  name: "EditInputs",
  mixins: [EditInputsMixin],
  props: {
    hospitalService: {
      type: Object,
      required: false,
    },
    medical_sites: {
      type: Array,
      required: true,
    },
    dialysis_machines: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    payload: {
      status: null,
      remarks: null,
      scheduled_date: null,
      date_released: null,
      scheduled_session: null,
      hospital: null,
      dialysis_machine: null,
    },
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
    statuses: ["PENDING", "UNATTENDED", "COMPLETED"],
    menu_1: false,
    menu_2: false,
    minDate: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    touchValidations() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.pushToParent();
        this.$emit("validationSuccess", true);
        this.$v.$reset();
      }
    },
    resetValidations() {
      this.$v.$reset();
    },
    pushToParent() {
      this.$emit("payload", this.payload);
    },
    checkEditData() {
      if (this.hospitalService) {
        this.payload.hospital = this.hospitalService.hospitalService.hospital;
        this.payload.dialysis_machine =
          this.hospitalService.hospitalService.dialysis_machine.name;
        this.payload.scheduled_date =
          this.hospitalService.hospitalService.scheduled_date;
        this.payload.date_released =
          this.hospitalService.hospitalService.date_released;
        this.payload.scheduled_session =
          this.hospitalService.hospitalService.session;
        this.payload.status = this.hospitalService.hospitalService.status;
        this.payload.remarks = this.hospitalService.hospitalService.remarks;
      }
    },
  },
  computed: {
    formattedDate_1() {
      return this.payload.scheduled_date
        ? format(parseISO(this.payload.scheduled_date), "MMMM d, yyyy")
        : null;
    },
    formattedDate_2() {
      return this.payload.date_released
        ? format(parseISO(this.payload.date_released), "MMMM d, yyyy")
        : null;
    },
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
  mounted() {
    this.checkEditData();
  },
};
</script>

<style scoped></style>
