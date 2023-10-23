<template>
  <v-container class="mx-auto mt-3 px-8">
    <v-row>
      <v-col cols="auto">
        <v-icon left>mdi-folder-multiple</v-icon>
        <span>Category</span>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" class="mt-n3">
        <v-select
          :value="data.category"
          v-model="data.category"
          label="Category"
          :items="getCategories"
          placeholder="Choose..."
          @blur="$v.data.category.$touch()"
          :error-messages="errorMessages.category"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="6" md="6" class="mt-n3">
        <v-autocomplete
          :items="getIdentificationCards"
          item-text="name"
          label="Identification Card"
          v-model="data.identification_card"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        md="6"
        v-if="data.identification_card === 'GOVERNMENT_ISSUED_ID'"
        class="mt-n3"
      >
        <v-autocomplete
          label="Type of Id"
          :items="type_of_ids"
          v-model="data.type_of_id"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        md="6"
        v-if="data.identification_card === 'OTHERS'"
        class="mt-n3"
      >
        <v-text-field v-model="data.other_id" label="Other Id"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" class="mt-n3">
        <v-text-field
          :value="data.id_number"
          v-model="data.id_number"
          label="Id Number"
          @blur="$v.data.id_number.$touch()"
          :error-messages="errorMessages.id_number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" class="mt-n3">
        <v-text-field
          :value="data.hub_registrant_number"
          v-model="data.hub_registrant_number"
          label="HUB Registrant Number"
          @blur="$v.data.hub_registrant_number.$touch()"
          :error-messages="errorMessages.hub_registrant_number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12">
        <v-btn dark block class="blue darken-4" @click="continueForm"
          >Proceed</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormValidation from "@/mixins/FormValidation";
export default {
  name: "CategorySection",
  mixins: [FormValidation],
  props: {
    editData: {
      required: false,
    },
  },
  data: () => ({
    data: {
      category: null,
      identification_card: null,
      type_of_id: null,
      other_id: null,
      hub_registrant_number: null,
      id_number: null,
    },
    type_of_ids: [
      "SSS",
      "GSIS",
      "TIN",
      "PASSPORT",
      "DRIVERS LICENSE",
      "PRC LICENSE",
      "VOTERS ID",
      "PHILHEALTH",
      "PAG-IBIG",
    ],
    stepper: 1,
  }),
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("identification_cards", ["fetchIdentificationCards"]),
    continueForm() {
      // Check if hub_registrant_id is the same as editData, and if it is, remove it
      console.log(this.data.hub_registrant_number, this.editData.hub_registrant_number)
      if (
        this.data.hub_registrant_number === this.editData.hub_registrant_number
      ) {
        delete this.data.hub_registrant_number;
      }

      this.$emit("data", this.data);
      this.$emit("stepper", (this.stepper = 2));
    },
    findIdentificationCard() {
      const data = this.getIdentificationCards.find(
        (card) => card.id === this.editData.identification_card_id
      );
      if (data) {
        this.data.identification_card = data.name;
      }
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("identification_cards", ["getIdentificationCards"]),
  },
  created() {
    this.fetchCategories();
    this.fetchIdentificationCards();
  },
  watch: {
    editData(value) {
      this.data.category = value.category;
      this.data.type_of_id = value.type_of_id;
      this.data.other_id = value.other_id;
      this.data.hub_registrant_number = value.hub_registrant_number;
      this.data.id_number = value.id_number;
    },
  },
  updated() {
    this.findIdentificationCard();
  },
};
</script>

<style></style>
