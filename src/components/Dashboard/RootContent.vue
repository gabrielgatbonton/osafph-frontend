<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6" rounded="lg">
          <div class="d-flex justify-space-between align-center">
            <div class="card-title">Packages Availed</div>
            <div
              class="card-icon blue lighten-5 d-flex justify-center align-center"
            >
              <v-icon size="28" color="primary">mdi-package</v-icon>
            </div>
          </div>
          <div
            class="d-flex"
            :class="{
              'mt-5 flex-row justify-space-around align-center':
                !$vuetify.breakpoint.xs,
              'mt-3 flex-column justify-center align-center':
                $vuetify.breakpoint.xs,
            }"
          >
            <div
              class="d-flex flex-column align-center"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              v-for="(packages, index) in data.packages"
              :key="'indivpackage' + index"
            >
              <div class="card-number">
                {{ packages.count }}
              </div>
              <div>{{ packages.package }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" v-for="(item, index) in data.encoder" :key="index">
        <v-card class="pa-6" rounded="lg">
          <div class="d-flex justify-space-between align-center">
            <div class="card-title">{{ item.title }}</div>
            <div
              class="card-icon blue lighten-5 d-flex justify-center align-center"
            >
              <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
            </div>
          </div>
          <div
            class="card-number mb-6"
            :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
          >
            {{ item.value }}
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        v-for="(item, index) in data.doctor"
        :key="'doctor' + index"
      >
        <v-card class="pa-6" rounded="lg">
          <div class="d-flex justify-space-between align-center">
            <div class="card-title">{{ item.title }}</div>
            <div
              class="card-icon blue lighten-5 d-flex justify-center align-center"
            >
              <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
            </div>
          </div>
          <div
            class="d-flex"
            :class="{
              'mt-5 flex-row justify-space-around align-center':
                !$vuetify.breakpoint.xs,
              'mt-3 flex-column justify-center align-center':
                $vuetify.breakpoint.xs,
            }"
          >
            <div
              class="d-flex flex-column align-center"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              v-for="(indivDoc, index) in item.values"
              :key="'indivdoctor' + index"
            >
              <div class="card-number">
                {{ indivDoc.value }}
              </div>
              <div>{{ indivDoc.title }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <FundingTable :data="data" />
    </v-row>
  </v-container>
</template>

<script>
import FundingTable from "./Funding-Table.vue";
export default {
  name: "RootContent",
  props: ["data"],
  components: {
    FundingTable,
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
</style>
