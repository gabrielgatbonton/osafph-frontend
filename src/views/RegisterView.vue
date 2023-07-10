<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">New Registrant</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-form ref="form">
      <v-container class="mx-auto mt-3 px-8">
        <v-row>
          <v-col cols="auto">
            <v-icon left>mdi-folder-multiple</v-icon>
            <span>Category</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-select
              v-model="category"
              label="Category"
              :items="categories"
              placeholder="Choose..."
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              v-model="hub_registrant_number"
              label="HUB Registrant Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-text-field
              v-model="passport_number"
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
            <v-text-field v-model="last_name" label="Last Name"></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              v-model="first_name"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              v-model="middle_name"
              label="Middle Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-combobox
              v-model="suffix"
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
                v-model="birthday"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select v-model="gender" label="Sex" :items="genders"></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              v-model="civil_status"
              label="Civil Status"
              :items="civil_statuses"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              v-model="contact_number"
              label="Contact Number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field v-model="tin_number" label="TIN"></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-select
              v-model="blood_type"
              label="Blood Type"
              :items="blood_types"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              v-model="emergency_name"
              label="Contact Person's Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              v-model="emergency_number"
              label="Contact Person's Number"
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
              v-model="address"
              label="Unit/Building/House No./Purok/Street/Subdivision"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" lg="4" md="4">
            <v-select
              v-model="province"
              label="Province"
              :items="provinces"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <v-select
              v-model="municipality"
              label="Municipality"
              :items="municipalites"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <v-select
              v-model="barangay"
              label="Barangay"
              :items="barangays"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-btn dark block class="blue" :loading="loading" @click="submit"
              >Save</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { mapActions } from "vuex";
export default {
  data: () => ({
    category: "",
    hub_registrant_number: "",
    passport_number: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    suffix: "",
    birthday: null,
    gender: "",
    civil_status: "",
    contact_number: "",
    tin_number: "",
    blood_type: "",
    emergency_name: "",
    emergency_number: "",
    address: "",
    province: "",
    municipality: "",
    barangay: "",
    categories: [
      "REST OF ADULT POPULATION (ROAP)",
      "FRONTLINE HEALTH SERVICES (A1)",
      "ALL SENIOR CITIZENS (A2)",
      "PERSON WITH COMORBIDITIES (A3)",
      "FRONTLINE PERSONNEL (A4)",
    ],
    suffixes: ["Sr.", "Jr.", "III", "IV", "V"],
    genders: ["Male", "Female"],
    civil_statuses: ["Single", "Married", "Divorced", "Widowed"],
    blood_types: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    provinces: ["PAMPANGA", "Tarlac", "Nueva Ecija", "Bulacan"],
    municipalites: ["MABALACAT CITY", "Angeles City"],
    barangays: ["DAU", "San Francisco", "Atlu-Bola"],
    value: null,
    menu: false,
    loading: false,
  }),
  computed: {
    formattedDate() {
      return this.birthday
        ? format(parseISO(this.birthday), "MMMM d, yyyy")
        : "";
    },
  },
  methods: {
    ...mapActions("registrants", ["addRegistrant"]),
    closeDatePicker() {
      this.datePickerVisible = false;
    },
    async submit() {
      try {
        this.loading = true;

        // Prepare the data object to be sent in the POST request
        const data = {
          category: this.category,
          hub_registrant_number: this.hub_registrant_number,
          passport_number: this.passport_number,
          last_name: this.last_name,
          first_name: this.first_name,
          middle_name: this.middle_name,
          suffix: this.suffix,
          gender: this.gender,
          birthday: format(parseISO(this.birthday), "yyyy-MM-dd"), //MMMM d, yyyy
          civil_status: this.civil_status,
          contact_number: this.contact_number,
          tin_number: this.tin_number,
          blood_type: this.blood_type,
          emergency_name: this.emergency_name,
          emergency_number: this.emergency_number,
          address: this.address,
          province: this.province,
          barangay: this.barangay,
          municipality: this.municipality,
          mcg_cares_card: "UNCLAIMED",
        };

        // Dispatch the 'addRegistrant' action from the Vuex store
        await this.$store.dispatch("registrants/addRegistrant", data);

        // Assuming the response contains the newly created registrant object
        this.loading = false;
        this.$router.push({ name: "citizens" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>
