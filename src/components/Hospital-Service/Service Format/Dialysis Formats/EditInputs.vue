<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="payload.scheduled_date"
          label="Scheduled Date"
          hint="Format (January 04, 2023)"
          @blur="$v.payload.scheduled_date.$touch()"
          :error-messages="errorMessages.scheduled_date"
        ></v-text-field>
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
        <v-text-field
          v-model="payload.date_released"
          label="Date Released"
          hint="Format (January 04, 2023)"
          @blur="$v.payload.date_released.$touch()"
          :error-messages="errorMessages.date_released"
        ></v-text-field>
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
  },
  data: () => ({
    payload: {
      status: null,
      remarks: null,
      scheduled_date: null,
      date_released: null,
      scheduled_session: null,
    },
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
    statuses: ["PENDING", "UNATTENDED", "COMPLETED"],
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
        this.payload.scheduled_date = format(
          parseISO(this.hospitalService.hospitalService.scheduled_date),
          "MMMM dd, yyyy"
        );
        this.payload.date_released = this.hospitalService.hospitalService
          .date_released
          ? format(
              parseISO(this.hospitalService.hospitalService.date_released),
              "MMMM dd, yyyy"
            )
          : null;
        this.payload.scheduled_session =
          this.hospitalService.hospitalService.session;
        this.payload.status = this.hospitalService.hospitalService.status;
        this.payload.remarks = this.hospitalService.hospitalService.remarks;
      }
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
