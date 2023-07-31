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
              <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                @blur="$v.username.$touch()"
                :success="!$v.username.$invalid && $v.username.$dirty"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                @blur="$v.password.$touch()"
                :error-messages="passwordErrors"
                :success="!$v.password.$invalid && $v.password.$dirty"
                type="password"
                label="Password"
              ></v-text-field>
              <v-btn class="mt-5 blue darken-2" block dark :loading="loading" @click="handleLogin"
                >Login</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data: () => ({
    username: "",
    password: "",
    loading: false,
    loginError: null,
  }),
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      !this.$v.username.minLength &&
        errors.push("Username must be at least 4 characters long");
      // Add loginError message to errors if it exists
      if (this.loginError) {
        errors.push(this.loginError);
      }

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 4 characters long");

      if (this.loginError) {
        errors.push(this.loginError);
      }
      return errors;
    },
  },
  methods: {
    handleLogin() {
      // Validate the form before proceeding with login
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // Validation passed, continue with login
        const credentials = {
          username: this.username,
          password: this.password,
        };

        this.loading = true;
        this.loginError = null;

        this.$store
          .dispatch("login/login", credentials)
          .then(() => {
            // Redirect to the dashboard component
            this.$router.replace({ name: "dashboard" });
          })
          .catch((error) => {
            // Handle login error
            console.error("Login error:", error);

            if (error.response && error.response.status === 404) {
              // Status code 404 indicates user not found
              this.loginError = "User not found";
            } else if (error.response && error.response.status === 401) {
              // Status code 401 indicates unauthorized login (incorrect credentials)
              this.loginError = "Invalid username or password";
            } else {
              // Other error, display a generic error message
              this.loginError = "An error occurred during login";
            }
          })
          .finally(() => {
            // Reset loading state after login request is completed (whether successful or not)
            this.loading = false;
          });
      }
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
