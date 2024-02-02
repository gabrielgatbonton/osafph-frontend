<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Funding"
          :items="crowd_fundings"
          item-text="backer"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="payload.all_items_sponsored"
          label="Items included are sponsored by Funding"
          @change="pushToParent"
        ></v-checkbox>
        <v-select
          v-model="payload.dialysis_items"
          label="Select Packages to avail"
          :items="dialysis_packages"
          item-text="package_name"
          @blur="$v.payload.dialysis_items.$touch()"
          :error-messages="errorMessages.dialysis_items"
        ></v-select>
      </v-col>
      <!-- multiple and chips ^ -->
      <v-col cols="12">
        <v-checkbox
          v-model="payload.all_sessions_sponsored"
          label="Sessions sponsored by Funding"
          @change="pushToParent"
        ></v-checkbox>
        <v-text-field
          type="number"
          v-model="payload.total_sessions"
          label="Total Sessions"
          @input="updateSessions"
          @blur="$v.payload.total_sessions.$touch()"
          :error-messages="errorMessages.total_sessions"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-row v-for="(session, index) in payload.schedule" :key="index">
          <v-col cols="6">
            <v-text-field
              v-model="session.date"
              :label="`Schedule Date ${index + 1}`"
              hint="Format (January 04, 2023)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="session.session"
              :label="`Session ${index + 1}`"
              :items="session_choices"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateInputsMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/CreateInputs";
export default {
  name: "CreateInputs",
  mixins: [CreateInputsMixin],
  props: {
    crowd_fundings: {
      type: Array,
      required: true,
    },
    dialysis_packages: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    payload: {
      crowd_funding_backer: null,
      total_sessions: null,
      schedule: [],
      // dialysis_items = [],
      dialysis_items: null,
      all_items_sponsored: false,
      all_sessions_sponsored: false,
    },
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
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
    updateSessions() {
      // Update sessionArray based on the number of sessions
      this.payload.total_sessions = Number(this.payload.total_sessions);
      this.payload.schedule = Array.from(
        { length: this.payload.total_sessions },
        (_, index) =>
          this.payload.schedule[index] || { date: null, session: null }
      );
    },
    setupSessionWatchers(schedule) {
      if (this.payload.total_sessions > 0) {
        schedule.forEach((session, index) => {
          this.$watch(
            () => this.payload.schedule[index].session,
            (newVal) => {
              this.updateOtherSessions(newVal, index);
            }
          );
        });
      }
    },
    updateOtherSessions(updatedSession, currentIndex) {
      if (this.payload.total_sessions > 0) {
        this.payload.schedule.forEach((session, index) => {
          if (index !== currentIndex && session.session !== updatedSession) {
            this.$set(this.payload.schedule, index, {
              ...session,
              session: updatedSession,
            });
          }
        });
      }
    },
  },
  watch: {
    "payload.schedule": {
      handler(newVal) {
        this.setupSessionWatchers(newVal);
      },
      deep: true,
    },
    dialysis_packages: {
      handler(value) {
        console.log("CreateInputs", value);
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
