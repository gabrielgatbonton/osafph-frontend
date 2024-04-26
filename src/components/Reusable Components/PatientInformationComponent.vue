<template>
  <v-card outlined class="pa-0 bordered-card colored-border">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex align-center">
        <v-card
          flat
          class="card-light-bgColor reversed-shaped-card px-4 d-flex"
        >
          <v-icon
            size="20"
            color="white"
            v-if="patientInformation.header.icon"
            >{{ patientInformation.header.icon }}</v-icon
          >
          <p
            class="text-subtitle-2 white--text font-weight-bold pa-0 my-2 ml-2"
          >
            {{ patientInformation.header.title }}
          </p>
        </v-card>
      </v-col>

      <v-container fluid class="py-4">
        <v-row
          v-for="(info, index) in patientInformation.info"
          :key="index"
          no-gutters
          :class="{
            'mb-3': $vuetify.breakpoint.xs && index < categories.length - 1,
          }"
        >
          <v-col cols="12" md="6" sm="6">
            <v-card-subtitle class="py-0">{{ info.title }}</v-card-subtitle>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-card-text
              :class="{
                font: $vuetify.breakpoint.xs,
                'font-weight-bold': !$vuetify.breakpoint.xs,
              }"
              class="py-0"
              >{{ info.content }}</v-card-text
            >
          </v-col>
        </v-row>
        <v-divider class="ma-3"></v-divider>
        <div class="mx-4 mb-2 font-weight-medium">Additional Information</div>
        <v-row
          v-for="(info, index) in patientInformation.additional_info"
          :key="'emergency' + index"
          no-gutters
          :class="{
            'mb-3': $vuetify.breakpoint.xs && index < emergency.length - 1,
          }"
        >
          <v-col cols="12" md="6" sm="6">
            <v-card-subtitle class="py-0">{{ info.title }}</v-card-subtitle>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-card-text
              :class="{
                font: $vuetify.breakpoint.xs,
                'font-weight-bold': !$vuetify.breakpoint.xs,
              }"
              class="py-0"
              >{{ info.content }}</v-card-text
            >
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "PatientInformationComponent",
  props: {
    patientInformation: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    placeholderImageSrc: require("@/assets/blank-avatar.png"),
  }),
  computed: {
    imageSrc() {
      return this.patientInformation.image_url.includes("null")
        ? {
            src: this.placeholderImageSrc,
            style: "border: 1px solid;",
            class: "rounded-lg pt-2",
          }
        : { src: this.patientInformation.image_url, style: "", class: "" };
    },
  },
};
</script>

<style scoped>
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
