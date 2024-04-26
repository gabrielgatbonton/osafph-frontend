<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="pa-0 bordered-card colored-border">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <v-card
                flat
                class="card-light-bgColor reversed-shaped-card px-4 d-flex"
              >
                <v-icon size="20" color="white">mdi-package</v-icon>
                <p
                  class="text-subtitle-2 white--text font-weight-bold pa-0 my-2 ml-2"
                >
                  PACKAGES AVAILED
                </p>
              </v-card>
            </v-col>

            <v-col v-for="(item, index) in packages" :key="'package' + index">
              <v-card
                flat
                class="no-rounded-corners d-flex flex-column align-center justify-center"
              >
                <v-card-title class="text-h5 font-weight-bold mb-1">{{
                  item.count
                }}</v-card-title>
                <v-card-subtitle class="text-subtitle-1">{{
                  item.package
                }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- <v-col cols="12">
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
      </v-col> -->
      <FundingTable
        @query_params="(data) => $emit('query_params', data)"
        :data="data"
      />
    </v-row>
  </v-container>
</template>

<script>
import FundingTable from "./Funding-Table.vue";
export default {
  name: "AdminContent",
  props: ["data"],
  components: {
    FundingTable,
  },
  computed: {
    packages() {
      let items = this.data.packages.filter((item) => {
        if (item.package !== undefined) {
          return item;
        }
      });
      return items;
    },
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
.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.colored-border {
  border: 1px solid #ffd1d1;
}
.no-rounded-corners {
  border-radius: 0 !important;
}
.card-dark-bgColor {
  background-color: #a40e32;
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
</style>
