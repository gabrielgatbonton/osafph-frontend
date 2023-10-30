<template>
  <div>
    <v-dialog v-model="dialog" max-width="450">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" class="mx-1" color="error" dense
          >mdi-trash-can</v-icon
        >
      </template> -->
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-img
                class="mx-auto"
                max-width="150"
                src="@/assets/delete-1.svg"
              ></v-img>
            </v-col>
            <v-col cols="12">
              <div class="text-center text-h5 modal-title">Are you sure?</div>
            </v-col>
            <v-col cols="12">
              <div class="text-center text-subtitle-1 modal-body">
                Do you really want to delete this record? This process cannot be
                undone.
              </div>
            </v-col>
            <v-col cols="12">
              <v-card-actions>
                <div class="mx-auto">
                  <v-btn
                    large
                    dark
                    color="grey"
                    class="px-10 mx-2"
                    @click="dialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    dark
                    large
                    depressed
                    class="px-10 mx-2"
                    color="red"
                    :loading="loading"
                    @click="deleteItem"
                    >Delete</v-btn
                  >
                </div>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
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
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    deleteItem() {
      this.$emit("deleteItem", true);
    },
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

<style scoped>
.modal-title {
  color: #424242;
}
.modal-body {
  color: #999;
  text-align: center;
  margin: 0 auto;
  width: 75%;
}
</style>
