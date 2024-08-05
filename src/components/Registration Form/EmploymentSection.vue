<template>
  <v-container class="mx-auto">
    <v-row class="mb-5">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="20" color="primary">mdi-history</v-icon>
          <p class="text-subtitle-1 font-weight-bold pa-0 my-0 ml-2">
            Employment Details
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          :value="data.employer_name"
          v-model="data.employer_name"
          label="Employer Name"
          @blur="$v.data.employer_name.$touch()"
          :error-messages="errorMessages.employer_name"
          outlined
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          :value="data.employer_address"
          v-model="data.employer_address"
          label="Employer Address"
          @blur="$v.data.employer_address.$touch()"
          :error-messages="errorMessages.employer_address"
          outlined
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          :value="data.employer_contact_number"
          v-model="data.employer_contact_number"
          outlined
          type="number"
          label="Employer Contact Number"
          counter="11"
          @blur="$v.data.employer_contact_number.$touch()"
          :error-messages="errorMessages.employer_contact_number"
          hide-spin-buttons
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="data.employment_status"
          v-model="data.employment_status"
          outlined
          label="Employment Status"
          :items="statuses"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="mt-n5"
        v-if="data.employment_status === 'OTHERS'"
      >
        <v-text-field
          :value="data.other_employment_status"
          v-model="data.other_employment_status"
          outlined
          label="Other Employement Status"
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          :value="data.occupation"
          v-model="data.occupation"
          outlined
          label="Occupation"
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="data.profession"
          v-model="data.profession"
          outlined
          label="Profession"
          item-text="name"
          :items="professions_enum"
          @blur="$v.data.profession.$touch()"
          :error-messages="errorMessages.profession"
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5" v-if="data.profession === 'OTHERS'">
        <v-text-field
          :value="data.other_profession"
          v-model="data.other_profession"
          outlined
          label="Other Profession"
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          label="Philhealth ID Number"
          v-model="data.philhealth_id_number"
          outlined
          type="number"
          hide-spin-buttons
        />
      </v-col>

      <v-col cols="12">
        <div class="w-full d-flex">
          <v-btn class="primary ml-auto" @click="continueForm">Submit</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
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
    continueForm() {
      this.$v.$touch();

      if (
        this.editData &&
        this.editData.philhealth_id_number === this.data.philhealth_id_number
      ) {
        delete this.data.philhealth_id_number;
      }

      if (!this.$v.$invalid) {
        this.$emit("data", this.data);
      }
    },
    findProfessionOnEdit() {
      if (this.editData) {
        const data = this.professions_enum.find(
          (profession) => profession.id === this.editData.profession_id
        );
        if (data) {
          this.data.profession = data.name;
          console.log(this.data.profession);
        }
      }
    },
  },
  computed: {
    ...mapState("professions", {
      professions_enum: "professions",
    }),
  },
  watch: {
    editData(value) {
      if (this.professions_enum && value) {
        this.data = Object.assign({}, this.data, value);
        this.findProfessionOnEdit();
      }
    },
  },
};
</script>

<style scoped></style>
