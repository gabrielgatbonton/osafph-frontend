<template>
  <div class="dashboard">
    <NavComponents />

    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Employees</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn class="mr-3">Register</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavComponents from '@/layouts/NavComponents.vue';
export default {
  name: 'HomeView',
  components: {
    NavComponents
  }

}
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
