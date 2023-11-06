<template>
  <div>
    <SubmissionAlert v-if="showAlert" :title="title" />
    <ErrorAlert v-if="showError" :title="title" />
    <v-container fluid class="ma-1" v-if="registrant">
      <v-row>
        <v-col cols="auto">
          <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
          <span class="title">Registrant Information</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            dark
            class="blue darken-4 mr-3"
            :to="{ name: 'edit', params: { id: routeID } }"
            ><v-icon dark left>mdi-square-edit-outline</v-icon>Edit</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12">
                <CategoryCard :registrant="registrant"/>
              </v-col>
              <v-col cols="12">
                <PersonalInformationCard :registrant="registrant" />
              </v-col>
              <v-col cols="12" class="mt-n1">
                <AddressCard :registrant="registrant"/>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="4">
          <v-container fluid class="mx-auto mt-3">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-needle</v-icon>Vaccine</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <VaccinationComponent :id="routeID" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-image</v-icon>Image</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-img
                        class="grey darken-1 mx-auto"
                        :src="selectedImage"
                        :key="selectedImage"
                        max-height="400"
                        max-width="200"
                        style="transform: scaleX(-1)"
                      ></v-img>
                      <CameraComponent
                        :image="registrant.citizen.citizen_file.image_url"
                        v-on:picture-taken="handleImageUpload"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-draw-pen</v-icon
                    >Signature</v-card-title
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
                      <SignatureComponent
                        :checkSignature="checkSignature"
                        v-on:signature-taken="handleSignatureUpload"
                      />
                      <v-btn
                        v-if="checkSignature !== false"
                        class="my-2 error"
                        dark
                        block
                        @click="deleteActivator('signature')"
                        >Delete Signature</v-btn
                      >
                      <!-- <v-file-input
                        label="File input"
                        color="grey darken-1"
                        @change="handleSignatureUpload"
                        :append-icon="
                          selectedSignature ? 'mdi-check' : 'mdi-upload'
                        "
                        :append-icon-cb="() => (selectedSignature = '')"
                      ></v-file-input> -->
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-fingerprint</v-icon
                    >Biometrics</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-img
                        class="grey darken-1 mx-auto"
                        :src="selectedBiometrics"
                        :key="selectedBiometrics"
                        max-height="400"
                        max-width="200"
                      ></v-img>
                      <BiometricComponent
                        :checkBiometrics="checkBiometrics"
                        v-on:biometrics-taken="handleBiometricsUpload"
                      />
                      <v-btn
                        v-if="checkBiometrics !== false"
                        class="my-2 error"
                        dark
                        block
                        @click="deleteActivator('biometrics')"
                        >Delete Biometrics</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-n2">
                <v-card>
                  <v-card-title class="blue darken-1 white--text"
                    ><v-icon dark left>mdi-card-account-details</v-icon>MCG
                    Cares Card</v-card-title
                  >
                  <v-row justify="center" class="ma-2 pb-2">
                    <v-col align-self="center" cols="12">
                      <v-btn
                        outlined
                        block
                        :loading="loading"
                        @click="submitClaimStatus"
                        :color="cardStatus.status ? 'green' : 'red'"
                        class="mb-2"
                      >
                        {{ cardStatus.value }}
                      </v-btn>
                      <PrintCardJavaScript :registrant="getRegistrant" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader
      v-else
      type="list-item-avatar-three-line, image, article"
      class="mx-5 my-10"
      height="auto"
    ></v-skeleton-loader>
    <ReusableDeleteDialog
      :activator="deleteDialog"
      v-on:dialogResponse="resetActivator"
      v-on:deleteItem="deleteItem"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VaccinationComponent from "@/components/Vaccination/VaccinationDetailsView.vue";
