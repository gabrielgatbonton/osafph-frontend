<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">Edit Consultation Form</span>
        </v-col>
      </v-row>
    </v-container>
    <ConsultationForm
      :consultation_form="fetchQueryConsultation"
      :basic_details="fetchQueryData"
    />
  </div>
</template>

<script>
import ConsultationForm from "../ConsultationForm.vue";
import { format, parseISO } from "date-fns";
export default {
  name: "EditConsultationForm",
  data: () => ({
    doctor_name: null,
    specialty: null,
  }),
  components: {
    ConsultationForm,
  },
  computed: {
    fetchQueryData() {
      const data = this.$route.query.data;
      let parsedData = JSON.parse(data);
      let basic_details_data = null;
      if (parsedData) {
        basic_details_data = {
          patient_name: `${parsedData.citizen.last_name}, ${
            parsedData.citizen.first_name
          } ${
            parsedData.citizen.middle_name ? parsedData.citizen.middle_name : ""
          } ${parsedData.citizen.suffix ? parsedData.citizen.suffix : ""}`,
          sex: parsedData.citizen.sex,
          age: parsedData.citizen.age,
          birthday: format(
            parseISO(parsedData.citizen.birthday),
            "MMMM dd, yyyy"
          ),
          civil_status: parsedData.citizen.civil_status,
          religion: parsedData.citizen.religion,
          occupation: parsedData.citizen.occupation,
          nationality: parsedData.citizen.nationality,
          address: parsedData.citizen.address,
          date_of_consult: format(
            parseISO(parsedData.hospital_service.scheduled_date),
            "MMMM dd, yyyy"
          ),
          doctor_name: `${this.fetchQueryConsultation.doctor.last_name}, ${
            this.fetchQueryConsultation.doctor.first_name
          } ${
            this.fetchQueryConsultation.doctor.middle_name
              ? this.fetchQueryConsultation.doctor.middle_name
              : ""
          }`,
          specialty: this.fetchQueryConsultation.doctor.specialty,
        };
      }
      return basic_details_data;
    },
    fetchQueryConsultation() {
      const consultation_form = this.$route.query.consultation_form;
      let parsedConsultation = JSON.parse(consultation_form);
      let consultation_form_data = null;
      if (parsedConsultation) {
        consultation_form_data = parsedConsultation;
      }
      return consultation_form_data;
    },
  },
};
</script>

<style></style>
