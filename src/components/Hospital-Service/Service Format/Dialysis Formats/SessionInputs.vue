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
              oninput="if(this.value < 1) this.value = 0;"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" label="Threshold Number"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="payload.total_sessions > 0">
        <div class="d-flex justify-center mb-3">
          <v-btn
            plain
            large
            color="grey darken-1"
            @click="trigger"
            :disabled="!payload.hospital"
            >Show Calendar
            <v-icon right>{{
              show_calendar ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon></v-btn
          >
        </div>
        <v-expand-transition>
          <DialysisCalendarComponent
            :hospital="payload.hospital"
            v-show="show_calendar"
            class="mb-3"
          />
        </v-expand-transition>
        <v-date-picker
          multiple
          v-model="selectedDates"
          :min="minDate"
          :disabled="disable"
          :landscape="landscape"
          full-width
          @input="appendDate"
        >
          <v-spacer></v-spacer>
          <v-btn @click="resetButton" color="blue darken-4" block dark
            >Clear</v-btn
          >
        </v-date-picker>
      </v-col>
      <v-col cols="12" v-if="selectedDates.length > 0">
        <v-row v-for="(session, index) in payload.schedule" :key="index">
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              :value="formattedDates[index]"
              readonly
              :label="`Scheduled Date ${index + 1}`"
            ></v-text-field>
          </v-col>
          <!--<v-menu
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
            </v-menu>-->
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="session.session"
              :label="`Session ${index + 1}`"
              :items="session_choices[index]"
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
import { mapActions, mapState } from "vuex";
import DialysisCalendarComponent from "@/components/Reusable Components/DialysisCalendarComponent.vue";
export default {
  name: "SessionInputs",
  mixins: [SessionInputsMixin],
  components: {
    DialysisCalendarComponent,
  },
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
    selectedDates: [],
    landscape: true,
    disable: false,
    payload: {
      hospital: "",
      // dialysis_items = [],
      dialysis_items: null,
      all_items_sponsored: false,
      dialysis_machine: null,
      total_sessions: null,
      schedule: [],
      all_sessions_sponsored: false,
    },
    session_choices: [],
    minDate: new Date().toISOString().slice(0, 10),
    stepper: 1,
    show_calendar: false,
  }),
  methods: {
    ...mapActions("dialysis_calendar", ["fetchDialysisCalendar"]),
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
      this.disable = false;
      this.selectedDates = [];
      this.payload.schedule.forEach((session, index) => {
        this.payload.schedule[index].session = null;
      });
    },

    appendDate(schedule) {
      schedule.forEach((date, index) => {
        this.payload.schedule[index].date = this.selectedDates[index];
      });
    },

    setupCalendarWatchers() {
      if (this.selectedDates.length !== this.payload.total_sessions) {
        this.disable = false;
      } else {
        this.disable = true;
      }

      if (this.selectedDates.length > 0) {
        this.updateScheduleDates();
      }
    },

    updateScheduleDates() {
      this.payload.schedule.forEach((session, index) => {
        if (session.date !== this.selectedDates[index]) {
          this.payload.schedule[index].date = this.selectedDates[index];
        }
      });
    },

    resetButton() {
      this.disable = false;
      this.selectedDates = [];
      this.payload.schedule.forEach((session, index) => {
        this.payload.schedule[index].date = null;
      });
      this.payload.schedule.forEach((session, index) => {
        this.payload.schedule[index].session = null;
      });
    },
    // setupSessionWatchers(schedule) {
    //   if (this.payload.total_sessions > 0) {
    //     schedule.forEach((session, index) => {
    //       this.$watch(
    //         () => this.payload.schedule[index].session,
    //         (newVal) => {
    //           this.updateOtherSessions(newVal, index);
    //         }
    //       );
    //     });
    //   }
    // },
    // updateOtherSessions(updatedSession, currentIndex) {
    //   if (this.payload.total_sessions > 0) {
    //     this.payload.schedule.forEach((session, index) => {
    //       if (index !== currentIndex && session.session !== updatedSession) {
    //         this.$set(this.payload.schedule, index, {
    //           ...session,
    //           session: updatedSession,
    //         });
    //       }
    //     });
    //   }
    // },
    setupDateWatchers(schedule) {
      if (this.payload.total_sessions > 0) {
        let dates = [];

        schedule.forEach((session) => {
          dates.push(session.date);
        });

        let params = {
          hospital: this.payload.hospital,
          dialysis_machine: this.payload.dialysis_machine,
          scheduled_dates: dates,
        };

        this.fetchDialysisCalendar(params).then(() => {
          this.setupSessionEnums(this.dialysis_calendar);
        });
      }
    },
    setupSessionEnums(schedule) {
      const dates = Object.keys(schedule);
      this.payload.schedule.forEach((session, index) => {
        const sessionDate = session.date;
        if (dates.includes(sessionDate)) {
          const sessions = schedule[sessionDate];
          let sessionEnum = [];

          // Ensure sessionEnum is initialized as an array
          if (!Array.isArray(sessionEnum)) {
            sessionEnum = [];
          }

          if (!sessions["dateIsFull"]) {
            Object.keys(sessions).forEach((sessionType) => {
              if (sessions[sessionType]) {
                if (!sessions[sessionType].sessionIsFull) {
                  sessionEnum.push(sessionType);
                }
              }
            });
          }

          this.$set(this.session_choices, index, sessionEnum);
        }
      });
    },
    trigger() {
      this.show_calendar = !this.show_calendar;
    },
  },
  computed: {
    ...mapState("dialysis_calendar", {
      dialysis_calendar: "dialysis_calendar",
    }),
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
        this.setupDateWatchers(newVal);
      },
      deep: true,
    },
    "payload.hospital": {
      handler(value) {
        if (!value) {
          this.show_calendar = false;
        }
      },
    },
    selectedDates: {
      handler() {
        this.setupCalendarWatchers();
      },
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

#labelSessions {
  font-size: 18px;
  margin-top: 20px;
}
</style>
