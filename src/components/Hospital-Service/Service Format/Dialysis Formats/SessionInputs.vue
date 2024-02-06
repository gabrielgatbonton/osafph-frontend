<template>
  <v-container fluid class="mx-auto">
    <v-row>
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
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="12">
            <v-checkbox
              v-model="payload.all_sessions_sponsored"
              label="Sessions sponsored by Funding"
              @change="pushToParent"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col cols="8">
            <v-text-field
              type="number"
              v-model="payload.total_sessions"
              label="Total Sessions"
              @input="updateSessions"
              @blur="$v.payload.total_sessions.$touch()"
              :error-messages="errorMessages.total_sessions"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" label="Threshold Number"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="payload.schedule.length > 0">
        <v-row v-for="(session, index) in payload.schedule" :key="index">
          <v-col cols="6">
            <v-menu
              max-width="290"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
              v-model="session.menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDates[index]"
                  v-on="on"
                  v-bind="attrs"
                  :label="`Scheduled Date ${index + 1}`"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="session.date"
                :min="minDate"
                @input="session.menu = false"
              ></v-date-picker>
            </v-menu>
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
      <!-- <v-col cols="12">
        <v-btn color="blue darken-4" @click="pushToParent">Test</v-btn>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import SessionInputsMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/SessionInputs";
export default {
  name: "SessionInputs",
  mixins: [SessionInputsMixin],
  props: {
    dialysis_machines: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    payload: {
      dialysis_machine: null,
      total_sessions: null,
      schedule: [],
      all_sessions_sponsored: false,
    },
    menu: false,
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
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
      this.payload.schedule.forEach((session) => {
        delete session.menu;
      });
      this.$emit("payload", this.payload);
    },
    updateSessions() {
      // Update sessionArray based on the number of sessions
      this.payload.total_sessions = Number(this.payload.total_sessions);
      this.payload.schedule = Array.from(
        { length: this.payload.total_sessions },
        (_, index) =>
          this.payload.schedule[index] || {
            date: null,
            session: null,
            menu: false,
          }
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
  computed: {
    formattedDates() {
      return this.payload.schedule.map((session) => {
        return session.date
          ? format(parseISO(session.date), "MMMM d, yyyy")
          : null;
      });
    },
  },
  watch: {
    "payload.schedule": {
      handler(newVal) {
        this.setupSessionWatchers(newVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
