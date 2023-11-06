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
                <v-btn color="blue darken-1" dark @click="startCapture"
                  >Start</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="grey" dark @click="cancelScanning">Cancel</v-btn>
                <v-btn color="blue darken-4" dark :class="{'disabled-button' : disabled}" @click="stopCapture"
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
import { FingerprintSdkTest } from "./scripts/app.js"; //Import the Instance from app.js
export default {
  name: "BiometricComponent",
  props: ["checkBiometrics"],
  data: () => ({
    dialog: false,
    status: null,
    prompt: null,
    disabled: true,
    imageDataURL: null,
    sdk: null,
    defaultImageSrc: require("@/assets/fingerprint-svgrepo-com.svg"),
  }),
  mounted() {
    //Scripts loaded first then instance is initialized to a local property.
    this.loadScripts().then(() => {
      this.sdk = new FingerprintSdkTest();
    });
  },
  methods: {
    loadScripts() {
      //Must load prerequisite scripts before initializing
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
      //This is what controls the fingerprint SDK which controls via instance methods and events.

      //Ensure the Device Connection is Secured
      this.sdk.deviceConnection().then((status) => {
        this.status = status;
      });

      //Will Control the instance in capturing and stopping the sdk in scanning.
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
    startCapture() {
      this.fingerprintSdk(true);
      this.disabled = false;
    },
    stopCapture() {
      // Get the image element using the ref
      const fingerprintImage = this.$refs.fingerprintImageRef;

      // Access the current src attribute
      const currentSrc = fingerprintImage.src;

      // You can use currentSrc as needed in the component.
      this.fingerprintSdk(false);
      this.$emit("biometrics-taken", currentSrc);
      this.dialog = false;
      fingerprintImage.src = this.defaultImageSrc;
    },
    cancelScanning() {
      //Will Reset upon Canceling the Scanning Process.
      this.fingerprintSdk(false);
      this.dialog = false;
      const fingerprintImage = this.$refs.fingerprintImageRef;
      fingerprintImage.src = this.defaultImageSrc;
    },
  },
};
</script>

<style scoped>
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
</style>
