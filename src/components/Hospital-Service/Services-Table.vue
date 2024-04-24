<template>
  <v-data-table
    :headers="headers"
    :items="servicesData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    :loading="loading"
    loading-text="Loading... Please wait"
    :server-items-length="serverItemsTotal"
    :options.sync="options"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15],
    }"
  >
    <template v-slot:top>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          prepend-icon="mdi-magnify"
        ></v-text-field>
        <FilterDialog
          @filterQuery="(data) => assignParams(data)"
          :type_of_filter="type_of_filter"
          :slot_activator="slot_activator"
        />
      </div>
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
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <div
        :class="{
          'success--text': item.status === 'COMPLETED',
          'error--text':
            item.status === 'PENDING' || item.status === 'UNATTENDED',
          'indigo--text': item.status === 'IN PROGRESS',
        }"
      >
        {{ item.status }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container>
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
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import ServiceDialog from "./ServiceDialog.vue";
import EditServiceMixin from "@/mixins/Hospital-Service/EditService";
import { mapGetters, mapState } from "vuex";
import DeleteServiceMixin from "@/mixins/Hospital-Service/DeleteService";
import TablePaginationMixin from "@/mixins/Tables/TablePagination";
import FilterDialog from "@/components/Filter/FilterDialog.vue";
export default {
  mixins: [EditServiceMixin, DeleteServiceMixin, TablePaginationMixin],
  props: ["services"],
  components: {
    ReusableDeleteDialog,
    ServiceDialog,
    FilterDialog,
  },
  data: () => ({
    offset: true,
    loading: true,
    type_of_filter: "SERVICE INDEX",
    slot_activator: true,
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
    ...mapState("services", {
      services: "hospitalServices",
    }),
    headers() {
      return [
        {
          text: "SERVICE TYPE",
          value: "service_type",
        },
        {
          text: "SPECIALTY",
          value: "specialty",
          sortable: false,
        },
        {
          text: "SCHEDULED DATE",
          value: "scheduled_date",
        },
        {
          text: "MEDICAL SITE",
          value: "hospital",
        },
        {
          text: "STATUS",
          value: "status",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
          align: "center"
        },
      ];
    },
    iconPermissions() {
      let view = false;
      let edit = false;
      let remove = false;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        view = true;
        edit = true;
        remove = true;
      } else if (
        this.userRole === "ENCODER" ||
        this.userRole === "VIP_ENCODER"
      ) {
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
    servicesData() {
      return this.services
        ? this.services.data.map((service) => ({
            id: service.id,
            citizen_id: service.citizen_id,
            service_type: service.service_type,
            specialty: service.serviceable_type_name,
            status: service.status,
            scheduled_date: format(
              parseISO(service.scheduled_date),
              "MMMM dd, yyyy"
            ),
            hospital: service.hospital,
          }))
        : [];
    },
    serverItemsTotal() {
      return this.services ? this.services.meta.total : 0;
    },
  },
  watch: {
    services: {
      handler(value) {
        this.loading = true;
        if (!value.data.length) {
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
