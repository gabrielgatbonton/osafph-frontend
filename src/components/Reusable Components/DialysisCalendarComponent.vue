<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col cols="12">
        <v-date-picker
          full-width
          reactive
          v-model="date"
          :events="calendar_events"
          event-color="primary"
        ></v-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-for="(session, index) in sessions" :key="index">
        <v-card elevation="1">
          <div class="d-flex justify-space-between pa-3">
            <div>{{ session.machine }}</div>
            <div>
              <div
                v-for="(avail, index) in session.available"
                :key="index"
                id="chips"
                :class="{
                  red: avail === 'MORNING',
                  blue: avail === 'NOON',
                  green: avail === 'AFTERNOON',
                }"
              ></div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "DialysisCalendarComponent",
  props: {
    hospital: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    date: new Date().toISOString().slice(0, 10),
    sessions: [],
  }),
  methods: {
    ...mapActions("dialysis_sessions", [
      "fetchDialysisMachineCalendar",
      "fetchDialysisMachineCalendarEvents",
    ]),
    fetchCalendar() {
      let params = {
        hospital: this.hospital,
        scheduled_date: this.date,
      };
      if (params) {
        this.fetchDialysisMachineCalendar(params).catch((error) => {
          console.error("Error mapping action: ", error);
        });
      }
    },
    fetchEvents() {
      let params = {
        hospital: this.hospital,
      };
      if (params) {
        this.fetchDialysisMachineCalendarEvents(params).catch((error) => {
          console.error("Error mapping action: ", error);
        });
      }
    },
    machineSessions(calendar) {
      const availableSessions = [];

      if (calendar) {
        const sessionDate = Object.keys(calendar);

        if (sessionDate.includes(this.date)) {
          sessionDate.forEach((sessionDate) => {
            const sessions = calendar[sessionDate];

            Object.keys(sessions).forEach((sessionType) => {
              const dialysisMachines = sessions[sessionType];

              dialysisMachines.forEach((machine) => {
                const existingMachine = availableSessions.find(
                  (item) => item.machine === machine
                );
                if (existingMachine) {
                  if (!existingMachine.available.includes(sessionType)) {
                    existingMachine.available.push(sessionType);
                  }
                } else {
                  availableSessions.push({
                    machine: machine,
                    available: [sessionType],
                  });
                }
              });
            });
          });
        }
      }
      this.sessions = availableSessions;
    },
  },
  computed: {
    ...mapState("dialysis_sessions", {
      calendar: "dialysis_machine_calendar",
    }),
    ...mapGetters("dialysis_sessions", {
        calendar_events: "getCalendarEvents",
    }),
  },
  watch: {
    date: {
      handler() {
        this.fetchCalendar();
      },
    },
    calendar: {
      handler(value) {
        this.machineSessions(value);
      },
    },
    hospital: {
      immediate: true,
      handler() {
        this.fetchEvents();
      },
    },
    calendar_events: {
      handler(value) {
        console.log("Check", value);
      },
    },
  },
};
</script>

<style scoped>
#chips {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 0.2rem;
}
</style>
