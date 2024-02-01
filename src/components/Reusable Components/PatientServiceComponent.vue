<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left v-if="serviceInformation.header.icon">{{
        serviceInformation.header.icon
      }}</v-icon
      >{{ serviceInformation.header.title }}</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(info, index) in serviceInformation.info"
          :key="index"
        >
          <div class="ma-2">
            <div class="text-subtitle-2 grey--text">
              {{ info.title }}
            </div>
            <div class="text-h5">{{ info.content }}</div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="mt-3"
          v-if="serviceInformation.items_availed.service_type === 'DIALYSIS'"
        >
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                class="text-subtitle-1 font-weight-bold"
              >
                Items Availed
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="6"
                      v-for="(item, index) in serviceInformation.items_availed
                        .items"
                      :key="index"
                    >
                      <ul>
                        <li class="text-h5">
                          {{ item }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(info, index) in serviceInformation.remarks"
              :key="index"
            >
              <v-expansion-panel-header>
                <div class="text-subtitle-1 font-weight-bold">
                  {{ info.title }}
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ info.content }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PatientServiceComponent",
  props: {
    serviceInformation: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
