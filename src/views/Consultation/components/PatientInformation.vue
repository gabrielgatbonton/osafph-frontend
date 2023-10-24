<template>
  <v-card flat outlined>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-folder-multiple</v-icon>Patient
      Information</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <div class="text-center">
            <v-avatar
              rounded="lg"
              size="175"
              class="my-3"
              color="blue darken-4"
            >
              <v-img
                max-height="170"
                max-width="170"
                :src="patient_information.image_url"
              ></v-img>
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" md="8" sm="12" xs="12">
          <v-row no-gutters>
            <v-col
              cols="12"
              md="6"
              sm="6"
              v-for="(info, index) in patient_information.information"
              :key="index"
            >
              <div class="ma-2">
                <div class="text-subtitle-1 grey--text">
                  {{ info.title }}
                </div>
                <div class="text-h5">{{ info.content }}</div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div class="my-2">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-subtitle-1 font-weight-bold">
                    Additional Information
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="ma-2">
                    <v-row>
                      <v-col
                        cols="6"
                        v-for="(
                          info, index
                        ) in patient_information.additional_information"
                        :key="index"
                      >
                        <div class="text-subtitle-1 grey--text">
                          {{ info.title }}
                        </div>
                        <div class="text-h5">
                          {{ info.content }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { format, parseISO } from "date-fns";
export default {
  name: "PatientInformation",
  props: ["data"],
  computed: {
    patient_information() {
      return {
        image_url: this.$url + this.data.citizen.image_url,
        information: [
          {
            title: "Patient Name",
            content: `${this.data.citizen.last_name}, ${
              this.data.citizen.first_name
            } ${
              this.data.citizen.middle_name
                ? this.data.citizen.middle_name
                : ""
            } ${
              this.data.citizen.suffix
                ? this.data.citizen.suffix
                : ""
            }`,
          },
          {
            title: "Age",
            content: this.data.citizen.age,
          },
          {
            title: "Sex",
            content: this.data.citizen.sex,
          },
          {
            title: "Date Of Birth",
            content: format(
              parseISO(this.data.citizen.birthday),
              "MMMM dd, yyyy"
            ),
          },
        ],
        additional_information: [
          {
            title: "Address",
            content: this.data.citizen.address,
          },
          {
            title: "Civil Status",
            content: this.data.citizen.civil_status,
          },
          {
            title: "Religion",
            content: this.data.citizen.religion,
          },
          {
            title: "Occupation",
            content: this.data.citizen.occupation,
          },
          {
            title: "Nationality",
            content: this.data.citizen.nationality,
          },
        ],
      };
    },
  },
};
</script>

<style scoped></style>
