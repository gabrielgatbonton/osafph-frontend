<template>
  <div>
    <v-container fluid>
      <v-card
        rounded="lg"
        class="mx-5"
        flat
        outlined
        style="background-color: #f1f5fb"
      >
        <v-row dense class="mx-4 mt-4">
          <v-col cols="auto" class="">
            <v-avatar color="indigo">
              <v-icon dark> mdi-account </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">ASSESSMENT</div>
            <div class="text-caption grey--text">Patient's Assessment</div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      item-text="name"
                      :items="checkboxes.diagnosis"
                      label="Diagnosis"
                      v-model="data.assessment.diagnosis"
                      placeholder="Please Specify or Choose"
                    ></v-combobox>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <div class="custom-divider"></div>
      <v-card
        rounded="lg"
        class="mx-5"
        flat
        outlined
        style="background-color: #f1f5fb"
      >
        <v-row dense class="mx-4 mt-4">
          <v-col cols="auto" class="">
            <v-avatar color="indigo">
              <v-icon dark> mdi-account </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">PLAN</div>
            <div class="text-caption grey--text">Patient's Medical Plan</div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="12">
                    <div class="text-h5 text-left my-2">Plan</div>
                    <div class="text-h6 mb-2">Dianostics</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters>
                          <v-col
                            cols="4"
                            v-for="(checkbox, index) in checkboxes.diagnostics"
                            :key="index"
                          >
                            <v-checkbox
                              :label="checkbox.label"
                              v-model="checkbox.checked"
                              @click="pushToHistory"
                              class="my-0"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">Medications</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.plan.medications"
                          label="Specify Medications"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">Referral</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.plan.referral"
                          label="Specify Referral"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">Others</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.plan.others"
                          label="Specify Others"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="text-h5 text-left my-2">Remarks</div>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
                      max-width="290"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      v-model="menu_1"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formattedDate1"
                          v-on="on"
                          v-bind="attrs"
                          label="Follow Up On"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="data.plan.follow_up_date"
                        :min="minDate_1"
                        @input="menu_1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
                      max-width="290"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      v-model="menu_2"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formattedDate2"
                          v-on="on"
                          v-bind="attrs"
                          label="Fit To Work Starting"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="data.plan.fit_to_work_starting"
                        :min="minDate_2"
                        @input="menu_2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="data.plan.may_rest_for"
                      :value="formattedDays"
                      label="May Rest For"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn @click="submitForm" dark class="blue darken-4"
                      >Submit</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { format, parseISO } from "date-fns";
export default {
  name: "ConsultationFormContinuation",
  data: () => ({
    checkboxes: {
      diagnosis: null,
      diagnostics: [],
    },
    data: {
      assessment: {
        diagnosis: [],
      },
      plan: {
        diagnostic_type_id: [],
        medications: null,
        referral: null,
        others: null,
        follow_up_date: null,
        fit_to_work_starting: null,
        may_rest_for: null,
      },
    },
    menu_1: false,
    menu_2: false,
    minDate_1: new Date().toISOString().slice(0, 10),
    minDate_2: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  }),
  methods: {
    ...mapActions("consultation_enum", ["fetchMoreCheckboxes"]),
    ...mapActions("consultations", ["addConsultationToId"]),
    pushToHistory() {
      const checkedValuesDiagnostics = this.checkboxes.diagnostics
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      this.data.plan.diagnostic_type_id = checkedValuesDiagnostics;
    },
    fetchQueryData() {
      const consultationData = this.$route.query.data;
      if (consultationData) {
        const parsedData = JSON.parse(consultationData);

        // Loop through parsedData and assign each key-value pair to this.data
        for (const key in parsedData) {
          if (Object.hasOwnProperty.call(parsedData, key)) {
            this.data[key] = parsedData[key];
          }
        }
        console.log("Passed Data", this.data);
      }
    },
    submitForm() {
      const consultation_id = this.$route.query.consultation_id;
      let data = {};

      if (this.data.plan.others === null) {
        data = {
          diagnosis: this.data.assessment.diagnosis,
          chief_complaint: this.data.subjective.chief_complaint,
          history_of_present_illness_id:
            this.data.subjective.histories_of_present_illnesses_id,
          past_medical_history_id:
            this.data.subjective.past_medical_histories_id,
          family_medical_history_id:
            this.data.subjective.family_medical_histories_id,
          blood_pressure: this.data.objective.blood_pressure,
          heart_rate: this.data.objective.heart_rate,
          respiratory_rate: this.data.objective.respiratory_rate,
          temperature: this.data.objective.temperature,
          pertinent_findings: this.data.objective.pertinent_findings,
          oxygen_saturation: this.data.objective.oxygen_saturation,
          weight: this.data.objective.weight,
          height: this.data.objective.height,
          diagnostic_type_id: this.data.plan.diagnostic_type_id,
          medications: this.data.plan.medications,
          referral: this.data.plan.referral,
          follow_up_date: this.data.plan.follow_up_date,
          fit_to_work_starting: this.data.plan.fit_to_work_starting,
          may_rest_for: this.data.plan.may_rest_for,
        };
      }
      this.addConsultationToId({
        consultation_id: consultation_id,
        data: data,
      }).catch((error) => {
        console.log("Error Submitting Consultation Form: ", error);
      });
    },
  },
  computed: {
    ...mapGetters("consultation_enum", ["getDiagnosis", "getDiagnostics"]),
    formattedDate1() {
      return this.data.plan.follow_up_date
        ? format(parseISO(this.data.plan.follow_up_date), "MMMM d, yyyy")
        : "";
    },
    formattedDate2() {
      return this.data.plan.fit_to_work_starting
        ? format(parseISO(this.data.plan.fit_to_work_starting), "MMMM d, yyyy")
        : "";
    },
    formattedDays() {
      let value = null;
      if (this.data.plan.may_rest_for === "1") {
        value + " Day";
      } else {
        value + " Days";
      }
      return value;
    },
  },
  watch: {
    getDiagnosis(value) {
      this.checkboxes.diagnosis = value.map((data) => data.name);
    },
    getDiagnostics(value) {
      this.checkboxes.diagnostics = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
    },
  },
  created() {
    this.fetchMoreCheckboxes();
    this.fetchQueryData();
  },
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid lightgray;
  height: 30px; /* Adjust the height to the desired vertical connection length */
  margin-left: 50px; /* Add some spacing and center the divider */
}
</style>
