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
          <td>{{ item.service_type }}</td>
          <td>{{ item.serviceable_type_name }}</td>
          <td>{{ item.scheduled_date }}</td>
          <td>{{ item.hospital }}</td>
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
            <v-container class="ml-n8" style="width: 120px;">
              <v-row no-gutters justify="center">
                <v-col cols="auto" v-if="auth.view" align-self="center">
                  <v-icon
                    @click="viewRegistrantService(item.citizen_id, item.id)"
                    class="mx-1"
                    color="grey darken-1"
                    dense
                    >mdi-eye</v-icon
                  >
                </v-col>
                <v-col cols="auto" v-if="auth.edit" align-self="center">
                  <v-icon
                    class="mx-1"
                    color="blue darken-4"
                    dense
                    @click="activator(item.citizen_id, item.id)"
                    >mdi-pencil</v-icon
                  >
                </v-col>
                <v-col cols="auto" v-if="auth.delete" align-self="center">
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
          </td>
        </tr>
      </tbody>
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
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.auth.view = true;
        this.auth.edit = true;
        this.auth.delete = true;
      } else if (this.userRole === "ENCODER") {
        this.auth.view = true;
      }
    },
  },
  data: () => ({
    search: "",
    offset: true,
    data: [],
    auth: {
      view: false,
      edit: false,
      delete: false,
    },
  }),
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "SERVICE TYPE",
          value: "service_type",
        },
        {
          text: "SERVICEABLE TYPE",
          value: "serviceable_type_name",
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
        hospital: service.hospital,
      }));
    },
  },
  updated() {
    this.userRolePermissions();
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
