<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-map-marker</v-icon>Address</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row v-for="info in address" :key="info.title" no-gutters>
        <v-col cols="12" md="6" sm="6">
          <v-card-subtitle class="py-0">{{ info.title }}</v-card-subtitle>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card-text class="font-weight-bold py-0">{{
            info.content
          }}</v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "AddressCard",
  props: ["registrant"],
  computed: {
    address() {
      return [
        {
          title: "Unit/Building/House No./Purok/Street/Subdivision",
          content: this.registrant.citizen.address,
        },
        {
          title: "Barangay",
          content: this.registrant.citizen.barangay.barangay_name,
        },
        {
          title: "Municipality",
          content:
            this.registrant.citizen.barangay.municipality.municipality_name,
        },
        {
          title: "Province",
          content:
            this.registrant.citizen.barangay.municipality.province
              .province_name,
        },
      ];
    },
  },
};
</script>
