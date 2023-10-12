<template>
  <v-card flat outlined>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-history</v-icon>Patient's Previous
      Consultations</v-card-title
    >
    <v-container fluid class="py-4" v-if="data.length > 0">
      <v-row no-gutters>
        <v-col
          cols="12"
          v-for="(consultation, index) in consultations"
          :key="index"
        >
          <div class="my-2">
            <v-expansion-panels focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-container class="py-1">
                    <v-row>
                      <v-col cols="auto" class="px-0">
                        <v-icon color="success"> mdi-check </v-icon>
                      </v-col>
                      <v-col cols="auto" class="py-0">
                        <div class="text-subtitle-2 font-weight-bold">
                          CONSULTATION DATE
                        </div>
                        <div class="text-subtitle-2">
                          {{ consultation.consultation_date }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="scrollable-expansion-panel">
                  <div class="ma-2">
                    <v-row dense class="my-4">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-history </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          SUBJECTIVE
                        </div>
                        <div class="text-caption grey--text">
                          Declared Medical History
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="6"
                        v-for="(info, index) in consultation.subjectives"
                        :key="'subjectives-' + index"
                      >
                        <div class="text-subtitle-1 grey--text">
                          {{ info.title }}
                        </div>
                        <div class="text-h5">
                          {{ info.content }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider class="my-5"></v-divider>
                    <v-row dense class="my-4">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-folder </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          OBJECTIVE
                        </div>
                        <div class="text-caption grey--text">
                          Declared Medical Examination
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(info, index) in consultation.objectives"
                        :key="'objectives-' + index"
                      >
                        <div class="text-subtitle-1 grey--text">
                          {{ info.title }}
                        </div>
                        <div class="text-h5">
                          {{ info.content }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider class="my-5"></v-divider>
                    <v-row dense class="my-4">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-notebook-check </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          ASSESSMENT
                        </div>
                        <div class="text-caption grey--text">
                          Declared Assessment History
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        v-for="(info, index) in consultation.assessments"
                        :key="'objectives-' + index"
                      >
                        <div class="text-subtitle-1 grey--text">
                          {{ info.title }}
                        </div>
                        <div class="text-h5">
                          {{ info.content }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider class="my-5"></v-divider>
                    <v-row dense class="my-4">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-pill </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">PLAN</div>
                        <div class="text-caption grey--text">
                          Declared Medical Plan
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        :cols="info.title === '' ? 12 : 6"
                        v-for="(info, index) in consultation.plans"
                        :key="'plans-' + index"
                      >
                        <div class="text-subtitle-1 grey--text">
                          {{ info.title }}
                        </div>
                        <div class="text-h5">
                          {{ info.content }}
                        </div>
                        <div v-if="(index + 1) % 5 === 0">
                          <v-divider></v-divider>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="error--text text-center my-5 text-h6">No Recorded Consultations</div>
  </v-card>
</template>

<script>
import { format, parseISO } from "date-fns";
export default {
  name: "PreviousConsultations",
  props: ["data"],
  computed: {
    consultations() {
      if (!this.data || !Array.isArray(this.data)) {
        return [];
      }

      return this.data.map((item) => ({
        consultation_date: format(parseISO(item.consultation_date), "MMMM dd, yyyy"),
        subjectives: [
          {
            title: "Chief Complaint",
            content: item.chief_complaint
              ? item.chief_complaint
              : "None Specified",
          },
          {
            title: "History Of Present Illness",
            content: Array.isArray(item.history_of_present_illness)
              ? item.history_of_present_illness.join(", ")
              : item.history_of_present_illness,
          },
          {
            title: "Past Medical History",
            content: Array.isArray(item.past_medical_history)
              ? item.past_medical_history.join(", ")
              : item.past_medical_history,
          },
          {
            title: "Family Medical History",
            content: Array.isArray(item.family_medical_history)
              ? item.family_medical_history.join(", ")
              : item.family_medical_history,
          },
        ],
        objectives: [
          {
            title: "Blood Pressure",
            content: item.blood_pressure,
          },
          {
            title: "Heart Rate",
            content: item.heart_rate,
          },
          {
            title: "Respiratory Rate",
            content: item.respiratory_rate,
          },
          {
            title: "Temperature",
            content: item.temperature,
          },
          {
            title: "Oxygen Saturation",
            content: item.oxygen_saturation,
          },
          {
            title: "Weight",
            content: item.weight,
          },
          {
            title: "height",
            content: item.height,
          },
          {
            title: "Body Mass Index",
            content: item.body_mass_index,
          },
          {
            title: "Pertinent Findings",
            content: item.pertinent_findings,
          },
        ],
        assessments: [
          {
            title: "Diagnosis",
            content: item.diagnosis,
          },
        ],
        plans: [
          {
            title: "Diagnostics",
            content: item.diagnostic_type,
          },
          {
            title: "Medications",
            content: item.medications,
          },
          {
            title: "Referrals",
            content: item.referral,
          },
          {
            title: "Others",
            content: item.others ? item.others : "None Specified",
          },
          {
            title: "",
            content: "",
          },
          {
            title: "Follow Up Date",
            content: format(parseISO(item.follow_up_date), "MMMM dd, yyyy"),
          },
          {
            title: "Fit To Work Starting",
            content: format(parseISO(item.fit_to_work_starting), "MMMM dd, yyyy"),
          },
          {
            title: "May Rest For",
            content: item.may_rest_for,
          },
        ],
      }));
    },
  },
  watch: {
    data(value) {
      console.log("PreviousConsultations: ", value);
    },
  },
};
</script>

<style scoped>
.scrollable-expansion-panel {
  max-height: 400px; /* Adjust the max height as needed */
  overflow-y: auto;
}
</style>
