<template>
  <v-col cols="12">
    <v-card class="pa-6" rounded="lg">
      <div class="d-flex justify-space-between align-center">
        <div class="card-title">Funding</div>
        <div
          class="card-icon blue lighten-5 d-flex justify-center align-center"
        >
          <v-icon size="28" color="primary">mdi-cash-multiple</v-icon>
        </div>
      </div>
      <div class="mt-5">
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="name"
          class="elevation-0"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          :server-items-length="total_items"
          :options.sync="options"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 15],
          }"
        >
          <template v-slot:top>
            <SubmissionAlert :message="success.message" v-if="success.alert" />
            <ErrorAlert :message="failed.message" v-if="failed.alert" />
            <ReusableDeleteDialog
              :activator="deleteDialog"
              @deleteItem="deleteRequest"
              @dialogResponse="resetDeleteDialog"
            />
            <v-toolbar flat>
              <v-container fluid>
                <v-row align-content="center">
                  <v-col cols="9">
                    <v-text-field
                      v-model="search"
                      label="Search"
                      class="mx-4"
                      prepend-icon="mdi-magnify"
                    >
                    </v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn
                      color="blue darken-4"
                      dark
                      @click="openDialog(null, 'CREATE')"
                      >New Funder</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-toolbar>
            <v-dialog v-model="dialog" max-width="600" scrollable>
              <v-card>
                <v-card-title class="blue darken-1 pb-4 white--text"
                  ><v-icon left dark>mdi-account</v-icon>
                  {{ dialogTitle }} Funder</v-card-title
                >
                <v-container fluid class="py-8 mx-auto overflow-scroll">
                  <v-row class="mx-4">
                    <v-col cols="12">
                      <v-text-field
                        label="Name"
                        v-model="payload.name"
                        @blur="$v.payload.name.$touch()"
                        :error-messages="errorMessages.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Office"
                        v-model="payload.office"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        label="Type"
                        :items="types"
                        v-model="payload.type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Initial Contribution"
                        type="number"
                        v-model="payload.initial_contribution"
                        :disabled="disabled"
                        @blur="$v.payload.initial_contribution.$touch()"
                        :error-messages="errorMessages.initial_contribution"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-right">
                        <v-btn dark class="blue darken-4" @click="submitRequest"
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
            <v-container>
              <v-row justify="center" no-gutters>
                <v-col cols="auto" align-self="center">
                  <v-icon
                    class="mx-1"
                    color="blue darken-4"
                    dense
                    @click="openDialog(item, 'UPDATE')"
                    >mdi-pencil</v-icon
                  >
                </v-col>
                <v-col cols="auto" align-self="center">
                  <v-icon
                    class="mx-1"
                    color="error"
                    dense
                    @click="openDeleteDialog(item)"
                    >mdi-trash-can</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import FundingTableMixin from "@/mixins/Validation/DashboardValidation/FundingTable";
