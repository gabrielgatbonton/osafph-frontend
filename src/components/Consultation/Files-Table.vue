<template>
  <v-data-table
    :headers="headers"
    :items="data"
    item-key="name"
    class="elevation-0"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    no-data-text="No Files Available"
  >
    <template v-slot:top v-if="data.length > 0">
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        prepend-icon="mdi-magnify"
      ></v-text-field>
    </template>
    <template v-slot:body="{ items }" v-if="data.length > 0">
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.file_name }}</td>
          <td>{{ item.document_type }}</td>
          <td>{{ item.uploaded_by }}</td>
          <td>{{ item.date_uploaded }}</td>
          <td>
            <div
              :class="{
                'text-green': item.upload_status === 'COMPLETED',
                'text-red': item.upload_status !== 'COMPLETED',
              }"
            >
              {{ item.upload_status }}
            </div>
          </td>
          <td>
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
                  <v-icon class="mx-1" color="blue darken-4" dense
                    >mdi-download</v-icon
                  >
                </v-col>
                <v-col cols="auto" align-self="center">
                  <v-icon
                    @click="
                      deleteActivator(item.file_id, item.hospital_service_id)
                    "
                    class="mx-1"
                    color="error"
                    dense
                    >mdi-trash-can</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </td>
        </tr>
      </tbody>
      <ReusableDeleteDialog
        :activator="deleteDialog"
        v-on:dialogResponse="resetActivator"
        v-on:deleteItem="deleteItem"
      />
    </template>
  </v-data-table>
</template>

<script>
//   import format from "date-fns/format";
//   import parseISO from "date-fns/parseISO";
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
    data: [],
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
  },
  watch: {
    files(value) {
      console.log(value);
      this.data = value.map((file) => ({
        file_name: file.file_name,
        document_type: file.document_type,
        uploaded_by: file.uploaded_by,
        date_uploaded: file.date_uploaded,
        upload_status: file.upload_status,
        file_id: file.id,
        hospital_service_id: file.hospital_service_id,
      }));
    },
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
