<template>
  <v-data-table
    :headers="headers"
    :items="itemData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :loading="loading"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          prepend-icon="mdi-magnify"
        ></v-text-field>
        <div>
          <!-- Filter Dialog -->
          <v-dialog max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="!$vuetify.breakpoint.xs"
                color="primary"
                class="mr-3"
                dark
                v-bind="attrs"
                v-on="on"
                >Filter</v-btn
              >
              <v-btn
                v-else
                dark
                class="mr-3"
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-filter-multiple</v-icon></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary pb-4 white--text">
                <v-icon left dark>mdi-filter-multiple</v-icon> Filter
              </v-card-title>
              <v-container fluid class="py-8 mx-auto">
                <v-row class="mx-4">
                  <v-col cols="12">
                    <v-select
                      multiple
                      v-model="table_filter.roles"
                      :items="user_roles_enum"
                      label="Roles"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-row dense justify="end">
                      <v-col cols="auto">
                        <v-btn color="error" outlined @click="resetFilter"
                          >Reset</v-btn
                        >
                      </v-col>
                      <v-col cols="auto">
                        <v-btn dark class="primary" @click="submitFilter"
                          >Submit</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <!-- User Dialog -->
          <v-dialog v-model="dialogUser" max-width="600" scrollable>
            <template
              v-slot:activator="{ on, attrs }"
              v-if="slot_activator_user"
            >
              <v-btn
                v-if="!$vuetify.breakpoint.xs"
                color="primary"
                class="mr-3"
                dark
                v-bind="attrs"
                v-on="on"
                >Add User</v-btn
              >
              <v-btn
                v-else
                dark
                class="mr-3"
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary pb-4 white--text"
                ><v-icon left dark>mdi-account</v-icon> Create
                User</v-card-title
              >
              <v-container fluid class="py-8 mx-auto overflow-scroll">
                <v-row class="mx-4">
                  <v-col cols="12">
                    <v-stepper
                      flat
                      v-model="stepper"
                      :non-linear="nonLinearFunction.linear"
                    >
                      <v-stepper-header class="elevation-0">
                        <v-stepper-step
                          step="1"
                          :complete="stepper > 1"
                          :editable="nonLinearFunction.information"
                        >
                          Information
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step
                          step="2"
                          :complete="stepper > 2"
                          :editable="nonLinearFunction.credentials"
                        >
                          Credentials
                        </v-stepper-step>
                      </v-stepper-header>
                      <v-stepper-items>
                        <v-stepper-content step="1" class="px-0">
                          <InformationStepper
                            :roles="user_roles_enum"
                            :specialties="specialties_enum"
                            @stepper="updateStepper"
                            @payload="assignPayload"
                            ref="informationStepper"
                          />
                        </v-stepper-content>
                        <v-stepper-content step="2" class="px-0">
                          <CredentailsStepper
                            @stepper="updateStepper"
                            @payload="assignPayload"
                            @submitForm="submitUser"
                            ref="credentialsStepper"
                          />
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <!-- Password Dialog -->
      <v-dialog v-model="dialogPassword" max-width="600">
        <v-card>
          <v-card-title class="primary pb-4 white--text">
            <v-icon left dark>mdi-lock-reset</v-icon>
            Change Password
          </v-card-title>
          <v-container fluid class="py-8 mx-auto overflow-scroll">
            <v-row class="mx-4">
              <v-col cols="12">
                <v-text-field
                  v-model="password_payload.new_password"
                  label="New Password"
                  :type="show_3 ? 'text' : 'password'"
                  :append-icon="show_3 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_3 = !show_3"
                  @blur="$v.password_payload.new_password.$touch()"
                  :error-messages="errorMessages.password_payload.new_password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password_payload.new_password_confirmation"
                  label="Confirm New Password"
                  :type="show_4 ? 'text' : 'password'"
                  :append-icon="show_4 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_4 = !show_4"
                  @blur="$v.password_payload.new_password_confirmation.$touch()"
                  :error-messages="
                    errorMessages.password_payload.new_password_confirmation
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn dark class="primary" @click="submitPasswordChange"
                    >Submit</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- Delete Dialog -->
      <ReusableDeleteDialog
        :activator="dialogDelete"
        @dialogResponse="(bool) => (dialogDelete = bool)"
        @deleteItem="submitDelete"
      />
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-row dense justify="center" align="center">
        <v-col cols="auto">
          <v-tooltip v-if="iconPermissions" top open-on-hover max-width="225">
            <template #activator="{ on }">
              <div v-on="on">
                <v-icon
                  disabled
                  dense
                  color="blue darken-4"
                  @click="changePassword(item.user_id)"
                  >mdi-pencil</v-icon
                >
              </div>
            </template>
            <span
              >You do not have permission. Request the administrator for
              access.</span
            >
          </v-tooltip>
          <v-icon
            v-else
            dense
            color="blue darken-4"
            @click="changePassword(item.user_id)"
            >mdi-pencil</v-icon
          >
        </v-col>
        <v-col cols="auto">
          <v-tooltip v-if="iconPermissions" top open-on-hover max-width="225">
            <template #activator="{ on }">
              <div v-on="on">
                <v-icon
                  disabled
                  dense
                  color="error"
                  @click="deleteUser(item.user_id)"
                  >mdi-trash-can</v-icon
                >
              </div>
            </template>
            <span
              >You do not have permission. Request the administrator for
              access.</span
            >
          </v-tooltip>
          <v-icon v-else dense color="error" @click="deleteUser(item.user_id)"
            >mdi-trash-can</v-icon
          >
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserManagementMixin from "../../mixins/Validation/ManagementValidation/UserManagement";
import InformationStepper from "./Steppers/InformationStepper.vue";
import CredentailsStepper from "./Steppers/CredentailsStepper.vue";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
export default {
  name: "Users-Table",
  mixins: [UserManagementMixin],
  props: {
    users: {
      type: Array,
      required: true,
    },
    slot_activator_user: {
      type: Boolean,
      required: true,
    },
    responseUser: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    stepper: 1,
    dialogPassword: false,
    dialogUser: false,
    dialogDelete: false,
    password_payload: {
      new_password: null,
      new_password_confirmation: null,
    },
    user_payload: {},
    show_3: false,
    show_4: false,
    id: null,
    table_filter: {
      roles: [],
    },
  }),
  components: {
    InformationStepper,
    CredentailsStepper,
    ReusableDeleteDialog,
  },
  methods: {
    ...mapActions("management", ["fetchEnum"]),
    ...mapActions("services_choices", ["fetchSpecialtiesEnum"]),
    changePassword(id) {
      //This is for the reset of validations
      this.$v.password_payload.$reset();

      this.id = id;
      this.dialogPassword = !this.dialogPassword;
    },
    deleteUser(id) {
      this.id = id;
      this.dialogDelete = !this.dialogDelete;
    },
    submitPasswordChange() {
      this.$v.password_payload.$touch();

      if (!this.$v.password_payload.$invalid) {
        this.$emit("requestPasswordChange", {
          id: this.id,
          password_payload: this.password_payload,
        });
        // Reset Values
        this.id = null;
        this.password_payload = {
          new_password: null,
          new_password_confirmation: null,
        };
        this.dialogPassword = false;
        this.$v.password_payload.$reset();
      }
    },
    submitUser() {
      this.$emit("requestNewUser", this.user_payload);
      // Reset Values
      this.$refs.informationStepper.resetValidations();
      this.$refs.credentialsStepper.resetValidations();
      this.dialogUser = false;
      this.stepper = 1;
    },
    submitDelete(bool) {
      if (bool) {
        this.$emit("requestDeleteUser", this.id);
        this.id = null;
        this.dialogDelete = false;
      }
    },
    updateStepper(stepper) {
      this.stepper = stepper;
    },
    assignPayload(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          // Use this.$set to add reactive properties
          this.$set(this.user_payload, key, payload[key]);
        }
      }
    },
    submitFilter() {
      this.$emit("query_params", this.table_filter);
    },
    resetFilter() {
      this.table_filter = {
        roles: [],
      };
      this.$emit("query_params", {});
    },
  },
  computed: {
    ...mapState("management", {
      user_roles_enum: "user_roles",
    }),
    ...mapState("services_choices", {
      specialties_enum: "specialties",
    }),
    userRole: function () {
      return this.$auth.role();
    },
    headers() {
      return [
        {
          text: "USER ID",
          value: "user_id",
        },
        {
          text: "USERNAME",
          value: "username",
        },
        {
          text: "ROLE",
          value: "role",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
    },
    nonLinearFunction() {
      let linear = false;
      let information = false;
      let credentials = false;

      if (this.stepper > 1) {
        linear = true;
        information = true;
        credentials = true;
      }

      return {
        linear: linear,
        credentials: credentials,
        information: information,
      };
    },
    iconPermissions() {
      let actions = true;
      if (this.userRole === "ROOT") {
        actions = false;
      }
      return actions;
    },
    itemData() {
      return this.users
        ? this.users.map((item) => ({
            user_id: item.id,
            username: item.username,
            role: item.role,
          }))
        : [];
    },
  },
  watch: {
    users: {
      handler(value) {
        this.loading = true;
        if (!value.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
    responseUser: {
      immediate: true,
      handler(newVal) {
        this.dialogUser = newVal;
      },
    },
    dialogUser: {
      deep: true,
      handler(newVal) {
        if (newVal === false) {
          this.$emit("dialog:user", newVal);
        }
      },
    },
  },
  created() {
    this.fetchEnum();
    this.fetchSpecialtiesEnum();
  },
};
</script>

<style scoped>
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
</style>
