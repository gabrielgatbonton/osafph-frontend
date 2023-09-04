<template>
  <div>
    <v-dialog v-model="dialog" min-width="600" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn right dark class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Print MCG Cares
          Card</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          >ID Card Generator</v-card-title
        >
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
        <v-card-actions>
          <v-btn dark class="blue darken-4" block @click="generateAndPrintID"
            >Print ID</v-btn
          >
        </v-card-actions>
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
  }),
  methods: {
    ...mapActions("card", ["fetchImage", "fetchSignature"]),
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
          )}`;
          this.date_2 = `${format(
            parseISO(
              this.registrant.citizen.vaccination_stat[1].vaccination_date
            ),
            "MMMM d, yyyy"
          )}`;
          this.vaccination_site_1 = `${this.registrant.citizen.vaccination_stat[0].site_name}`;
          this.vaccination_site_2 = `${this.registrant.citizen.vaccination_stat[1].site_name}`;
          this.vaccine_1 = `${this.registrant.citizen.vaccination_stat[0].vaccine_name}`;
          this.vaccine_2 = `${this.registrant.citizen.vaccination_stat[1].vaccine_name}`;
        }
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
        this.tin_number = `${this.registrant.citizen.tin_number}`;
        this.blood_type = `${this.registrant.citizen.blood_type}`;
        this.emergency_name = `${this.registrant.citizen.emergency_name}`;
        this.emergency_number = `${this.registrant.citizen.emergency_number}`;
        this.hub_registrant_id = `${this.registrant.citizen.hub_registrant_id}`;
      }
    },
    requestImages() {
      this.fetchImage(this.registrant.citizen.id);
      this.fetchSignature(this.registrant.citizen.id);
    },
    onDataUrlChange(dataUrl) {
      this.qrDataURL = dataUrl;
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
        context.font = "bold 50px Arial";
        context.fillStyle = "black";

        // Load and draw registrant's portrait image
        const portraitImg = new Image();
        portraitImg.src = this.getImage;
        portraitImg.onload = () => {
          const signatureImg = new Image();
          signatureImg.src = this.getSignature;
          signatureImg.onload = () => {
            // Draw portrait image after it's loaded
            context.drawImage(portraitImg, 125, 600);
            // Draw signature image after it's loaded
            context.drawImage(signatureImg, 125, 1350, 600, 200);

            //   // Draw ID
            //   context.fillText(`${id}`, 130, 1400);

            // Draw the rest of the data
            context.fillText(this.category, 750, 730, 1700);
            context.fillText(this.fullName, 750, 910, 1700);
            context.fillText(this.birthday, 750, 1090, 1700);
            context.fillText(this.barangay, 750, 1275, 1700);
            context.fillText(this.municipality, 750, 1335, 1700);
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
            context.fillText(this.date_1, 1105, 270, 1700);
            context.fillText(this.date_2, 1105, 545, 1700);
            context.fillText(this.vaccination_site_1, 1105, 410, 1700);
            context.fillText(this.vaccination_site_2, 1105, 690, 1700);
            context.fillText(this.vaccine_1, 2000, 270, 1700);
            context.fillText(this.vaccine_2, 2000, 545, 1700);
          }

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
    ...mapGetters("card", ["getImage", "getSignature"]),
    QRCodeValue() {
      return `192.168.1.12:8080/vaccination/${this.registrant.citizen.id}`;
    },
  },
  components: {
    VueQrcode,
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
</style>
