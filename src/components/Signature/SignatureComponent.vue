<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          :class="{ 'disabled-button': checkDisabledButton }"
          block
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ requirements.checkSignature ? "Edit" : "Add" }} Signature
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary pb-4 white--text"
          ><v-icon dark left>mdi-draw-pen</v-icon>Signature</v-card-title
        >
        <v-container fluid>
          <v-row>
            <v-col cols="12" align-self="center">
              <div class="text-center mt-6">
                <canvas
                  class="bordered-card bordered-color"
                  id="cnv"
                  name="cnv"
                  :width="$vuetify.breakpoint.xs ? 300 : 500"
                  height="100"
                ></canvas>
              </div>
              <div v-if="data" class="text-center font-weight-bold">
                {{ data.version }}
              </div>
              <div v-if="status" class="text-center font-weight-bold">
                {{ status }}
              </div>
            </v-col>
            <v-col cols="12">
              <v-card-actions>
                <v-btn v-if="buttonStart" color="primary" dark @click="Start"
                  >Start</v-btn
                >
                <v-btn
                  v-if="buttonClear"
                  color="red darken-4"
                  dark
                  outlined
                  @click="Clear"
                  >Clear</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn outlined color="grey" dark @click="Cancel"
                  >Cancel</v-btn
                >
                <v-btn color="primary" dark @click="Save">Save</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  initSigWeb,
  onSign,
  onClear,
  onDone,
} from "@/components/Signature/scripts/SigWebLogic";
import { mapActions } from "vuex";
export default {
  props: ["requirements"],
  data: () => ({
    dialog: false,
    buttonStart: true,
    buttonClear: false,
    data: null,
    tmr: null,
    status: null,
  }),
  methods: {
    ...mapActions("registrants", ["updateRegistrantFiles"]),
    async initializeService() {
      initSigWeb()
        .then((data) => {
          // This block will execute when the promise is resolved successfully
          this.data = data;
          console.log(data.expiry);
        })
        .catch(() => {
          // This block will execute when the promise is rejected
          console.log("SigWeb is not installed or encountered an error.");
        });
    },
    Start() {
      const ctx = document.getElementById("cnv").getContext("2d");
      onSign(ctx, this.tmr)
        .then((tmr) => {
          this.status = "You may now start signing.";
          this.tmr = tmr;
        })
        .catch((error) => {
          console.log("Error initializing the signature", error);
          this.status = "Connection Failed";
        })
        .finally(() => {
          (this.buttonStart = false), (this.buttonClear = true);
        });
    },
    Clear() {
      onClear();
    },
    Save() {
      onDone(this.tmr)
        .then((data) => {
          this.$emit("signature-taken", data.sigImageData);
        })
        .catch((error) => {
          console.log("Error Saving: ", error);
        })
        .finally(() => {
          this.dialog = false;
          this.buttonStart = true;
          this.buttonClear = false;
          this.data = null;
          this.tmr = null;
          this.status = null;
        });
    },
    Cancel() {
      this.dialog = false;
      this.buttonStart = true;
      this.buttonClear = false;
      this.tmr = null;
      this.status = null;
    },
  },
  computed: {
    checkDisabledButton() {
      let disabled = false;
      if (this.requirements.checkBiometrics) {
        disabled = true;
      }
      return disabled;
    },
  },
  created() {
    this.initializeService();
  },
};
</script>

<style scoped>
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}
.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.bordered-color {
  border: 1px solid #ffd1d1;
}
</style>
