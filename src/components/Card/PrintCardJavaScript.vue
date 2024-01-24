<template>
  <div>
    <v-dialog v-model="dialog" min-width="600" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          block
          class="mb-2 blue darken-4"
          :class="{ 'disabled-button': disabledButton }"
          v-bind="attrs"
          v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Print Card</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          >ID Card Generator</v-card-title
        >
        <div class="text-center mx-4 mt-4 scroll-overflow">
          <canvas
            ref="frontCardCanvas"
            class="canvas-border"
            style="position: relative; max-width: 100%; height: auto"
          ></canvas>
          <canvas
            ref="backCardCanvas"
            class="canvas-border"
            style="position: relative; max-width: 100%; height: auto"
          >
          </canvas>
          <vue-qrcode
            :value="QRCodeValue"
            @change="onDataUrlChange"
            type="image/png"
            :color="{ dark: '#000000ff', light: '#ffffffff' }"
            :quality="options.quality"
            :width="options.width"
            :margin="options.margin"
          ></vue-qrcode>
          <!-- Button to trigger generating and printing the ID -->
          <v-card-actions>
            <v-btn dark class="blue darken-4" block @click="generateAndPrintID"
              >Print ID</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import VueQrcode from "vue-qrcode";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["registrant"],
  data: () => ({
    dialog: false,
    category: null,
    fullName: null,
    birthday: null,
    barangay: null,
    municipality: null,
    province: null,
    date_1: null,
    date_2: null,
    vaccination_site_1: null,
    vaccination_site_2: null,
    vaccine_1: null,
    vaccine_2: null,
    lot_number_1: null,
    lot_number_2: null,
    tin_number: null,
    blood_type: null,
    emergency_name: null,
    emergency_number: null,
    hub_registrant_id: null,
    qrDataURL: null,
    options: {
      margin: 0,
      quality: 1,
      width: 930,
    },
    disabledButton: true,
    isGetImageLoaded: false,
    isGetSignatureLoaded: false,
    isGetBiometricsLoaded: false,
  }),
  components: {
    VueQrcode,
  },
  methods: {
    ...mapActions("card", ["fetchImage", "fetchSignature", "fetchBiometrics"]),
    values() {
      if (this.registrant) {
        console.log(this.registrant);
        if (
          this.registrant.citizen.vaccination_stat[0] &&
          this.registrant.citizen.vaccination_stat[1]
        ) {
          if (
            this.registrant.citizen.vaccination_stat[0].vaccine_name ===
            "JANSSEN"
          ) {
            this.date_1 = `-`;
            this.date_2 = `${format(
              parseISO(
                this.registrant.citizen.vaccination_stat[0].vaccination_date
              ),
              "MMMM d, yyyy"
            ).toUpperCase()}`;
            this.vaccination_site_1 = `-`;
            this.vaccination_site_2 = `${this.registrant.citizen.vaccination_stat[0].site_name.toUpperCase()}`;
            this.vaccine_1 = `-`;
            this.vaccine_2 = `${this.registrant.citizen.vaccination_stat[0].vaccine_name.toUpperCase()}`;
            this.lot_number_1 = `-`;
            this.lot_number_2 = `${this.registrant.citizen.vaccination_stat[0].lot_no.toUpperCase()}`;
          } else if (
            this.registrant.citizen.vaccination_stat[0].vaccine_name !== null &&
            this.registrant.citizen.vaccination_stat[1].vaccine_name === null
          ) {
            this.date_1 = `${format(
              parseISO(
                this.registrant.citizen.vaccination_stat[0].vaccination_date
              ),
              "MMMM d, yyyy"
            ).toUpperCase()}`;
            this.date_2 = `-`;
            this.vaccination_site_1 = `${this.registrant.citizen.vaccination_stat[0].site_name.toUpperCase()}`;
            this.vaccination_site_2 = `-`;
            this.vaccine_1 = `${this.registrant.citizen.vaccination_stat[0].vaccine_name.toUpperCase()}`;
            this.vaccine_2 = `-`;
            this.lot_number_1 = `${this.registrant.citizen.vaccination_stat[0].lot_no.toUpperCase()}`;
            this.lot_number_2 = `-`;
          } else if (
            this.registrant.citizen.vaccination_stat[0].vaccine_name !== null &&
            this.registrant.citizen.vaccination_stat[1].vaccine_name !== null
          ) {
            this.date_1 = `${format(
              parseISO(
                this.registrant.citizen.vaccination_stat[0].vaccination_date
              ),
              "MMMM d, yyyy"
            ).toUpperCase()}`;
            this.date_2 = `${format(
              parseISO(
                this.registrant.citizen.vaccination_stat[1].vaccination_date
              ),
              "MMMM d, yyyy"
            ).toUpperCase()}`;
            this.vaccination_site_1 = `${this.registrant.citizen.vaccination_stat[0].site_name.toUpperCase()}`;
            this.vaccination_site_2 = `${this.registrant.citizen.vaccination_stat[1].site_name.toUpperCase()}`;
            this.vaccine_1 = `${this.registrant.citizen.vaccination_stat[0].vaccine_name.toUpperCase()}`;
            this.vaccine_2 = `${this.registrant.citizen.vaccination_stat[1].vaccine_name.toUpperCase()}`;
            this.lot_number_1 = `${this.registrant.citizen.vaccination_stat[0].lot_no.toUpperCase()}`;
            this.lot_number_2 = `${this.registrant.citizen.vaccination_stat[1].lot_no.toUpperCase()}`;
          }
        }
        this.category = `${this.registrant.citizen.category.description}`;
        this.fullName = `${this.registrant.citizen.last_name.toUpperCase()}, ${this.registrant.citizen.first_name.toUpperCase()} ${
          this.registrant.citizen.middle_name
            ? this.registrant.citizen.middle_name.toUpperCase()
            : ""
        } ${
          this.registrant.citizen.suffix
            ? this.registrant.citizen.suffix.toUpperCase()
            : ""
        }`;
        this.birthday = `${format(
          parseISO(this.registrant.citizen.birthday),
          "MMMM d, yyyy"
        ).toUpperCase()}`;
        this.barangay = `${this.registrant.citizen.barangay.barangay_name.toUpperCase()}`;
        this.province = `${this.registrant.citizen.barangay.municipality.province.province_name.toUpperCase()}`;
        this.municipality = `${this.registrant.citizen.barangay.municipality.municipality_name.toUpperCase()}, ${
          this.province
        }`;
        this.tin_number = `${
          this.registrant.citizen.tin_number
            ? this.registrant.citizen.tin_number
            : "-"
        }`;
        this.blood_type = `${this.registrant.citizen.blood_type}`;
        this.emergency_name = `${this.registrant.citizen.emergency_name.toUpperCase()}`;
        this.emergency_number = `${this.registrant.citizen.emergency_number}`;
        this.hub_registrant_id = `${this.registrant.citizen.hub_registrant_id}`;
      }
    },
    onDataUrlChange(dataUrl) {
      this.qrDataURL = dataUrl;
    },
    requestImages() {
      this.fetchImage(this.registrant.citizen.id);
      this.fetchSignature(this.registrant.citizen.id);
      this.fetchBiometrics(this.registrant.citizen.id);
    },
    drawOnCanvasFront() {
      const canvas = this.$refs.frontCardCanvas;
      const context = canvas.getContext("2d");

      // Load the card template image
      const frontImg = new Image();
      frontImg.src = require("@/assets/front.jpg");
      frontImg.onload = () => {
        // Draw the card template image on the canvas
        canvas.width = frontImg.width;
        canvas.height = frontImg.height;
        context.drawImage(frontImg, 0, 0);

        // Draw dynamic data on the canvas
        context.font = "bold 75px Arial";
        context.fillStyle = "black";

        // Load and draw registrant's portrait image
        const portraitImg = new Image();
        portraitImg.src = this.getImage;
        portraitImg.onload = () => {
          const signatureImg = new Image();
          //Conditional to check the availability of signature, then otherwise.
          if (this.getSignature !== null) {
            signatureImg.src = this.getSignature;
          } else if (this.getBiometrics !== null) {
            signatureImg.src = this.getBiometrics;
          } else {
            signatureImg.src = "";
          }

          signatureImg.onload = () => {
            // Draw portrait image after it's loaded
            context.drawImage(portraitImg, 125, 600);
            // // Draw signature image after it's loaded
            if (this.getBiometrics !== null) {
              context.drawImage(
                signatureImg,
                2135,
                1140,
                signatureImg.width - signatureImg.width / 4,
                signatureImg.height - signatureImg.height / 4
              );
            } else {
              context.drawImage(signatureImg, 125, 1370, 600, 200);
            }

            // Draw the rest of the data
            context.fillText(this.category, 750, 745, 1700);
            context.fillText(this.fullName, 750, 925, 1700);
            context.fillText(this.birthday, 750, 1105, 1700);
            context.fillText(this.barangay, 750, 1280, 1700);
            context.fillText(this.municipality, 750, 1350, 1700);
          };
        };
      };
    },
    drawOnCanvasBack() {
      const canvas = this.$refs.backCardCanvas;
      const context = canvas.getContext("2d");
      // Load the card template image
      const backImg = new Image();
      if (
        this.registrant.citizen.vaccination_stat[0] &&
        this.registrant.citizen.vaccination_stat[1]
      ) {
        backImg.src = require("@/assets/back.jpg");
      } else {
        backImg.src = require("@/assets/unvaccinated.jpg");
      }
      backImg.onload = () => {
        // Draw the card template image on the canvas
        canvas.width = backImg.width;
        canvas.height = backImg.height;
        context.drawImage(backImg, 0, 0);

        // Draw dynamic data on the canvas
        context.font = "bold 50px Arial";
        context.fillStyle = "black";

        // Load and draw registrant's portrait image
        const qrImg = new Image();
        qrImg.src = this.qrDataURL;
        qrImg.onload = () => {
          // Draw portrait image after it's loaded
          context.drawImage(qrImg, 105, 205);

          // Draw Hub code
          context.fillText(this.hub_registrant_id, 350, 1200, 1700);

          // Draw the rest of the data
          if (
            this.registrant.citizen.vaccination_stat[0] &&
            this.registrant.citizen.vaccination_stat[1]
          ) {
            context.font = "bold 65px Arial";
            context.fillText(this.date_1, 1105, 285, 1700);
            context.fillText(this.date_2, 1105, 560, 1700);
            context.fillText(this.vaccination_site_1, 1105, 425, 1700);
            context.fillText(this.vaccination_site_2, 1105, 705, 1700);
            context.fillText(this.vaccine_1, 2000, 270, 1700);
            context.fillText(this.vaccine_2, 2000, 545, 1700);

            //Allow for the Lot numbers to be set to 40px
            context.font = "bold 55px Arial";
            context.fillText(this.lot_number_1, 2000, 320, 1700);
            context.fillText(this.lot_number_2, 2000, 595, 1700);
          }

          //Reset it back to 50px
          context.font = "bold 65px Arial";
          context.fillText(this.tin_number, 1105, 840, 1700);
          context.fillText(this.blood_type, 1105, 980, 1700);
          context.fillText(this.emergency_name, 1105, 1130, 1700);
          context.fillText(this.emergency_number, 1105, 1190, 1700);
        };
      };
    },
    async generateAndPrintID() {
      try {
        // Wait for a short time to ensure the canvas content is drawn
        const canvasFront = this.$refs.frontCardCanvas;
        const frontImageDataURL = canvasFront.toDataURL("image/jpeg", 1.0);

        const canvasBack = this.$refs.backCardCanvas;
        const backImageDataURL = canvasBack.toDataURL("image/jpeg", 1.0);

        // Open a new window
        const printWindow = window.open("", "_blank");

        // Create a new document within the print window
        const printDocument = printWindow.document;

        // Set up the document's head with custom styles
        const head = printDocument.head;
        const style = printDocument.createElement("style");
        style.innerHTML = `
      @page {
        size: landscape;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      img {
        max-width: 100%;
      }
      .front-card {
        display: block;
      }
      .back-card {
        display: block;
        transform: rotate(180deg);
        page-break-after: always;
      }
    `;
        head.appendChild(style);

        // Add the front image to the document
        const frontImgElement = printDocument.createElement("img");
        frontImgElement.className = "front-card";
        frontImgElement.src = frontImageDataURL;
        printDocument.body.appendChild(frontImgElement);

        // Add the back image to the document
        const backImgElement = printDocument.createElement("img");
        backImgElement.className = "back-card";
        backImgElement.src = backImageDataURL;
        printDocument.body.appendChild(backImgElement);

        // Add a slight delay before triggering print (optional)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Print the document directly
        printWindow.print();

        // Close the print window (optional)
        printWindow.close();
      } catch (error) {
        console.error(
          "An error occurred while generating and printing the ID:",
          error
        );
      }
    },
  },
  computed: {
    ...mapGetters("card", ["getImage", "getSignature", "getBiometrics"]),
    QRCodeValue() {
      return `${this.$network}vaccination/${this.registrant.citizen.hub_registrant_id}`;
    },
  },
  watch: {
    getImage(value) {
      if (value) {
        console.log("Image", value);
        this.isGetImageLoaded = true;
      }
      if (
        this.isGetImageLoaded === this.isGetSignatureLoaded ||
        this.isGetImageLoaded === this.isGetBiometricsLoaded
      ) {
        this.disabledButton = false;
        console.log(this.disabledButton);
      }
    },
    getSignature(value) {
      if (value) {
        this.isGetSignatureLoaded = true;
      }

      if (this.isGetImageLoaded === this.isGetSignatureLoaded) {
        this.disabledButton = false;
      }
    },
    getBiometrics(value) {
      if (value) {
        this.isGetBiometricsLoaded = true;
      }

      if (this.isGetImageLoaded === this.isGetBiometricsLoaded) {
        this.disabledButton = false;
        console.log("Test: ", this.isGetImageLoaded);
        console.log(this.disabledButton);
      }
    },
  },
  created() {
    this.requestImages();
  },
  mounted() {
    this.values();
  },
  updated() {
    this.drawOnCanvasFront();
    this.drawOnCanvasBack();
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray;
}
.disabled-button {
  opacity: 0.5; /* Make it appear faded */
  pointer-events: none; /* Disable pointer events to prevent interaction */
}

.scroll-overflow {
  height: 600px;
  overflow-y: auto;
}

.scroll-overflow::-webkit-scrollbar {
  width: 0; /* Remove scrollbar width */
}

/* Optional: Style for track and handle */
.scroll-overflow::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Light gray track */
}

.scroll-overflow::-webkit-scrollbar-thumb {
  background-color: #888; /* Darker gray handle */
}
</style>
