<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    item-key="name"
    class="elevation-0"
    :search="search"
    no-data-text="No Consultations Available"
    :loading="loading"
    loading-text="Loading... Please wait"
    :server-items-length="totalItems"
    :options.sync="options"
  >
    <template v-slot:top>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Search"
          class="mr-4"
          prepend-icon="mdi-magnify"
        ></v-text-field>
        <FilterDialog
          :type_of_filter="filter_type"
          @filterQuery="(params) => assignParams(params)"
          :slot_activator="slot_activator"
        />
      </div>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <div
        :class="{
          'success--text': item.status === 'COMPLETED',
          'error--text':
            item.status === 'PENDING' ||
            item.status === 'UNATTENDED' ||
            item.status === 'WALK-IN',
          'indigo--text': item.status === 'IN PROGRESS',
        }"
      >
        {{ item.status }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-row no-gutters :justify="isJustify">
        <v-col cols="auto" align-self="center">
          <v-icon
            @click="
              viewRegistrantService(
                item.consultation_id,
                item.hospital_service_id
              )
            "
            color="grey darken-1"
            dense
            >mdi-eye</v-icon
          >
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import TablePagination from "@/mixins/Tables/TablePagination";
import FilterDialog from "../Filter/FilterDialog.vue";
export default {
  name: "Consultations-Table",
  props: ["consultations", "routeName"],
  mixins: [TablePagination],
  data: () => ({
    offset: true,
    loading: true,
    isJustify: "",
    slot_activator: true,
    filter_type: "DOCTOR INDEX",
  }),
  components: {
    FilterDialog,
  },
  methods: {
    viewRegistrantService(consultation_id, hospital_service_id) {
      this.$router.push({
        name: this.routeName,
        params: {
          consultation_id: consultation_id,
          hospital_service_id: hospital_service_id,
        },
      });
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "PATIENT NAME",
          value: "patient_name",
        },
        {
          text: "SCHEDULED DATE",
          value: "scheduled_date",
        },
        {
          text: "SEX",
          value: "sex",
        },
        {
          text: "MEDICAL SITE",
          value: "medical_site",
        },
        {
          text: "STATUS",
          value: "status",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
    },
    tableData() {
      return this.consultations
        ? this.consultations.consultations.map((consultation) => ({
            patient_name: `${consultation.citizen.last_name}, ${
              consultation.citizen.first_name
            } ${
              consultation.citizen.middle_name
                ? consultation.citizen.middle_name
                : ""
            } ${
              consultation.citizen.suffix ? consultation.citizen.suffix : ""
            }`,
            status: consultation.hospital_service.status,
            scheduled_date: format(
              parseISO(consultation.hospital_service.scheduled_date),
              "MMMM dd, yyyy"
            ),
            sex: consultation.citizen.sex,
            medical_site: consultation.hospital_service.hospital,
            consultation_id: consultation.id,
            hospital_service_id: consultation.hospital_service.id,
          }))
        : [];
    },
    size() {
      return this.$vuetify.breakpoint;
    },
    totalItems() {
      return this.consultations.pagination?.total
        ? this.consultations.pagination.total
        : 0;
    },
  },
  watch: {
    consultations: {
      immediate: true,
      handler(value) {
        this.loading = true;
        if (!value.consultations.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
    size: {
      handler: function (newVal) {
        if (newVal.xs) {
          this.isJustify = "end";
        } else {
          this.isJustify = "center";
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped></style>