export default {
  name: "Funding-Table",
  props: ["data"],
  mixins: [ErrorAlertsLogic, FundingTableMixin],
  components: {
    ReusableDeleteDialog,
  },
  data: () => ({
    // Table Values
    items: [],
    total_items: 0,
    search: "",
    loading: true,
    // Dialog Values
    dialog: false,
    dialogStatus: null,
    dialogTitle: null,
    deleteDialog: false,
    // Payload Values
    payload: {
      name: null,
      office: null,
      type: null,
      initial_contribution: null,
    },
    // Request Values
    id: null,
    date_today: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    disabled: false,
    types: ["PUBLIC", "PRIVATE"],
    options: {},
    query_params: {},
    page: 1,
  }),
  methods: {
    ...mapActions("funding", ["createFunder", "updateFunder", "deleteFunder"]),
    ...mapActions("dashboard", ["getRootData"]),
    // Dialogs Methods
    openDialog(value, status) {
      this.dialogStatus = status;
      if (this.dialogStatus === "UPDATE") {
        // Init the id
        this.$v.$reset();
        this.id = value.id;

        // Disable the Initial Contribution per conditions.
        if (this.date_today !== value.created_at) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }

        // Init the payload
        this.payload = {
          name: value.name,
          office: value.office,
          type: value.type,
          initial_contribution: value.initial_contribution,
        };

        // Open the dialog and change the title
        this.dialog = !this.dialog;
        this.dialogTitle = "Update";
      } else {
        // Open the dialog and reset payload, change the title also
        this.$v.$reset();
        this.disabled = false;
        this.payload = {
          name: null,
          office: null,
          type: null,
          initial_contribution: null,
        };
        this.dialog = !this.dialog;
        this.dialogTitle = "Create";
      }
    },
    openDeleteDialog(value) {
      this.id = value.id;
      this.deleteDialog = !this.deleteDialog;
    },
    resetDeleteDialog(value) {
      this.deleteDialog = value;
    },
    // Requests
    submitRequest() {
      if (this.dialogStatus === "UPDATE") {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.updateFunder({
            data: this.payload,
            id: this.id,
          })
            .catch((error) => {
              console.error("Error Updating Funder: ", error);
            })
            .finally(() => {
              this.payload = {
                name: null,
                office: null,
                type: null,
                initial_contribution: null,
              };
              this.id = null;
              this.dialogStatus = null;
              this.dialog = false;
              this.$v.$reset();
              //Fetch Again for the updating of data
              this.getRootData(this.query_params).catch((error) => {
                console.error("Error Fetching Root Data: ", error);
              });
            });
        }
      } else {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.createFunder(this.payload)
            .catch((error) => {
              console.error("Error Submitting Funder: ", error);
            })
            .finally(() => {
              this.payload = {
                name: null,
                office: null,
                type: null,
                initial_contribution: null,
              };
              this.dialogStatus = null;
              this.dialog = false;
              this.$v.$reset();
              //Fetch Again for the updating of data
              this.getRootData(this.query_params).catch((error) => {
                console.error("Error Fetching Root Data: ", error);
              });
            });
        }
      }
    },
    deleteRequest() {
      this.deleteFunder(this.id)
        .catch((error) => {
          console.error("Error Deleting Funder: ", error);
        })
        .finally(() => {
          this.id = null;
          this.deleteDialog = false;
          //Fetch Again for the updating of data
          this.getRootData(this.query_params).catch((error) => {
            console.error("Error Fetching Root Data: ", error);
          });
        });
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "NAME",
          value: "name",
        },
        {
          text: "TOTAL CONTRIBUTION",
          value: "initial_contribution",
        },
        {
          text: "DATE",
          value: "created_at",
        },
        {
          text: "REMAINING AMOUNT",
          value: "contribution_left",
        },
        {
          text: "ACTIONS",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ];
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.loading = true;
        if (value.length === 0) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
          this.items = value.tableContent.data;
          this.total_items = value.tableContent.total;
        }
      },
    },
    options: {
      deep: true,
      handler(value) {
        if (value.page !== this.page) {
          this.query_params.page = value.page;
        }
        if (value.itemsPerPage) {
          this.query_params.per_page = value.itemsPerPage;
        }
        if (value.sortBy.length === 1 && value.sortDesc.length === 1) {
          this.query_params.sort_by = value.sortBy[0];
          this.query_params.sort_order = value.sortDesc[0] ? "asc" : "desc";
        } else {
          delete this.query_params.sort_by;
          delete this.query_params.sort_order;
        }
        this.getRootData(this.query_params)
          .catch((error) => {
            console.error("Error Fetching Root Data: ", error);
          })
          .finally(() => {
            this.page = value.page;
          });
      },
    },
    search: {
      deep: true,
      handler(value) {
        this.query_params = {
          search: value,
        };

        this.getRootData(this.query_params).catch((error) => {
          console.error("Error Fetching Root Data: ", error);
        });
      },
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
.overflow-scroll {
  max-height: 600px;
  overflow-y: auto;
}
</style>
