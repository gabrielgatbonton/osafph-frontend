<template>
  <div>
    <v-dialog
      v-model="dialog"
      min-width="600"
      max-width="900"
      fullscreen
      hide-overlay
      scrollable
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn right dark class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Print MCG Cares
          Card</v-btn
        >
      </template>
      <v-card id="background">
        <v-card-title
          id="navbar"
          class="pb-4 white--text d-flex justify-space-between"
        >
          <div>Print Card</div>
          <div>
            <v-btn icon dark class="mr-3" @click="generateAndPrintID"
              ><v-icon>mdi-printer</v-icon></v-btn
            >
            <v-btn icon dark @click="dialog = !dialog"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </v-card-title>
        <v-container fluid class="overflow-scroll">
          <v-container class="white page-padding">
            <div class="text-center mx-4 mt-4">
              <canvas
                ref="frontCardCanvas"
                class="canvas-border"
                style="position: relative; max-width: 100%; height: auto"
              >
              </canvas>
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
            </div>

            <!-- <div class="text-center mx-4 mt-4">
                <canvas
                  ref="cardCanvas"
                  class="canvas-border"
                  style="position: relative; max-width: 100%; height: auto"
                ></canvas>
              </div> -->

            <!-- Button to trigger generating and printing the ID -->
          </v-container>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import VueQrcode from "vue-qrcode";
export default {
  props: [
    "registrant",
    "getPublicImage",
    "getPublicSignature",
    "getPublicBiometrics",
  ],
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
    public_image: null,
    public_signature: null,
    public_biometrics: null,
    options: {
      margin: 0,
      quality: 1,
      width: 930,
    },
  }),
  methods: {
    values() {
      if (this.registrant) {
        if (
          this.registrant.citizen.vaccination_stat[0] &&
          this.registrant.citizen.vaccination_stat[1]
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

        //Assign Front Card Values
        this.category = `${this.registrant.citizen.category}`;
        this.fullName = `${this.registrant.citizen.full_name.toUpperCase()}`;
        this.birthday = `${format(
          parseISO(this.registrant.citizen.date_of_birth),
          "MMMM d, yyyy"
        ).toUpperCase()}`;
        this.barangay = `${this.registrant.citizen.barangay.toUpperCase()}`;
        this.province = `${this.registrant.citizen.province.toUpperCase()}`;
        this.municipality = `${this.registrant.citizen.municipality.toUpperCase()}, ${
          this.province
        }`;

        //Reassign Image Values in Local Variables
        this.public_image = this.getPublicImage;
        this.public_biometrics = this.getPublicBiometrics;
        this.public_signature = this.getPublicSignature;

        //Assign Back Card Values
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
    drawOnCanvasFront() {
      console.log("Check: ", this.public_image);
      console.log("Bio", this.public_biometrics);
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
        portraitImg.src = this.public_image;
        portraitImg.onload = () => {
          const signatureImg = new Image();
          //Conditional to check the availability of signature, then otherwise.
          if (this.public_signature !== null) {
            signatureImg.src = this.public_signature;
          } else if (this.public_biometrics !== null) {
            signatureImg.src = this.public_biometrics;
          } else {
            signatureImg.src = "";
          }

          signatureImg.onload = () => {
            // Draw portrait image after it's loaded
            context.drawImage(portraitImg, 125, 600);
            // // Draw signature image after it's loaded
            if (this.public_biometrics !== null) {
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

        // Open a new window with the canvas content
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
                <img src="${frontImageDataURL}" style="max-width: 100%; height: auto;" />
                <img src="${backImageDataURL}" style="max-width: 100%; height: auto;" />
              `);
        printWindow.document.close();

        // Add a slight delay before triggering print
        await new Promise((resolve) => setTimeout(resolve, 1000));

        printWindow.print();
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
    QRCodeValue() {
      return `${this.$network}vaccination/${this.registrant.citizen.hub_registrant_id}`;
    },
  },
  components: {
    VueQrcode,
  },
  updated() {
    this.values();
    this.drawOnCanvasFront();
    this.drawOnCanvasBack();
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray;
}
#background {
  background: #525659;
}
#navbar {
  background: #323639;
  box-shadow: 1px 1px 3px #212426;
}
.overflow-scroll {
  overflow-y: auto;
  height: 100%;
}
.page-padding {
  padding: 6rem;
}

@media (max-width: 768px) {
  .page-padding {
    padding: 3rem;
  }
}
@media (max-width: 512px) {
  .page-padding {
    padding: 2rem;
  }
}
</style>
