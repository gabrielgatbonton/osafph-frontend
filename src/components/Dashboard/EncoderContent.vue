<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" v-for="(item, index) in data.encoder" :key="index">
        <v-card class="pa-6" rounded="lg">
          <div class="d-flex justify-space-between align-center">
            <div class="card-title">{{ item.title }}</div>
            <div
              class="card-icon blue lighten-5 d-flex justify-center align-center"
            >
              <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
            </div>
          </div>
          <div
            class="card-number"
            :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
          >
            {{ item.value }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EncoderContent",
  props: ["data"],
};
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
</style>
