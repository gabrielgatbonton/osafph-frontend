<template>
  <div>
    <v-container fluid class="ma-1">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">New Registrant</span>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-folder-multiple</v-icon
                    >Category</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row
                      v-for="(info, index) in categories"
                      :key="index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" class="">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-human-greeting-variant</v-icon>Personal
                    Information</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row
                      v-for="(info, index) in personal_informations"
                      :key="'personal_information-' + index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                    <v-divider class="ma-3"></v-divider>
                    <div class="mx-4">Emergency Information</div>
                    <v-row
                      v-for="(info, index) in emergency"
                      :key="'emergency' + index"
                      no-gutters
                    >
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-text class="font-weight-bold py-0">{{
                          info.content
                        }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n1">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-map-marker</v-icon>Address</v-card-title
                  >
                  <v-container fluid class="py-4">
                    <v-row v-for="info in address" :key="info.title" no-gutters>
                      <v-col cols="12" md="6" sm="6">
                        <v-card-subtitle class="py-0">{{
                          info.title
                        }}</v-card-subtitle>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
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
        </v-col>
        <v-col cols="12" md="4">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="grey lighten-2"
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
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-image</v-icon>CROP Image</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-img
                        class="grey darken-1 mx-auto"
                        :src="selectedCropImage"
                        :key="selectedCropImage"
                        max-width="200"
                        max-height="400"
                      ></v-img>
                      <v-file-input
                        label="File input"
                        color="grey darken-1"
                        @change="handleCropImageUpload"
                        :append-icon="
                          selectedCropImage ? 'mdi-check' : 'mdi-upload'
                        "
                        :append-icon-cb="() => (selectedCropImage = '')"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-image</v-icon>Image</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-img
                        class="grey darken-1 mx-auto"
                        :src="selectedImage"
                        :key="selectedImage"
                        max-height="400"
                        max-width="200"
                      ></v-img>
                      <v-file-input
                        label="File input"
                        color="grey darken-1"
                        @change="handleImageUpload"
                        :append-icon="
                          selectedImage ? 'mdi-check' : 'mdi-upload'
                        "
                        :append-icon-cb="() => (selectedImage = '')"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-draw-pen</v-icon>Signature</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-img
                        class="grey darken-1 mx-auto"
                        :src="selectedSignature"
                        :key="selectedSignature"
                        max-height="150"
                        max-width="300"
                      ></v-img>
                      <v-file-input
                        label="File input"
                        color="grey darken-1"
                        @change="handleSignatureUpload"
                        :append-icon="
                          selectedSignature ? 'mdi-check' : 'mdi-upload'
                        "
                        :append-icon-cb="() => (selectedSignature = '')"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="grey lighten-2"
                    ><v-icon left>mdi-card-account-details</v-icon>MCG Cares
                    Card</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-btn outlined block color="green" class="mb-2"
                        >Claimed</v-btn
                      >

                      <v-btn dark block class="mb-2 grey darken-1"
                        ><v-icon left>mdi-smart-card-outline</v-icon
                        >Front</v-btn
                      >

                      <v-btn dark block class="mb-2 grey darken-1"
                        ><v-icon left>mdi-credit-card-outline</v-icon
                        >Back</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectedImage: "", // Holds the selected image file
    selectedCropImage: "", // Holds the selected crop image file
    selectedSignature: "", // Holds the selected signature image file
  }),
  methods: {
    
    handleImageUpload(file) {
      // Handle the image upload
      // Here, you can perform any necessary logic, such as storing the file or processing it
      // In this example, we are simply updating the `selectedImage` data property with the uploaded file
      this.selectedImage = URL.createObjectURL(file);
    },
    handleCropImageUpload(file) {
      // Handle the image upload for the crop image component
      this.selectedCropImage = URL.createObjectURL(file);
    },
    handleSignatureUpload(file) {
      // Handle the image upload for the signature component
      this.selectedSignature = URL.createObjectURL(file);
    },
    async fetchRegistrant() {
      const id = this.$route.params.id;
      try {
        await this.$store.dispatch("registrants/fetchRegistrantId", id);
      } catch (error) {
        console.error("Error fetching registrant:", error);
      }
    },
  },
  mounted() {
    this.fetchRegistrant();

  },
  // watch: {
  //   getRegistrant() {
  //     this.registrant = this.getRegistrant
  //   },
  // },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
    categories() {
      return [
        {
          title: "Category of the Target Eligible Population",
          content: this.getRegistrant.citizen.category.description,
        },
        {
          title: "Hub Id Number",
          content: this.getRegistrant.citizen.hub_registrant_number,
        },
      ];
    },
    personal_informations() {
      return [
        {
          title: "Full Name",
          content: `${this.getRegistrant.citizen.last_name.toUpperCase()}, ${this.getRegistrant.citizen.first_name.toUpperCase()} ${this.getRegistrant.citizen.middle_name.toUpperCase()} ${
            this.getRegistrant.citizen.suffix
              ? " " + this.getRegistrant.citizen.suffix.toUpperCase()
              : ""
          }`,
        },
        {
          title: "Date of Birth",
          content: this.getRegistrant.citizen.birthday,
        },
        {
          title: "Gender",
          content: this.getRegistrant.citizen.gender,
        },
        {
          title: "Civil Status",
          content: this.getRegistrant.citizen.civil_status,
        },
        {
          title: "Blood Type",
          content: this.getRegistrant.citizen.blood_type,
        },
        {
          title: "Contact No",
          content: this.getRegistrant.citizen.contact_number,
        },
        {
          title: "Tin No",
          content: this.getRegistrant.citizen.tin_number,
        },
        {
          title: "Passport No",
          content: this.getRegistrant.citizen.passport_number,
        },
      ];
    },
    emergency() {
      return [
        {
          title: "Full Name",
          content: this.getRegistrant.citizen.emergency_name,
        },
        {
          title: "Contact No",
          content: this.getRegistrant.citizen.emergency_number,
        },
      ];
    },
    address() {
      return [
        {
          title: "Unit/Building/House No./Purok/Street/Subdivision",
          content: this.getRegistrant.citizen.address,
        },
        {
          title: "Barangay",
          content: this.getRegistrant.citizen.barangay.barangay_name,
        },
        {
          title: "Municipality",
          content: this.getRegistrant.citizen.barangay.municipality.municipality_name,
        },
        {
          title: "Province",
          content: this.getRegistrant.citizen.barangay.municipality.province.province_name,
        },
      ];
    },
  },
};
</script>
