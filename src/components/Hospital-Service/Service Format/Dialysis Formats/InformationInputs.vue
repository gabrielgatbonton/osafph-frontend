<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Funding"
          :items="crowd_fundings"
          item-text="backer"
        >
          <template v-slot:item="{ item }" v-if="userRole === 'ADMIN'">
            <div class="d-flex flex-column">
              <div>{{ item.backer }}</div>
              <div class="item-description">
                Amount: {{ item.contribution }}
              </div>
            </div>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="summary">
      <v-col cols="12" align-self="center">
        <div class="text-h6 text-center">Information Summary</div>
        <v-row class="mt-5">
          <v-col cols="6">
            <div>Medical Site:</div>
          </v-col>
          <v-col cols="6">
            {{ summary.hospital }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div>Package & Items:</div>
          </v-col>
          <v-col cols="6"> {{ summary.dialysis_items }} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div>Dialysis Machine:</div>
          </v-col>
          <v-col cols="6"> {{ summary.dialysis_machine }} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div>Total Sessions:</div>
          </v-col>
          <v-col cols="6"> {{ summary.total_sessions }} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div>Scheduled Dates:</div>
          </v-col>
          <v-col cols="6">
            <div v-for="(schedule, index) in summary.schedule" :key="index">
              {{ schedule.date }}, {{ schedule.session }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" align-self="center">
        <v-btn
          block
          dark
          color="blue darken-4"
          :loading="loading"
          @click="submitForm"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import InformationInputsMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/InformationInputs";
import { mapGetters } from "vuex";
export default {
  name: "InformationInputs",
  mixins: [InformationInputsMixin],
  props: {
    crowd_fundings: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    payload: {
      crowd_funding_backer: null,
    },
    loading: false,
  }),
  methods: {
    touchValidations() {
      return new Promise((resolve, reject) => {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.pushToParent();
          this.$emit("validationSuccess", true);
          resolve("Success"); // Resolve the Promise if validations pass
        } else {
          reject("Validation failed"); // Reject the Promise if validations fail
        }
      });
    },
    submitForm() {
      this.loading = true;
      this.touchValidations()
        .then(() => {
          this.$emit("submitForm");
        })
        .catch((error) => {
          console.error("Error Submitting Dialysis Add", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetValidations() {
      this.$v.$reset();
    },
    pushToParent() {
      this.$emit("payload", this.payload);
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    summary() {
      if (this.data)
        return {
          hospital: this.data.hospital,
          dialysis_items: this.data.dialysis_items,
          dialysis_machine: this.data.dialysis_machine,
          total_sessions: this.data.total_sessions,
          schedule: this.data.schedule
            ? this.data.schedule.map((item) => ({
                date: format(parseISO(item.date), "MMMM dd, yyyy"),
                session: item.session,
              }))
            : null,
        };
      return {};
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
