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
              v-model="filter_type"
              label="Filter Type"
              multiple
              :items="filters"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.category">
            <v-select
              v-model="category"
              label="Category"
              :items="getCategories"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.sex">
            <v-select v-model="sex" label="Sex" :items="sexes"></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.barangay">
            <v-select
              v-model="barangay"
              label="Barangay"
              :items="getBarangays"
              item-text="barangay_name"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-row dense justify="end">
              <v-col cols="auto">
                <v-btn color="error" @click="resetFilter">Reset</v-btn>
              </v-col>
              <v-col cols="auto" v-if="filterInputs.submit">
                <v-btn dark class="blue darken-4" @click="submitFilter"
                  >Submit</v-btn
                >
              </v-col>
            </v-row>
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
    filter_type: [],
    category: [],
    sex: null,
    barangay: [],
    payload: {},
    sexes: ["MALE", "FEMALE"],
    filters: ["CATEGORY", "SEX", "BARANGAY"],
  }),
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("philippines", ["fetchBarangays"]),
    fetchEnums() {
      this.fetchCategories();
      this.fetchBarangays();
    },
    submitFilter() {
      this.filter_type.forEach((element) => {
        if (element === "CATEGORY") {
          if (this.category.length > 0) {
            this.payload.category = this.category;
          }
        }
        if (element === "SEX") {
          console.log("Check")
          if (this.sex) {
            this.payload.sex = this.sex;
          }
        }
        if (element === "BARANGAY") {
          if (this.barangay.length > 0) {
            this.payload.barangay = this.barangay;
          }
        }
      });

      this.$emit("filterQuery", this.payload);
      this.payload = {};
      this.dialog = false;
    },
    resetFilter() {
      this.$emit("filterQuery", {});
      this.dialog = false;
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("philippines", ["getBarangays"]),
    filterInputs() {
      let category = false;
      let sex = false;
      let submit = false;
      let barangay = false;

      this.filter_type.forEach((element) => {
        if (element === "CATEGORY") {
          category = true;
          submit = true;
        }
        if (element === "SEX") {
          sex = true;
          submit = true;
        }
        if (element === "BARANGAY") {
          barangay = true;
          submit = true;
        }
      });

      return {
        category: category,
        sex: sex,
        submit: submit,
        barangay: barangay,
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
  },
  created() {
    this.fetchEnums();
  },
};
</script>

<style scoped></style>
