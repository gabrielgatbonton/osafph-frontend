<template>
  <footer class="footer-bg">
    <v-container>
      <div class="d-flex py-8">
        <div class="d-flex flex-column flex-grow-1">
          <!-- Image -->
          <div class="mb-4">
            <v-img :src="minalinLogo" max-width="80"></v-img>
          </div>
          <!-- Information -->
          <div class="d-flex flex-gap">
            <div class="flex-padding">
              <div class="text-h6 font-weight-medium mb-2">
                Minalin Dialysis Center
              </div>
              <p>
                Minalin Dialysis Center offers compassionate, state-of-the-art
                renal care with personalized treatment plans to support and
                enhance the quality of life for patients undergoing dialysis.
              </p>
            </div>
            <div class="flex-padding">
              <div class="text-h6 font-weight-medium mb-2">
                Contact Information
              </div>
              <div class="text-h6 font-weight-medium mb-2">09123456789</div>
              <div class="text-h6 font-weight-medium">
                minalindialysis@gmail.com
              </div>
            </div>
            <div class="flex-padding">
              <div class="text-h6 font-weight-medium mb-2">Location</div>
              <div class="text-h6 font-weight-medium">
                Minalin, Pampanga, <br />
                Philippines
              </div>
            </div>
          </div>
        </div>
        <!-- Social Medias -->
        <div class="social-media-container d-flex flex-column justify-end">
          <div class="text-h6 font-weight-medium mb-4 text-center">
            Follow Us
          </div>
          <div class="d-flex flex-column">
            <v-icon
              v-for="i in socialMediaIcons"
              :key="i"
              color="dialysisRed"
              large
              class="mb-2"
              >{{ i }}</v-icon
            >
          </div>
        </div>
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data: () => ({
    minalinLogo: require("@/assets/marketing/minalin-logo-2.png"),
    socialMediaIcons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
  }),
};
</script>

<style scoped>
.footer-bg {
  background: #f0f0f0;
  min-height: 200px;
}
.flex-gap {
  gap: 2rem;
}
.flex-padding {
  max-width: 32%;
  flex-grow: 1;
}
.flex-padding:first-child {
  padding-left: 0;
}
.flex-padding:last-child {
  padding-right: 0;
}

.social-media-container {
  min-width: 100px;
}
</style>
