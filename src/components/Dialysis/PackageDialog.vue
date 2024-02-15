<template>
  <v-dialog v-model="dialog" max-width="600" scrollable>
    <v-card>
      <v-card-title class="blue darken-1 pb-4 white--text"
        ><v-icon dark left>mdi-file-upload</v-icon>Add Dialysis
        Package</v-card-title
      >
      <v-container fluid class="py-8 mx-auto overflow-scroll">
        <v-row class="mx-4">
          <v-col cols="12">
            <v-text-field
              v-model="payload.name"
              label="Package Name"
              @blur="$v.payload.name.$touch()"
              :error-messages="errorMessages.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="payload.dialysis_item_options"
              label="Dialysis Item Options"
              item-text="name"
              item-value="id"
              :items="dialysis_items"
              @blur="$v.payload.dialysis_item_options.$touch()"
              :error-messages="errorMessages.dialysis_item_options"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn dark class="blue darken-4" @click="submitForm">Submit</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import PackageDialog from "@/mixins/Validation/DialysisValidation/PackageDialog";
import { mapState, mapActions } from "vuex";
export default {
  name: "PackageDialog",
  mixins: [PackageDialog],
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    payload: {
      name: null,
      dialysis_item_options: null,
    },
  }),
  methods: {
    ...mapActions("dialysis_items", ["fetchDialysisItems"]),
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("submitForm", this.payload);
        this.dialog = false;
        this.$v.$reset();
      }
    },
  },
  computed: {
    ...mapState("dialysis_items", ["dialysis_items"])
  },
  watch: {
    activator(newValue) {
      this.dialog = newValue;
    },
    //Reset for Adding
    reset(value) {
      this.payload = value;
    },
    dialog(value) {
      if (value === false) {
        this.$emit("dialogResponse", value);
      }
    },
  },
  created() {
    this.fetchDialysisItems();
  }
};
</script>

<style scoped></style>
