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
    <ConsultationForm :basic_details="fetchQueryData" />
  </div>
</template>

<script>
import ConsultationForm from "../ConsultationForm.vue";
import { format, parseISO } from 'date-fns';
export default {
  name: "AddConsultationForm",
  components: {
    ConsultationForm,
  },
  computed: {
    fetchQueryData() {
      const data = this.$route.query.data;
      let parsedData = JSON.parse(data);
      let basic_details = null;
      if (parsedData) {
        basic_details = {
          patient_name: `${parsedData.citizen.last_name}, ${
            parsedData.citizen.first_name
          } ${
            parsedData.citizen.middle_name ? parsedData.citizen.middle_name : ""
          } ${parsedData.citizen.suffix ? parsedData.citizen.suffix : ""}`,
          sex: parsedData.citizen.sex,
          age: parsedData.citizen.age,
          birthday: format(parseISO(parsedData.citizen.birthday), "MMMM dd, yyyy"),
          civil_status: parsedData.citizen.civil_status,
          religion: parsedData.citizen.religion,
          occupation: parsedData.citizen.occupation,
          nationality: parsedData.citizen.nationality,
          address: parsedData.citizen.address,
          date_of_consult: format(parseISO(parsedData.hospital_service.scheduled_date), "MMMM dd, yyyy"),
          doctor_name: `${parsedData.doctor.last_name}, ${
            parsedData.doctor.first_name
          } ${
            parsedData.doctor.middle_name ? parsedData.doctor.middle_name : ""
          }`,
        };
      }
      return basic_details;
    },
  },
};
</script>

<style></style>
