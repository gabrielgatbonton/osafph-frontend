<template>
  <div id="container">
    <div id="gradient-section"></div>
    <div></div>
  </div>
  <!-- <v-container fluid id="login-container">
      <v-row justify="end">
        <v-col cols="auto" align-self="center">
          
        </v-col>

      </v-row>
    </v-container> -->
  <!-- <v-container fluid class="container-height v-scrollbar-hide">
      <v-row>
        <v-col cols="12" md="6" class="grey darken-4">
          <div class="text-center text-container">
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
                :max-width="$vuetify.breakpoint.xs ? 260 : 320"
                contain
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" :style="{ backgroundColor: '#d1d1d1' }">
          <div class="card-container">
            <v-card
              rounded="xl"
              class="mx-auto pb-7 slide-down"
              max-width="350"
              elevation="7"
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
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @blur="$v.password.$touch()"
                  :error-messages="passwordErrors"
                  :success="!$v.password.$invalid && $v.password.$dirty"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  label="Password"
                ></v-text-field>
                <v-btn
                  class="mt-5 blue darken-2"
                  block
                  dark
                  :loading="loading"
                  @click="handleLogin"
                  >Login</v-btn
                >
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container> -->
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data: () => ({
    username: "",
    password: "",
    loading: false,
    loginError: null,
    show: false,
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
              this.loginError = error.response.data.message;
            } else if (error.response && error.response.status === 401) {
              // Status code 401 indicates unauthorized login (incorrect credentials)
              this.loginError = error.response.data.message;
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

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
  background: #fff;
  #gradient-section {
    background: linear-gradient(
      to bottom,
      rgba(251, 185, 185),
      rgba(199, 123, 123),
      rgba(157, 74, 74)
    );
    width: 50%;
    height: 100%;

  }
}

/* .container-height {
  height: 100vh;
  display: flex;
  flex-direction: column;
} */

/* .text-container {
  margin-top: 10%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
} */

/* .card-container {
  margin-top: 15%;
  padding: 40px 20px;
} */

/* @media (max-width: 576px) {
  .text-container {
    margin: 0;
  }
  .card-container {
    margin: 0;
  }
} */

/* @keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
} */

/* .slide-down {
  animation: slideDown 1.5s ease-out;
} */
</style>
