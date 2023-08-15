<template>
  <v-dialog v-model="showCameraDialog" max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-file-input
        label="Choose file"
        v-bind="attrs"
        v-on="{ ...on, click: onClickFileInput }"
        :append-icon="capturedImage ? 'mdi-check' : 'mdi-upload'"
        :append-icon-cb="() => (capturedImage = '')"
      ></v-file-input>
    </template>
    <v-card rounded="lg">
      <v-card-title class="justify-center blue darken-1 pb-5 white--text"
        >Camera</v-card-title
      >
      <div class="text-center">
        <v-card-text class="my-5">
          <video ref="cameraVideo" v-if="!pictureTaken" autoplay></video>
        </v-card-text>
      </div>

      <v-card-actions>
        <v-btn block dark color="blue darken-4" @click="takePicture">
          Take Picture
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn dark outlined color="red" block @click="closeCameraDialog">
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["image"],
  data: () => ({
    showCameraDialog: false,
    pictureTaken: false,
    capturedImage: null,
    fileInput: null,
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
        const constraints = {
          video: {
            width: { ideal: 1080 }, // Set the desired width
            height: { ideal: 1080 }, // Set the desired height
          },
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
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
    takePicture() {
      // Take a new picture
      const video = this.$refs.cameraVideo;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas data to JPG image data URL
      const dataURL = canvas.toDataURL("image/jpeg", 1.0); // Set the quality (0.0 to 1.0)

      this.capturedImage = dataURL;
      // Emit the captured image data to the parent component
      this.$emit("picture-taken", dataURL);

      // Close the camera dialog after taking the picture
      this.closeCameraDialog();
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
