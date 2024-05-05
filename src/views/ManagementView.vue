<template>
  <div style="height: 100%">
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <v-container>
      <div v-if="userPermissions.usersTable">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">User Management</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="!$vuetify.breakpoint.xs"
              color="primary"
              class="mr-3 mb-4"
              dark
              @click="dialog = !dialog"
              >Add User</v-btn
            >
            <v-btn
              v-else
              dark
              class="mr-3 mb-4"
              color="primary"
              icon
              @click="dialog = !dialog"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <UsersTable
          :slot_activator_user="slot_activator_user"
          :users="users_index"
          :response-user="dialog"
          @submitFilter="submitFilter"
          @dialog:user="(newVal) => (dialog = newVal)"
        />
      </div>
      <PageConstruction v-else />
    </v-container>
  </div>
</template>
<script>
import UsersTable from "@/components/Management/Users-Table.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PageConstruction from "@/components/PageConstruction.vue";
export default {
  name: "ManagementView",
  mixins: [ErrorAlertsLogic],
  data: () => ({
    dialog: false,
    slot_activator_user: false,
  }),
  components: {
    UsersTable,
    PageConstruction,
  },
  methods: {
    ...mapActions("accounts", ["fetchUsersIndex"]),
    submitFilter(filter) {
      this.fetchUsersIndex(filter);
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapState("accounts", {
      users_index: "users_index",
    }),
    userPermissions() {
      let usersTable = false;
      if (this.userRole === "ROOT" || this.userRole === "ADMIN") {
        usersTable = true;
      }
      return {
        usersTable: usersTable,
      };
    },
  },
  created() {
    this.fetchUsersIndex();
  },
};
</script>
