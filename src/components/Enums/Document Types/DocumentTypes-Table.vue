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
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        prepend-icon="mdi-magnify"
      ></v-text-field>
      <ReusableDeleteDialog
        :activator="deleteDialog"
        @dialogResponse="resetActivator"
        @deleteItem="deleteItem"
      />
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="primary pb-4 white--text"
            ><v-icon left dark>mdi-plus</v-icon>Create File Type</v-card-title
          >
          <v-container fluid class="py-8 mx-auto">
            <v-row class="mx-4">
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  v-model="payload.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn dark class="primary" @click="submitForm">Submit</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="pa-0">
        <v-row no-gutters :justify="isJustify">
          <v-col cols="auto" v-if="iconPermissions.delete" align-self="center">
            <v-icon color="error" dense @click="deleteActivator(item.item_id)"
              >mdi-trash-can</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";
import ReusableDeleteDialog from "../../ReusableDeleteDialog.vue";
import DeleteType from "@/mixins/Admin/Enums/DeleteType";
import FileTypeDialogMixin from "@/mixins/Validation/EnumsValidation/FileTypeDialog";
export default {
  name: "DocumentTypes-Table",
  props: {
    types: {
      type: Array,
      required: true,
    },
    activator: {
      type: Boolean,
      required: false,
    },
  },
  mixins: [DeleteType, FileTypeDialogMixin],
  data: () => ({
    search: "",
    offset: true,
    loading: true,
    dialog: false,
    payload: {
      name: null,
    },
    isJustify: "",
  }),
  components: {
    ReusableDeleteDialog,
  },
  methods: {
    ...mapActions("file_types_actions", ["createFileType"]),
    submitForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createFileType(this.payload)
          .catch((error) => {
            console.error("Error Submitting File Type: ", error);
          })
          .finally(() => {
            this.payload.name = null;
            this.dialog = false;
            this.$v.$reset();
          });
      }
    },
  },
  computed: {
    userRole: function () {
      return this.$auth.role();
    },
    headers() {
      return [
        {
          text: "ITEM ID",
          value: "item_id",
        },
        {
          text: "TYPE NAME",
          value: "file_type_name",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
    },
    iconPermissions() {
      let edit = false;
      let remove = false;
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        edit = true;
        remove = true;
      }
      return {
        edit: edit,
        delete: remove,
      };
    },
    itemData() {
      return this.types
        ? this.types.map((item) => ({
            item_id: item.id,
            file_type_name: item.name,
          }))
        : [];
    },
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    types: {
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
      immediate: true,
    },
    activator: {
      handler(value) {
        this.dialog = value;
      },
    },
    dialog: {
      handler(value) {
        if (value === false) {
          this.$emit("dialog:response", value);
        }
      },
    },
    size: {
      handler: function (newVal) {
        if (newVal.xs) {
          this.isJustify = "end";
        } else {
          this.isJustify = "center";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
