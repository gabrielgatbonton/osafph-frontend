<template>
  <v-dialog v-model="dialog" max-width="600" scrollable>
    <v-card>
      <v-card-title class="primary pb-4 white--text"
        ><v-icon dark left>mdi-file-upload</v-icon>{{ title }} Dialysis
        Item</v-card-title
      >
      <v-container fluid class="py-8 mx-auto overflow-scroll">
        <v-row class="mx-4">
          <v-col cols="12">
            <v-text-field
              v-model="payload.name"
              label="Item Name"
              @blur="$v.payload.name.$touch()"
              :error-messages="errorMessages.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn dark class="primary" @click="submitForm"
                >Submit</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import ItemDialog from "@/mixins/Validation/DialysisValidation/ItemDialog";
export default {
  name: "ItemDialog",
  mixins: [ItemDialog],
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Object,
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    payload: {
      name: null,
      price: null,
    },
  }),
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("submitForm", this.payload);
        this.$v.$reset();
      }
    },
  },
  computed: {
    title() {
      let title = null;
      if (this.item) {
        title = "Edit";
      } else {
        title = "Add";
      }
      return title;
    },
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
    item: {
      deep: true,
      handler(value) {
        this.payload = {
          name: value.name,
        };
      },
    },
  },
};
</script>

<style scoped></style>
