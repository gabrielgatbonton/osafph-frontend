<template>
  <v-col cols="12">
    <v-card rounded="lg" flat style="background-color: #f1f5fb">
      <v-container>
        <v-row dense class="ma-2">
          <v-col cols="auto" class="">
            <v-avatar :color="data.citizen.booster_stat[0] ? 'green' : 'red'">
              <v-icon dark> mdi-needle </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">
              BOOSTER VACCINATION STATUS
            </div>
            <div class="text-caption grey--text">Citizen vaccine status</div>
          </v-col>
        </v-row>
        <v-row dense class="ma-2">
          <v-col cols="12" class="pb-0">
            <v-card rounded="lg" flat outlined>
              <div
                class="text-subtitle-2 font-weight-bold ma-1"
                :class="
                  data.citizen.booster_stat[0] ? 'green--text' : 'red--text'
                "
              >
                <v-icon
                  class="ma-1"
                  small
                  :color="data.citizen.booster_stat[0] ? 'green' : 'red'"
                  >{{
                    data.citizen.booster_stat[0] ? "mdi-check-all" : "mdi-close"
                  }}</v-icon
                >{{
                  data.citizen.booster_stat[0] && data.citizen.booster_stat[1]
                    ? "Booster History"
                    : data.citizen.booster_stat[0] ||
                      data.citizen.booster_stat[1]
                    ? "Partial Booster History"
                    : "No Booster History"
                }}
              </div>
            </v-card>
          </v-col>
          <div class="custom-divider" v-if="data.citizen.booster_stat[0]"></div>
          <v-col cols="12" class="py-0" v-if="data.citizen.booster_stat[0]">
            <v-card rounded="lg" flat outlined>
              <v-container class="pb-0">
                <v-row dense class="mx-2 mt-2">
                  <v-col cols="auto" class="">
                    <v-avatar color="green">
                      <v-icon dark> mdi-check </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="auto" class="pt-2">
                    <div class="text-subtitle-2 font-weight-bold">1ST DOSE</div>
                    <div class="text-caption grey--text">
                      Vaccine information
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <div class="my-7 mx-5">
                <div v-for="(vaccine, index) in vaccinesdata_3" :key="index">
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
            </v-card>
          </v-col>
          <div v-if="data.citizen.booster_stat[1]" class="custom-divider"></div>
          <v-col v-if="data.citizen.booster_stat[1]" cols="12" class="pt-0">
            <v-card rounded="lg" flat outlined>
              <v-container class="pb-0">
                <v-row dense class="mx-2 mt-2">
                  <v-col cols="auto" class="">
                    <v-avatar color="green">
                      <v-icon dark> mdi-check </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="auto" class="pt-2">
                    <div class="text-subtitle-2 font-weight-bold">2ND DOSE</div>
                    <div class="text-caption grey--text">
                      Vaccine information
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <div class="my-7 mx-5">
                <div v-for="(vaccine, index) in vaccinesdata_4" :key="index">
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  props: ["data"],
  computed: {
    vaccinesdata_3() {
      return [
        {
          title: "Vaccine Name / Manufacturer / Lot Number",
          content: this.data.citizen.booster_stat[0].booster_name,
          serial: this.data.citizen.booster_stat[0].lot_no,
        },
        {
          title: "Healthcare Professional",
          content:
            this.data.citizen.booster_stat[0].healthcare_professional.toUpperCase(),
          serial:
            this.data.citizen.booster_stat[0]
              .healthcare_professional_license_number,
        },
        {
          title: "Vaccination Site",
          content: this.data.citizen.booster_stat[0].site_name.toUpperCase(),
        },
        {
          title: "Date Vaccinated",
          content: format(
            parseISO(this.data.citizen.booster_stat[0]?.booster_date),
            "MMMM dd, yyyy"
          ).toUpperCase(),
        },
      ];
    },
    vaccinesdata_4() {
      return [
        {
          title: "Vaccine Name / Manufacturer / Lot Number",
          content: this.data.citizen.booster_stat[1].booster_name,
          serial: this.data.citizen.booster_stat[1].lot_no,
        },
        {
          title: "Healthcare Professional",
          content:
            this.data.citizen.booster_stat[1].healthcare_professional.toUpperCase(),
          serial:
            this.data.citizen.booster_stat[1]
              .healthcare_professional_license_number,
        },
        {
          title: "Vaccination Site",
          content: this.data.citizen.booster_stat[1].site_name.toUpperCase(),
        },
        {
          title: "Date Vaccinated",
          content: format(
            parseISO(this.data.citizen.booster_stat[1]?.booster_date),
            "MMMM dd, yyyy"
          ).toUpperCase(),
        },
      ];
    },
    formattedBoosterDate_1() {
      return format(
        parseISO(this.data.citizen.booster_stat[0].booster_date),
        "MMMM dd, yyyy"
      ).toUpperCase();
    },
    formattedBoosterDate_2() {
      return format(
        parseISO(this.data.citizen.booster_stat[1].booster_date),
        "MMMM dd, yyyy"
      ).toUpperCase();
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
