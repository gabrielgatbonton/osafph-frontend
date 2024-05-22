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
      <v-col cols="12">
        <div class="d-flex justify-start align-center">
          <div
            class="d-flex justify-start align-center mr-5"
            v-for="(data, index) in labelData"
            :key="index"
          >
            <div id="chips" :class="data.color" class="mr-2"></div>
            <div>{{ data.label }}</div>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-h6">Reserved Machines</div>
      </v-col>
      <v-col cols="12" md="6" v-for="(session, index) in machine_sessions" :key="index">
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
      <v-col cols="12">
        <v-divider></v-divider>
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
    ...mapActions("dialysis_calendar", [
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
    fetchEvents(hospital) {
      let params = {
        hospital: hospital,
      };
      if (params) {
        this.fetchDialysisMachineCalendarEvents(params).catch((error) => {
          console.error("Error mapping action: ", error);
        });
      }
    },
  },
  computed: {
    ...mapState("dialysis_calendar", {
      calendar: "dialysis_machine_calendar",
    }),
    ...mapGetters("dialysis_calendar", {
      calendar_events: "getCalendarEvents",
      machine_sessions: "getMachineSessions",
    }),
    labelData() {
      let data = [
        {
          label: "Morning",
          color: this.colorData.morning,
        },
        {
          label: "Noon",
          color: this.colorData.noon,
        },
        {
          label: "Afternoon",
          color: this.colorData.afternoon,
        },
      ];
      return data;
    },
    colorData() {
      return {
        morning: "red",
        noon: "blue",
        afternoon: "green",
      };
    },
  },
  watch: {
    date: {
      immediate: true,
      handler() {
        this.fetchCalendar();
      },
    },
    hospital: {
      immediate: true,
      handler(value) {
        if (value) this.fetchEvents(value);
        this.fetchCalendar();
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
