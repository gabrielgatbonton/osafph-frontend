<template>
  <div style="height: 100%">
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <div v-if="userPermissions.usersTable">
      <v-container fluid class="ma-1">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-icon left>mdi-account-box-multiple</v-icon>
            <span class="title">User Management</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="!$vuetify.breakpoint.xs"
              color="primary"
              class="mr-3"
              dark
              @click="dialog = !dialog"
              >Add User</v-btn
            >
            <v-btn
              v-else
              dark
              class="mr-3"
              color="primary"
              icon
              @click="dialog = !dialog"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-container fluid class="ma-1">
        <v-row>
          <v-col cols="12">
            <UsersTable
              :slot_activator_user="slot_activator_user"
              :users="users_index"
              :response-user="dialog"
              @submitFilter="submitFilter"
              @dialog:user="(newVal) => (dialog = newVal)"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <PageConstruction v-else />
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
