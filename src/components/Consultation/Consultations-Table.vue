<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    no-data-text="No Consultations Available"
    :loading="loading"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        prepend-icon="mdi-magnify"
      ></v-text-field>
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
      <v-container
        :class="$vuetify.breakpoint.xs ? 'ml-0' : 'ml-3'"
        style="width: auto; padding: 0;"
      >
        <v-row no-gutters :justify="$vuetify.breakpoint.xs ? 'end' : 'start'">
          <v-col cols="auto" align-self="center">
            <v-icon
              @click="
                viewRegistrantService(
                  item.consultation_id,
                  item.hospital_service_id
                )
              "
              class="mx-1"
              color="grey darken-1"
              dense
              >mdi-eye</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  props: ["consultations", "routeName"],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
  }),
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
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
        },
      ];
    },
    tableData() {
      return this.consultations
        ? this.consultations.map((consultation) => ({
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
  },
  watch: {
    consultations: {
      handler(value) {
        this.loading = true;
        if (!value.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
  },
};
</script>

<style scoped></style>
