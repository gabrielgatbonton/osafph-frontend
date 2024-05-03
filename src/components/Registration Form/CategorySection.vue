<template>
  <v-container class="mx-auto">
    <v-row class="mb-5">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="20" color="primary">mdi-folder-multiple</v-icon>
          <p class="text-subtitle-1 font-weight-bold pa-0 my-0 ml-2">
            Category
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-n5">
        <v-select
          :value="data.category"
          v-model="data.category"
          label="Category"
          :items="categories_enum"
          item-text="description"
          placeholder="Choose..."
          @blur="$v.data.category.$touch()"
          :error-messages="errorMessages.category"
          outlined
        />
      </v-col>
      <v-col cols="12" class="mt-n5">
        <v-autocomplete
          :items="identification_cards_enum"
          item-text="name"
          label="Identification Card"
          v-model="data.identification_card"
          @blur="$v.data.identification_card.$touch()"
          :error-messages="errorMessages.identification_card"
          outlined
        />
      </v-col>
      <v-col cols="12" class="mt-n5">
        <v-autocomplete
          label="Type of Id"
          :items="type_of_ids"
          v-model="data.type_of_id"
          @blur="$v.data.type_of_id.$touch()"
          :error-messages="errorMessages.type_of_id"
          outlined
        />
      </v-col>
      <v-col cols="12" v-if="data.type_of_id === 'OTHERS'" class="mt-n5">
        <v-text-field
          v-model="data.other_id"
          label="Other Id"
          @blur="$v.data.other_id.$touch()"
          :error-messages="errorMessages.other_id"
          outlined
        />
      </v-col>
      <v-col cols="12" class="mt-n5">
        <v-text-field
          :value="data.id_number"
          v-model="data.id_number"
          label="Id Number"
          @blur="$v.data.id_number.$touch()"
          :error-messages="errorMessages.id_number"
          outlined
        />
      </v-col>

      <v-col cols="12">
        <div class="w-full d-flex">
          <v-btn class="primary ml-auto" @click="continueForm">Proceed</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CategorySectionValidation from "@/mixins/Validation/RegistrationFormValidation/CategorySectionValidation";
export default {
  name: "CategorySection",
  mixins: [CategorySectionValidation],
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
      "OTHERS",
    ],
    stepper: 1,
  }),
  methods: {
    continueForm() {
      this.$v.$touch();
      // if (
      //   this.editData &&
      //   this.editData.hub_registrant_number === this.data.hub_registrant_number
      // ) {
      //   delete this.data.hub_registrant_number;
      // }
      if (!this.$v.$invalid) {
        this.$emit("data", this.data);
        this.$emit("stepper", (this.stepper = 2));
      } else {
        console.log("Data is invalid");
      }
    },
    // findIdentificationCard() {
    //   if (this.editData) {
    //     const data = this.getIdentificationCards.find(
    //       (card) => card.id === this.editData.identification_card_id
    //     );
    //     if (data) {
    //       this.data.identification_card = data.name;
    //       console.log( this.data.identification_card);
    //     }
    //   }
    // },
    asyncPayload() {
      if (this.editData) {
        this.$emit("data", this.data);
      }
    },
  },
  computed: {
    ...mapState("categories", {
      categories_enum: "categories",
    }),
    ...mapState("identification_cards", {
      identification_cards_enum: "identification_cards",
    }),
  },
  watch: {
    editData: {
      handler(value) {
        this.data.category = value.category;
        this.data.type_of_id = value.type_of_id;
        this.data.other_id = value.other_id;
        this.data.id_number = value.id_number;
        this.data.identification_card = value.identification_card;
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>

<style></style>
