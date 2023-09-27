<template>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="name"
      class="elevation-0"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.patient_name }}</td>
            <td>{{ item.scheduled_date }}</td>
            <td>{{ item.scheduled_time }}</td>
            <td>
              <div
                :class="{
                  'text-green': item.status === 'COMPLETED',
                  'text-red': item.status !== 'COMPLETED',
                }"
              >
                {{ item.status }}
              </div>
            </td>
            <td>
              <v-container class="ml-n6">
                <v-row no-gutters>
                  <v-col cols="auto">
                    <v-icon
                      @click="viewRegistrantService(item.citizen_id, item.id)"
                      class="mx-1"
                      color="grey darken-1"
                      dense
                      >mdi-eye</v-icon
                    >
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </tr>
        </tbody>
        <ServiceDialog
          :activator="dialog"
          :hospitalService="getHospitalService"
          v-on:dialogResponse="resetActivator"
          v-on:updateService="submitForm"
        />
      </template>
    </v-data-table>
  </template>
  
  <script>
  import format from "date-fns/format";
  import parseISO from "date-fns/parseISO";
  export default {
    props: [""],
    methods: {
      filterOnlyCapsText(value, search) {
        return (
          value != null &&
          search != null &&
          typeof value === "string" &&
          value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      },
    //   viewRegistrantService(id, hospital_service_id) {
    //     this.$router.push({
    //       name: "hospital-services-information",
    //       params: { id: id, hospital_service_id: hospital_service_id },
    //     });
    //   },
    },
    data: () => ({
      search: "",
      offset: true,
      data: [],
    }),
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
            text: "SCHEDULED TIME",
            value: "scheduled_time",
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
      services(value) {
        this.data = value.map((service) => ({
          id: service.id,
          citizen_id: service.citizen_id,
          service_type: service.service_type,
          serviceable_type_name: service.serviceable_type_name,
          status: service.status,
          scheduled_date: format(
            parseISO(service.scheduled_date),
            "MMMM dd, yyyy"
          ),
          scheduled_time: format(
            parseISO(`${service.scheduled_date}T${service.scheduled_time}`),
            "h:mm a"
          ),
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
  