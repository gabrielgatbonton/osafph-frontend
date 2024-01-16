<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="selects.serviceable_type"
          label="Serviceable Type"
          :items="services_choices"
          item-text="name"
          @input="pushToParent"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.hospital"
          label="Medical Site"
          :items="medical_sites"
          item-text="name"
          @input="pushToParent"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.crowd_funding"
          label="Crowd Funding"
          :items="crowd_fundings"
          item-text="backer"
          @input="pushToParent"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="payload.scheduled_date"
          label="Scheduled Date"
          hint="Format (January 04, 2023)"
          @input="pushToParent"
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-if="hospitalService">
        <v-text-field
          v-model="date_released"
          label="Date Released"
          hint="Format (January 04, 2023)"
          @input="pushToParent"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="payload.remarks"
          label="Remarks"
          @input="pushToParent"
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
</template>

<script>
import { format, parseISO } from "date-fns";
export default {
  name: "GeneralFormat",
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
  },
  data: () => ({
    payload: {
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
    statuses: ["PENDING", "UNATTENDED", "COMPLETED"],
  }),
  methods: {
    pushToParent() {
      //Parse the String to format the date needed.
      if (this.hospitalService) {
        this.payload.status = this.status;
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
        this.payload.crowd_funding =
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
        this.status = this.hospitalService.hospitalService.status;
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
  mounted() {
    this.checkEditData();
  },
};
</script>

<style scoped></style>
