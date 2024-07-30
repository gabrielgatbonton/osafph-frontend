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
          :disabled="disabled"
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
          :disabled="disabled"
        ></v-autocomplete>
      </v-col>
      <!-- <v-col cols="12" v-if="type !== 'CONSULTATION'">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Funding"
          :items="crowd_fundings"
          item-text="name"
          :disabled="disabled"
        >
          <template v-slot:item="{ item }" v-if="funderPermission">
            <div class="d-flex flex-column">
              <div>{{ item.name }}</div>
              <div class="item-description">
                Amount: {{ item.contribution_left }} /
                {{ item.initial_contribution }}
              </div>
            </div>
          </template>
        </v-autocomplete>
      </v-col> -->
      <v-col cols="12">
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
              :disabled="disabled"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="payload.scheduled_date"
            :min="minDate"
            @input="menu_1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" v-if="hospitalService">
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
              :disabled="disabled"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="payload.date_released"
            :min="minDate"
            @input="menu_2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="payload.remarks"
          label="Remarks"
          @blur="$v.payload.remarks.$touch()"
          :error-messages="errorMessages.remarks"
          :disabled="disabled"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.status"
          label="Status"
          :items="statuses"
          @blur="$v.payload.status.$touch()"
          :error-messages="errorMessages.status"
          :disabled="disabled"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import GeneralFormatMixin from "@/mixins/Validation/ServiceRequestValidation/GeneralFormat";
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
    disabled: {
      type: Boolean,
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
    menu_1: false,
    menu_2: false,
    minDate: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    touchValidations() {
      this.$v.$touch(); // Touch the validations in GeneralFormat component
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
              this.hospitalService.data.serviceable_type_name
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
          this.hospitalService.data.crowd_funding_backer;
        this.payload.hospital = this.hospitalService.data.hospital;
        this.payload.scheduled_date = this.hospitalService.data.scheduled_date;
        this.payload.remarks = this.hospitalService.data.remarks;
        this.date_released = this.hospitalService.data.date_released;
        this.payload.status = this.hospitalService.data.status;
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
    userRole: function () {
      return this.$auth.role();
    },
    statuses() {
      let statuses = [];
      if (this.disabled) {
        statuses = [
          "PENDING",
          "UNATTENDED",
          "COMPLETED",
          "IN PROGRESS",
          "WALK-IN",
        ];
      } else if (!this.hospitalService) {
        statuses = ["PENDING", "WALK-IN"];
      } else {
        statuses = ["PENDING", "UNATTENDED", "COMPLETED", "WALK-IN"];
      }
      return statuses;
    },
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
    funderPermission() {
      return this.userRole === "ADMIN" || this.userRole === "ROOT";
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

<style scoped>
.item-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
</style>
