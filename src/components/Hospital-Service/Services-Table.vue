<template>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="name"
      class="elevation-1"
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
            <!-- <td>{{ item.hub_service_number }}</td>
            <td>
              {{ item.full_name }}
            </td> -->
            <td>{{ item.service_type }}</td>
            <td>{{ item.serviceable_type }}</td>
            <td>
              <div
                :class="{
                  'text-green': item.result_type === 'ACCEPTED',
                  'text-red': item.result_type !== 'ACCEPTED',
                }"
              >
                {{ item.result_type }}
              </div>
            </td>
            <td>{{ item.remarks }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </template>
  
  <script>
//   import DeleteDialog from "./DeleteDialog.vue";
//   import format from "date-fns/format";
//   import parseISO from "date-fns/parseISO";
  export default {
    props: ["services"],
    // components: {
    //   DeleteDialog,
    // },
    methods: {
      filterOnlyCapsText(value, search) {
        return (
          value != null &&
          search != null &&
          typeof value === "string" &&
          value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      },
    //   getOptions(item) {
    //     return [
    //       {
    //         icon: "mdi-view-agenda-outline",
    //         text: "VIEW DETAILS",
    //         route: { name: "details", params: { id: item.id } },
    //       },
    //       {
    //         icon: "mdi-square-edit-outline",
    //         text: "EDIT",
    //         route: { name: "edit", params: { id: item.id } },
    //       },
    //       {
    //         icon: "mdi-medical-bag",
    //         text: "HOSPITAL SERVICES",
    //         route: { name: "hospital-services", params: { id: item.id } },
    //       },
    //       // {
    //       //   icon: "mdi-delete-alert-outline",
    //       //   text: "DELETE",
    //       //   action: () => {
    //       //     this.deleteRegistrant(item.id);
    //       //   },
    //       // },
    //     ];
    //   },
    //   executeAction(option) {
    //     if (option.action) {
    //       // Execute the action
    //       option.action();
    //     } else if (option.route) {
    //       // Navigate to the route
    //       this.$router.push(option.route);
    //     }
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
        //   {
        //     text: "REGISTRANTS NO.",
        //     align: "start",
        //     sortable: false,
        //     value: "hub_service_number",
        //   },
        //   {
        //     text: "FULL NAME",
        //     value: "full_name",
        //   },
          {
            text: "SERVICE TYPE",
            value: "service_type",
          },
          {
            text: "SERVICEABLE TYPE",
            value: "serviceable_type",
          },
          {
            text: "STATUS",
            value: "result_type",
          },
          {
            text: "REMARKS",
            value: "remarks",
          },
        //   {
        //     text: "",
        //     value: "actions",
        //     sortable: false,
        //   },
        ];
      },
    },
    watch: {
      services(value) {
        this.data = value.map((service) => ({
        //   id: service.id,
        //   hub_service_number: service.hub_service_number,
        //   full_name: `${service.last_name}, ${service.first_name} ${
        //     service.middle_name ? " " + service.middle_name : ""
        //   } ${service.suffix ? " " + service.suffix : ""}`,
          service_type: service.service_type,
          serviceable_type: service.serviceable_type,
          result_type: service.result_type,
          remarks: service.remarks,
        //   mcg_cares_card: service.mcg_cares_card,
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
  