<template>
  <v-container class="mx-auto">
    <v-row class="mb-5">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="20" color="primary">mdi-map-marker</v-icon>
          <p class="text-subtitle-1 font-weight-bold pa-0 my-0 ml-2">Address</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="mt-n5">
        <v-text-field
          :value="data.address"
          v-model="data.address"
          label="Unit/Building/House No./Purok/Street/Subdivision"
          @blur="$v.data.address.$touch()"
          :error-messages="errorMessages.address"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          label="Country"
          v-model="selects.country"
          :items="getCountries"
          item-text="country_name"
          item-value="id"
          @change="(id) => initRegions(id)"
          @blur="$v.data.country.$touch()"
          :error-messages="errorMessages.country"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="selects.region"
          v-model="selects.region"
          label="Region"
          :items="getRegions"
          item-text="region_name"
          item-value="id"
          @blur="$v.data.region.$touch()"
          :error-messages="errorMessages.region"
          outlined
          @change="(id) => initProvinces(id)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="selects.province"
          v-model="selects.province"
          label="Province"
          :items="getProvinces"
          item-text="province_name"
          item-value="id"
          @blur="$v.data.province.$touch()"
          :error-messages="errorMessages.province"
          outlined
          @change="(id) => initMunicipalities(id)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="selects.municipality"
          v-model="selects.municipality"
          label="Municipality"
          :items="getMunicipalities"
          item-text="municipality_name"
          item-value="id"
          @blur="$v.data.municipality.$touch()"
          :error-messages="errorMessages.municipality"
          outlined
          @change="(id) => initBarangays(id)"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6" class="mt-n5">
        <v-autocomplete
          :value="selects.barangay"
          v-model="selects.barangay"
          label="Barangay"
          :items="getBarangays"
          item-text="barangay_name"
          item-value="id"
          @blur="$v.data.barangay.$touch()"
          :error-messages="errorMessages.barangay"
          outlined
          @change="(id) => setBarangay(id)"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12">
        <div class="w-full d-flex">
          <v-btn class="primary ml-auto" @click="continueForm">Proceed</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddressSectionValidation from "@/mixins/Validation/RegistrationFormValidation/AddressSectionValidation";
export default {
  name: "AddressSection",
  mixins: [AddressSectionValidation],
  props: {
    editData: {
      required: false,
    },
  },
  data: () => ({
    data: {
      address: null,
      province: null,
      municipality: null,
      barangay: null,
      region: null,
      country: null,
    },
    selects: {
      country: null,
      region: null,
      province: null,
      municipality: null,
      barangay: null,
    },
    stepper: 3,
  }),
  methods: {
    ...mapActions("philippines", [
      "fetchRegions",
      "fetchProvinces",
      "fetchMunicipalities",
      "fetchBarangays",
      "fetchCountries",
      "fetchEnumPhilippines",
    ]),
    initRegions(id) {
      this.fetchRegions(id);
      const data = this.getCountries.find((country) => country.id === id);
      if (data) {
        this.data.country = data.country_name;
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
    continueForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit("data", this.data);
        this.$emit("stepper", (this.stepper = 4));
      }
    },
    fetchLocations() {
      const country = this.getCountries.find(
        (country) => country.country_name === this.data.country
      );
      if (country) {
        this.selects.country = country.id;
      }
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
    },
    asyncPayload() {
      if (this.editData) {
        this.$emit("data", this.data);
      }
    },
    fetchEnums() {
      this.fetchEnumPhilippines();
    },
  },
  computed: {
    ...mapGetters("philippines", [
      "getBarangays",
      "getRegions",
      "getMunicipalities",
      "getProvinces",
      "getCountries",
    ]),
  },
  created() {
    this.fetchEnums();
  },
  watch: {
    editData(value) {
      this.data = value;
    },
  },
  updated() {
    this.fetchLocations();
  },
};
</script>

<style scoped></style>