import CameraComponent from "@/components/Camera/CameraComponent.vue";
import SignatureComponent from "@/components/Signature/SignatureComponent.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PrintCardJavaScript from "@/components/Card/PrintCardJavaScript.vue";
import BiometricComponent from "@/components/Biometrics/BiometricComponent.vue";
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import DeleteDialogMixin from "@/mixins/Biometrics & Signature/DeleteDialog";
import CategoryCard from "@/components/Registrant Details/CategoryCard.vue";
import PersonalInformationCard from '@/components/Registrant Details/PersonalInformationCard.vue';
import AddressCard from '@/components/Registrant Details/AddressCard.vue';
export default {
  mixins: [ErrorAlertsLogic, DeleteDialogMixin],
  data: () => ({
    routeID: null,
    registrant: null,
    selectedImage: null, // Holds the selected image file
    selectedSignature: null, // Holds the selected signature image file
    selectedBiometrics: null,
    cardStatus: {
      value: null,
      status: false,
    },
    loading: false,
    dynamicBaseURL: null,
    checkSignature: null,
    checkBiometrics: null,
  }),
  components: {
    VaccinationComponent,
    CameraComponent,
    SignatureComponent,
    PrintCardJavaScript,
    BiometricComponent,
    ReusableDeleteDialog,
    CategoryCard,
    PersonalInformationCard,
    AddressCard,
  },
  methods: {
    handleImageUpload(file) {
      // this.selectedImage = URL.createObjectURL(file);
      this.submitImage(file, "image");
    },
    handleSignatureUpload(file) {
      // this.selectedSignature = URL.createObjectURL(file);
      this.submitImage(file, "signature");
    },
    handleBiometricsUpload(file) {
      this.submitImage(file, "biometrics");
    },
    async fetchRegistrant() {
      const id = this.$route.params.id;
      try {
        await this.$store.dispatch("registrants/fetchRegistrantId", id);
      } catch (error) {
        console.error("Error fetching registrant:", error);
      }
    },
    async submitImage(file, type) {
      const id = this.$route.params.id;
      try {
        this.loading = true;
        // Append the selected image files to the FormData object
        const formData = new FormData();
        formData.append(type, file);

        await this.$store.dispatch("registrants/updateRegistrantFiles", {
          id: id,
          data: formData, // Pass the FormData object as the data
        });
        this.loading = false;
        this.fetchRegistrant();
      } catch (error) {
        console.error("Error submitting image:", error);
      }
    },
    async submitClaimStatus() {
      const id = this.$route.params.id;
      try {
        if (this.cardStatus.status === false) {
          this.loading = true;
          this.cardStatus.status = true;
          this.cardStatus.value = "CLAIMED";
          const data = {
            mcg_cares_card: this.cardStatus.value,
          };
          await this.$store.dispatch("registrants/claimCard", {
            id: id,
            data: data,
          });
          // this.disabledButton = true;
          this.loading = false;
        }
      } catch (error) {
        console.error("Error claiming card:", error);
      }
    },
  },
  created() {
    this.fetchRegistrant();
  },
  watch: {
    getRegistrant(value) {
      console.log("Get Registrant", value);
      const id = this.$route.params.id;
      const baseURL = this.$url;
      this.registrant = value;

      this.selectedImage = this.registrant.citizen.citizen_file.image_url
        ? baseURL + this.registrant.citizen.citizen_file.image_url
        : null;
      this.selectedSignature = this.registrant.citizen.citizen_file.e_signature
        ? baseURL + this.registrant.citizen.citizen_file.e_signature
        : null;
      this.selectedBiometrics = this.registrant.citizen.citizen_file.biometrics
        ? baseURL + this.registrant.citizen.citizen_file.biometrics
        : null;
      this.checkSignature = this.selectedSignature ? true : false;
      this.checkBiometrics = this.selectedBiometrics ? true : false;
      this.cardStatus.value = this.registrant.citizen.mcg_cares_card;
      if (this.registrant.citizen.mcg_cares_card === "CLAIMED") {
        this.cardStatus.status = true;
      }
      this.routeID = id;
    },
  },
  computed: {
    ...mapGetters("registrants", ["getRegistrant"]),
  },
};
</script>
