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
                <v-col cols="auto">
                  <v-icon
                    class="mx-1"
                    color="blue darken-4"
                    dense
                    @click="activator(item.citizen_id, item.id)"
                    >mdi-pencil</v-icon
                  >
                </v-col>
                <v-col cols="auto">
                  <ReusableDeleteDialog
                    :id="item.citizen_id"
                    :hospitalServiceId="item.id"
                  />
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
//   import DeleteDialog from "./DeleteDialog.vue";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import ServiceDialog from "./ServiceDialog.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["services"],
  components: {
    ReusableDeleteDialog,
    ServiceDialog,
  },
  methods: {
    ...mapActions("services", [
      "fetchHospitalServiceById",
      "updateHospitalService",
    ]),
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    activator(citizen_id, hospital_service_id) {
      this.dialog = !this.dialog;

      return this.fetchHospitalServiceById({
        id: citizen_id,
        hospital_service_id: hospital_service_id,
      }).catch((error) => {
        console.error(
          "Error fetching hospital service request in edit: ",
          error
        );
      });
    },
    resetActivator(data) {
      this.dialog = data;
    },
    viewRegistrantService(id, hospital_service_id) {
      this.$router.push({
        name: "hospital-services-information",
        params: { id: id, hospital_service_id: hospital_service_id },
      });
    },
    submitForm(payload, citizen_id, hospital_service_id) {
      let data = {};
      if (payload.service_type === "CONSULTATION") {
        data = {
          service_type: payload.service_type,
          specialty: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time ? format(
            parseISO(`${payload.scheduled_date}T${payload.scheduled_time}`),
            "H:mm"
          ) : null,
          date_released: payload.date_released,
          time_released: payload.time_released ? format(
            parseISO(`${payload.date_released}T${payload.time_released}`),
            "H:mm"
          ) : null,
          status: payload.status,
          remarks: payload.remarks,
          doctor_id: 1,
        };
      } else if (payload.service_type === "DIAGNOSTIC") {
        data = {
          service_type: payload.service_type,
          diagnostic_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time ? format(
            parseISO(`${payload.scheduled_date}T${payload.scheduled_time}`),
            "H:mm"
          ) : null,
          date_released: payload.date_released,
          time_released: payload.time_released ? format(
            parseISO(`${payload.date_released}T${payload.time_released}`),
            "H:mm"
          ) : null,
          status: payload.status,
          remarks: payload.remarks,
          doctor_id: 1,
        };
      } else if (payload.service_type === "LABORATORY") {
        data = {
          service_type: payload.service_type,
          laboratory_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time ? format(
            parseISO(`${payload.scheduled_date}T${payload.scheduled_time}`),
            "H:mm"
          ) : null,
          date_released: payload.date_released,
          time_released: payload.time_released ? format(
            parseISO(`${payload.date_released}T${payload.time_released}`),
            "H:mm"
          ) : null,
          status: payload.status,
          remarks: payload.remarks,
          doctor_id: 1,
        };
      }
      return this.updateHospitalService({
        id: citizen_id,
        hospital_service_id: hospital_service_id,
        data: data,
      })
        .catch((error) => {
          console.error("Error Updating in Services-Table: ", error);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
  data: () => ({
    search: "",
    offset: true,
    data: [],
    dialog: false,
  }),
  computed: {
    ...mapGetters("services", ["getHospitalService"]),
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
