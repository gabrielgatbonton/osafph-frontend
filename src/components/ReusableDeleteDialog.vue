<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" class="mx-1" color="error" dense
          >mdi-trash-can</v-icon
        >
      </template> -->
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
export default {
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    // id: {
    //   type: [String, Number],
    //   required: true,
    // },
    // hospitalServiceId: {
    //   type: [Number, String],
    //   required: true,
    // },
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    deleteItem() {
      this.$emit("deleteService", true);
    }
  },
  watch: {
    activator(newValue) {
      this.dialog = newValue;
    },
    dialog(value) {
      if (value === false) {
        this.$emit("dialogResponse", value);
      }
    },
  },
};
</script>

<style scoped></style>
