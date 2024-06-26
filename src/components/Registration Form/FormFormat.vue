<template>
  <div>
    <v-stepper
      v-model="stepper"
      outlined
      :non-linear="nonLinearFunction.linear"
    >
      <v-stepper-header class="elevation-0">
        <v-stepper-step
          :complete="stepper > 1"
          step="1"
          :editable="nonLinearFunction.category"
        >
          Category
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="stepper > 2"
          step="2"
          :editable="nonLinearFunction.personal_information"
        >
          Personal Details
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="stepper > 3"
          step="3"
          :editable="nonLinearFunction.address"
        >
          Address
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="stepper > 4"
          step="4"
          :editable="nonLinearFunction.emergency"
        >
          Emergency Contact
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="stepper > 5"
          step="5"
          :editable="nonLinearFunction.employment"
        >
          Employment Details
        </v-stepper-step>
      </v-stepper-header>

      <v-divider />

      <v-stepper-items>
        <v-stepper-content step="1">
          <CategorySection
            ref="category"
            :editData="CategorySectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <PersonalInformationSection
            ref="personalInformation"
            :editData="PersonalInformationSectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <AddressSection
            ref="address"
            :editData="AddressSectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <EmergencySection
            ref="emergency"
            :editData="EmergencySectionEditData"
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="5">
          <EmploymentSection
            :editData="EmploymentSectionEditData"
            v-on:data="submitForm"
          />
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
import { mapGetters, mapActions, mapState } from "vuex";
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
    ...mapState("registrants", {
      registrant: "registrant",
    }),
    ...mapGetters("philippines", [
      "getBarangays",
      "getRegions",
      "getMunicipalities",
      "getProvinces",
      "getCountries",
    ]),
    CategorySectionEditData() {
      if (this.category) {
        const data = {
          category: this.category.citizen.category.description,
          identification_card: this.category.citizen.identification_card.name,
          type_of_id: this.category.citizen.type_of_id,
          other_id: this.category.citizen.other_id,
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
          employer_contact_number:
            this.employment.citizen.employer_contact_number,
          employment_status: this.employment.citizen.employment_status,
          other_employment_status:
            this.employment.citizen.other_employment_status,
          occupation: this.employment.citizen.occupation,
          profession_id: this.employment.citizen.profession_id,
          other_profession: this.employment.citizen.other_profession,
          philhealth_id_number: this.employment.citizen.philhealth_id_number,
        };
        return data;
      }
      return null;
    },
    nonLinearFunction() {
      let linear = false;
      let category = false;
      let personal_information = false;
      let address = false;
      let emergency = false;
      let employment = false;
      // return this.id ? true : false;

      if (this.id) {
        linear = true;
        category = true;
        personal_information = true;
        address = true;
        emergency = true;
        employment = true;
      } else {
        linear = true;
        if (this.stepper > 1) {
          category = true;
        }
        if (this.stepper > 2) {
          personal_information = true;
        }
        if (this.stepper > 3) {
          address = true;
        }
        if (this.stepper > 4) {
          emergency = true;
          employment = true;
        }
      }

      return {
        linear: linear,
        category: category,
        personal_information: personal_information,
        address: address,
        emergency: emergency,
        employment: employment,
      };
    },
  },
  methods: {
    ...mapActions("professions", ["fetchEnumProfessions"]),
    ...mapActions("philippines", [
      "fetchRegions",
      "fetchProvinces",
      "fetchMunicipalities",
      "fetchBarangays",
      "fetchCountries",
    ]),
    ...mapActions("categories", ["fetchEnumCategories"]),
    ...mapActions("identification_cards", ["fetchEnumIdentificationCards"]),
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
      if (this.registrant) {
        //Call all payloads
        this.$refs.category.asyncPayload();
        this.$refs.personalInformation.asyncPayload();
        this.$refs.address.asyncPayload();
        this.$refs.emergency.asyncPayload();

        //Finish the Editing Process
        const parsedData = data;
        for (const key in parsedData) {
          if (Object.hasOwnProperty.call(parsedData, key)) {
            this.data[key] = parsedData[key];
          }
        }
        this.$emit("submitData", this.data);
      } else {
        const parsedData = data;
        for (const key in parsedData) {
          if (Object.hasOwnProperty.call(parsedData, key)) {
            this.data[key] = parsedData[key];
          }
        }
        this.$emit("submitData", this.data);
      }
    },
    updatedData(data) {
      const parsedData = data;
      for (const key in parsedData) {
        if (Object.hasOwnProperty.call(parsedData, key)) {
          this.data[key] = parsedData[key];
        }
      }
      // console.log("Passed Data", this.data);
    },
    updateStepper(stepper) {
      this.stepper = stepper;
    },
    fetchEnums() {
      this.fetchEnumCategories();
      this.fetchEnumIdentificationCards();
      this.fetchEnumProfessions();
    },
  },
  watch: {
    registrant(value) {
      this.category = value;
      this.personal_information = value;
      this.address = value;
      this.emergency = value;
      this.employment = value;
    },
  },
  created() {
    this.fetchEnums();
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
