<template>
  <div style="height: 100%">
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
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
              class="mb-4"
              dark
              @click="dialog = !dialog"
              >Add User</v-btn
            >
            <v-btn
              v-else
              dark
              class="mb-4"
              color="primary"
              icon
              outlined
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
          @query_params="submitFilter"
          @dialog:user="(newVal) => (dialog = newVal)"
          @requestPasswordChange="submitPasswordChange"
          @requestNewUser="submitNewUser"
          @requestDeleteUser="submitDelete"
        />
      </div>
      <PageConstruction v-else />
    </v-container>
  </div>
</template>
<script>
import UsersTable from "@/components/Management/Users-Table.vue";
import { mapActions, mapState } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PageConstruction from "@/components/PageConstruction.vue";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  name: "ManagementView",
  mixins: [ErrorAlertsLogic, ContainerBreakpoint],
  data: () => ({
    dialog: false,
    slot_activator_user: false,
    rolesAllowed: ["ROOT", "ADMIN"],
  }),
  components: {
    UsersTable,
    PageConstruction,
  },
  methods: {
    ...mapActions("accounts", [
      "fetchUsersIndex",
      "changeUserPassword",
      "createNewUser",
      "deleteUser",
    ]),
    submitFilter(filter) {
      this.fetchUsersIndex(filter);
    },
    fetchData() {
      if (this.rolesAllowed.includes(this.userRole)) {
        this.fetchUsersIndex();
      }
    },
    submitPasswordChange(payload) {
      this.changeUserPassword({
        user_id: payload.id,
        data: payload.password_payload,
      });
    },
    submitNewUser(payload) {
      this.createNewUser(payload);
    },
    submitDelete(id) {
      this.deleteUser(id);
    },
  },
  computed: {
    ...mapState("accounts", {
      users_index: "users_index",
    }),
    userRole: function () {
      return this.$auth.role();
    },
    userPermissions() {
      let usersTable = false;
      this.rolesAllowed.includes(this.userRole) && (usersTable = true);
      return {
        usersTable: usersTable,
      };
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
