<template>
  <div>
    <div id="navbar">
      <div class="flex-items">
        <v-icon @click="returnToRoute" color="white">mdi-arrow-left</v-icon>
        <h2>FileViewer</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data: () => ({}),
  methods: {
    returnToRoute() {
      this.$router
        .push({
          name: "consultation-files",
        })
        .catch((error) => {
          console.error("Error Returning to Route: ", error);
        });
    },
  },
};
</script>

<style scoped>
#navbar {
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  line-height: 1.6;
  padding: 0 10px;
  background: #333;
  color: white;
}
.flex-items {
  display: flex;
  flex-direction: row;
}
.flex-items * {
  margin: 0 8px;
}
</style>
