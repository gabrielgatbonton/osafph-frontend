<template>
  <header class="flex-grow-1 image-background">
    <v-container class="d-flex flex-column" style="height: 100%">
      <!-- Nav -->
      <nav class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">
          Minalin <span class="dialysis-red--text">Dialysis Center</span>
        </div>

        <div class="d-flex align-center">
          <a
            :href="`#${i.id}`"
            class="anchor-buttons"
            :class="i.name === 'Home' ? 'dialysis-red--text' : 'black--text'"
            v-for="i in buttonTypes"
            :key="i.name"
            >{{ i.name }}</a
          >
        </div>
      </nav>

      <!-- Main -->
      <div
        class="d-flex align-center flex-grow-1 justify-space-between flex-gap"
      >
        <div class="flex-grow-1">
          <div class="text-h3 font-weight-medium mb-4">
            <span class="dialysis-red--text">We care</span><br />
            about your health
          </div>

          <p class="mb-10">
            Good health is the state of mental, physical and social well being
            and it does not just mean absence of diseases.
          </p>

          <!-- Button -->
          <a @click="redirect" class="booking-button">Book an appointment</a>
        </div>
        <div class="pr-8">
          <v-img :src="minalinLogo" max-height="350" max-width="350"></v-img>
        </div>
      </div>
    </v-container>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data: () => ({
    buttonTypes: [
      {
        name: "Home",
        id: "home",
      },
      {
        name: "Services",
        id: "services",
      },
      {
        name: "Doctors",
        id: "",
      },
      {
        name: "About us",
        id: "footer",
      },
      {
        name: "Contact us",
        id: "footer",
      },
    ],
    minalinLogo: require("@/assets/minalin-logo.png"),
  }),
  methods: {
    redirect: function () {
      return this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.dialysis-red--text {
  color: #cd071e;
}

.anchor-buttons {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px 24px;
}

.flex-gap {
  gap: 10rem;
}

.booking-button {
  display: inline-block;
  background: #cd071e;
  padding: 1rem 4rem;
  color: white;
  border-radius: 13px;
  text-align: center;
  box-shadow: 0 4px 33px 6px rgba(66, 00, 255, 0.16);
}

.image-background {
  width: 100%;
  min-height: 800px;
  max-height: 1000px;
  padding: 6rem 0 3rem 0;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6) 20%,
      rgba(255, 255, 255, 1)
    ),
    url(../../assets/minalin-dialysis-center.png) no-repeat center/cover;
}
</style>
