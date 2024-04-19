<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="name"
    class="elevation-0"
    :search="search"
    :loading="loading"
    loading-text="Loading... Please wait"
    :server-items-length="totalDialysis"
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
        <v-btn
          v-if="!$vuetify.breakpoint.xs"
          dark
          class="mr-3"
          color="blue darken-4"
          @click="activator"
          >Filter</v-btn
        >
        <v-btn
          v-else
          dark
          class="mr-3"
          color="blue darken-4"
          icon
          @click="activator"
          ><v-icon>mdi-filter-multiple</v-icon></v-btn
        >
      </div>
      <FilterDialog
        @filterQuery="(data) => assignParams(data)"
        :activator="dialog"
        @dialogResponse="resetActivator"
        :type_of_filter="type_of_filter"
        :slot_activator="slot_activator"
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
      <v-container class="ml-n8" style="width: 120px">
        <v-row no-gutters :justify="!$vuetify.breakpoint.xs ? 'center' : 'end'">
          <v-col cols="auto" v-if="iconPermissions.view" align-self="center">
            <v-icon
              @click="viewDialysisSession(item.dialysis_session_id)"
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
import FilterDialog from "@/components/Filter/FilterDialog.vue";
import TablePaginationMixin from "@/mixins/Tables/TablePagination";
import { mapGetters } from "vuex";
export default {
  name: "Dialysis-Table",
  props: ["dialysis"],
  mixins: [TablePaginationMixin],
  data: () => ({
    dialog: false,
    search: "",
    offset: true,
    loading: true,
    options: null,
    items: [],
    query_params: {},
    searchTimeout: null,
    type_of_filter: "DIALYSIS INDEX",
    slot_activator: false,
  }),
  components: {
    FilterDialog,
  },
  methods: {
    viewDialysisSession(id) {
      this.$router.push({
        name: "dialysis-session",
        params: { id: id },
      });
    },
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "PATIENT NAME",
          value: "citizen_full_name",
        },
        {
          text: "DIALYSIS MACHINE",
          value: "dialysis_machine",
        },
        {
          text: "SESSION",
          value: "session",
        },
        {
          text: "SCHEDULED DATE",
          value: "scheduled_date",
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
      if (this.userRole === "ADMIN") {
        view = true;
      } else if (this.userRole === "ENCODER") {
        view = true;
      } else if (this.userRole === "DIALYSIS_ENCODER") {
        view = true;
      }
      return {
        view: view,
      };
    },
    totalDialysis() {
      return this.dialysis ? this.dialysis.meta.total : 0;
    },
  },
  watch: {
    dialysis: {
      handler(value) {
        // console.log("Test", value);
        this.loading = true;
        if (!value.data.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
          this.items = value.data.map((item) => ({
            dialysis_session_id: item.dialysis_session_id,
            citizen_full_name: item.citizen_full_name,
            dialysis_machine: item.dialysis_machine,
            session: item.session,
            scheduled_date: format(
              parseISO(item.scheduled_date),
              "MMMM dd, yyyy"
            ),
            status: item.status,
          }));
        }
      },
    },
  },
};
</script>

<style scoped></style>
