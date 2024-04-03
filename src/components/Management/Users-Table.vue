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
      <v-toolbar flat>
        <v-container fluid>
          <v-row align-content="center">
            <v-col cols="9">
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-dialog max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue darken-4" dark v-bind="attrs" v-on="on"
                    >Filter</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title class="blue darken-1 pb-4 white--text">
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
                            <v-btn color="error" @click="resetFilter"
                              >Reset</v-btn
                            >
                          </v-col>
                          <v-col cols="auto">
                            <v-btn
                              dark
                              class="blue darken-4"
                              @click="submitFilter"
                              >Submit</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="auto">
              <v-dialog v-model="dialogUser" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue darken-4" dark v-bind="attrs" v-on="on"
                    >Add User</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title class="blue darken-1 pb-4 white--text"
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
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      <v-dialog v-model="dialogPassword" max-width="600">
        <v-card>
          <v-card-title class="blue darken-1 pb-4 white--text">
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
                  <v-btn
                    dark
                    class="blue darken-4"
                    @click="submitPasswordChange"
                    >Submit</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="text-center">
        <v-icon
          :disabled="iconPermissions.edit"
          small
          color="primary"
          @click="changePassword(item.user_id)"
          >mdi-pencil</v-icon
        >
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import UserManagementMixin from "../../mixins/Validation/ManagementValidation/UserManagement";
import InformationStepper from "./Steppers/InformationStepper.vue";
import CredentailsStepper from "./Steppers/CredentailsStepper.vue";
export default {
  name: "Users-Table",
  mixins: [UserManagementMixin],
  props: ["users"],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    stepper: 1,
    dialogPassword: false,
    dialogUser: false,
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
  },
  methods: {
    ...mapActions("accounts", ["changeUserPassword", "createNewUser"]),
    ...mapActions("management", ["fetchEnum"]),
    ...mapActions("services_choices", ["fetchSpecialtiesEnum"]),
    changePassword(id) {
      //This is for the reset of validations
      this.$v.password_payload.$reset();

      this.id = id;
      this.dialogPassword = !this.dialogPassword;
    },

    submitPasswordChange() {
      this.$v.password_payload.$touch();

      if (!this.$v.password_payload.$invalid) {
        this.changeUserPassword({
          id: this.id,
          data: this.password_payload,
        })
          .catch((error) => {
            console.error("Error Submitting Password Change: ", error);
          })
          .finally(() => {
            this.id = null;
            this.password_payload = {
              new_password: null,
              new_password_confirmation: null,
            };
            this.dialogPassword = false;
            this.$v.password_payload.$reset();
          });
      }
    },
    submitUser() {
      this.createNewUser(this.user_payload)
        .catch((error) => {
          console.error("Error Creating User: ", error);
        })
        .finally(() => {
          this.$refs.informationStepper.resetValidations();
          this.$refs.credentialsStepper.resetValidations();
          this.dialogUser = false;
          this.stepper = 1;
        });
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
      this.$emit("submitFilter", this.table_filter);
    },
    resetFilter() {
      this.table_filter = {
        roles: [],
      };
      this.$emit("submitFilter", {});
    },
  },
  computed: {
    ...mapGetters("login", ["userRole"]),
    ...mapState("management", {
      user_roles_enum: "user_roles",
    }),
    ...mapState("services_choices", {
      specialties_enum: "specialties",
    }),
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
          align: "center"
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
      let edit = true;
      if (this.userRole === "ROOT") {
        edit = false;
      }
      return {
        edit: edit,
      };
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
  },
  created() {
    this.fetchEnum();
    this.fetchSpecialtiesEnum();
  },
};
</script>

<style scoped></style>
