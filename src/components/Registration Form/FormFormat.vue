<template>
  <div>
    <v-stepper v-model="stepper" elevation="0" non-linear>
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1" editable>
          Category
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 2" step="2" editable>
          Personal Details
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 3" step="3" editable>
          Address
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 4" step="4" editable>
          Emergency Contact
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 5" step="5" editable>
          Employment Details
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <CategorySection
            :editData="CategorySectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <PersonalInformationSection
            :editData="PersonalInformationSectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <AddressSection
            :editData="AddressSectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <EmergencySection
            :editData="EmergencySectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="5">
          <EmploymentSection :editData="EmploymentSectionEditData" v-on:data="submitForm" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <!-- <v-container class="mx-auto mt-3 px-8">
      <v-row class="mt-n3">
        <v-col cols="12">
          <v-btn
            dark
            block
            class="blue darken-4"
            :loading="loading"
            @click="submitForm"
            >Save</v-btn
          >
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategorySection from "./CategorySection.vue";
import PersonalInformationSection from "./PersonalInformationSection.vue";
import AddressSection from "./AddressSection.vue";
import EmergencySection from "./EmergencySection.vue";
import EmploymentSection from "./EmploymentSection.vue";
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
  },
  components: {
    CategorySection,
    PersonalInformationSection,
    AddressSection,
    EmergencySection,
    EmploymentSection,
  },
  data: () => ({
    data: {
      mcg_cares_card: null,
    },
    // value: null,
    stepper: 1,
    category: null,
    personal_information: null,
    address: null,
    emergency: null,
    employment: null,
  }),
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    CategorySectionEditData() {
      if (this.category) {
        const data = {
          category: this.category.citizen.category.description,
          identification_card_id: this.category.citizen.identification_card_id,
          type_of_id: this.category.citizen.type_of_id,
          other_id: this.category.citizen.other_id,
          hub_registrant_number: this.category.citizen.hub_registrant_number,
          id_number: this.category.citizen.id_number,
        };
        return data;
      }
      return null;
    },
    PersonalInformationSectionEditData() {
      if (this.personal_information) {
        const data = {
          last_name: this.personal_information.citizen.last_name,
          first_name: this.personal_information.citizen.first_name,
          middle_name: this.personal_information.citizen.middle_name,
          suffix: this.personal_information.citizen.suffix,
          birthday: this.personal_information.citizen.birthday,
          sex: this.personal_information.citizen.sex,
          civil_status: this.personal_information.citizen.civil_status,
          place_of_birth: this.personal_information.citizen.place_of_birth,
          contact_number: this.personal_information.citizen.contact_number,
          tin_number: this.personal_information.citizen.tin_number,
          passport_number: this.personal_information.citizen.passport_number,
          blood_type: this.personal_information.citizen.blood_type,
          religion: this.personal_information.citizen.religion,
          nationality: this.personal_information.citizen.nationality,
        };
        return data;
      }
      return null;
    },
    AddressSectionEditData() {
      if (this.address) {
        const data = {
          address: this.address.citizen.address,
          province:
            this.address.citizen.barangay.municipality.province.province_name,
          municipality:
            this.address.citizen.barangay.municipality.municipality_name,
          barangay: this.address.citizen.barangay.barangay_name,
          region:
            this.address.citizen.barangay.municipality.province.region
              .region_name,
          country:
            this.address.citizen.barangay.municipality.province.region.country
              .country_name,
        };
        return data;
      }
      return null;
    },
    EmergencySectionEditData() {
      if (this.emergency) {
        const data = {
          emergency_name: this.emergency.citizen.emergency_name,
          emergency_number: this.emergency.citizen.emergency_number,
        };
        return data;
      }
      return null;
    },
    EmploymentSectionEditData() {
      if (this.employment) {
        const data = {
          employer_name: this.employment.citizen.employer_name,
          employer_address: this.employment.citizen.employer_address,
          employer_contact_number: this.employment.citizen.employer_contact_number,
          employment_status: this.employment.citizen.employment_status,
          other_employment_status: this.employment.citizen.other_employment_status,
          occupation: this.employment.citizen.occupation,
          profession_id: this.employment.citizen.profession_id,
          other_profession: this.employment.citizen.other_profession,
          philhealth_id_number: this.employment.citizen.philhealth_id_number,
        };
        console.log("Employment",data)
        return data;
      }
      return null;
    },
  },
  methods: {
    async fetchRegistrant() {
      if (this.id) {
        try {
          await this.$store.dispatch("registrants/fetchRegistrantId", this.id);
        } catch (error) {
          console.error("Error fetching registrant: EditView", error);
        }
      }
    },
    submitForm(data) {
      // this.$v.$touch();

      const parsedData = data;
      for (const key in parsedData) {
        if (Object.hasOwnProperty.call(parsedData, key)) {
          this.data[key] = parsedData[key];
        }
      }

      // if (!this.$v.$invalid) {
      this.$emit("submitData", this.data);
      // }
    },
    updatedData(data) {
      const parsedData = data;
      for (const key in parsedData) {
        if (Object.hasOwnProperty.call(parsedData, key)) {
          this.data[key] = parsedData[key];
        }
      }
      console.log("Passed Data", this.data);
    },
    updateStepper(stepper) {
      this.stepper = stepper;
    },
  },
  watch: {
    getRegistrant(value) {
      this.category = value;
      this.personal_information = value;
      this.address = value;
      this.emergency = value;
      this.employment = value;
      console.log("watch:", value);
    },
  },
  created() {
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
