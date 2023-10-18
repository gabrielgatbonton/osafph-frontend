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
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <AddressSection
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <EmergencySection
            v-on:data="updatedData"
            v-on:stepper="updateStepper"
          />
        </v-stepper-content>
        <v-stepper-content step="5">
          <EmploymentSection v-on:data="submitForm" />
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
  }),
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    CategorySectionEditData() {
      
if (this.id) {
        if (this.category) {
          const data = {
            category: this.category.citizen.category.description,
            identification_card_id:
              this.category.citizen.identification_card_id,
            type_of_id: this.category.citizen.type_of_id,
            other_id: this.category.citizen.other_id,
            hub_registrant_number: this.category.citizen.hub_registrant_number,
            id_number: this.category.citizen.id_number,
          };
          return data;
        }
      }
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
      console.log("watch:", value);
      if (this.id) {
        this.data.category = value.citizen.category.description;
        this.data.hub_registrant_number = value.citizen.hub_registrant_number;
        this.data.passport_number = value.citizen.passport_number;
        this.data.last_name = value.citizen.last_name;
        this.data.first_name = value.citizen.first_name;
        this.data.middle_name = value.citizen.middle_name;
        this.data.suffix = value.citizen.suffix;
        this.data.birthday = value.citizen.birthday;
        this.data.gender = value.citizen.gender;
        this.data.civil_status = value.citizen.civil_status;
        this.data.contact_number = value.citizen.contact_number;
        this.data.tin_number = value.citizen.tin_number;
        this.data.blood_type = value.citizen.blood_type;
        this.data.emergency_name = value.citizen.emergency_name;
        this.data.emergency_number = value.citizen.emergency_number;
        this.data.address = value.citizen.address;
        this.data.mcg_cares_card = value.citizen.mcg_cares_card;
        //Data for New Variables
        // this.data.religion = value.citizen.religion;
        // this.data.nationality = value.citizen.nationality;
        // this.data.occupation = value.citizen.occupation;

        //Selects
        // this.data.province =
        //   value.citizen.barangay.municipality.province.province_name;
        // this.data.municipality =
        //   value.citizen.barangay.municipality.municipality_name;
        // this.data.barangay = value.citizen.barangay.barangay_name;
        // this.data.region =
        //   value.citizen.barangay.municipality.province.region.region_name;

        // const region = this.getRegions.find(
        //   (region) => region.region_name === this.data.region
        // );
        // if (region) {
        //   this.selects.region = region.id;
        // }

        // const province = this.getProvinces.find(
        //   (province) => province.province_name === this.data.province
        // );
        // if (province) {
        //   this.selects.province = province.id;
        // }

        // const municipality = this.getMunicipalities.find(
        //   (municipality) =>
        //     municipality.municipality_name === this.data.municipality
        // );
        // if (municipality) {
        //   this.selects.municipality = municipality.id;
        // }

        // const barangay = this.getBarangays.find(
        //   (barangay) => barangay.barangay_name === this.data.barangay
        // );
        // if (barangay) {
        //   this.selects.barangay = barangay.id;
        // }
      }
    },
  },
  mounted() {
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
