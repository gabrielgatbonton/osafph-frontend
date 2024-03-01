<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-human-greeting-variant</v-icon>Personal
      Information</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row
        v-for="(info, index) in personal_informations"
        :key="'personal_information-' + index"
        no-gutters
        :class="{ 'mb-3': $vuetify.breakpoint.xs && index < personal_informations.length - 1 }"
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
      <v-divider class="ma-3"></v-divider>
      <div class="mx-4 mb-2 font-weight-medium">Emergency Information</div>
      <v-row
        v-for="(info, index) in emergency"
        :key="'emergency' + index"
        no-gutters
        :class="{ 'mb-3': $vuetify.breakpoint.xs && index < emergency.length - 1 }"
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
  </v-card>
</template>

<script>
export default {
  name: "PersonalInformationCard",
  props: ["registrant"],
  computed: {
    personal_informations() {
      return [
        {
          title: "Full Name",
          content: `${this.registrant.citizen.last_name.toUpperCase()}, 
          ${this.registrant.citizen.first_name.toUpperCase()} 
          ${
            this.registrant.citizen.middle_name
              ? " " + this.registrant.citizen.middle_name.toUpperCase()
              : ""
          } 
          ${
            this.registrant.citizen.suffix
              ? " " + this.registrant.citizen.suffix.toUpperCase()
              : ""
          }`,
        },
        {
          title: "Date of Birth",
          content: this.registrant.citizen.birthday,
        },
        {
          title: "Sex",
          content: this.registrant.citizen.sex,
        },
        {
          title: "Civil Status",
          content: this.registrant.citizen.civil_status,
        },
        {
          title: "Blood Type",
          content: this.registrant.citizen.blood_type,
        },
        {
          title: "Contact No",
          content: this.registrant.citizen.contact_number,
        },
        {
          title: "Tin No",
          content: this.registrant.citizen.tin_number,
        },
        {
          title: "Passport No",
          content: this.registrant.citizen.passport_number,
        },
      ];
    },
    emergency() {
      return [
        {
          title: "Full Name",
          content: this.registrant.citizen.emergency_name,
        },
        {
          title: "Contact No",
          content: this.registrant.citizen.emergency_number,
        },
      ];
    },
  },
};
</script>
<style scoped>
@media (max-width: 600px) {
  .font {
    font-size: 1.25rem;
    font-weight: normal;
  }
}
</style>
