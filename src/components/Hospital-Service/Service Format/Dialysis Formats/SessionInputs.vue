<template>
  <v-container fluid class="mx-auto">
    <v-row>
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
export default {
  name: "SessionInputs",
  data: () => ({
    payload: {
      total_sessions: null,
      schedule: [],
    },
  }),
  methods: {
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
  },
};
</script>

<style scoped></style>
