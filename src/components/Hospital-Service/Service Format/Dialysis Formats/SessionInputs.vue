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
          item-value="package_name"
          @blur="$v.payload.dialysis_items.$touch()"
          :error-messages="errorMessages.dialysis_items"
        >
          <template v-slot:item="{ item }">
            <div id="d-flex flex-column justify-start align-start">
              <div>{{ item.package_name }}</div>
              <div class="packages-description">
                <span
                  v-for="(dialysisItem, index) in item.dialysis_items"
                  :key="index"
                >
                  {{ dialysisItem
                  }}{{ index < item.dialysis_items.length - 1 ? ", " : "" }}
                </span>
              </div>
            </div>
          </template>
        </v-select>
      </v-col>
      <!-- multiple and chips ^ -->
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
                  @blur="$v.payload.schedule.$each.$iter[index].date.$touch()"
                  :error-messages="errorMessages.schedule_date[index]"
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
              @blur="$v.payload.schedule.$each.$iter[index].session.$touch()"
              :error-messages="errorMessages.schedule_session[index]"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-btn color="blue darken-4" block dark @click="touchValidations"
          >Proceed</v-btn
        >
      </v-col>
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
    medical_sites: {
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
      hospital: null,
      // dialysis_items = [],
      dialysis_items: null,
      all_items_sponsored: false,
      dialysis_machine: null,
      total_sessions: null,
      schedule: [],
      all_sessions_sponsored: false,
    },
    menu: false,
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
    minDate: new Date().toISOString().slice(0, 10),
    stepper: 1,
  }),
  methods: {
    touchValidations() {

      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.pushToParent();
        this.$emit("validationSuccess", true);
        this.$v.$reset();
        this.$emit("stepper", (this.stepper = 2));
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
    // errorMessagesDate() {
    //   // // Loop through each session in the schedule array
    //   // this.payload.schedule.forEach((session, index) => {
    //   //   errors[index] = []; // Initialize error array for each session

    //   //   console.log(this.$v.payload.schedule[index].date.$error);
    //   //   console.log(session.date === null);
    //   //   // Check if the session date is null and the field is touched
    //   //   if (
    //   //     this.$v.payload.schedule[index].date.$error &&
    //   //     session.date === null
    //   //   ) {
    //   //     errors[index].push("Date is required for this session");
    //   //   }
    //   // });

    //   return this.payload.schedule.map((session) => {
    //     return session.date !== null
    //       ? ""
    //       : "Date is required for this session";
    //   });
    // },
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

<style scoped>
.packages-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
</style>