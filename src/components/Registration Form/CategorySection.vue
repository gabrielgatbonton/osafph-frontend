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
          :value="category"
          v-model="category"
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
          v-model="identification_card"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        md="6"
        v-if="identification_card === 'GOVERNMENT_ISSUED_ID'"
        class="mt-n3"
      >
        <v-autocomplete
          label="Type of Id"
          :items="type_of_ids"
          v-model="type_of_id"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        md="6"
        v-if="identification_card === 'OTHERS'"
        class="mt-n3"
      >
        <v-text-field v-model="data.other_id" label="Other Id"></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" class="mt-n3">
        <v-text-field
          :value="id_number"
          v-model="id_number"
          label="Id Number"
          @blur="$v.id_number.$touch()"
          :error-messages="errorMessages.id_number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" md="6" class="mt-n3">
        <v-text-field
          :value="hub_registrant_number"
          v-model="hub_registrant_number"
          label="HUB Registrant Number"
          @blur="$v.hub_registrant_number.$touch()"
          :error-messages="errorMessages.hub_registrant_number"
        ></v-text-field>
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
  data: () => ({
    category: null,
    identification_card: null,
    type_of_id: null,
    other_id: null,
    hub_registrant_number: null,
    id_number: null,
  }),
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("identification_cards", ["fetchIdentificationCards"]),
  },
  computed: {
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("identification_cards", ["getIdentificationCards"]),
  },
  created() {
    this.fetchCategories();
    this.fetchIdentificationCards();
  },
};
</script>

<style></style>
