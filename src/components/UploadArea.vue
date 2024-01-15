<template>
  <div
    class="drop-area"
    @dragover.prevent="handleFileOver"
    @dragleave.prevent="handleFileLeave"
    @drop.prevent="handleFileDrop"
    :class="{ active: isDragging }"
  >
    <div class="flex-items">
      <svg-icon id="svg" type="mdi" :path="path"></svg-icon>
      <div class="">Drop Files to Upload</div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCloudUpload } from "@mdi/js";
export default {
  name: "UploadArea",
  data: () => ({
    path: mdiCloudUpload,
    isDragging: false,
  }),
  components: {
    SvgIcon,
  },
  methods: {
    handleFileOver(event) {
      event.preventDefault();
      this.isDragging = true;
    },
    handleFileLeave(event) {
      event.preventDefault();
      this.isDragging = false;
    },
    handleFileDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      // handle the dropped file
      const droppedFile = event.dataTransfer.files[0];

      // Emit the file to the parent component.
      this.$emit("file", droppedFile);
    },
  },
};
</script>

<style scoped>
.drop-area {
  display: flex;
  border: 2px dashed #5a5a5a;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  height: 200px;
  width: 300px;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0 auto;
}

.drop-area.active {
  border: 2px solid #5a5a5a;
}

.drop-area .flex-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#svg {
  height: 100px;
  width: 100px;
  color: #2196f3;
}
</style>
