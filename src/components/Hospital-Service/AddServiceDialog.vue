<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-3" color="blue darken-4" dark v-bind="attrs" v-on="on">
          Add Service
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-medical-bag</v-icon>Add Medical
          Service</v-card-title
        >
        <v-container fluid class="mx-auto">
          <v-row class="mx-4">
            <v-col cols="12">
              <v-autocomplete
                v-model="service_type"
                label="Service Type"
                :items="services"
                @change="(value) => initService(value)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="serviceable_type"
                label="Serviceable Type"
                :items="services_types.selected"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-menu
                max-width="290"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                v-model="menu_1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate1"
                    v-on="on"
                    v-bind="attrs"
                    label="Date Received"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_received"
                  @input="menu_1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                max-width="290"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                v-model="menu_2"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate2"
                    v-on="on"
                    v-bind="attrs"
                    label="Date Released"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_released"
                  @input="menu_2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="remarks" label="Remarks"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark class="blue darken-4" @click="submitForm()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    menu_1: false,
    menu_2: false,
    service_type: null,
    serviceable_type: null,
    date_received: null,
    date_released: null,
    remarks: null,
    services_types: {
      selected: null,
      laboratories: ["PCR", "RAPID ANTIGEN", "RAPID ANTIBODY", "OT"],
      diagnostics: ["X-RAY", "ULTRASOUND", "MAMMOGRAM"],
      consultations: ["OB", "PHYSICIAN", "CARDIOLOGY"],
    },
    services: ["CONSULTATION", "DIAGNOSTIC", "LABORATORY"],
  }),
  methods: {
    ...mapActions("services", ["addHospitalService"]),
    initService(service) {
      if (service === "CONSULTATION") {
        this.services_types.selected = this.services_types.consultations;
      } else if (service === "DIAGNOSTIC") {
        this.services_types.selected = this.services_types.diagnostics;
      } else if (service === "LABORATORY") {
        this.services_types.selected = this.services_types.laboratories;
      }
    },
    submitForm() {
      const id = this.$route.params.id;
      let data = {};
      if (this.service_type === "CONSULTATION") {
        data = {
          service_type: this.service_type,
          specialty: this.serviceable_type,
          date_received: this.date_received,
          date_released: null,
          result_type: "PENDING",
          remarks: this.remarks,
        };
      } else if (this.service_type === "DIAGNOSTIC") {
        data = {
          service_type: this.service_type,
          diagnostic_type: this.serviceable_type,
          date_received: this.date_received,
          date_released: null,
          result_type: "PENDING",
          remarks: this.remarks,
        };
      } else if (this.service_type === "LABORATORY") {
        data = {
          service_type: this.service_type,
          laboratory_type: this.serviceable_type,
          date_received: this.date_received,
          date_released: null,
          result_type: "PENDING",
          remarks: this.remarks,
        };
      }

      return this.addHospitalService({
        id: id,
        data: data,
      })
        .then(() => {
          this.service_type = null;
          this.serviceable_type = null;
          this.date_received = null;
          this.remarks = null;
        })
        .catch((error) => {
          console.error(
            "Error in Adding Service in AddServiceDialog Component",
            error
          );
        })
        .finally(() => (this.dialog = false));
    },
  },
  computed: {
    formattedDate1() {
      return this.date_received
        ? format(parseISO(this.date_received), "MMMM d, yyyy")
        : "";
    },
    formattedDate2() {
      return this.date_released
        ? format(parseISO(this.date_released), "MMMM d, yyyy")
        : "";
    },
  },
};
</script>

<style></style>
