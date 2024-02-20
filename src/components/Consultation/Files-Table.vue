<template>
  <v-data-table
    :headers="headers"
    :items="filesData"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
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
        v-on:dialogResponse="resetActivator"
        v-on:deleteItem="deleteItem"
      />
    </template>
    <template v-slot:[`item.upload_status`]="{ item }">
      <div
        :class="{
          'text-green': item.upload_status === 'COMPLETED',
          'text-red': item.upload_status !== 'COMPLETED',
        }"
      >
        {{ item.upload_status }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-container class="ml-n8" style="width: 120px">
        <v-row no-gutters justify="center">
          <v-col cols="auto" align-self="center">
            <v-icon
              class="mx-1"
              color="grey darken-1"
              dense
              @click="activator(item.file_id, item.hospital_service_id)"
              >mdi-eye</v-icon
            >
          </v-col>
          <v-col cols="auto" align-self="center">
            <v-icon
              class="mx-1"
              color="blue darken-4"
              dense
              @click="downloadTrigger(item.file_id, item.hospital_service_id)"
              >mdi-download</v-icon
            >
          </v-col>
          <v-col cols="auto" align-self="center">
            <v-icon
              @click="deleteActivator(item.file_id, item.hospital_service_id)"
              class="mx-1"
              color="error"
              dense
              >mdi-trash-can</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ReusableDeleteDialog from "../ReusableDeleteDialog.vue";
import DeleteFilesMixin from "../../mixins/Consultation Files/DeleteFiles";
import ViewFileMixin from "../../mixins/Consultation Files/ViewFile";
export default {
  name: "Files-Table",
  props: ["files", "routeName"],
  mixins: [DeleteFilesMixin, ViewFileMixin],
  components: {
    ReusableDeleteDialog,
  },
  data: () => ({
    search: "",
    offset: true,
  }),
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },
    //   viewRegistrantService(consultation_id, hospital_service_id) {
    //     this.$router.push({
    //       name: this.routeName,
    //       params: {
    //         consultation_id: consultation_id,
    //         hospital_service_id: hospital_service_id,
    //       },
    //     });
    //   },
  },
  computed: {
    headers() {
      return [
        {
          text: "FILE NAME",
          value: "file_name",
        },
        {
          text: "DOCUMENT TYPE",
          value: "document_type",
        },
        {
          text: "UPLOADED BY",
          value: "uploaded_by",
        },
        {
          text: "DATE UPLOADED",
          value: "date_uploaded",
        },
        {
          text: "UPLOAD STATUS",
          value: "upload_status",
        },
        {
          text: "ACTIONS",
          value: "actions",
          sortable: false,
        },
      ];
    },
    filesData() {
      return this.files ? this.files.map((file) => ({
        file_name: file.file_name,
        document_type: file.document_type,
        uploaded_by: file.uploaded_by,
        date_uploaded: format(parseISO(file.date_uploaded), "MMMM d, yyyy"),
        upload_status: file.upload_status,
        file_id: file.id,
        hospital_service_id: file.hospital_service_id,
      })) : [];
    }
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
