<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card rounded="lg" flat style="background-color: #f1f5fb">
                  <v-container>
                    <v-row dense class="ma-2">
                      <v-col cols="auto">
                        <v-avatar color="green">
                          <v-icon dark> mdi-needle </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          BOOSTER HISTORY
                        </div>
                        <div class="text-caption grey--text">
                          Citizen booster history
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="ma-2">
                      <v-col cols="12" class="pb-0">
                        <v-card rounded="lg" flat outlined>
                          <div
                            class="green--text text-caption font-weight-bold ma-1"
                          >
                            <v-icon class="ma-1" small color="green"
                              >mdi-check-all</v-icon
                            >Booster Information
                          </div>
                        </v-card>
                      </v-col>
                      <div class="custom-divider"></div>
                      <v-col cols="12" class="py-0">
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <v-container class="py-2">
                                <v-row>
                                  <v-col cols="auto" class="px-0 py-1">
                                    <v-avatar size="38" color="green">
                                      <v-icon small dark> mdi-check </v-icon>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="auto" class="py-0">
                                    <div
                                      class="text-subtitle-2 font-weight-bold"
                                    >
                                      3RD DOSE
                                    </div>
                                    <div class="text-subtitle-2">
                                      FEBRUARY 04, 2022
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="my-1 mx-5">
                                <div
                                  v-for="(vaccine, index) in vaccinesdata_3"
                                  :key="index"
                                >
                                  <div class="text-caption grey--text">
                                    {{ vaccine.title }}
                                  </div>
                                  <div class="text-subtitle-2 font-weight-bold">
                                    {{ vaccine.content }}
                                  </div>
                                  <div
                                    v-if="vaccine.serial"
                                    class="text-caption font-weight-bold"
                                  >
                                    {{ vaccine.serial }}
                                  </div>
                                  <v-divider
                                    v-if="index < vaccinesdata_3.length - 1"
                                    class="my-3"
                                  ></v-divider>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                      <div class="custom-divider"></div>
                      <v-col cols="12" class="pt-0">
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <v-container class="py-2">
                                <v-row>
                                  <v-col cols="auto" class="px-0 py-1">
                                    <v-avatar size="38" color="green">
                                      <v-icon small dark> mdi-check </v-icon>
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="auto" class="py-0">
                                    <div
                                      class="text-subtitle-2 font-weight-bold"
                                    >
                                      4TH DOSE
                                    </div>
                                    <div class="text-subtitle-2">
                                      JUNE 14, 2022
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="my-1 mx-5">
                                <div
                                  v-for="(vaccine, index) in vaccinesdata_4"
                                  :key="index"
                                >
                                  <div class="text-caption grey--text">
                                    {{ vaccine.title }}
                                  </div>
                                  <div class="text-subtitle-2 font-weight-bold">
                                    {{ vaccine.content }}
                                  </div>
                                  <div
                                    v-if="vaccine.serial"
                                    class="text-caption font-weight-bold"
                                  >
                                    {{ vaccine.serial }}
                                  </div>
                                  <v-divider
                                    v-if="index < vaccinesdata_4.length - 1"
                                    class="my-3"
                                  ></v-divider>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    vaccinesdata_3: [
      {
        title: "Vaccine Name / Manufacturer / Lot Number",
        content: "PFIZER",
        serial: "LOT NO. PCA0028",
      },
      {
        title: "Healthcare Professional",
        content: "MARJORIE V. BALAGTAS, RN",
        serial: "LICENSE NO. 0823592",
      },
      {
        title: "Vaccination Site",
        content: "MABALACAT CITY",
      },
    ],
    vaccinesdata_4: [
      {
        title: "Vaccine Name / Manufacturer / Lot Number",
        content: "PFIZER",
        serial: "LOT NO. PCA0050",
      },
      {
        title: "Healthcare Professional",
        content: "ELLAINE L. CANLAS, RN",
        serial: "LICENSE NO. 0599253",
      },
      {
        title: "Vaccination Site",
        content: "MABALACAT CITY",
      },
    ],
  }),
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid lightgray;
  height: 20px; /* Adjust the height to the desired vertical connection length */
  margin-left: 30px; /* Add some spacing and center the divider */
}
</style>
