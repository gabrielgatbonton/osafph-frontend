<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-folder-multiple</v-icon>Category</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row
        v-for="(info, index) in categories"
        :key="index"
        no-gutters
        :class="{ 'mb-3': $vuetify.breakpoint.xs && index < categories.length - 1}"
      >
        <v-col cols="12" md="6" sm="6">
          <v-card-subtitle class="py-0">{{ info.title }}</v-card-subtitle>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card-text
            :class="{
              font: $vuetify.breakpoint.xs,
              'font-weight-bold': !$vuetify.breakpoint.xs,
            }"
            class="py-0"
            >{{ info.content }}</v-card-text
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CategoryCard",
  props: ["registrant"],
  computed: {
    categories() {
      return [
        {
          title: "Category of the Target Eligible Population",
          content: this.registrant.citizen.category.description,
        },
        {
          title: "Hub Registrant Number",
          content: this.registrant.citizen.hub_registrant_id,
        },
      ];
    },
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  .font {
    font-size: 1.25rem;
    font-weight: normal;
  }
}
</style>
