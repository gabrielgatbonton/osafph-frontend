<template>
  <v-dialog v-model="showCameraDialog" max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-file-input
        label="Choose file"
        v-bind="attrs"
        v-on="{ ...on, click: onClickFileInput }"
      ></v-file-input>
    </template>
    <v-card rounded="lg">
      <v-card-title class="justify-center blue darken-1 pb-5 white--text"
        >Camera</v-card-title
      >
      <div class="text-center">
        <v-card-text class="my-5">
          <video ref="cameraVideo" v-if="!pictureTaken" autoplay></video>
          <img v-else width="300px" :src="capturedImage" alt="Captured" />
        </v-card-text>
      </div>

      <v-card-actions>
        <v-btn block dark color="blue darken-4" @click="takePictureOrRetake"
          >{{ pictureTaken ? "Retake" : "Take Picture" }}</v-btn
        >
      </v-card-actions>
      <v-card-actions>
        <v-btn dark outlined color="red" block @click="closeCameraDialog"
          >Back</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    showCameraDialog: false,
    pictureTaken: false,
    capturedImage: null,
  }),
  methods: {
    onClickFileInput(event) {
      event.preventDefault();
      event.stopPropagation();
      this.openCameraDialog();
    },
    openCameraDialog() {
      this.pictureTaken = false;
      this.showCameraDialog = true;

      // Access the user's camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            // Get the video element and set the stream as its source
            const video = this.$refs.cameraVideo;
            video.srcObject = stream;
          })
          .catch((error) => {
            console.error("Error accessing the camera:", error);
            this.closeCameraDialog();
          });
      } else {
        console.error("Camera not supported in this browser.");
        this.closeCameraDialog();
      }
    },
    closeCameraDialog() {
      this.showCameraDialog = false;
      this.pictureTaken = false;
      this.capturedImage = null;
      const video = this.$refs.cameraVideo;
      if (video.srcObject) {
        const stream = video.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
      }
    },
    takePictureOrRetake() {
      if (this.pictureTaken) {
        // If picture is already taken, retake the picture
        this.pictureTaken = false;
        this.capturedImage = null;
        const video = this.$refs.cameraVideo;
        video.style.display = "block";
      } else {
        // Take a new picture
        const video = this.$refs.cameraVideo;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        this.capturedImage = dataURL;
        this.pictureTaken = true;
        video.style.display = "none"; // Hide the video after capturing the picture
      }
    },
  },
};
</script>

<style scoped>
video {
  width: 300px;
  transform: scaleX(-1);
}
</style>
