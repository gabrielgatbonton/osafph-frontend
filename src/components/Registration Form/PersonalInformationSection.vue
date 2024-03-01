<template>
  <v-container class="mx-auto mt-3">
    <v-row class="mt-3">
      <v-col cols="auto">
        <v-icon left>mdi-human-greeting-variant</v-icon>
        <span>Personal Information</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          :value="data.last_name"
          v-model="data.last_name"
          label="Last Name"
          @blur="$v.data.last_name.$touch()"
          :error-messages="errorMessages.last_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          :value="data.first_name"
          v-model="data.first_name"
          label="First Name"
          @blur="$v.data.first_name.$touch()"
          :error-messages="errorMessages.first_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          :value="data.middle_name"
          v-model="data.middle_name"
          label="Middle Name"
          @blur="$v.data.middle_name.$touch()"
          :error-messages="errorMessages.middle_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
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
      <v-col cols="12" lg="3" md="3" sm="12">
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
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-select
          :value="data.sex"
          v-model="data.sex"
          label="Sex"
          :items="genders"
          @blur="$v.data.sex.$touch()"
          :error-messages="errorMessages.sex"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-select
          :value="data.civil_status"
          v-model="data.civil_status"
          label="Civil Status"
          :items="civil_statuses"
          @blur="$v.data.civil_status.$touch()"
          :error-messages="errorMessages.civil_status"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          label="Place of Birth"
          v-model="data.place_of_birth"
          @blur="$v.data.place_of_birth.$touch()"
          :error-messages="errorMessages.place_of_birth"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          :value="data.contact_number"
          v-model="data.contact_number"
          label="Contact Number"
          type="number"
          maxlength="11"
          @blur="$v.data.contact_number.$touch()"
          :error-messages="errorMessages.contact_number"
          counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-select
          :value="data.blood_type"
          v-model="data.blood_type"
          label="Blood Type"
          :items="blood_types"
          @blur="$v.data.blood_type.$touch()"
          :error-messages="errorMessages.blood_type"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field v-model="data.religion" label="Religion"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="12">
        <v-text-field
          v-model="data.nationality"
          label="Nationality"
          @blur="$v.data.nationality.$touch()"
          :error-messages="errorMessages.nationality"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-text-field
          :value="data.tin_number"
          v-model="data.tin_number"
          label="TIN"
          @blur="$v.data.tin_number.$touch()"
          :error-messages="errorMessages.tin_number"
          :counter="11"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-text-field
          :value="data.passport_number"
          v-model="data.passport_number"
          label="Passport Number"
          @blur="$v.data.passport_number.$touch()"
          :error-messages="errorMessages.passport_number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn dark block class="blue darken-4" @click="continueForm"
          >Proceed</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import PersonalInformationSectionValidation from "@/mixins/Validation/RegistrationFormValidation/PersonalInformationSectionValidation";
export default {
  name: "PersonalInformationSection",
  mixins: [PersonalInformationSectionValidation],
  props: {
    editData: {
      required: false,
    },
  },
  data: () => ({
    data: {
      last_name: null,
      first_name: null,
      middle_name: null,
      suffix: null,
      birthday: null,
      sex: null,
      civil_status: null,
      place_of_birth: null,
      contact_number: null,
      tin_number: null,
      passport_number: null,
      blood_type: null,
      religion: null,
      nationality: null,
    },
    suffixes: ["Sr.", "Jr.", "III", "IV", "V"],
    genders: ["MALE", "FEMALE"],
    civil_statuses: ["SINGLE", "MARRIED", "SEPARATED", "WIDOWED", "DIVORCED"],
    blood_types: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    menu: false,
    stepper: 2,
  }),
  methods: {
    continueForm() {
      this.$v.$touch();
      if (this.editData && this.editData.tin_number === this.data.tin_number) {
        delete this.data.tin_number;
      }
      if (
        this.editData &&
        this.editData.passport_number === this.data.passport_number
      ) {
        delete this.data.passport_number;
      }
      if (!this.$v.$invalid) {
        this.$emit("data", this.data);
        this.$emit("stepper", (this.stepper = 3));
      }
    },
    asyncPayload() {
      //Call to delete to avoid duplicates
      if (this.editData && this.editData.tin_number === this.data.tin_number) {
        delete this.data.tin_number;
      }
      if (
        this.editData &&
        this.editData.passport_number === this.data.passport_number
      ) {
        delete this.data.passport_number;
      }
      if (this.editData) {
        this.$emit("data", this.data);
      }
    },
  },
  computed: {
    formattedDate() {
      return this.data.birthday
        ? format(parseISO(this.data.birthday), "MMMM d, yyyy")
        : "";
    },
  },
  watch: {
    editData(value) {
      this.data = Object.assign({}, this.data, value);
    },
  },
};
</script>

<style></style>
