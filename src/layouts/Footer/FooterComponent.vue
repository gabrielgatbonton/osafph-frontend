<template>
  <v-footer app dark inset padless id="footer" color="#f4f4f4">
    <v-row :justify="$vuetify.breakpoint.xs ? 'center' : 'space-between'">
      <v-col cols="auto" align-self="center">
        <div
          class="d-flex justify-start align-center py-1"
          :class="{ 'justify-center py-5 px-3': $vuetify.breakpoint.xs }"
        >
          <div class="px-2">
            <v-img
              eager
              height="55"
              width="55"
              contain
              :src="imageUrl"
              :class="{ 'd-none': $vuetify.breakpoint.xs }"
            ></v-img>
          </div>
          <div style="font-size: 1rem" class="px-2">
            Copyright &copy; 2024 — <strong>ICTDU</strong>
          </div>
        </div>
      </v-col>
      <v-col cols="auto" align-self="center" v-if="!$vuetify.breakpoint.xs">
        <div class="d-flex justify-start align-center">
          <v-tooltip top v-for="(route, index) in icons" :key="index">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :href="route.link"
                target="_blank"
                class="icons"
                v-bind="attrs"
                v-on="on"
                ><v-icon size="30px" color="primary">{{
                  route.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ route.developer }}</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data: () => ({
    imageUrl: require("@/assets/ICTDU.jpg"),
    icons: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/aaronjoseph.baquing/",
        developer: "Backend Developer",
      },
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/gabriel.gatbonton.26/",
        developer: "Frontend Developer",
      },
    ],
  }),
};
</script>

<style scoped>
#footer {
  color: #555;
  max-width: 100vw;
  height: auto;
}
.icons {
  margin-right: 1rem;
  padding: 1.5rem 2rem;
}
.icons:hover {
  opacity: 0.7;
  cursor: pointer;
}

/* Phones */
@media (max-width: 576px) {
  .icons {
    padding: 0.5rem;
  }
}
</style>
