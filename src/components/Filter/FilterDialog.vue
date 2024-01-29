<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="blue darken-1 pb-4 white--text"
        ><v-icon dark left>mdi-filter-multiple</v-icon>Filter</v-card-title
      >
      <v-container fluid class="py-8 mx-auto overflow-scroll">
        <v-row class="mx-4">
          <v-col cols="12">
            <v-select
              v-model="payload.filter_type"
              label="Filter Type"
              multiple
              :items="filters"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.category">
            <v-autocomplete
              label="Category"
              :items="getCategories"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" v-if="filterInputs.sex">
            <v-select label="Sex" :items="sexes"></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.hospital">
            <v-autocomplete
              label="Medical Site"
              :items="getHospitals"
              item-text="name"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" v-if="filterInputs.submit">
            <div class="text-right">
              <v-btn dark class="blue darken-4">Submit</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "FilterDialog",
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    payload: {
      filter_type: [],
      category: null,
      sex: null,
      hospital: null,
    },
    sexes: ["MALE", "FEMALE"],
    filters: ["CATEGORY", "SEX", "MEDICAL SITE"],
  }),
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("services_choices", ["fetchHospitals"]),
    fetchEnums() {
      this.fetchCategories();
      this.fetchHospitals();
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("services_choices", ["getHospitals"]),
    filterInputs() {
      let category = false;
      let sex = false;
      let hospital = false;
      let submit = false;

      this.payload.filter_type.forEach((element) => {
        if (element === "CATEGORY") {
          category = true;
          submit = true;
        }
        if (element === "SEX") {
          sex = true;
          submit = true;
        }
        if (element === "MEDICAL SITE") {
          hospital = true;
          submit = true;
        }
      });

      return {
        category: category,
        sex: sex,
        hospital: hospital,
        submit: submit,
      };
    },
  },
  watch: {
    activator(newValue) {
      this.dialog = newValue;
    },
    //Reset for Adding
    reset(value) {
      this.payload = value;
    },
    dialog(value) {
      if (value === false) {
        this.$emit("dialogResponse", value);
      }
    },
    // "payload.filter_type"(value) {
    //   console.log("Filter: ", value);
    // },
  },
  created() {
    this.fetchEnums();
  },
};
</script>

<style scoped></style>
