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
        <v-btn right dark class="mb-2" color="primary" v-bind="attrs" v-on="on"
          ><v-icon left>mdi-qrcode</v-icon>Print QR</v-btn
        >
      </template>
      <v-card id="background">
        <v-card-title
          id="navbar"
          class="pb-4 white--text d-flex justify-space-between"
        >
          <div>Print QR Code</div>
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
              <v-row align="center" class="ma-0">
                <v-col cols="auto">
                  <v-img :src="logoSrc" max-width="100" contain></v-img>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <div class="date">{{ date }}</div>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-img
                    max-width="60%"
                    class="mx-auto my-6"
                    :src="this.qrDataURL"
                  ></v-img>
                </v-col>
                <v-col cols="auto">
                  <div class="content-class">
                    <div class="name">{{ name }}</div>
                    <div>{{ address }}</div>
                    <div>{{ birthday }}</div>
                  </div>
                </v-col>
              </v-row>
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
  name: "PrintQRJavaScript",
  props: ["registrant"],
  data: () => ({
    dialog: false,
    qrDataURL: null,
    options: {
      margin: 0,
      quality: 1,
      width: 930,
    },
    logoSrc: require("@/assets/logo/MCG.png"),
    date: new Date().toLocaleString(),
    name: null,
    address: null,
    birthday: null,
  }),
  methods: {
    onDataUrlChange(dataUrl) {
      this.qrDataURL = dataUrl;
    },
    formattedDate(date) {
      const formattedDate = format(parseISO(date), "MMMM dd, yyyy");
      return formattedDate;
    },
    async generateAndPrintID() {
      try {
        const image = this.qrDataURL;
        const logoUrl = this.logoSrc;
        const name = this.name;
        const address = this.address;
        const birthday = this.birthday;

        // Open a new window with the canvas content
        const printWindow = window.open("", "_blank");
        const printDocument = printWindow.document;

        const head = printDocument.head;

        // Create a link element for preconnecting to fonts.googleapis.com
        const linkPreconnectFonts = printDocument.createElement("link");
        linkPreconnectFonts.rel = "preconnect";
        linkPreconnectFonts.href = "https://fonts.googleapis.com";
        head.appendChild(linkPreconnectFonts);

        // Create a link element for preconnecting to fonts.gstatic.com
        const linkPreconnectGstatic = printDocument.createElement("link");
        linkPreconnectGstatic.rel = "preconnect";
        linkPreconnectGstatic.href = "https://fonts.gstatic.com";
        linkPreconnectGstatic.crossOrigin = "anonymous";
        head.appendChild(linkPreconnectGstatic);

        const robotoLink = printDocument.createElement("link");
        robotoLink.rel = "stylesheet";
        robotoLink.href =
          "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
        head.appendChild(robotoLink);

        const style = printDocument.createElement("style");
        style.innerHTML = `
        @page {
        size: portrait;
        }
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: auto;
            padding: 2rem;
            font-family: 'Roboto', sans-serif;
        }
        img {
            max-width: 60%;
        }
        .image-class {
            display: block;
            text-align: center;
            margin: 1.6rem 0;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-bottom: 1rem;
        }
        .date-time {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .content-class {
            line-height: 1.4;
            text-align: center;
            font-size: 1.2rem;
        }
        .content-class .name {
            font-size: 1.6rem;
            font-weight: bold;
        }
          `;
        head.appendChild(style);

        // Create header container for the logo and date/time
        const header = printDocument.createElement("div");
        header.className = "header";

        // Create logo element and add it to the header
        const logoElement = printDocument.createElement("img");
        logoElement.src = logoUrl;
        logoElement.style.height = "50px"; // Adjust the height as needed
        header.appendChild(logoElement);

        // Create date/time element and add it to the header
        const dateTimeElement = printDocument.createElement("div");
        dateTimeElement.className = "date-time";
        const currentDate = new Date().toLocaleString();
        dateTimeElement.textContent = currentDate;
        header.appendChild(dateTimeElement);

        // Append header to the body
        printDocument.body.appendChild(header);

        const imgElement = printDocument.createElement("img");
        imgElement.className = "image-class";
        imgElement.src = image;
        printDocument.body.appendChild(imgElement);

        const content = printDocument.createElement("div");
        content.className = "content-class";

        const nameDiv = printDocument.createElement("div");
        nameDiv.className = "name";
        nameDiv.textContent = name;
        content.appendChild(nameDiv);

        const addressDiv = printDocument.createElement("div");
        addressDiv.textContent = address;
        content.appendChild(addressDiv);

        const birthdayDiv = printDocument.createElement("div");
        birthdayDiv.textContent = birthday;
        content.appendChild(birthdayDiv);

        printDocument.body.appendChild(content);

        // Add a slight delay before triggering print (optional)
        setTimeout(() => {
          // Print the document directly
          printWindow.print();

          // Close the print window (optional)
          printWindow.close();
        }, 1000); // Adjust the delay as needed
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
      return `${this.$network}vaccination/${this.registrant.citizen.hashed_id}`;
    },
  },
  components: {
    VueQrcode,
  },
  watch: {
    registrant: {
      immediate: true,
      handler(value) {
        if (value.citizen) {
          this.name = `${value.citizen.last_name}, ${
            value.citizen.first_name
          } ${value.citizen.middle_name ? value.citizen.middle_name : ""}`;
          this.address = `${value.citizen.barangay}, ${value.citizen.province}`;
          this.birthday = this.formattedDate(value.citizen.date_of_birth);
        }
      },
    },
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

.date {
  font-weight: bold;
}

.white {
  width: 21.59cm;
  height: 27.94cm;
}

.content-class {
  line-height: 1.4;
  font-size: 1.2rem;
  text-align: center;
}

.content-class .name {
  font-size: 1.6rem;
  font-weight: bold;
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
