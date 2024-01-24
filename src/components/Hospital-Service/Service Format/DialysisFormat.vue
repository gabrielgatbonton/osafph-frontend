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
      <v-col cols="12" v-if="!hospitalService">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Crowd Funding"
          :items="crowd_fundings"
          item-text="backer"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.dialysis_machine"
          label="Dialysis Machine"
          :items="getDialysisMachines"
          item-text="name"
          @blur="$v.payload.dialysis_machine.$touch()"
          :error-messages="errorMessages.dialysis_machine"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" v-if="!hospitalService">
        <v-checkbox
          v-model="payload.all_items_sponsored"
          label="Items included are sponsored by Crowd Funding"
          @change="pushToParent"
        ></v-checkbox>
        <v-select
          v-model="payload.dialysis_items"
          chips
          multiple
          label="Select Items to avail"
          :items="getDialysisItems"
          item-text="name"
          @blur="$v.payload.dialysis_items.$touch()"
          :error-messages="errorMessages.dialysis_items"
        ></v-select>
      </v-col>
      <v-col cols="12" v-if="!hospitalService">
        <v-checkbox
          v-model="payload.all_sessions_sponsored"
          label="Sessions sponsored by Crowd Funding"
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
      <v-col cols="12" v-if="!hospitalService">
        <v-row v-for="(session, index) in payload.schedule" :key="index">
          <v-col cols="6">
            <v-text-field
              v-model="session.date"
              :label="`Schedule Date ${index + 1}`"
              hint="Format (January 04, 2023)"
              @blur="$v.payload.schedule.$touch()"
              :error-messages="errorMessages.schedule"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="session.session"
              :label="`Session ${index + 1}`"
              :items="session_choices"
              @blur="$v.payload.schedule.$touch()"
              :error-messages="errorMessages.schedule"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" v-if="hospitalService">
        <v-text-field
          v-model="payload.scheduled_date"
          label="Scheduled Date"
          hint="Format (January 04, 2023)"
          @blur="$v.payload.scheduled_date.$touch()"
          :error-messages="errorMessages.scheduled_date"
        ></v-text-field>
      </v-col>
      <v-col cols="6" v-if="hospitalService">
        <v-select
          :items="session_choices"
          label="Schedule Session"
          v-model="payload.scheduled_session"
          @blur="$v.payload.scheduled_session.$touch()"
          :error-messages="errorMessages.scheduled_session"
        ></v-select>
      </v-col>
      <v-col cols="6" v-if="hospitalService">
        <v-text-field
          v-model="payload.date_released"
          label="Date Released"
          hint="Format (January 04, 2023)"
          @blur="$v.payload.date_released.$touch()"
          :error-messages="errorMessages.date_released"
        ></v-text-field>
      </v-col>
      <v-col cols="6" v-if="hospitalService">
        <v-autocomplete
          v-model="payload.status"
          label="Status"
          :items="statuses"
          @blur="$v.payload.status.$touch()"
          :error-messages="errorMessages.status"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" v-if="hospitalService">
        <v-text-field v-model="payload.remarks" label="Remarks"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapGetters } from "vuex";
import DialysisFormatMixin from "@/mixins/ServiceRequestValidation/DialysisFormat";
export default {
  name: "DialysisFormat",
  mixins: [DialysisFormatMixin],
  props: {
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
      crowd_funding_backer: null,
      total_sessions: null,
      hospital: null,
      schedule: [],
      dialysis_items: [],
      all_items_sponsored: false,
      dialysis_machine: null,
      all_sessions_sponsored: false,
      status: null,
      remarks: null,
      scheduled_date: null,
      date_released: null,
      scheduled_session: null,
    },
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
    statuses: ["PENDING", "UNATTENDED", "COMPLETED"],
  }),
  methods: {
    ...mapActions("dialysis", ["fetchEnums"]),
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
      //Parse the String to format the date needed.
      //   if (this.hospitalService) {
      //     this.payload.status = this.status;
      //     this.payload.date_released = this.date_released;
      //     this.payload.serviceable_type = this.selects.serviceable_type;
      //     this.$emit("payload", this.payload);
      //   } else {
      //     this.payload.serviceable_type = this.selects.serviceable_type;
      //     this.$emit("payload", this.payload);
      //   }
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
    checkEditData() {
      if (this.hospitalService) {
        // this.payload.crowd_funding_backer =
        //   this.hospitalService.hospitalService.crowd_funding_backer;
        this.payload.hospital = this.hospitalService.hospitalService.hospital;
        this.payload.dialysis_machine =
          this.hospitalService.hospitalService.dialysis_machine.name;
        this.payload.scheduled_date = format(
          parseISO(this.hospitalService.hospitalService.scheduled_date),
          "MMMM dd, yyyy"
        );
        this.payload.date_released = this.hospitalService.hospitalService
          .date_released
          ? format(
              parseISO(this.hospitalService.hospitalService.date_released),
              "MMMM dd, yyyy"
            )
          : null;
        this.payload.scheduled_session =
          this.hospitalService.hospitalService.session;
        this.payload.status = this.hospitalService.hospitalService.status;
        this.payload.remarks = this.hospitalService.hospitalService.remarks;
      }
    },
  },
  computed: {
    ...mapGetters("dialysis", ["getDialysisMachines", "getDialysisItems"]),
  },
  created() {
    this.fetchEnums();
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
