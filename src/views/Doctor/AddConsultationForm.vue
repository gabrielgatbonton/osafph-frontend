<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">Add Consultation Form</span>
        </v-col>
      </v-row>
    </v-container>
    <ConsultationForm />
  </div>
</template>

<script>
import ConsultationForm from './ConsultationForm.vue'
export default {
    name: 'AddConsultationForm',
    components: {
        ConsultationForm,
    }
}
</script>

<style>

</style>