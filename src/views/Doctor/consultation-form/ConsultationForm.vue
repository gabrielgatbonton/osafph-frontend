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
                    <v-text-field readonly label="Patient Name"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select readonly label="Sex"></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      readonly
                      label="Age"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Birthdate"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select readonly label="Civil Status"></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field readonly label="Religion"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-combobox readonly label="Occupation"></v-combobox>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field readonly label="Nationality"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field readonly label="Address"></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      readonly
                      label="Date of Consult"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field readonly label="Doctor"></v-text-field>
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
              <v-icon dark> mdi-account </v-icon>
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
                  <v-col cols="9">
                    <v-text-field
                      readonly
                      label="Chief Complaint"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field readonly label="Date"></v-text-field>
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
                            :cols="checkbox.label === 'Others' ? 8 : 4"
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
                                  checkbox.label === 'Others' &&
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
                            :cols="checkbox.label === 'Others' ? 8 : 4"
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
                                  checkbox.label === 'Others' &&
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
              <v-icon dark> mdi-account </v-icon>
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
                    <v-text-field readonly label="Vital Signs"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select readonly label="BP"></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="HR"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="RR"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Temperature"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="O2 Saturation"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Weight (kg)"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Height (m)"></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      readonly
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ConsultationForm",
  data: () => ({
    data: {
      histories_of_present_illnesses: [],
      past_medical_histories: [],
      family_medical_histories: [],
    },
    checkboxes: {
      history_of_present_illnesses: [],
      past_medical_histories: [],
      family_medical_histories: [],
    },
    other_history_of_present_illness: null,
    other_past_medical_history: null,
    other_family_medical_history: null,
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

      this.data.histories_of_present_illnesses = checkedValuesHistory;
      this.data.past_medical_histories = checkedValuesPastMedicalHistory;
      this.data.family_medical_histories = checkedValuesFamilyMedicalHistory;
    },
    toContinuation() {
      const consultation_id = this.$route.params.consultation_id;
      const hospital_service_id = this.$route.params.hospital_service_id;
      this.$router.push({
        name: "consultation-form-continuation",
        params: {
          consultation_id: consultation_id,
          hospital_service_id: hospital_service_id,
        },
      });
    },
  },
  watch: {
    getHistory(value) {
      this.checkboxes.history_of_present_illnesses = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
      console.log(this.checkboxes.history_of_present_illnesses);
    },
    getPastMedicalHistories(value) {
      this.checkboxes.past_medical_histories = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
    },
    getFamilyMedicalHistories(value) {
      this.checkboxes.family_medical_histories = value.map((checkbox) => ({
        label: checkbox.name,
        value: checkbox.id,
        checked: false,
      }));
    },
  },
  computed: {
    ...mapGetters("consultation_enum", [
      "getHistory",
      "getPastMedicalHistories",
      "getFamilyMedicalHistories",
    ]),
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
