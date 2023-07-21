<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title v-bind="attrs" v-on="on" class="red--text"
          ><v-icon dense left color="#F44336">mdi-delete-alert-outline</v-icon
          >DELETE</v-list-item-title
        >
      </template>

      <v-card>
        <v-card-title class="text-h6 grey lighten-2 pb-5">
          Delete
        </v-card-title>

        <v-card-text class="my-3 subtitle">
          Are you sure you want to delete this item?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn outlined color="primary" @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            depressed
            color="red"
            :loading="loading"
            @click="deleteItem"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["id"],
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    ...mapActions("registrants", ["deleteRegistrant"]),
    deleteItem() {
      this.loading = true;
      this.deleteRegistrant(this.id)
        .catch((error) => {
          console.log("Error Proceding with delete:", error);
        })
        .finally(() => {
          this.loading = false;
          this.dialog = false;
        });
    },
  },
};
</script>

<style scoped></style>
