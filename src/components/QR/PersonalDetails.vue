<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="7">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card rounded="lg" flat style="background-color: #f1f5fb">
                  <v-container>
                    <v-row dense class="ma-2">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-account </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          BASIC DETAILS
                        </div>
                        <div class="text-caption grey--text">
                          Citizen personal information
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="ma-2">
                      <v-col cols="12">
                        <v-card rounded="lg" flat outlined>
                          <div class="my-7 mx-5">
                            <div
                              v-for="(detail, index) in details"
                              :key="index"
                            >
                              <div class="text-caption grey--text">
                                {{ detail.title }}
                              </div>
                              <div class="text-subtitle-2 font-weight-bold">
                                {{ detail.content }}
                              </div>
                              <v-divider
                                v-if="index < details.length - 1"
                                class="my-3"
                              ></v-divider>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card rounded="lg" flat style="background-color: #f1f5fb">
                  <v-container>
                    <v-row dense class="ma-2">
                      <v-col cols="auto" class="">
                        <v-avatar color="indigo">
                          <v-icon dark> mdi-map-marker </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          ADDRESS
                        </div>
                        <div class="text-caption grey--text">
                          Citizen address information
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="ma-2">
                      <v-col cols="12">
                        <v-card rounded="lg" flat outlined>
                          <div class="my-7 mx-5">
                            <div
                              v-for="(address, index) in addresses"
                              :key="index"
                            >
                              <div class="text-caption grey--text">
                                {{ address.title }}
                              </div>
                              <div class="text-subtitle-2 font-weight-bold">
                                {{ address.content }}
                              </div>
                              <v-divider
                                v-if="index < 3"
                                class="my-3"
                              ></v-divider>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card rounded="lg" flat style="background-color: #f1f5fb">
                  <v-container>
                    <v-row dense class="ma-2">
                      <v-col cols="auto" class="">
                        <v-avatar color="green">
                          <v-icon dark> mdi-needle </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-2">
                        <div class="text-subtitle-2 font-weight-bold">
                          VACCINATION STATUS
                        </div>
                        <div class="text-caption grey--text">
                          Citizen vaccine status
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="ma-2">
                      <v-col cols="12" class="pb-0">
                        <v-card rounded="lg" flat outlined>
                          <div class="green--text text-subtitle-2 ma-1">
                            <v-icon class="ma-1" small color="green"
                              >mdi-check-all</v-icon
                            >Fully Vaccinated
                          </div>
                        </v-card>
                      </v-col>
                      <div class="custom-divider"></div>
                      <v-col cols="12" class="pt-0">
                        <v-card rounded="lg" flat outlined>
                          <v-container class="pb-0">
                            <v-row dense class="mx-2 mt-2">
                              <v-col cols="auto" class="">
                                <v-avatar color="green">
                                  <v-icon dark> mdi-check </v-icon>
                                </v-avatar>
                              </v-col>
                              <v-col cols="auto" class="pt-2">
                                <div class="text-subtitle-2 font-weight-bold">
                                  1ST DOSE
                                </div>
                                <div class="text-caption grey--text">
                                  Vaccine information
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                          <div class="my-7 mx-5">
                            <div
                              v-for="(vaccine, index) in vaccinesdata_1"
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
                                v-if="index < vaccinesdata_1.length - 1"
                                class="my-3"
                              ></v-divider>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                      <div class="custom-divider"></div>
                      <v-col cols="12">
                        <v-card rounded="lg" flat outlined>
                          <v-container class="pb-0">
                            <v-row dense class="mx-2 mt-2">
                              <v-col cols="auto" class="">
                                <v-avatar color="green">
                                  <v-icon dark> mdi-check </v-icon>
                                </v-avatar>
                              </v-col>
                              <v-col cols="auto" class="pt-2">
                                <div class="text-subtitle-2 font-weight-bold">
                                  2ND DOSE
                                </div>
                                <div class="text-caption grey--text">
                                  Vaccine information
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                          <div class="my-7 mx-5">
                            <div
                              v-for="(vaccine, index) in vaccinesdata_2"
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
                                v-if="index < vaccinesdata_2.length - 1"
                                class="my-3"
                              ></v-divider>
                            </div>
                          </div>
                        </v-card>
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
    details: [
      {
        title: "Full Name",
        content: "GABRIEL ALFONSO",
      },
      {
        title: "Category",
        content: "ROAP",
      },
      {
        title: "Date of Birth",
        content: "FEBRUARY 13, 1995",
      },
      {
        title: "Sex",
        content: "MALE",
      },
      {
        title: "Civil Status",
        content: "SINGLE",
      },
    ],
    addresses: [
      {
        title: "Barangay",
        content: "SAN JOAQUIN",
      },
      {
        title: "City / Municipality",
        content: "MABALACAT CITY",
      },
      {
        title: "Province",
        content: "PAMPANGA",
      },
      {
        title: "Region",
        content: "REGION III (CENTRAL LUZON)",
      },
    ],
    vaccinesdata_1: [
      {
        title: "Vaccine Name / Manufacturer / Lot Number",
        content: "SINOVAC",
        serial: "LOT NO. C202105075",
      },
      {
        title: "Healthcare Professional",
        content: "CLARENCE ADRIAN B. PINGOL, RN",
        serial: "LICENSE NO. 0760246",
      },
      {
        title: "Vaccination Site",
        content: "MABALACAT CITY",
      },
      {
        title: "Date Vaccinated",
        content: "JUNE 29, 2021",
      },
    ],
    vaccinesdata_2: [
      {
        title: "Vaccine Name / Manufacturer / Lot Number",
        content: "SINOVAC",
        serial: "LOT NO. J202106040",
      },
      {
        title: "Healthcare Professional",
        content: "EMMANUEL C. TORRES, RN",
        serial: "LICENSE NO. 0228966",
      },
      {
        title: "Vaccination Site",
        content: "MABALACAT CITY",
      },
      {
        title: "Date Vaccinated",
        content: "JULY 27, 2021",
      },
    ],
  }),
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid  lightgray;
  height: 30px; /* Adjust the height to the desired vertical connection length */
  margin-left: 30px; /* Add some spacing and center the divider */
}
</style>
