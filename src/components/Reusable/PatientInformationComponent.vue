<template>
  <v-card flat outlined>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left v-if="patientInformation.header.icon">{{
        patientInformation.header.icon
      }}</v-icon
      >{{ patientInformation.header.title }}</v-card-title
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
                :src="patientInformation.image_url"
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
              v-for="(info, index) in patientInformation.info"
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
                        ) in patientInformation.additional_info"
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
export default {
  name: "PatientInformationComponent",
  props: {
    patientInformation: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
