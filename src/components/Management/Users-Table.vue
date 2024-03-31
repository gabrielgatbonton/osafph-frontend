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
            <v-col cols="auto"> </v-col>
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
                        <v-text-field
                          v-model="user_payload.first_name"
                          label="First Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_payload.middle_name"
                          label="Middle Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_payload.last_name"
                          label="Last Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="user_payload.role"
                          :items="user_roles_enum"
                          label="Role"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" v-if="user_payload.role === 'DOCTOR'">
                        <v-autocomplete
                          :items="specialties_enum"
                          v-model="user_payload.specialty"
                          label="Specialty"
                          item-text="name"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_payload.username"
                          label="Username"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_payload.password"
                          label="Password"
                          :type="show_1 ? 'text' : 'password'"
                          :append-icon="show_1 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show_1 = !show_1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user_payload.password_confirmation"
                          label="Confirm Password"
                          :type="show_2 ? 'text' : 'password'"
                          :append-icon="show_2 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show_2 = !show_2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <div class="text-right">
                          <v-btn dark class="blue darken-4" @click="submitUser"
                            >Submit</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
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
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password_payload.new_password_confirmation"
                          label="Confirm New Password"
                          :type="show_4 ? 'text' : 'password'"
                          :append-icon="show_4 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show_4 = !show_4"
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
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
    </template>
    <template v-slot:[`header.actions`]>
      <div class="text-center">ACTIONS</div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="text-center">
        <v-icon small @click="changePassword(item.user_id)">mdi-pencil</v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "Users-Table",
  props: ["users"],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    dialogPassword: false,
    dialogUser: false,
    password_payload: {
      new_password: null,
      new_password_confirmation: null,
    },
    user_payload: {
      first_name: null,
      middle_name: null,
      last_name: null,
      role: null,
      specialty: null,
      username: null,
      password: null,
      password_confirmation: null,
    },
    show_1: false,
    show_2: false,
    show_3: false,
    show_4: false,
    id: null,
  }),
  methods: {
    ...mapActions("accounts", ["changeUserPassword", "createNewUser"]),
    ...mapActions("management", ["fetchEnum"]),
    ...mapActions("services_choices", ["fetchSpecialtiesEnum"]),
    changePassword(id) {
      this.id = id;
      this.dialogPassword = !this.dialogPassword;
    },
    submitPasswordChange() {
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
        });
    },
    submitUser() {
      this.createNewUser(this.user_payload)
        .catch((error) => {
          console.error("Error Creating User: ", error);
        })
        .finally(() => {
          this.user_payload = {
            first_name: null,
            middle_name: null,
            last_name: null,
            role: null,
            specialty: null,
            username: null,
            password: null,
            password_confirmation: null,
          };
          this.dialogUser = false;
        });
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
        },
      ];
    },
    //   iconPermissions() {
    //     let edit = false;
    //     let remove = false;
    //     if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
    //       edit = true;
    //       remove = true;
    //     }
    //     return {
    //       edit: edit,
    //       delete: remove,
    //     };
    //   },
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
