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
                      v-model="data.diagnosis"
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
                          v-model="data.medications"
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
                          v-model="data.referral"
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
                          v-model="data.others"
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
                        v-model="data.follow_up_date"
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
                        v-model="data.fit_to_work_starting"
                        :min="minDate_2"
                        @input="menu_2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="data.may_rest_for"
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
      diagnosis: null,
      diagnostic_type_id: [],
      medications: null,
      referral: null,
      others: null,
      follow_up_date: null,
      fit_to_work_starting: null,
      may_rest_for: null,
    },
    menu_1: false,
    menu_2: false,
    minDate_1: new Date().toISOString().slice(0, 10),
    minDate_2: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    consultation_form: null,
  }),
  methods: {
    ...mapActions("consultation_enum", ["fetchMoreCheckboxes"]),
    ...mapActions("consultations", ["addConsultationToId"]),
    ...mapActions("admin_consultations", ["updateAdminConsultationFormById"]),
    pushToHistory() {
      const checkedValuesDiagnostics = this.checkboxes.diagnostics
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      this.data.diagnostic_type_id = checkedValuesDiagnostics;
    },
    fetchQueryData() {
      const consultationData = this.$route.query.data;
      const consultationFormData = this.$route.query.consultation_form;
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
      if (consultationFormData) {
        const parsedData = JSON.parse(consultationFormData);
        this.consultation_form = parsedData;
      }
    },
    submitForm() {
      const consultation_id = this.$route.query.consultation_id;
      if (this.userRole === "DOCTOR") {
        return this.addConsultationToId({
          consultation_id: consultation_id,
          data: this.data,
        })
          .then(() => {
            this.$router.push({ name: "consultation-view" });
          })
          .catch((error) => {
            console.log("Error Submitting Consultation Form: ", error);
          });
      } else if (this.userRole === "ADMIN") {
        return this.updateAdminConsultationFormById({
          consultation_id: this.consultation_form.consultation_id,
          consultation_form_id: this.consultation_form.consultation_form_id,
          data: this.data,
        })
          .then(() => {
            this.$router.push({ name: "citizens-consultations-view" });
          })
          .catch((error) => {
            console.log("Error Updating Consultation Form: ", error);
          });
      }
    },
    assignValues() {
      if (this.consultation_form && this.checkboxes) {
        this.data.diagnosis = this.consultation_form.diagnosis;
        this.data.medications = this.consultation_form.medications;
        this.data.referral = this.consultation_form.referral;
        this.data.others = this.consultation_form.others;
        this.data.follow_up_date = this.consultation_form.follow_up_date;
        this.data.fit_to_work_starting =
          this.consultation_form.fit_to_work_starting;
        this.data.may_rest_for = this.consultation_form.may_rest_for;
      }
      this.pushToHistory();
    },
  },
  computed: {
    ...mapGetters("consultation_enum", ["getDiagnosis", "getDiagnostics"]),
    ...mapGetters("login", ["userRole"]),
    formattedDate1() {
      return this.data.follow_up_date
        ? format(parseISO(this.data.follow_up_date), "MMMM d, yyyy")
        : "";
    },
    formattedDate2() {
      return this.data.fit_to_work_starting
        ? format(parseISO(this.data.fit_to_work_starting), "MMMM d, yyyy")
        : "";
    },
  },
  watch: {
    getDiagnosis(value) {
      this.checkboxes.diagnosis = value.map((data) => data.name);
      if (this.consultation_form) {
        this.assignValues();
      }
    },
    getDiagnostics(value) {
      this.checkboxes.diagnostics = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
      if (this.consultation_form) {
        this.checkboxes.diagnostics.forEach((checkbox) => {
          if (this.consultation_form.diagnostic_type.includes(checkbox.label)) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
        this.assignValues();
      }
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
