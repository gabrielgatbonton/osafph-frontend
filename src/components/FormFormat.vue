<template>
  <div>
    <v-container class="mx-auto mt-3 px-8">
      <v-form ref="form">
        <v-row>
          <v-col cols="auto">
            <v-icon left>mdi-folder-multiple</v-icon>
            <span>Category</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-select
              :value="data.category"
              v-model="data.category"
              label="Category"
              :items="getCategories"
              placeholder="Choose..."
              @blur="$v.data.category.$touch()"
              :error-messages="errorMessages.category"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              :value="data.hub_registrant_number"
              v-model="data.hub_registrant_number"
              label="HUB Registrant Number"
              @blur="$v.data.hub_registrant_number.$touch()"
              :error-messages="errorMessages.hub_registrant_number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              :value="data.passport_number"
              v-model="data.passport_number"
              label="Passport Number"
              @blur="$v.data.passport_number.$touch()"
              :error-messages="errorMessages.passport_number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="mx-auto my-3"></v-divider>
        <v-row class="mt-3">
          <v-col cols="auto">
            <v-icon left>mdi-human-greeting-variant</v-icon>
            <span>Personal Information</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.last_name"
              v-model="data.last_name"
              label="Last Name"
              @blur="$v.data.last_name.$touch()"
              :error-messages="errorMessages.last_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.first_name"
              v-model="data.first_name"
              label="First Name"
              @blur="$v.data.first_name.$touch()"
              :error-messages="errorMessages.first_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.middle_name"
              v-model="data.middle_name"
              label="Middle Name"
              @blur="$v.data.middle_name.$touch()"
              :error-messages="errorMessages.middle_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-combobox
              :value="data.suffix"
              v-model="data.suffix"
              label="Suffix"
              :items="suffixes"
              placeholder="Choose..."
              @blur="$v.data.suffix.$touch()"
              :error-messages="errorMessages.suffix"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-menu
              max-width="290"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
              v-model="menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate"
                  v-on="on"
                  v-bind="attrs"
                  label="Birthday"
                  readonly
                  @blur="$v.data.birthday.$touch()"
                  :error-messages="errorMessages.birthday"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="data.birthday"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              :value="data.gender"
              v-model="data.gender"
              label="Sex"
              :items="genders"
              @blur="$v.data.gender.$touch()"
              :error-messages="errorMessages.gender"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              :value="data.civil_status"
              v-model="data.civil_status"
              label="Civil Status"
              :items="civil_statuses"
              @blur="$v.data.civil_status.$touch()"
              :error-messages="errorMessages.civil_status"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.contact_number"
              v-model="data.contact_number"
              label="Contact Number"
              type="number"
              @blur="$v.data.contact_number.$touch()"
              :error-messages="errorMessages.contact_number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.tin_number"
              v-model="data.tin_number"
              label="TIN"
              @blur="$v.data.tin_number.$touch()"
              :error-messages="errorMessages.tin_number"
              counter="12"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              :value="data.blood_type"
              v-model="data.blood_type"
              label="Blood Type"
              :items="blood_types"
              @blur="$v.data.blood_type.$touch()"
              :error-messages="errorMessages.blood_type"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.emergency_name"
              v-model="data.emergency_name"
              label="Contact Person's Name"
              @blur="$v.data.emergency_name.$touch()"
              :error-messages="errorMessages.emergency_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.emergency_number"
              v-model="data.emergency_number"
              label="Contact Person's Number"
              type="number"
              @blur="$v.data.emergency_number.$touch()"
              :error-messages="errorMessages.emergency_number"
            ></v-text-field>
          </v-col>
        </v-row>
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
            <v-select
              :value="data.province"
              v-model="data.province"
              label="Province"
              :items="provinces"
              @blur="$v.data.province.$touch()"
              :error-messages="errorMessages.province"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-select
              :value="data.municipality"
              v-model="data.municipality"
              label="Municipality"
              :items="municipalites"
              @blur="$v.data.municipality.$touch()"
              :error-messages="errorMessages.municipality"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-select
              :value="data.barangay"
              v-model="data.barangay"
              label="Barangay"
              :items="barangays"
              @blur="$v.data.barangay.$touch()"
              :error-messages="errorMessages.barangay"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-select
              :value="data.region"
              v-model="data.region"
              label="Barangay"
              :items="regions"
              @blur="$v.data.region.$touch()"
              :error-messages="errorMessages.region"
            ></v-select>
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
      </v-form>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import { isBefore, subYears } from "date-fns";
