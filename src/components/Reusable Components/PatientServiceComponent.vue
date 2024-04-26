<template>
  <v-card outlined class="pa-0 bordered-card colored-border">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex align-center">
        <v-card
          flat
          class="card-light-bgColor reversed-shaped-card px-4 d-flex"
        >
          <v-icon
            size="20"
            color="white"
            v-if="serviceInformation.header.icon"
            >{{ serviceInformation.header.icon }}</v-icon
          >
          <p
            class="text-subtitle-2 white--text font-weight-bold pa-0 my-2 ml-2"
          >
            {{ serviceInformation.header.title }}
          </p>
        </v-card>
      </v-col>

      <v-container fluid class="py-4">
        <v-row
          v-for="(info, index) in serviceInformation.info"
          :key="'personal_information-' + index"
          no-gutters
          :class="{
            'mb-3':
              $vuetify.breakpoint.xs &&
              index < personal_informations.length - 1,
          }"
        >
          <v-col cols="12" md="6" sm="6">
            <v-card-subtitle class="py-0">{{ info.title }}</v-card-subtitle>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-card-text
              :class="{
                font: $vuetify.breakpoint.xs,
                'font-weight-bold': !$vuetify.breakpoint.xs,
              }"
              class="py-0"
              >{{ info.content }}</v-card-text
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- <v-card-title class="blue darken-1 white--text"
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
        <v-col
          cols="12"
          class="mt-3"
          v-if="serviceInformation.items_availed.service_type === 'DIALYSIS'"
        >
          <div class="ma-2">
            <div class="text-subtitle-2 grey--text">Packages Availed</div>
          </div>
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item, index) in serviceInformation.items_availed.packages"
              :key="index"
            >
              <v-expansion-panel-header
                class="text-subtitle-1 font-weight-bold"
              >
                {{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="6"
                      v-for="(i, index) in item.dialysis_items"
                      :key="index"
                    >
                      <ul>
                        <li class="text-h5">
                          {{ i }}
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>



      </v-row>
    </v-container> -->
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

  watch: {},
};
</script>

<style scoped>
.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.colored-border {
  border: 1px solid #ffd1d1;
}
.card-light-bgColor {
  background-color: #ff4949;
}
.reversed-shaped-card {
  border-top-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.no-rounded-corners {
  border-radius: 0 !important;
}
</style>
