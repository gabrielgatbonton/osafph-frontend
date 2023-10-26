<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue darken-4" block dark v-bind="attrs" v-on="on">
          {{ checkBiometrics ? "Edit" : "Add" }} Biometrics
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          ><v-icon dark left>mdi-fingerprint</v-icon>Biometrics</v-card-title
        >
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" align-self="center">
              <div class="text-center">
                <img
                  class="mx-auto"
                  style="width: 300px; height: 300px; border: 3px solid black"
                  id="fingerprintImage"
                  ref="fingerprintImageRef"
                  :src="defaultImageSrc"
                />
                <div class="font-weight-bold">{{ status }}</div>
                <div class="font-weight-bold">{{ prompt }}</div>
              </div>
            </v-col>
            <v-col cols="12">
              <v-card-actions>
                <v-btn color="blue darken-1" dark @click="initFingerprintSdk"
                  >Start</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="grey" dark @click="cancelScanning">Cancel</v-btn>
                <v-btn color="blue darken-4" dark @click="stopCapture"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { FingerprintSdkTest } from "./scripts/app.js";
export default {
  name: "BiometricComponent",
  props: ["checkBiometrics"],
  data: () => ({
    dialog: false,
    status: null,
    prompt: null,
    imageDataURL: null,
    sdk: null,
    defaultImageSrc: require("@/assets/fingerprint-svgrepo-com.svg"),
  }),
  mounted() {
    this.loadScripts().then(() => {
      this.sdk = new FingerprintSdkTest();
    });
  },
  methods: {
    loadScripts() {
      return new Promise((resolve) => {
        const script1 = document.createElement("script");
        script1.src = "/scripts/Fingerprint/es6-shim.js"; // Relative path
        script1.onload = () => {
          const script2 = document.createElement("script");
          script2.src = "/scripts/Fingerprint/websdk.client.bundle.min.js"; // Relative path
          script2.onload = () => {
            const script3 = document.createElement("script");
            script3.src = "/scripts/Fingerprint/fingerprint.sdk.min.js"; // Relative path
            script3.onload = resolve;
            document.body.appendChild(script3);
          };
          document.body.appendChild(script2);
        };
        document.body.appendChild(script1);
      });
    },
    fingerprintSdk(status) {
      this.sdk.deviceConnection().then((status) => {
        this.status = status;
      });

      if (status === true) {
        // Start capturing
        this.sdk.startCapture().then((data) => {
          this.prompt = data.status;
        });
      } else {
        // Save capturing
        this.sdk.stopCapture();
      }
    },
    initFingerprintSdk() {
      this.fingerprintSdk(true);
    },
    stopCapture() {
      // Get the image element using the ref
      const fingerprintImage = this.$refs.fingerprintImageRef;

      // Access the current src attribute
      const currentSrc = fingerprintImage.src;

      // You can use currentSrc as needed in your component.
      this.fingerprintSdk(false);
      this.$emit("biometrics-taken", currentSrc)
        .then(() => {
          this.dialog = false;
          const fingerprintImage = this.$refs.fingerprintImageRef;
          fingerprintImage.src = this.defaultImageSrc;
        })
        .catch((error) => {
          console.error("Error Emitting Biometrics Component Data: ", error);
        });
    },
    cancelScanning() {
      this.fingerprintSdk(false);
      this.dialog = false;
      const fingerprintImage = this.$refs.fingerprintImageRef;
      fingerprintImage.src = this.defaultImageSrc;
    },
  },
};
</script>

<style scoped></style>
