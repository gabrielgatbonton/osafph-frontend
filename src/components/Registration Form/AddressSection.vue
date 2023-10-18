<template>
  <v-container class="mx-auto mt-3 px-8">
    <v-row class="mt-3">
      <v-col cols="auto">
        <v-icon left>mdi-map-marker</v-icon>
        <span>Address</span>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12">
        <v-text-field
          :value="address"
          v-model="address"
          label="Unit/Building/House No./Purok/Street/Subdivision"
          @blur="$v.address.$touch()"
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
          @blur="$v.region.$touch()"
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
          @blur="$v.province.$touch()"
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
          @blur="$v.municipality.$touch()"
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
          @blur="$v.barangay.$touch()"
          :error-messages="errorMessages.barangay"
          @change="(id) => setBarangay(id)"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12">
        <v-text-field label="Country" v-model="country"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormValidation from "@/mixins/FormValidation";
export default {
  name: "AddressSection",
  mixins: [FormValidation],
  data: () => ({
    address: null,
    province: null,
    municipality: null,
    barangay: null,
    region: null,
    country: null,
    selects: {
      province: null,
      municipality: null,
      barangay: null,
      region: null,
    },
  }),
  methods: {
    ...mapActions("philippines", [
      "fetchRegions",
      "fetchProvinces",
      "fetchMunicipalities",
      "fetchBarangays",
      "fetchPhilippines",
    ]),
    initProvinces(id) {
      this.fetchProvinces(id);
      const data = this.getRegions.find((region) => region.id === id);
      if (data) {
        this.region = data.region_name;
      }
    },
    initMunicipalities(id) {
      this.fetchMunicipalities(id);
      const data = this.getProvinces.find((province) => province.id === id);
      if (data) {
        this.province = data.province_name;
      }
    },
    initBarangays(id) {
      this.fetchBarangays(id);
      const data = this.getMunicipalities.find(
        (municipality) => municipality.id === id
      );
      if (data) {
        this.municipality = data.municipality_name;
      }
    },
    setBarangay(id) {
      const data = this.getBarangays.find((barangay) => barangay.id === id);
      if (data) {
        this.barangay = data.barangay_name;
      }
    },
  },
  computed: {
    ...mapGetters("philippines", [
      "getBarangays",
      "getRegions",
      "getMunicipalities",
      "getProvinces",
    ]),
  },
  created() {
    this.fetchRegions();
  },
};
</script>

<style scoped></style>
