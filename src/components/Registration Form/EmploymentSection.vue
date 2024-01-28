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
          :value="data.employer_name"
          v-model="data.employer_name"
          label="Employer Name"
          @blur="$v.data.employer_name.$touch()"
          :error-messages="errorMessages.employer_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="data.employer_address"
          v-model="data.employer_address"
          label="Employer Address"
          @blur="$v.data.employer_address.$touch()"
          :error-messages="errorMessages.employer_address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="data.employer_contact_number"
          v-model="data.employer_contact_number"
          type="number"
          label="Employer Contact Number"
          counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-autocomplete
          :value="data.employment_status"
          v-model="data.employment_status"
          label="Employment Status"
          :items="statuses"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3" v-if="data.employment_status === 'OTHERS'">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          :value="data.other_employment_status"
          v-model="data.other_employment_status"
          label="Other Employement Status"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          :value="data.occupation"
          v-model="data.occupation"
          label="Occupation"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-autocomplete
          :value="data.profession"
          v-model="data.profession"
          label="Profession"
          item-text="name"
          :items="getProfessions"
          @blur="$v.data.profession.$touch()"
          :error-messages="errorMessages.profession"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3" v-if="data.profession === 'OTHERS'">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          :value="data.other_profession"
          v-model="data.other_profession"
          label="Other Profession"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-text-field
          label="Philhealth ID Number"
          v-model="data.philhealth_id_number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12">
        <v-btn dark block class="blue darken-4" @click="continueForm"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EmploymentSectionValidation from "@/mixins/Validation/RegistrationFormValidation/EmploymentSectionValidation";
export default {
  name: "EmploymentSection",
  mixins: [EmploymentSectionValidation],
  props: {
    editData: {
      required: false,
    },
  },
  data: () => ({
    data: {
      employer_name: null,
      employer_address: null,
      employer_contact_number: null,
      employment_status: null,
      other_employment_status: null,
      occupation: null,
      profession: null,
      other_profession: null,
      philhealth_id_number: null,
    },
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
    continueForm() {
      // console.log(this.data)
      if (
        this.editData &&
        this.editData.philhealth_id_number === this.data.philhealth_id_number
      ) {
        delete this.data.philhealth_id_number;
      }
      this.$emit("data", this.data);
    },
    findProfessionOnEdit() {
      if (this.editData) {
        const data = this.getProfessions.find(
          (profession) => profession.id === this.editData.profession_id
        );
        if (data) {
          this.data.profession = data.name;
        }
      }
    },
  },
  computed: {
    ...mapGetters("professions", ["getProfessions"]),
  },
  created() {
    this.fetchProfessions().then(() => {
      this.findProfessionOnEdit();
    });
  },
  watch: {
    editData(value) {
      this.data = Object.assign({}, this.data, value);
    },
  },
};
</script>

<style scoped></style>