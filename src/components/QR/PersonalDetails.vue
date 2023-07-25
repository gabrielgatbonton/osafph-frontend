<template>
  <div>
    <v-container v-if="data">
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
                      <v-col cols="12" class="py-0">
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
                      
                      <div v-if="data.citizen.vaccination_stat[1]">
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
                      </div>
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
  props: ["data"],
  data: () => ({}),
  computed: {
    details() {
      return [
        {
          title: "Full Name",
          content: `${this.data.citizen.last_name.toUpperCase()}, 
          ${this.data.citizen.first_name.toUpperCase()} 
          ${
            this.data.citizen.middle_name
              ? " " + this.data.citizen.middle_name.toUpperCase()
              : ""
          } 
          ${
            this.data.citizen.suffix
              ? " " + this.data.citizen.suffix.toUpperCase()
              : ""
          }`,
        },
        {
          title: "Category",
          content: this.data.citizen.category.description,
        },
        {
          title: "Date of Birth",
          content: this.data.citizen.birthday,
        },
        {
          title: "Sex",
          content: this.data.citizen.gender,
        },
        {
          title: "Civil Status",
          content: this.data.citizen.civil_status,
        },
      ];
    },
    addresses() {
      return [
        {
          title: "Barangay",
          content: this.data.citizen.barangay.barangay_name,
        },
        {
          title: "City / Municipality",
          content: this.data.citizen.barangay.municipality.municipality_name,
        },
        {
          title: "Province",
          content:
            this.data.citizen.barangay.municipality.province.province_name,
        },
        {
          title: "Region",
          content:
            this.data.citizen.barangay.municipality.province.region.region_name,
        },
      ];
    },
    vaccinesdata_1() {
      return [
        {
          title: "Vaccine Name / Manufacturer / Lot Number",
          content: this.data.citizen.vaccination_stat[0].vaccine_name,
          serial: this.data.citizen.vaccination_stat[0].lot_no,
        },
        {
          title: "Healthcare Professional",
          content:
            this.data.citizen.vaccination_stat[0].healthcare_professional,
          serial:
            this.data.citizen.vaccination_stat[0]
              .healthcare_professional_license_number,
        },
        {
          title: "Vaccination Site",
          content: this.data.citizen.vaccination_stat[0].site_name,
        },
        {
          title: "Date Vaccinated",
          content: this.data.citizen.vaccination_stat[0].vaccination_date,
        },
      ];
    },
    vaccinesdata_2() {
      return [
        {
          title: "Vaccine Name / Manufacturer / Lot Number",
          content: this.data.citizen.vaccination_stat[1].vaccine_name,
          serial: this.data.citizen.vaccination_stat[1].lot_no,
        },
        {
          title: "Healthcare Professional",
          content:
            this.data.citizen.vaccination_stat[1].healthcare_professional,
          serial:
            this.data.citizen.vaccination_stat[1]
              .healthcare_professional_license_number,
        },
        {
          title: "Vaccination Site",
          content: this.data.citizen.vaccination_stat[1].site_name,
        },
        {
          title: "Date Vaccinated",
          content: this.data.citizen.vaccination_stat[1].vaccination_date,
        },
      ];
    },
  },
};
</script>

<style scoped>
.custom-divider {
  border-left: 2px solid lightgray;
  height: 20px; /* Adjust the height to the desired vertical connection length */
  margin-left: 30px; /* Add some spacing and center the divider */
}
</style>
