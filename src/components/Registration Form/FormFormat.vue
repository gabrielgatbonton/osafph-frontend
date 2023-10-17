<template>
  <div>
    <v-stepper v-model="stepper" elevation="0" non-linear>
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1">
          Category
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 2" step="2">
          Personal Details
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 3" step="3">
          Address
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 4" step="4">
          Emergency Contact
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 5" step="5">
          Employment Details
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <CategorySection />
          <v-btn
          color="primary"
          @click="stepper = 2"
        >
          Continue
        </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <PersonalInformationSection />
        </v-stepper-content>
        <v-stepper-content step="3">

        </v-stepper-content>
        <v-stepper-content step="4">

        </v-stepper-content>
        <v-stepper-content step="5">

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-container class="mx-auto mt-3 px-8">
        
        <v-divider class="mx-auto my-3"></v-divider>
        <v-row class="mt-3">
          <v-col cols="auto">
            <v-icon left>mdi-map-marker</v-icon>
            <span>Address</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-text-field
              :value="data.address"
              v-model="data.address"
              label="Unit/Building/House No./Purok/Street/Subdivision"
              @blur="$v.data.address.$touch()"
              :error-messages="errorMessages.address"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="6" md="6">
            <v-autocomplete
              :value="selects.region"
              v-model="selects.region"
              label="Region"
              :items="getRegions"
              item-text="region_name"
              item-value="id"
              @blur="$v.data.region.$touch()"
              :error-messages="errorMessages.region"
              @change="(id) => initProvinces(id)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-autocomplete
              :value="selects.province"
              v-model="selects.province"
              label="Province"
              :items="getProvinces"
              item-text="province_name"
              item-value="id"
              @blur="$v.data.province.$touch()"
              :error-messages="errorMessages.province"
              @change="(id) => initMunicipalities(id)"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="6" md="6">
            <v-autocomplete
              :value="selects.municipality"
              v-model="selects.municipality"
              label="Municipality"
              :items="getMunicipalities"
              item-text="municipality_name"
              item-value="id"
              @blur="$v.data.municipality.$touch()"
              :error-messages="errorMessages.municipality"
              @change="(id) => initBarangays(id)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-autocomplete
              :value="selects.barangay"
              v-model="selects.barangay"
              label="Barangay"
              :items="getBarangays"
              item-text="barangay_name"
              item-value="id"
              @blur="$v.data.barangay.$touch()"
              :error-messages="errorMessages.barangay"
              @change="(id) => setBarangay(id)"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-text-field label="Country" v-model="data.country"></v-text-field>
          </v-col>
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
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormValidation from "@/mixins/FormValidation";
import CategorySection from './CategorySection.vue';
import PersonalInformationSection from "./PersonalInformationSection.vue";
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
  mixins: [FormValidation],
  components: {
    CategorySection,
    PersonalInformationSection
  },
  data: () => ({
    data: {
      address: null,
      province: null,
      municipality: null,
      barangay: null,
      region: null,
      country: null,
      mcg_cares_card: null,
    },
    selects: {
      province: null,
      municipality: null,
      barangay: null,
      region: null,
    },
    // value: null,
    menu: false,
    stepper: 1,
  }),
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    ...mapGetters("philippines", [
      "getBarangays",
      "getRegions",
      "getMunicipalities",
      "getProvinces",
    ]),

  },
  methods: {
    ...mapActions("philippines", [
      "fetchRegions",
      "fetchProvinces",
      "fetchMunicipalities",
      "fetchBarangays",
      "fetchPhilippines",
    ]),

    async fetchRegistrant() {
      if (this.id) {
        try {
          await this.$store.dispatch("registrants/fetchRegistrantId", this.id);
        } catch (error) {
          console.error("Error fetching registrant: EditView", error);
        }
      }
    },
    submitForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit("submitData", this.data);
      }
    },
    initProvinces(id) {
      this.fetchProvinces(id);
      const data = this.getRegions.find((region) => region.id === id);
      if (data) {
        this.data.region = data.region_name;
      }
    },
    initMunicipalities(id) {
      this.fetchMunicipalities(id);
      const data = this.getProvinces.find((province) => province.id === id);
      if (data) {
        this.data.province = data.province_name;
      }
    },
    initBarangays(id) {
      this.fetchBarangays(id);
      const data = this.getMunicipalities.find(
        (municipality) => municipality.id === id
      );
      if (data) {
        this.data.municipality = data.municipality_name;
      }
    },
    setBarangay(id) {
      const data = this.getBarangays.find((barangay) => barangay.id === id);
      if (data) {
        this.data.barangay = data.barangay_name;
      }
    },
  },
  watch: {
    getRegistrant(value) {
      // console.log("watch:", value);
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
        this.data.province =
          value.citizen.barangay.municipality.province.province_name;
        this.data.municipality =
          value.citizen.barangay.municipality.municipality_name;
        this.data.barangay = value.citizen.barangay.barangay_name;
        this.data.region =
          value.citizen.barangay.municipality.province.region.region_name;

        const region = this.getRegions.find(
          (region) => region.region_name === this.data.region
        );
        if (region) {
          this.selects.region = region.id;
        }

        const province = this.getProvinces.find(
          (province) => province.province_name === this.data.province
        );
        if (province) {
          this.selects.province = province.id;
        }

        const municipality = this.getMunicipalities.find(
          (municipality) =>
            municipality.municipality_name === this.data.municipality
        );
        if (municipality) {
          this.selects.municipality = municipality.id;
        }

        const barangay = this.getBarangays.find(
          (barangay) => barangay.barangay_name === this.data.barangay
        );
        if (barangay) {
          this.selects.barangay = barangay.id;
        }
      }
    },
  },
  created() {
    this.fetchRegions();

  },
  mounted() {
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
