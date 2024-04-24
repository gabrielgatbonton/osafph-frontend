<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }" v-if="slot_activator">
      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        dark
        class="mr-3"
        color="blue darken-4"
        v-bind="attrs"
        v-on="on"
        >Filter</v-btn
      >
      <v-btn
        v-else
        dark
        class="mr-3"
        color="blue darken-4"
        icon
        v-bind="attrs"
        v-on="on"
        ><v-icon>mdi-filter-multiple</v-icon></v-btn
      >
    </template>
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
              item-text="description"
              item-value="id"
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
              item-value="id"
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
          <v-col cols="12" v-if="filterInputs.service_type">
            <v-select
              v-model="service_type"
              label="Service Types"
              :items="service_types"
              item-text="name"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.status">
            <v-select
              v-model="status"
              label="Status"
              :items="statuses"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="filterInputs.sort_order">
            <v-select
              v-model="sort_order"
              label="Sort Order"
              :items="sort_order_options"
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
      required: false,
    },
    reset: {
      type: Object,
      required: false,
    },
    type_of_filter: {
      type: String,
      required: true,
    },
    slot_activator: {
      type: Boolean,
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
    status: [],
    service_type: [],
    payload: {},
    sort_order: null,
    sort_order_options: ["ASCENDING", "DESCENDING"],
    sexes: ["MALE", "FEMALE"],
    filters: ["CATEGORY", "SEX", "BARANGAY"],
  }),
  methods: {
    ...mapActions("categories", ["fetchEnumCategories"]),
    ...mapActions("philippines", ["fetchEnumBarangayFilter"]),
    ...mapActions("dialysis", ["fetchEnumsFilter"]),
    ...mapActions("services_choices", ["fetchServiceTypesEnum"]),
    fetchEnums() {
      if (this.type_of_filter === "CITIZENS INDEX") {
        this.fetchEnumCategories();
        this.fetchEnumBarangayFilter();
      } else if (this.type_of_filter === "DIALYSIS INDEX") {
        this.fetchEnumsFilter();
      } else if (
        this.type_of_filter === "SERVICE INDEX" ||
        this.type_of_filter === "SERVICES AVAILED INDEX"
      ) {
        this.fetchServiceTypesEnum();
      }
    },
    submitFilter() {
      if (this.type_of_filter === "CITIZENS INDEX") {
        this.filter_type.forEach((element) => {
          if (element === "CATEGORY") {
            this.category.length > 0
              ? (this.payload.category_ids = this.category)
              : (this.payload.category_ids = null);
          }
          if (element === "SEX") {
            this.sex
              ? (this.payload.sexes = this.sex)
              : (this.payload.sexes = null);
          }
          if (element === "BARANGAY") {
            this.barangay.length > 0
              ? (this.payload.barangay_ids = this.barangay)
              : (this.payload.barangay_ids = null);
          }
        });
      } else if (this.type_of_filter === "DIALYSIS INDEX") {
        this.dialysis_machine.length > 0
          ? (this.payload.dialysis_machine = this.dialysis_machine)
          : (this.payload.dialysis_machine = null);
        this.status.length > 0
          ? (this.payload.status = this.status)
          : (this.payload.status = null);
      } else if (
        this.type_of_filter === "SERVICE INDEX"
      ) {
        this.status.length > 0
          ? (this.payload.filter_status = this.status)
          : (this.payload.filter_status = null);
        this.service_type.length > 0
          ? (this.payload.service_types = this.service_type)
          : (this.payload.service_types = null);
      } else if (
        this.type_of_filter === "SERVICES AVAILED INDEX"
      ) {
        this.status.length > 0
          ? (this.payload.filter_status = this.status)
          : (this.payload.filter_status = null);
        this.service_type.length > 0
          ? (this.payload.service_types = this.service_type)
          : (this.payload.service_types = null);
        this.sort_order
          ? (this.payload.sort_order = this.sort_order)
          : (this.payload.sort_order = null);
      }  
      this.$emit("filterQuery", this.payload);
      this.payload = {};
      this.dialog = false;
    },
    resetFilter() {
      //Reset Query
      let query = {};

      if (this.type_of_filter === "CITIZENS INDEX") {
        query = {
          category_ids: null,
          sexes: null,
          barangay_ids: null,
        };
      } else if (this.type_of_filter === "DIALYSIS INDEX") {
        query = {
          dialysis_machine: null,
          status: null,
        };
      } else if (
        this.type_of_filter === "SERVICE INDEX"
      ) {
        query = {
          service_types: null,
          filter_status: null,
        };
      } else if (
        this.type_of_filter === "SERVICES AVAILED INDEX"
      ) {
        query = {
          service_types: null,
          filter_status: null,
          sort_order: null,
        };
      }

      this.$emit("filterQuery", query);

      //Reset Local Values
      this.filter_type = [];
      this.sex = [];
      this.category = [];
      this.barangay = [];
      this.dialysis_machine = [];
      this.service_type = [];
      this.status = [];
      this.sort_order = [];

      //Close Dialog
      this.dialog = false;
    },
  },
  computed: {
    ...mapState("categories", {
      categories: "categories",
    }),
    ...mapState("philippines", {
      barangays: "barangays",
    }),
    ...mapState("dialysis", {
      dialysis_machines: "dialysis_machines",
    }),
    ...mapState("services_choices", {
      service_types: "service_types",
    }),
    filterInputs() {
      let filter_type = false;
      let category = false;
      let sex = false;
      let submit = false;
      let barangay = false;
      let dialysis_machine = false;
      let status = false;
      let service_type = false;
      let sort_order = false;

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
        status = true;
        submit = true;
      } else if (this.type_of_filter === "SERVICE INDEX") {
        service_type = true;
        status = true;
        submit = true;
      } else if (this.type_of_filter === "SERVICES AVAILED INDEX") {
        service_type = true;
        status = true;
        sort_order = true;
        submit = true;
      }

      return {
        filter_type: filter_type,
        category: category,
        sex: sex,
        submit: submit,
        barangay: barangay,
        dialysis_machine: dialysis_machine,
        status: status,
        service_type: service_type,
        sort_order: sort_order,
      };
    },
    statuses() {
      let statuses = null;
      if (this.type_of_filter === "DIALYSIS INDEX") {
        statuses = ["PENDING", "IN PROGRESS", "UNATTENDED", "COMPLETED"];
      } else if (
        this.type_of_filter === "SERVICE INDEX" ||
        this.type_of_filter === "SERVICES AVAILED INDEX"
      ) {
        statuses = [
          "PENDING",
          "IN PROGRESS",
          "UNATTENDED",
          "COMPLETED",
          "WALK-IN",
        ];
      }
      return statuses;
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
