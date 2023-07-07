<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">New Registrant</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="mx-auto mt-3">
      <v-row>
        <v-col cols="8">
          <v-card>
            <v-card-title class="grey lighten-4"
              ><v-icon left>mdi-folder-multiple</v-icon>Category</v-card-title
            >
            <v-container fluid class="py-4">
              <v-row v-for="info in categories" :key="info.title" no-gutters>
                <v-col cols="12" md="6">
                  <v-card-subtitle class="py-0">{{
                    info.title
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="font-weight-bold py-0">{{
                    info.content
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title class="grey lighten-4"
              ><v-icon left>mdi-needle</v-icon>Vaccine</v-card-title
            >
            <v-row justify="center" class="ma-2 pb-2">
              <v-col align-self="center" cols="12">
                <v-btn dark block class="grey darken-1"
                  >Vaccination Details</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="8" class="mt-n3">
          <v-card>
            <v-card-title class="grey lighten-4"
              ><v-icon left>mdi-human-greeting-variant</v-icon>Personal
              Information</v-card-title
            >
            <v-container fluid class="py-4">
              <v-row
                v-for="info in personal_informations"
                :key="info.title"
                no-gutters
              >
                <v-col cols="12" md="6">
                  <v-card-subtitle class="py-0">{{
                    info.title
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="font-weight-bold py-0">{{
                    info.content
                  }}</v-card-text>
                </v-col>
              </v-row>
              <v-divider class="ma-3"></v-divider>
              <div class="mx-4">Emergency Information</div>
              <v-row v-for="info in emergency" :key="info.title" no-gutters>
                <v-col cols="12" md="6">
                  <v-card-subtitle class="py-0">{{
                    info.title
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="font-weight-bold py-0">{{
                    info.content
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4" class="mt-n3">
          <v-card>
            <v-card-title class="grey lighten-4"
              ><v-icon left>mdi-image</v-icon>CROP Image</v-card-title
            >
            <v-row justify="center" class="ma-2 pb-2">
              <v-col align-self="center" cols="12">
                <v-file-input clearable color="grey darken-1"></v-file-input>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="8" class="mt-n3">
          <v-card>
            <v-card-title class="grey lighten-4"
              ><v-icon left>mdi-map-marker</v-icon>Address</v-card-title
            >
            <v-container fluid class="py-4">
              <v-row
                v-for="info in address"
                :key="info.title"
                no-gutters
              >
                <v-col cols="12" md="6">
                  <v-card-subtitle class="py-0">{{
                    info.title
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="font-weight-bold py-0">{{
                    info.content
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        title: "Category of the Target Eligible Population",
        content: "REST OF ADULT POPULATION (ROAP)",
      },
      {
        title: "Hub Id Number",
        content: "21-H01-010B72A51C9A",
      },
    ],
    personal_informations: [
      {
        title: "Full Name",
        content: "PARAGAS, JOSEPHINE CHAN",
      },
      {
        title: "Date of Birth",
        content: "JULY 5, 1985",
      },
      {
        title: "Gender",
        content: "FEMALE",
      },
      {
        title: "Civil Status",
        content: "SINGLE",
      },
      {
        title: "Blood Type",
        content: "O+",
      },
      {
        title: "Contact No",
        content: "0912-998-5687",
      },
      {
        title: "Tin No",
        content: "234-744-448-000",
      },
      {
        title: "Passport No",
        content: "",
      },
    ],
    emergency: [
      {
        title: "Full Name",
        content: "IVY RIVERA",
      },
      {
        title: "Contact No",
        content: "0939-938-1456",
      },
    ],
    address: [
      {
        title: "Unit/Building/House No./Purok/Street/Subdivision",
        content: "1234 Main St",
      },
      {
        title: "Barangay",
        content: "CAMACHILES",
      },
      {
        title: "Municipality",
        content: "MABALACAT CITY"
      },
      {
        title: "Province",
        content: "PAMPANGA"
      }
    ]
  }),
};
</script>

<style scoped></style>
