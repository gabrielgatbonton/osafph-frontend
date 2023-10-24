<template>
  <div v-if="checkboxes">
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
            <div class="text-subtitle-2 font-weight-bold">BASIC DETAILS</div>
            <div class="text-caption grey--text">
              Patient Personal Information
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="localBasicDetails.patient_name"
                      readonly
                      label="Patient Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      v-model="localBasicDetails.sex"
                      :items="selects.sex"
                      readonly
                      label="Sex"
                    ></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      readonly
                      label="Age"
                      type="number"
                      v-model="localBasicDetails.age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="localBasicDetails.birthday"
                      readonly
                      label="Birthdate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      v-model="localBasicDetails.civil_status"
                      :items="selects.civil_status"
                      readonly
                      label="Civil Status"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="localBasicDetails.religion"
                      readonly
                      label="Religion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="localBasicDetails.occupation"
                      readonly
                      label="Occupation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="localBasicDetails.nationality"
                      readonly
                      label="Nationality"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="localBasicDetails.address"
                      readonly
                      label="Address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="localBasicDetails.date_of_consult"
                      readonly
                      label="Date of Consult"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="localBasicDetails.doctor_name"
                      readonly
                      label="Doctor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field readonly label="Diagnosis"></v-text-field>
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
              <v-icon dark> mdi-history </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">SUBJECTIVE</div>
            <div class="text-caption grey--text">
              Patient's Subjective Findings
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="data.chief_complaint"
                      label="Chief Complaint"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-text-field
                      v-model="formattedDate"
                      readonly
                      label="Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">History</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters>
                          <v-col
                            :cols="checkbox.label === 'Others' ? 8 : 4"
                            v-for="(
                              checkbox, index
                            ) in checkboxes.history_of_present_illnesses"
                            :key="index"
                          >
                            <div class="d-flex">
                              <v-checkbox
                                :label="checkbox.label"
                                v-model="checkbox.checked"
                                @click="pushToHistory"
                                class="my-0"
                              ></v-checkbox>
                              <v-text-field
                                class="mt-n3 mx-5"
                                v-if="
                                  checkbox.label === 'Others' &&
                                  checkbox.value === 10 &&
                                  checkbox.checked === true
                                "
                                v-model="other_history_of_present_illness"
                                label="Enter Other Value"
                                @input="pushToHistory"
                              ></v-text-field>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">PAST MEDICAL HISTORY</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters>
                          <v-col
                            :cols="checkbox.label === 'Other' ? 8 : 4"
                            v-for="(
                              checkbox, index
                            ) in checkboxes.past_medical_histories"
                            :key="index"
                          >
                            <div class="d-flex">
                              <v-checkbox
                                :label="checkbox.label"
                                v-model="checkbox.checked"
                                @click="pushToHistory"
                                class="my-0"
                              ></v-checkbox>
                              <v-text-field
                                class="mt-n3 mx-5"
                                v-if="
                                  checkbox.label === 'Other' &&
                                  checkbox.value === 15 &&
                                  checkbox.checked === true
                                "
                                v-model="other_past_medical_history"
                                label="Enter Other Value"
                                @input="pushToHistory"
                              ></v-text-field>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">FAMILY MEDICAL HISTORY</div>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters>
                          <v-col
                            :cols="checkbox.label === 'Other' ? 8 : 4"
                            v-for="(
                              checkbox, index
                            ) in checkboxes.family_medical_histories"
                            :key="index"
                          >
                            <div class="d-flex">
                              <v-checkbox
                                :label="checkbox.label"
                                v-model="checkbox.checked"
                                @click="pushToHistory"
                                class="my-0"
                              ></v-checkbox>
                              <v-text-field
                                class="mt-n3 mx-5"
                                v-if="
                                  checkbox.label === 'Other' &&
                                  checkbox.value === 11 &&
                                  checkbox.checked === true
                                "
                                v-model="other_family_medical_history"
                                label="Enter Other Value"
                                @input="pushToHistory"
                              ></v-text-field>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
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
              <v-icon dark> mdi-folder </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">OBJECTIVE</div>
            <div class="text-caption grey--text">
              Patient's Objective Findings
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="12">
                    <div class="text-h6">PHYSICAL EXAMINATION</div>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.blood_pressure"
                      label="BP"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.heart_rate"
                      label="HR"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.respiratory_rate"
                      label="RR"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.temperature"
                      label="Temperature"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.oxygen_saturation"
                      label="O2 Saturation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.weight"
                      label="Weight (kg)"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="data.height"
                      label="Height (m)"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="data.pertinent_findings"
                      label="Permanent Findings"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col></v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="toContinuation" dark class="blue darken-4"
              >Proceed</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ConsultationForm",
  props: {
    basic_details: {
      type: Object,
      required: true,
    },
    consultation_form: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    data: {
      chief_complaint: null,
      history_of_present_illness_id: [],
      past_medical_history_id: [],
      family_medical_history_id: [],
      blood_pressure: null,
      heart_rate: null,
      respiratory_rate: null,
      temperature: null,
      pertinent_findings: null,
      oxygen_saturation: null,
      weight: null,
      height: null,
    },
    other_history_of_present_illness: null,
    other_past_medical_history: null,
    other_family_medical_history: null,
    checkboxes: {
      history_of_present_illnesses: [],
      past_medical_histories: [],
      family_medical_histories: [],
    },
    selects: {
      sex: ["MALE", "FEMALE"],
      civil_status: ["SINGLE", "MARRIED", "SEPARATED", "WIDOWED", "DIVORCED"],
    },
    present_date: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    ...mapActions("consultation_enum", ["fetchCheckboxes"]),
    pushToHistory() {
      const checkedValuesHistory = this.checkboxes.history_of_present_illnesses
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      const checkedValuesPastMedicalHistory =
        this.checkboxes.past_medical_histories
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
      const checkedValuesFamilyMedicalHistory =
        this.checkboxes.family_medical_histories
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);

      // Create an object to store the updated data.subjective
      const updatedData = {
        ...this.data,
        history_of_present_illness_id: checkedValuesHistory,
        past_medical_history_id: checkedValuesPastMedicalHistory,
        family_medical_history_id: checkedValuesFamilyMedicalHistory,
      };

      // Check and add other values if they exist
      if (this.other_history_of_present_illness) {
        updatedData.other_history_of_present_illness =
          this.other_history_of_present_illness;
      }
      if (this.other_past_medical_history) {
        updatedData.other_past_medical_history =
          this.other_past_medical_history;
      }
      if (this.other_family_medical_history) {
        updatedData.other_family_medical_history =
          this.other_family_medical_history;
      }

      // Set the data
      this.data = updatedData;
    },
    toContinuation() {
      const consultation_id = this.$route.params.consultation_id;
      const hospital_service_id = this.$route.params.hospital_service_id;
      if (this.userRole === "DOCTOR") {
        if (this.consultation_form) {
          this.$router.replace({
            name: "doctor-edit-consultation-form-continuation",
            query: {
              consultation_id: consultation_id,
              hospital_service_id: hospital_service_id,
              data: JSON.stringify(this.data),
              consultation_form: JSON.stringify(this.consultation_form),
            },
          });
        } else {
          this.$router.replace({
            name: "consultation-form-continuation",
            query: {
              consultation_id: consultation_id,
              hospital_service_id: hospital_service_id,
              data: JSON.stringify(this.data),
            },
          });
        }
      } else if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        this.$router.replace({
          name: "edit-consultation-form-continuation",
          query: {
            consultation_id: consultation_id,
            hospital_service_id: hospital_service_id,
            data: JSON.stringify(this.data),
            consultation_form: JSON.stringify(this.consultation_form),
          },
        });
      }
    },
    assignValues() {
      console.log("DOCTOR", this.consultation_form);
      if (this.consultation_form && this.checkboxes) {
        this.data.chief_complaint = this.consultation_form.chief_complaint;
        this.data.blood_pressure = this.consultation_form.blood_pressure;
        this.data.heart_rate = this.consultation_form.heart_rate;
        this.data.respiratory_rate = this.consultation_form.respiratory_rate;
        this.data.temperature = this.consultation_form.temperature;
        this.data.pertinent_findings =
          this.consultation_form.pertinent_findings;
        this.data.oxygen_saturation = this.consultation_form.oxygen_saturation;
        this.data.weight = this.consultation_form.weight;
        this.data.height = this.consultation_form.height;
      }
      this.pushToHistory();
    },
  },
  watch: {
    getHistory(value) {
      this.checkboxes.history_of_present_illnesses = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
      if (this.consultation_form) {
        this.checkboxes.history_of_present_illnesses.forEach((checkbox) => {
          if (
            this.consultation_form.history_of_present_illness.includes(
              checkbox.label
            )
          ) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
        this.assignValues();
      }
    },
    getPastMedicalHistories(value) {
      this.checkboxes.past_medical_histories = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
      if (this.consultation_form) {
        this.checkboxes.past_medical_histories.forEach((checkbox) => {
          if (
            this.consultation_form.past_medical_history.includes(checkbox.label)
          ) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
        this.assignValues();
      }
    },
    getFamilyMedicalHistories(value) {
      this.checkboxes.family_medical_histories = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
      if (this.consultation_form) {
        this.checkboxes.family_medical_histories.forEach((checkbox) => {
          if (
            this.consultation_form.family_medical_history.includes(
              checkbox.label
            )
          ) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
        this.assignValues();
      }
    },
  },
  computed: {
    ...mapGetters("consultation_enum", [
      "getHistory",
      "getPastMedicalHistories",
      "getFamilyMedicalHistories",
    ]),
    ...mapGetters("login", ["userRole"]),
    formattedDate() {
      return this.present_date
        ? format(parseISO(this.present_date), "MMMM dd, yyyy")
        : "";
    },
    localBasicDetails() {
      return this.basic_details;
    },
  },
  created() {
    this.fetchCheckboxes();
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
