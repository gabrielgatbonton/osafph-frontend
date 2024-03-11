<template>
  <v-container class="mx-auto grey">
    <v-row class="mt-2">
      <v-col cols="12" md="4">
        <v-card class="pa-6">
          <div class="d-flex justify-space-between align-center">
            <div class="card-title">Total Registrations</div>
            <div class="card-icon d-flex justify-center align-center">
              <v-icon size="28" color="primary">mdi-account</v-icon>
            </div>
          </div>
          <div class="mt-5 card-number">18</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card> Test </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card> Test </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "DashboardView",
};
</script>
<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
}
</style>
