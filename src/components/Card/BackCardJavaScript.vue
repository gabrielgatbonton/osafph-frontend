<template>
  <div>
    <v-dialog v-model="dialog" min-width="600" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark block class="mb-2 blue darken-4" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-smart-card-outline</v-icon>Back</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="blue darken-1 pb-4 white--text"
          >ID Card Generator</v-card-title
        >
        <div class="text-center mx-4 mt-4">
          <canvas
            ref="cardCanvas"
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
    isImageLoaded: false, // Add this flag
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

      this.tin_number = `${this.registrant.citizen.tin_number}`;
      this.blood_type = `${this.registrant.citizen.blood_type}`;
      this.emergency_name = `${this.registrant.citizen.emergency_name.toUpperCase()}`;
      this.emergency_number = `${this.registrant.citizen.emergency_number}`;
      this.hub_registrant_id = `${this.registrant.citizen.hub_registrant_id}`;
    },
    requestImages() {
      this.fetchImage(this.registrant.citizen.id);
      this.fetchSignature(this.registrant.citizen.id);
    },
    onDataUrlChange(dataUrl) {
      this.qrDataURL = dataUrl;
    },
    drawIDOnCanvas() {
      const canvas = this.$refs.cardCanvas;
      // const qrCodeCanvas = this.$refs.qrCodeCanvas;
      const context = canvas.getContext("2d");
      // const qrContext = qrCodeCanvas.getContext("2d");

      // Load the card template image
      const img = new Image();
      if (
        this.registrant.citizen.vaccination_stat[0] &&
        this.registrant.citizen.vaccination_stat[1]
      ) {
        img.src = require("@/assets/back.jpg");
      } else {
        img.src = require("@/assets/unvaccinated.jpg");
      }
      img.onload = () => {
        // Draw the card template image on the canvas
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

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

            //Allow for the Lot numbers to be set to 40px
            context.font = "bold 40px Arial";
            context.fillText(this.lot_number_1, 2000, 320, 1700);
            context.fillText(this.lot_number_1, 2000, 595, 1700);
          }

          //Reset it back to 50px
          context.font = "bold 50px Arial";
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
        const canvas = this.$refs.cardCanvas;
        const imageDataURL = canvas.toDataURL("image/jpeg", 1.0);

        // Open a new window with the canvas content
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
              <img src="${imageDataURL}" style="max-width: 100%; height: auto;" />
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
      return `${this.$network}vaccination/${this.registrant.citizen.hub_registrant_id}`;
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
    console.log("registrant: ", this.registrant);
  },
  updated() {
    this.drawIDOnCanvas();
  },
};
</script>

<style scoped>
.canvas-border {
  border: 2px solid lightgray;
}
</style>
