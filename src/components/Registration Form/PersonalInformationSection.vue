<template>
  <v-container class="mx-auto mt-3 px-8">
    <v-row class="mt-3">
      <v-col cols="auto">
        <v-icon left>mdi-human-greeting-variant</v-icon>
        <span>Personal Information</span>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field
          :value="last_name"
          v-model="last_name"
          label="Last Name"
          @blur="$v.last_name.$touch()"
          :error-messages="errorMessages.last_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field
          :value="first_name"
          v-model="first_name"
          label="First Name"
          @blur="$v.first_name.$touch()"
          :error-messages="errorMessages.first_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field
          :value="middle_name"
          v-model="middle_name"
          label="Middle Name"
          @blur="$v.middle_name.$touch()"
          :error-messages="errorMessages.middle_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-combobox
          :value="suffix"
          v-model="suffix"
          label="Suffix"
          :items="suffixes"
          placeholder="Choose..."
          @blur="$v.suffix.$touch()"
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
              @blur="$v.birthday.$touch()"
              :error-messages="errorMessages.birthday"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="birthday"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-select
          :value="gender"
          v-model="gender"
          label="Sex"
          :items="genders"
          @blur="$v.gender.$touch()"
          :error-messages="errorMessages.gender"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-select
          :value="civil_status"
          v-model="civil_status"
          label="Civil Status"
          :items="civil_statuses"
          @blur="$v.civil_status.$touch()"
          :error-messages="errorMessages.civil_status"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field
          label="Place of Birth"
          v-model="place_of_birth"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field
          :value="contact_number"
          v-model="contact_number"
          label="Contact Number"
          type="number"
          @blur="$v.contact_number.$touch()"
          :error-messages="errorMessages.contact_number"
          counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-select
          :value="blood_type"
          v-model="blood_type"
          label="Blood Type"
          :items="blood_types"
          @blur="$v.blood_type.$touch()"
          :error-messages="errorMessages.blood_type"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field v-model="religion" label="Religion"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="6">
        <v-text-field v-model="nationality" label="Nationality"></v-text-field>
      </v-col>
      <!-- <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="emergency_name"
              v-model="emergency_name"
              label="Contact Person's Name"
              @blur="$v.emergency_name.$touch()"
              :error-messages="errorMessages.emergency_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-text-field
              :value="emergency_number"
              v-model="emergency_number"
              label="Contact Person's Number"
              type="number"
              @blur="$v.emergency_number.$touch()"
              :error-messages="errorMessages.emergency_number"
              counter="11"
            ></v-text-field>
          </v-col> -->
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="tin_number"
          v-model="tin_number"
          label="TIN"
          @blur="$v.tin_number.$touch()"
          :error-messages="errorMessages.tin_number"
          :counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-text-field
          :value="passport_number"
          v-model="passport_number"
          label="Passport Number"
          @blur="$v.passport_number.$touch()"
          :error-messages="errorMessages.passport_number"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import FormValidation from "@/mixins/FormValidation";
export default {
  name: "PersonalInformationSection",
  mixins: [FormValidation],
  data: () => ({
    last_name: null,
    first_name: null,
    middle_name: null,
    suffix: null,
    birthday: null,
    gender: null,
    civil_status: null,
    place_of_birth: null,
    contact_number: null,
    tin_number: null,
    blood_type: null,
    // emergency_name: null,
    // emergency_number: null,
    religion: null,
    nationality: null,
    suffixes: ["Sr.", "Jr.", "III", "IV", "V"],
    genders: ["MALE", "FEMALE"],
    civil_statuses: ["SINGLE", "MARRIED", "SEPARATED", "WIDOWED", "DIVORCED"],
    blood_types: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    type_of_ids: [
      "SSS",
      "GSIS",
      "TIN",
      "PASSPORT",
      "DRIVERS LICENSE",
      "PRC LICENSE",
      "VOTERS ID",
      "PHILHEALTH",
      "PAG-IBIG",
    ],
  }),
  computed: {
    formattedDate() {
      return this.data.birthday
        ? format(parseISO(this.data.birthday), "MMMM d, yyyy")
        : "";
    },
  }
};
</script>

<style></style>
