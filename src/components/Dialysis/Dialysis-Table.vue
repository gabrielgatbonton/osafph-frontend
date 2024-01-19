<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    no-data-text="No Services Available"
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
          <td>{{ item.dialysis_id }}</td>
          <td>{{ item.dialysis_machine }}</td>
          <td>{{ item.session }}</td>
          <td>{{ item.scheduled_date }}</td>
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
            <v-container class="ml-n8" style="width: 120px">
              <v-row no-gutters justify="center">
                <v-col cols="auto" v-if="auth.view" align-self="center">
                  <v-icon
                    @click="viewDialysisSession(item.dialysis_id)"
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
    </template>
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { mapGetters } from "vuex";
export default {
  name: "Dialysis-Table",
  props: ["dialysis"],
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    viewDialysisSession(id) {
      this.$router.push({
        name: "dialysis-session",
        params: { id: id },
      });
    },
    userRolePermissions() {
      if (this.userRole === "ADMIN") {
        this.auth.view = true;
      } else if (this.userRole === "ENCODER") {
        this.auth.view = true;
      } else if (this.userRole === "DIALYSIS_ENCODER") {
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
    },
  }),
  computed: {
    ...mapGetters("login", ["userRole"]),
    headers() {
      return [
        {
          text: "DIALYSIS ID",
          value: "dialysis_id",
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
  },
  watch: {
    dialysis(value) {
      this.data = value.map((dialysis) => ({
        dialysis_id: dialysis.dialysis_session_id,
        dialysis_machine: dialysis.dialysis_machine,
        session: dialysis.session,
        scheduled_date: format(
          parseISO(dialysis.scheduled_date),
          "MMMM dd, yyyy"
        ),
        status: dialysis.status,
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
