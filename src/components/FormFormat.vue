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
              :items="categories"
              placeholder="Choose..."
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              :value="data.hub_registrant_number"
              v-model="data.hub_registrant_number"
              label="HUB Registrant Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              :value="data.passport_number"
              v-model="data.passport_number"
              label="Passport Number"
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
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.first_name"
              v-model="data.first_name"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.middle_name"
              v-model="data.middle_name"
              label="Middle Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-combobox
              :value="data.suffix"
              v-model="data.suffix"
              label="Suffix"
              :items="suffixes"
              placeholder="Choose..."
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
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              :value="data.civil_status"
              v-model="data.civil_status"
              label="Civil Status"
              :items="civil_statuses"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.contact_number"
              v-model="data.contact_number"
              label="Contact Number"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.tin_number"
              v-model="data.tin_number"
              label="TIN"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              :value="data.blood_type"
              v-model="data.blood_type"
              label="Blood Type"
              :items="blood_types"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.emergency_name"
              v-model="data.emergency_name"
              label="Contact Person's Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="data.emergency_number"
              v-model="data.emergency_number"
              label="Contact Person's Number"
              type="number"
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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="4" md="4">
            <v-select
              :value="data.province"
              v-model="data.province"
              label="Province"
              :items="provinces"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <v-select
              :value="data.municipality"
              v-model="data.municipality"
              label="Municipality"
              :items="municipalites"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <v-select
              :value="data.barangay"
              v-model="data.barangay"
              label="Barangay"
              :items="barangays"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-btn
              dark
              block
              class="blue darken-4"
              :loading="loading"
              @click="$emit('submitData', data)"
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
import parseISO from "date-fns/parseISO";
import { mapGetters } from "vuex";
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
      mcg_cares_card: null,
    },
    categories: [
      "REST OF ADULT POPULATION (ROAP)",
      "FRONTLINE HEALTH SERVICES (A1)",
      "ALL SENIOR CITIZENS (A2)",
      "PERSON WITH COMORBIDITIES (A3)",
      "FRONTLINE PERSONNEL (A4)",
    ],
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
    // value: null,
    menu: false,
  }),
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    formattedDate() {
      return this.data.birthday
        ? format(parseISO(this.data.birthday), "MMMM d, yyyy")
        : "";
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
  },
  watch: {
    getRegistrant(value) {
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
        this.data.province =
          value.citizen.barangay.municipality.province.province_name;
        this.data.municipality =
          value.citizen.barangay.municipality.municipality_name;
        this.data.barangay = value.citizen.barangay.barangay_name;
        this.data.mcg_cares_card = value.citizen.mcg_cares_card;
      }
    },
  },
  mounted() {
    this.fetchRegistrant();
  },
};
</script>

<style scoped></style>
