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
            <div class="text-caption grey--text">
              Patient's Assessment
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="12">
                    <v-combobox label="Diagnosis"></v-combobox>
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
            <div class="text-caption grey--text">
              Patient's Medical Plan
            </div>
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
                            v-for="(checkbox, index) in diagnostics_checkboxes"
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
                            <v-text-field label="Specify Medications"></v-text-field>
                        </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">Referral</div>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field label="Specify Medications"></v-text-field>
                        </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider class="mx-3"></v-divider></v-col>
                  <v-col cols="12">
                    <div class="text-h6 mb-2">Others</div>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field label="Specify Medications"></v-text-field>
                        </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="text-h5 text-left my-2">Remarks</div>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="Follow Up On"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="Fit To Work Starting"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="May Rest For"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <v-btn dark class="blue darken-4">Submit</v-btn>
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
  name: "ConsultationFormContinuation",
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid lightgray;
  height: 30px; /* Adjust the height to the desired vertical connection length */
  margin-left: 50px; /* Add some spacing and center the divider */
}
</style>
