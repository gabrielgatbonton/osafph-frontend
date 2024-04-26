<template>
  <div>
    <div id="navbar">
      <div class="flex-items">
        <v-icon @click="returnToRoute" color="white">mdi-arrow-left</v-icon>
        <h2>FileViewer</h2>
      </div>
      <div class="flex-items" v-if="type === 'PDF'">
        <v-icon @click="printPDF" color="white">mdi-printer</v-icon>
        <v-icon @click="downloadPDF" color="white">mdi-download</v-icon>
      </div>
      <div class="flex-items" v-else>
        <v-icon @click="printImage" color="white">mdi-printer</v-icon>
        <v-icon @click="downloadImage" color="white">mdi-download</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: ["type"],
  data: () => ({}),
  methods: {
    returnToRoute() {
      this.$router.go(-1);
    },
    printPDF() {
      this.$emit("print", true);
    },
    downloadPDF() {
      this.$emit("download", true);
    },
    downloadImage() {
      this.$emit("downloadImage", true);
    },
    printImage() {
      this.$emit("printImage", true);
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
  background: #323639;
  color: white;
  box-shadow: 1px 1px 3px #212426;
}
.flex-items {
  display: flex;
  flex-direction: row;
}
.flex-items * {
  margin: 0 8px;
}
</style>
