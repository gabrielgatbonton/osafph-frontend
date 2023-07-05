<template>
  <div>
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">New Registrant</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-form>
      <v-container class="mx-auto mt-3 px-8">
        <v-row>
          <v-col cols="auto">
            <v-icon left>mdi-folder-multiple</v-icon>
            <span>Category</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-select label="Category" :items="categories" placeholder="Choose..."></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12" lg="6" md="6">
            <v-text-field label="HUB Registrant Number"></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <v-text-field label="Passport Number"></v-text-field>
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
          <v-col cols="3">
            <v-text-field label="Last Name"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="First Name"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Middle Name"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-combobox label="Category" :items="suffixes" placeholder="Choose..."></v-combobox>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="3">
            <v-menu max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field :value="formattedDate" v-on="on" v-bind="attrs" label="Birthday"></v-text-field>
              </template>
              <v-date-picker reactive v-model="birthday"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <v-select label="Sex" :items="sex"></v-select>
          </v-col>
          <v-col cols="3">
            <v-select label="Civil Status" :items="civil_status"></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Contact Number"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="3">
            <v-text-field label="TIN"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select label="Blood Type" :items="blood_type"></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Contact Person's Name"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Contact Person's Number"></v-text-field>
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
            <v-text-field label="Unit/Building/House No./Purok/Street/Subdivision"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="4">
            <v-select label="Province" :items="provinces"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select label="Municipality" :items="municipalites"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select label="Barangay" :items="barangays"></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default {
  data: () => ({
    categories: [
      "REST OF ADULT POPULATION (ROAP)",
      "FRONTLINE HEALTH SERVICES (A1)",
      "ALL SENIOR CITIZENS (A2)",
      "PERSON WITH COMORBIDITIES (A3)",
      "FRONTLINE PERSONNEL (A4)",
    ],
    suffixes: ["Sr.", "Jr.", "III", "IV", "V"],
    sex: ["Male", "Female"],
    civil_status: ["Single", "Married", "Divorced", "Widowed"],
    blood_type: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    value: null,
    birthday: null,
  }),
  computed: {
    formattedDate() {
      return this.birthday ? format(parseISO(this.birthday), 'do MMM yyyy') : ''
    }
  }
};
</script>

<style scoped></style>
