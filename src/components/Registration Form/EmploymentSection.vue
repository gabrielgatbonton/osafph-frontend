<template>
  <v-container class="mx-auto mt-3 px-8">
    <v-row>
      <v-col cols="auto">
        <v-icon left>mdi-history</v-icon>
        <span>Employment Details</span>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="employer_name"
          v-model="employer_name"
          label="Employer Name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="employer_address"
          v-model="employer_address"
          label="Employer Address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="employer_contact_number"
          v-model="employer_contact_number"
          type="number"
          label="Employer Contact Number"
          counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-autocomplete
          :value="employment_status"
          v-model="employment_status"
          label="Employment Status"
          :items="statuses"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3" v-if="employment_status === 'OTHERS'">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-autocomplete
          :value="other_employment_status"
          v-model="other_employment_status"
          label="Other Employemnt Status"
          :items="statuses"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          :value="occupation"
          v-model="occupation"
          label="Occupation"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-autocomplete
          :value="profession"
          v-model="profession"
          label="Profession"
          item-text="name"
          :items="getProfessions"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3" v-if="profession ==='OTHERS'">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          :value="other_profession"
          v-model="other_profession"
          label="Other Profession"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          label="Philhealth ID Number"
          v-model="philhealth_id_number"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EmploymentSection",
  data: () => ({
    employer_name: null,
    employer_address: null,
    employer_contact_number: null,
    employment_status: null,
    other_employment_status: null,
    occupation: null,
    profession: null,
    other_profession: null,
    philhealth_id_number: null,
    statuses: [
      "GOVERNMENT EMPLOYED",
      "PRIVATE EMPLOYED",
      "SELF-EMPLOYED",
      "PRIVATE PRACTITIONER",
      "OTHERS",
    ],
  }),
  methods: {
    ...mapActions("professions", ["fetchProfessions"]),
  },
  computed: {
    ...mapGetters("professions", ["getProfessions"]),
  },
  created() {
    this.fetchProfessions();
  },
};
</script>

<style scoped></style>
