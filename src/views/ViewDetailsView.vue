<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container
      fluid
      class="mx-auto"
      :style="`max-width: ${breakpointVal};`"
      v-if="registrant"
    >
      <v-row>
        <v-col cols="auto">
          <p class="text-h6">Registrant Information</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            dark
            color="primary"
            class="mr-3"
            :to="{ name: 'edit', params: { id: routeID } }"
            ><v-icon dark left>mdi-square-edit-outline</v-icon>Edit</v-btn
          >
          <v-btn
            v-else
            dark
            class="mr-3"
            color="primary"
            icon
            :to="{ name: 'edit', params: { id: routeID } }"
            ><v-icon>mdi-square-edit-outline</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <!-- Registrant text information -->
        <v-col cols="12" md="9">
          <v-container fluid class="mx-auto mt-3 px-md-0">
            <v-row>
              <v-col cols="12">
                <v-card
                  flat
                  rounded
                  class="card-light-bgColor rounded-card pa-4"
                >
                  <v-row>
                    <v-col cols="12" md="auto">
                      <v-card outlined color="transparent">
                        <v-img
                          class="grey darken-1 mx-auto"
                          :src="imagesLoaded.capturedImage"
                          :key="imagesLoaded.capturedImage"
                          max-height="100"
                          max-width="100"
                          style="transform: scaleX(-1)"
                        ></v-img>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      md="auto"
                      class="flex-grow-1 d-flex flex-column justify-center"
                    >
                      <p
                        class="text-h5 text-center text-md-left white--text font-weight-bold py-0 my-0"
                      >
                        {{
                          `${registrant.citizen.last_name.toUpperCase()}, 
                      ${registrant.citizen.first_name.toUpperCase()} 
                      ${
                        registrant.citizen.middle_name
                          ? " " + registrant.citizen.middle_name.toUpperCase()
                          : ""
                      } 
                      ${
                        registrant.citizen.suffix
                          ? " " + registrant.citizen.suffix.toUpperCase()
                          : ""
                      }`
                        }}
                      </p>

                      <p
                        class="text-subtitle-2 font-weight-regular text-center text-md-left white--text py-0 my-0"
                      >
                        {{ registrant.citizen.category.description }}
                      </p>
                      <p
                        class="text-subtitle-2 font-weight-regular text-center text-md-left white--text py-0 my-0"
                      >
                        {{ registrant.citizen.hub_registrant_id }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12">
                <CategoryCard :registrant="registrant" />
              </v-col>
              <v-col cols="12">
                <PersonalInformationCard :registrant="registrant" />
              </v-col>
              <v-col cols="12" class="mt-n1">
                <AddressCard :registrant="registrant" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="3">
          <v-container fluid class="mx-auto mt-3 pr-md-0">
            <v-row>
              <!-- MCG Cares Card -->
              <v-col cols="12">
                <v-card outlined class="bordered-card colored-border">
                  <v-container fluid class="py-4">
                    <v-row dense justify="center" class="ma-2">
                      <v-col cols="12">
                        <p class="text-subtitle-2 black--text font-weight-bold">
                          MCG CARES CARD
                        </p>
                      </v-col>
                      <v-col align-self="center" cols="12">
                        <v-btn
                          outlined
                          block
                          :loading="loading"
                          @click="submitClaimStatus"
                          :color="cardStatus.card.status ? 'green' : 'red'"
                          class="mb-2"
                          :disabled="cardStatus.disable"
                        >
                          {{ cardStatus.card.description }}
                        </v-btn>
                        <PrintCardJavaScript
                          :requirements="buttonProperties"
                          :registrant="registrant"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <!-- Profile image -->
              <v-col cols="12" class="mt-n2">
                <v-card outlined class="pa-0 bordered-card colored-border">
                  <v-container fluid class="py-4">
                    <v-row dense justify="center" class="ma-2">
                      <v-col cols="12">
                        <p class="text-subtitle-2 black--text font-weight-bold">
                          PROFILE IMAGE
                        </p>
                      </v-col>
                      <v-col align-self="center" cols="12">
                        <CameraComponent
                          :image="registrant.citizen.citizen_file.image_url"
                          v-on:picture-taken="handleImageUpload"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <!-- Signature -->
              <v-col cols="12" class="mt-n2">
                <v-card outlined class="bordered-card colored-border">
                  <v-container fluid class="py-4">
                    <v-row dense justify="center" class="ma-2">
                      <v-col cols="12">
                        <p class="text-subtitle-2 black--text font-weight-bold">
                          SIGNATURE
                        </p>
                      </v-col>
                      <v-col align-self="center" cols="12">
                        <v-img
                          class="grey darken-1 mx-auto"
                          :src="imagesLoaded.capturedSignature"
                          :key="imagesLoaded.capturedSignature"
                          max-height="150"
                          max-width="300"
                        ></v-img>
                        <SignatureComponent
                          :requirements="buttonProperties"
                          v-on:signature-taken="handleSignatureUpload"
                        />
                        <v-btn
                          v-if="buttonProperties.checkSignature !== false"
                          class="my-2"
                          color="error"
                          dark
                          outlined
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
                  </v-container>
                </v-card>
              </v-col>

              <!-- Vaccination details -->
              <v-col cols="12">
                <v-card outlined class="pa-0 bordered-card colored-border">
                  <v-container fluid class="py-4">
                    <v-row dense justify="center" class="ma-2">
                      <v-col cols="12">
                        <p class="text-subtitle-2 black--text font-weight-bold">
                          VACCINE
                        </p>
                      </v-col>
                      <v-col align-self="center" cols="12">
                        <VaccinationComponent :id="routeID" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <!-- Fingerprint capture -->
              <v-col cols="12" class="mt-n2">
                <v-card outlined class="pa-0 bordered-card colored-border">
                  <v-container fluid class="py-4">
                    <v-row dense justify="center" class="ma-2">
                      <v-col cols="12">
                        <p class="text-subtitle-2 black--text font-weight-bold">
                          FINGERPRINT
                        </p>
                      </v-col>
                      <v-col align-self="center" cols="12">
                        <v-img
                          class="grey darken-1 mx-auto"
                          :src="imagesLoaded.capturedBiometrics"
                          :key="imagesLoaded.capturedBiometrics"
                          max-height="400"
                          max-width="200"
                        ></v-img>
                        <BiometricComponent
                          :requirements="buttonProperties"
                          v-on:biometrics-taken="handleBiometricsUpload"
                        />
                        <v-btn
                          v-if="buttonProperties.checkBiometrics !== false"
                          class="my-2"
                          color="error"
                          dark
                          block
                          outlined
                          @click="deleteActivator('biometrics')"
                          >Delete Biometrics</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
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
      class="pa-6"
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
import { mapState, mapActions } from "vuex";
import VaccinationComponent from "@/components/Vaccination/VaccinationDetailsView.vue";
import CameraComponent from "@/components/Camera/CameraComponent.vue";
import SignatureComponent from "@/components/Signature/SignatureComponent.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import PrintCardJavaScript from "@/components/Card/PrintCardJavaScript.vue";
import BiometricComponent from "@/components/Biometrics/BiometricComponent.vue";
import ReusableDeleteDialog from "@/components/ReusableDeleteDialog.vue";
import DeleteDialogMixin from "@/mixins/Biometrics & Signature/DeleteDialog";
import CategoryCard from "@/components/Registrant Details/CategoryCard.vue";
import PersonalInformationCard from "@/components/Registrant Details/PersonalInformationCard.vue";
import AddressCard from "@/components/Registrant Details/AddressCard.vue";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  mixins: [ErrorAlertsLogic, DeleteDialogMixin, ContainerBreakpoint],
  data: () => ({
    loading: false,
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
    ...mapActions("registrants", [
      "fetchRegistrantId",
      "updateRegistrantFiles",
      "claimCard",
    ]),
    handleImageUpload(file) {
      // this.selectedImage = URL.createObjectURL(file);
      this.submitFile(file, "image");
    },
    handleSignatureUpload(file) {
      // this.selectedSignature = URL.createObjectURL(file);
      this.submitFile(file, "signature");
    },
    handleBiometricsUpload(file) {
      this.submitFile(file, "biometrics");
    },
    async fetchRegistrant() {
      const id = this.$route.params.id;
      try {
        await this.fetchRegistrantId(id);
      } catch (error) {
        console.error("Error fetching registrant:", error);
      }
    },
    async submitFile(file, type) {
      const id = this.$route.params.id;
      try {
        this.loading = true;
        // Append the selected image files to the FormData object
        const formData = new FormData();
        formData.append(type, file);

        await this.updateRegistrantFiles({
          id: id,
          data: formData, // Pass the FormData object as the data
        });
        this.loading = false;
      } catch (error) {
        console.error("Error submitting image:", error);
      }
    },
    async submitClaimStatus() {
      const id = this.$route.params.id;
      try {
        this.loading = true;
        await this.claimCard(id);
        this.loading = false;
      } catch (error) {
        console.error("Error claiming card:", error);
      }
    },
  },
  created() {
    this.fetchRegistrant();
  },
  computed: {
    ...mapState("registrants", {
      registrant: "registrant",
    }),
    imagesLoaded() {
      const baseURL = this.$url;
      let capturedBiometrics = null;
      let capturedSignature = null;
      let capturedImage = null;

      capturedImage = this.registrant.citizen.citizen_file.image_url
        ? baseURL + this.registrant.citizen.citizen_file.image_url
        : null;
      capturedSignature = this.registrant.citizen.citizen_file.e_signature
        ? baseURL + this.registrant.citizen.citizen_file.e_signature
        : null;
      capturedBiometrics = this.registrant.citizen.citizen_file.biometrics
        ? baseURL + this.registrant.citizen.citizen_file.biometrics
        : null;
      return {
        capturedImage: capturedImage,
        capturedSignature: capturedSignature,
        capturedBiometrics: capturedBiometrics,
      };
    },
    buttonProperties() {
      let checkImage = null;
      let checkSignature = null;
      let checkBiometrics = null;
      checkImage = this.imagesLoaded.capturedImage ? true : false;
      checkSignature = this.imagesLoaded.capturedSignature ? true : false;
      checkBiometrics = this.imagesLoaded.capturedBiometrics ? true : false;
      return {
        checkImage: checkImage,
        checkSignature: checkSignature,
        checkBiometrics: checkBiometrics,
      };
    },
    cardStatus() {
      let card = {
        description: null,
        status: false,
      };
      let disable = true;

      card.description = this.registrant.citizen.mcg_cares_card;
      if (this.registrant.citizen.mcg_cares_card === "CLAIMED") {
        card.status = true;
      }

      if (
        (this.buttonProperties.checkImage &&
          this.buttonProperties.checkBiometrics) ||
        this.buttonProperties.checkSignature
      ) {
        disable = false;
      } else {
        this.size.lgAndDown
          ? (card.description = "Incomplete Images")
          : (card.description = "Incomplete necessary images");
      }
      return {
        card: card,
        disable: disable,
      };
    },
    routeID() {
      const id = this.$route.params.id;
      return id;
    },
    size() {
      return this.$vuetify.breakpoint;
    },
  },
};
</script>

<style scoped>
.gradient-background {
  background-image: linear-gradient(to right, #a40e32, #db4a41);
  color: white;
}

.rounded-card {
  border-radius: 12px !important;
}

.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.colored-border {
  border: 1px solid #ffd1d1;
}
.card-light-bgColor {
  background-color: #ff4949;
}
.reversed-shaped-card {
  border-top-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.no-rounded-corners {
  border-radius: 0 !important;
}
</style>
