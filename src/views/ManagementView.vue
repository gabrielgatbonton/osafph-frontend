<template>
  <div style="height: 100%; width: 100%;">
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">User Management</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="ma-1" v-if="userPermissions.usersTable">
      <v-row>
        <v-col cols="12">
          <UsersTable :users="users_index" @submitFilter="submitFilter" />
        </v-col>
      </v-row>
    </v-container>
    <PageConstruction v-else/>
  </div>
</template>
<script>
// import UsersTable from "@/components/Management/Users-Table.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PageConstruction from "@/components/PageConstruction.vue";
export default {
  name: "ManagementView",
  mixins: [ErrorAlertsLogic],
  components: {
    // UsersTable,
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