import parseISO from "date-fns/parseISO";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
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
  data: () => ({
    data: {
      category: null,
      hub_registrant_number: null,
      passport_number: null,
      last_name: null,
      first_name: null,
      middle_name: null,
      suffix: null,
      birthday: null,
      gender: null,
      civil_status: null,
      contact_number: null,
      tin_number: null,
      blood_type: null,
      emergency_name: null,
      emergency_number: null,
      address: null,
      province: null,
      municipality: null,
      barangay: null,
      region: null,
      mcg_cares_card: null,
    },
    suffixes: ["Sr.", "Jr.", "III", "IV", "V"],
    genders: ["MALE", "FEMALE"],
    civil_statuses: ["SINGLE", "MARRIED", "SEPARATED", "WIDOWED", "DIVORCED"],
    blood_types: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    provinces: ["PAMPANGA"],
    municipalites: ["MABALACAT CITY", "CITY OF ANGELES"],
    barangays: [
      "ATLU-BOLA",
      "BICAL",
      "BUNDAGUL",
      "CACUTUD",
      "CALUMPANG",
      "CAMACHILES",
      "DAPDAP",
      "DAU",
      "DOLORES",
      "DUQUIT",
      "LAKANDULA",
      "MABIGA",
      "MACAPAGAL VILLAGE",
      "MAMATITANG",
      "MANGALIT",
      "MARCOS VILLAGE",
      "MAWAQUE",
      "PARALAYUNAN",
      "POBLACION",
      "SAN FRANCISCO",
      "SAN JOAQUIN",
      "SANTA INES",
      "SANTA MARIA",
      "SANTO ROSARIO",
      "SAPANG BALEN",
      "SAPANG BIABAS",
      "TABUN",
      "CLARK FREEPORT ZONE",
    ],
    regions: [
      "REGION I (ILOCOS REGION)",
      "REGION II (CAGAYAN VALLEY)",
      "REGION III (CENTRAL LUZON)",
      "REGION IV-A (CALABARZON)",
      "REGION IV-B (MIMAROPA)",
      "REGION V (BIKOL REGION)",
      "REGION VI (WESTERN VISAYAS)",
      "REGION VII (CENTRAL VISAYAS)",
      "REGION VIII (EASTERN VISAYAS)",
      "REGION IX (ZAMBOANGA PENINSULA)",
      "REGION X (NORTHERN MINDANAO)",
      "REGION XI (DAVAO REGION)",
      "REGION XII (SOCCSKSARGEN)",
      "REGION XIII (CARAGA)",
      "CORDILLERA ADMINISTRATIVE REGION (CAR)",
      "NATIONAL CAPITAL REGION (NCR)",
      "BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO (BARMM)",
    ],
    // value: null,
    menu: false,
  }),
  validations: {
    data: {
      category: {
        required,
      },
      hub_registrant_number: {
        required,
      },
      passport_number: { required },
      last_name: { required },
      first_name: { required },
      middle_name: {},
      suffix: {},
      birthday: {
        required,
        validBirthday(value) {
          if (!value) return true; // Skip validation if no value provided
          const fiveYearsAgo = subYears(new Date(), 5);
          return isBefore(new Date(value), fiveYearsAgo);
        },
      },
      gender: { required },
      civil_status: { required },
      contact_number: { required, minLength: minLength(11) },
      tin_number: { maxLength: maxLength(12), minLength: minLength(9) },
      blood_type: { required },
      emergency_name: { required },
      emergency_number: {
        required,
        minLength: minLength(11),
        sameAsContactNumber: function (value) {
          return value !== this.data.contact_number;
        },
      },
      address: { required },
      province: { required },
      municipality: { required },
      barangay: { required },
      region: { required },
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    ...mapGetters("categories", ["getCategories"]),
    formattedDate() {
      return this.data.birthday
        ? format(parseISO(this.data.birthday), "MMMM d, yyyy")
        : "";
    },
    errorMessages() {
      const errors = {};

      // Category field errors
      errors.category = [];
      if (this.$v.data.category.$dirty) {
        !this.$v.data.category.required &&
          errors.category.push("Category is required");
      }

      // Hub Registrant Number field errors
      errors.hub_registrant_number = [];
      if (this.$v.data.hub_registrant_number.$dirty) {
        !this.$v.data.hub_registrant_number.required &&
          errors.hub_registrant_number.push(
            "HUB Registrant Number is required"
          );
      }

      // Passport Number field errors
      errors.passport_number = [];
      if (this.$v.data.passport_number.$dirty) {
        !this.$v.data.passport_number.required &&
          errors.passport_number.push("Passport Number is required");
      }

      // Name fields errors
      errors.last_name = [];
      if (this.$v.data.last_name.$dirty) {
        !this.$v.data.last_name.required &&
          errors.last_name.push("Last name is required");
      }

      errors.first_name = [];
      if (this.$v.data.first_name.$dirty) {
        !this.$v.data.first_name.required &&
          errors.first_name.push("First name is required");
      }

      errors.middle_name = [];
      if (this.$v.data.middle_name.$dirty) {
        // Middle name validations, if any
      }

      errors.suffix = [];
      if (this.$v.data.suffix.$dirty) {
        // Suffix validations, if any
      }

      // Birthday field errors
      errors.birthday = [];
      if (this.$v.data.birthday.$dirty) {
        !this.$v.data.birthday.required &&
          errors.birthday.push("Birthday is required");
        !this.$v.data.birthday.validBirthday &&
          errors.birthday.push("Birthday must be at least five years ago");
      }

      // Sex field errors
      errors.gender = [];
      if (this.$v.data.gender.$dirty) {
        !this.$v.data.gender.required && errors.gender.push("Sex is required");
      }

      // Civil Status field errors
      errors.civil_status = [];
      if (this.$v.data.civil_status.$dirty) {
        !this.$v.data.civil_status.required &&
          errors.civil_status.push("Civil Status is required");
      }

      // Contact Number field errors
      errors.contact_number = [];
      if (this.$v.data.contact_number.$dirty) {
        !this.$v.data.contact_number.required &&
          errors.contact_number.push("Contact Number is required");
        !this.$v.data.contact_number.minLength &&
          errors.contact_number.push(
            "A minimun number of 11 digits is required"
          );
      }

      // TIN field errors
      errors.tin_number = [];
      if (this.$v.data.tin_number.$dirty) {
        !this.$v.data.tin_number.maxLength &&
          errors.tin_number.push("TIN is capped 12 digits");
        !this.$v.data.tin_number.minLength &&
          errors.tin_number.push("TIN is required atleast 9 digits");
      }

      // Blood Type field errors
      errors.blood_type = [];
      if (this.$v.data.blood_type.$dirty) {
        !this.$v.data.blood_type.required &&
          errors.blood_type.push("Blood Type is required");
      }

      // Contact Person field errors
      errors.emergency_name = [];
      if (this.$v.data.emergency_name.$dirty) {
        !this.$v.data.emergency_name.required &&
          errors.emergency_name.push("Contact Name is required");
      }

      // Contact Person Number field errors
      errors.emergency_number = [];
      if (this.$v.data.emergency_number.$dirty) {
        !this.$v.data.emergency_number.required &&
          errors.emergency_number.push("Contact Number is required");
        !this.$v.data.emergency_number.minLength &&
          errors.emergency_number.push(
            "A minimun number of 11 digits is required"
          );
        !this.$v.data.emergency_number.sameAsContactNumber &&
          errors.emergency_number.push("Contact Number must not match");
      }

      // Address field errors
      errors.address = [];
      if (this.$v.data.address.$dirty) {
        !this.$v.data.address.required &&
          errors.address.push("Contact Number is required");
      }

      // Province field errors
      errors.province = [];
      if (this.$v.data.province.$dirty) {
        !this.$v.data.province.required &&
          errors.province.push("Province is required");
      }

      // Municipality field errors
      errors.municipality = [];
      if (this.$v.data.municipality.$dirty) {
        !this.$v.data.municipality.required &&
          errors.municipality.push("Province is required");
      }

      // Barangay field errors
      errors.barangay = [];
      if (this.$v.data.barangay.$dirty) {
        !this.$v.data.barangay.required &&
          errors.barangay.push("Province is required");
      }

      // Region field errors
      errors.region = [];
      if (this.$v.data.region.$dirty) {
        !this.$v.data.region.required &&
          errors.region.push("Region is required");
      }

      return errors;
    },
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
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
        this.data.province =
          value.citizen.barangay.municipality.province.province_name;
        this.data.municipality =
          value.citizen.barangay.municipality.municipality_name;
        this.data.barangay = value.citizen.barangay.barangay_name;
        this.data.mcg_cares_card = value.citizen.mcg_cares_card;
        this.data.region = value.citizen.barangay.municipality.province.region.region_name;
      }
    },
  },
  created(){
    this.fetchCategories();
  },
  mounted() {
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
