<template>
  <v-footer app dark inset padless id="footer">
    <v-row justify="space-between">
      <v-col cols="auto" align-self="center">
        <v-card-text>
          &copy; <strong>ICTDU — {{ new Date().getFullYear() }}</strong>
        </v-card-text>
      </v-col>
      <v-col cols="auto">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 icons" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data: () => ({
    icons: ["mdi-facebook", "mdi-linkedin", "mdi-dots-horizontal"],
  }),
};
</script>

<style scoped>
#footer {
  color: #ffffff;
  max-width: 100vw;
}
.icons {
  display: inline-block;
}
.icons:hover {
  color: blueviolet;
  cursor: pointer;
}
</style>
