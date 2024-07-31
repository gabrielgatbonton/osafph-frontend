<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
              <p class="mb-0 mt-10 font-weight-medium text-h4">Our Medical Services</p>
            </v-col>
            <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
              <p class="mb-0 text-subtitle-1">We are dedicated to serve you best medical services</p>
            </v-col>

            <v-row no-gutters >
              <v-col v-for="(service, index) in services" :key="index" cols="3" class="justify-center align-center d-flex mt-8">
                <v-card class="justify-center align-center d-flex card hover-card">
                  <v-card-text class="text-center">
                    <v-icon class="hovered" size="48" color="primary">{{ service.icon }}</v-icon>
                    <p class="text-h6 font-weight-medium mt-5 hovered">{{ service.title }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: "SectionOne",
    data() {
      return {
          services: [
            {
              title: "Dialysis",
              icon: "mdi-heart-pulse",
            },
            {
              title: "Laboratory",
              icon: "mdi-microscope",
            },
            {
              title: "Diagnostic",
              icon: "mdi-clipboard-text-search-outline",
            },
            {
              title: "Consultation",
              icon: "mdi-chat",
            },
          ]
      };
    }
  }
</script>

<style scoped>
.card {
  height: 200px; 
  width: 90%; 
  border-radius: 15px;
}

.hover-card:hover {
  background-color: #CD071E;
}

.hover-card:hover .hovered {
  color: white !important;
}
</style>