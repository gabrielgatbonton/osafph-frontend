<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="blue darken-1 pb-4 white--text"
        ><v-icon dark left>mdi-filter-multiple</v-icon>Filter</v-card-title
      >
      <v-container fluid class="py-8 mx-auto overflow-scroll">
        <v-row class="mx-4">
          <v-col cols="12" v-if="filterInputs.filter_type">
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
              :items="categories"
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
              :items="barangays"
              item-text="barangay_name"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.dialysis_machine">
            <v-select
              v-model="dialysis_machine"
              label="Dialysis Machine"
              :items="dialysis_machines"
              item-text="name"
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
import { mapActions, mapState } from "vuex";
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
    type_of_filter: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    filter_type: [],
    category: [],
    sex: null,
    barangay: [],
    dialysis_machine: [],
    payload: {},
    sexes: ["MALE", "FEMALE"],
    filters: ["CATEGORY", "SEX", "BARANGAY"],
  }),
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("philippines", ["fetchBarangays"]),
    ...mapActions("dialysis", ["fetchDialysisMachines"]),
    fetchEnums() {
      if (
        !this.categories.length &&
        !this.barangays.length &&
        this.type_of_filter === "CITIZENS INDEX"
      ) {
        this.fetchCategories();
        this.fetchBarangays();
      } else if (
        this.type_of_filter === "DIALYSIS INDEX" &&
        !this.dialysis_machines.length
      ) {
        this.fetchDialysisMachines();
      }
    },
    submitFilter() {
      if (this.type_of_filter === "CITIZENS INDEX") {
        this.filter_type.forEach((element) => {
          if (element === "CATEGORY") {
            if (this.category.length > 0) {
              this.payload.category = this.category;
            }
          }
          if (element === "SEX") {
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
      } else if (this.type_of_filter === "DIALYSIS INDEX") {
        if (this.dialysis_machine.length > 0) {
          this.payload.dialysis_machine = this.dialysis_machine;
        }
      }
      this.$emit("filterQuery", this.payload);
      this.payload = {};
      this.dialog = false;
    },
    resetFilter() {
      //Reset Query
      this.$emit("filterQuery", {});

      //Reset Local Values
      this.filter_type = [];
      this.sex = [];
      this.category = [];
      this.barangay = [];
      this.dialysis_machine = [];

      //Close Values
      this.dialog = false;
    },
  },
  computed: {
    ...mapState("categories", ["categories"]),
    ...mapState("philippines", ["barangays"]),
    ...mapState("dialysis", ["dialysis_machines"]),
    filterInputs() {
      let filter_type = false;
      let category = false;
      let sex = false;
      let submit = false;
      let barangay = false;
      let dialysis_machine = false;

      if (this.type_of_filter === "CITIZENS INDEX") {
        filter_type = true;
        this.filter_type.forEach((element) => {
          if (element === "CATEGORY") {
            category = true;
          }
          if (element === "SEX") {
            sex = true;
          }
          if (element === "BARANGAY") {
            barangay = true;
          }
          submit = true;
        });
      } else if (this.type_of_filter === "DIALYSIS INDEX") {
        dialysis_machine = true;
        submit = true;
      }

      return {
        filter_type: filter_type,
        category: category,
        sex: sex,
        submit: submit,
        barangay: barangay,
        dialysis_machine: dialysis_machine,
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
