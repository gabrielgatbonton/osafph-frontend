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
          <v-col cols="auto" v-if="iconPermissions.view" align-self="center">
            <v-icon
              @click="viewRegistrantService(item.citizen_id, item.id)"
              class="mx-1"
              color="grey darken-1"
              dense
              >mdi-eye</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.edit" align-self="center">
            <v-icon
              class="mx-1"
              color="blue darken-4"
              dense
              @click="activator(item.citizen_id, item.id)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="auto" v-if="iconPermissions.delete" align-self="center">
            <v-icon
              class="mx-1"
              color="error"
              dense
              @click="deleteActivator(item.citizen_id, item.id)"
              >mdi-trash-can</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
    <ServiceDialog
      :activator="dialog"
      :hospitalService="getHospitalService"
      v-on:dialogResponse="resetEditActivator"
      v-on:updateService="submitForm"
    />
    <ReusableDeleteDialog
      :activator="deleteDialog"
      v-on:dialogResponse="resetActivator"
      v-on:deleteItem="deleteItem"
    />
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import ServiceDialog from "./ServiceDialog.vue";
import EditServiceMixin from "@/mixins/Hospital-Service/EditService";
import { mapGetters } from "vuex";
import DeleteServiceMixin from "@/mixins/Hospital-Service/DeleteService";
export default {
  mixins: [EditServiceMixin, DeleteServiceMixin],
  props: ["services"],
  components: {
    ReusableDeleteDialog,
    ServiceDialog,
  },
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
    viewRegistrantService(id, hospital_service_id) {
      this.$router.push({
        name: "hospital-services-information",
        params: { id: id, hospital_service_id: hospital_service_id },
      });
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "SERVICE TYPE",
          value: "service_type",
        },
        {
          text: "SPECIALTY",
          value: "specialty",
        },
        {
          text: "SCHEDULED DATE",
          value: "scheduled_date",
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
    iconPermissions() {
      let view = false;
      let edit = false;
      let remove = false;
      if (this.userRole === "ADMIN") {
        view = true;
        edit = true;
        remove = true;
      } else if (this.userRole === "ENCODER") {
        view = true;
        edit = true;
        remove = true;
      }
      return {
        view: view,
        edit: edit,
        delete: remove,
      };
    },
  },
  watch: {
    services(value) {
      this.data = value.map((service) => ({
        id: service.id,
        citizen_id: service.citizen_id,
        service_type: service.service_type,
        specialty: service.serviceable_type_name,
        status: service.status,
        scheduled_date: format(
          parseISO(service.scheduled_date),
          "MMMM dd, yyyy"
        ),
        medical_site: service.hospital,
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
