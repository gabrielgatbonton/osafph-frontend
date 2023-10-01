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
            <div class="text-caption grey--text">Patient's Chief Findings</div>
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
                    <v-text-field
                      readonly
                      label="Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div>History:</div>
                    <v-row no-gutters>
                      <v-col
                        cols="3"
                        v-for="(checkbox, index) in history_checkboxes"
                        :key="index"
                      >
                        <v-checkbox
                          :label="checkbox.label"
                          v-model="checkbox.checked"
                          @click="pushToHistory"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="3">
                        <!-- "Others" checkbox -->
                        <v-checkbox
                          :label="'Others'"
                          v-model="othersCheckbox"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="3">
                        <!-- "Others" text field -->
                        <v-text-field
                          v-if="othersCheckbox"
                          v-model="othersValue"
                          label="Enter Other Value"
                          @input="pushToHistory"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- <v-btn @click="pushToHistory">Push to History</v-btn> -->
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
export default {
  name: "ConsultationForm",
  data: () => ({
    data: {
      history: [],
    },
    history_checkboxes: [
      {
        label: "Cough",
        value: "Cough",
        checked: false,
      },
      {
        label: "Colds",
        value: "Colds",
        checked: false,
      },
      {
        label: "Fever",
        value: "Fever",
        checked: false,
      },
      {
        label: "Abdominal Pain",
        value: "Abdominal Pain",
        checked: false,
      },
      {
        label: "Dysurra",
        value: "Dysurra",
        checked: false,
      },
      {
        label: "Nausea",
        value: "Nausea",
        checked: false,
      },
      {
        label: "Vomiting",
        value: "Vomiting",
        checked: false,
      },
      {
        label: "Diarrhea",
        value: "Diarrhea",
        checked: false,
      },
      {
        label: "Headache",
        value: "Headache",
        checked: false,
      },
    ],
    othersCheckbox: false, // Checkbox state for "Others"
    othersValue: "", // Value entered in "Others" text field
  }),
  methods: {
    pushToHistory() {
      const checkedValues = this.history_checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      // Push the "Others" value to history if it's not empty
      if (this.othersValue.trim() !== "") {
        checkedValues.push(this.othersValue.trim());
      }

      this.data.history = checkedValues;
      console.log(this.data.history);
    },
  },
  computed: {},
  watch: {
    data(value) {
      console.log(value);
    },
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
