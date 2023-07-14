<template>
  <div>
    <v-container fluid class="container-height v-scrollbar-hide">
      <v-row>
        <v-col cols="12" md="6" class="grey darken-4">
          <div class="text-center" style="margin-top: 100px">
            <div
              class="headline white--text text-center mx-auto"
              style="max-width: 300px"
            >
              OFFICE OF THE SPECIAL ADVISER FOR FLAGSHIP PROGRAM FOR HEALTH
            </div>
            <div>
              <v-img
                class="mx-auto d-block"
                src="../assets/OSAFPH LOGO.png"
                max-height="320"
                max-width="320"
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" :style="{ backgroundColor: '#d1d1d1' }">
          <v-card
            rounded="xl"
            class="mx-auto pb-7"
            max-width="350"
            elevation="7"
            style="margin-top: 100px"
          >
            <v-card-title class="justify-center blue--text headline"
              >Login</v-card-title
            >
            <div class="mx-7">
              <v-text-field v-model="username" label="Username"></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="Password"
              ></v-text-field>
              <v-btn class="blue" block dark @click="handleLogin">Login</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    handleLogin() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      this.$store
        .dispatch("login/login", credentials)
        .then(() => {
          // Redirect to the dashboard component
          this.$router.replace({ name: "dashboard" });
        })
        .catch((error) => {
          // Handle login error
          console.error("Login error:", error);
        });
    },
  },
};
</script>

<style scoped>
.container-height {
  height: 100vh; /* Set the height of the container to 100% of the viewport height */
  display: flex; /* Use flexbox to align the columns vertically */
  flex-direction: column; /* Arrange the columns vertically */
  overflow-y: hidden; /* Hide the vertical scrollbar */
}
</style>
