<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="selects.serviceable_type"
          label="Specialty"
          :items="services_choices"
          item-text="name"
          @blur="$v.selects.serviceable_type.$touch()"
          :error-messages="errorMessages.serviceable_type"
        ></v-autocomplete>
      </v-col>
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
      <v-col cols="12" v-if="type !== 'CONSULTATION'">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Crowd Funding"
          :items="crowd_fundings"
          item-text="backer"
          @blur="$v.payload.crowd_funding_backer.$touch()"
          :error-messages="errorMessages.crowd_funding_backer"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="payload.scheduled_date"
          label="Scheduled Date"
          hint="Format (January 04, 2023)"
          @blur="$v.payload.scheduled_date.$touch()"
          :error-messages="errorMessages.scheduled_date"
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-if="hospitalService">
        <v-text-field
          v-model="date_released"
          label="Date Released"
          hint="Format (January 04, 2023)"
          @blur="$v.date_released.$touch()"
          :error-messages="errorMessages.date_released"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="payload.remarks"
          label="Remarks"
          @blur="$v.payload.remarks.$touch()"
          :error-messages="errorMessages.remarks"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.status"
          label="Status"
          :items="statuses"
          @blur="$v.payload.status.$touch()"
          :error-messages="errorMessages.status"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import GeneralFormatMixin from "@/mixins/ServiceRequestValidation/GeneralFormat";
export default {
  name: "GeneralFormat",
  mixins: [GeneralFormatMixin],
  props: {
    services_choices: {
      type: Array,
      required: true,
    },
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
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    payload: {
      serviceable_type: null,
      scheduled_date: null,
      crowd_funding_backer: null,
      remarks: null,
      hospital: null,
      status: null,
    },
    date_released: null,
    selects: {
      serviceable_type: null,
    },
  }),
  methods: {
    touchValidations() {
      this.$v.$touch(); // Touch the validations in GeneralFormat component
      if (!this.$v.$invalid) {
        this.pushToParent();
        this.$emit("touchValidationsSuccess");
      }
    },
    pushToParent() {
      //Parse the String to format the date needed.
      if (this.hospitalService) {
        this.payload.date_released = this.date_released;
        this.payload.serviceable_type = this.selects.serviceable_type;
        this.$emit("payload", this.payload);
      } else {
        this.payload.serviceable_type = this.selects.serviceable_type;
        this.$emit("payload", this.payload);
      }
    },
    checkEditData() {
      if (this.hospitalService) {
        if (this.services_choices) {
          const serviceable = this.services_choices.find(
            (serviceable) =>
              serviceable.name ===
              this.hospitalService.hospitalService.serviceable_type_name
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
        this.payload.crowd_funding_backer =
          this.hospitalService.hospitalService.crowd_funding_backer;
        this.payload.hospital = this.hospitalService.hospitalService.hospital;
        this.payload.scheduled_date = format(
          parseISO(this.hospitalService.hospitalService.scheduled_date),
          "MMMM d, yyyy"
        );
        this.payload.remarks = this.hospitalService.hospitalService.remarks;
        this.date_released = this.hospitalService.hospitalService.date_released
          ? format(
              parseISO(this.hospitalService.hospitalService.date_released),
              "MMMM d, yyyy"
            )
          : null;
        this.payload.status = this.hospitalService.hospitalService.status;
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
  },
  computed: {
    statuses() {
      return this.hospitalService
        ? ["UNATTENDED", "COMPLETED"]
        : ["PENDING", "WALK-IN"];
    },
  },
  mounted() {
    this.checkEditData();
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
};
</script>

<style scoped></style>
