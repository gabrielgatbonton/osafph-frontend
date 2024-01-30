<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    no-data-text="No Consultations Available"
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
          'text-green': item.status === 'COMPLETED',
          'text-red': item.status !== 'COMPLETED',
        }"
      >
        {{ item.status }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="ml-n8" style="width: 120px">
        <v-row no-gutters justify="center">
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
    data: [],
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
  },
  watch: {
    consultations(value) {
      this.data = value.map((consultation) => ({
        patient_name: `${consultation.citizen.last_name}, ${
          consultation.citizen.first_name
        } ${
          consultation.citizen.middle_name
            ? consultation.citizen.middle_name
            : ""
        } ${consultation.citizen.suffix ? consultation.citizen.suffix : ""}`,
        status: consultation.hospital_service.status,
        scheduled_date: format(
          parseISO(consultation.hospital_service.scheduled_date),
          "MMMM dd, yyyy"
        ),
        sex: consultation.citizen.sex,
        medical_site: consultation.hospital_service.hospital,
        consultation_id: consultation.id,
        hospital_service_id: consultation.hospital_service.id,
      }));
    },
  },
};
</script>

<style scoped>
.text-green {
  color: green;
}

.text-red {
  color: red;
}
</style>
