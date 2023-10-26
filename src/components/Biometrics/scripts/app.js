/* eslint-disable */

//Maybe useful, however scripts are now located in public folder.
// import { Fingerprint } from "./fingerprint.sdk.min.js";
// import "./websdk.client.bundle.min.js";
// import "./es6-shim.js";

//Instance of the SDK 
export var FingerprintSdkTest = (function () {
  function FingerprintSdkTest() {
    this.sdk = new Fingerprint.WebApi();
  }

  //Prototype on Starting Capture of the Fingerprint.
  FingerprintSdkTest.prototype.startCapture = function () {
    return new Promise((resolve, reject) => {
      let data = {
        status: "",
      };

      // Start acquisition and set status of the SDK
      this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(
        function () {
          data.status = "You may start scanning your fingerprint.";

          // The status has been set, now resolve the data
          resolve(data);
        },
        function (error) {
          console.log(error);
          reject("Error on device and software.");
        }
      );
      
      //Event on Collecting the Scanned Fingerprint
      this.sdk.on("SamplesAcquired", function (samples) {
        const sampleArray = JSON.parse(samples.samples);
        const concatenatedBase64 = sampleArray.join("");
        const base64Png =
          "data:image/png;base64," + Fingerprint.b64UrlTo64(concatenatedBase64);
        // console.log("Base64 PNG:", base64Png);

        // Get the <img> element by its id
        const fingerprintImage = document.getElementById("fingerprintImage");

        // Set the src attribute to display the image
        fingerprintImage.src = base64Png;
      });
    });
  };

  //Prototype on Stopping Capture.
  FingerprintSdkTest.prototype.stopCapture = function () {
    this.sdk.stopAcquisition().then(
      function () {
        console.log("Capturing is stopped.");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  //Prototype on Status of the Devices Connection.
  FingerprintSdkTest.prototype.deviceConnection = function () {
    return new Promise((resolve) => {
      var status = null;

      this.sdk.on("DeviceConnected", (deviceUid) => {
        console.log("Fingerprint reader connected: ", deviceUid);
        status = "Device is Connected";
        resolve(status);
      });

      this.sdk.on("DeviceDisconnected", (deviceUid) => {
        console.log("Fingerprint reader disconnected: ", deviceUid);
        status = "Device is Disconnected";
        resolve(status);
      });
    });
  };

  // Event Listeners that maybe useful in this application
  FingerprintSdkTest.prototype.addEventListeners = function () {
    this.sdk.on("DeviceConnected", function (deviceUid) {
      console.log("Fingerprint reader connected: ", deviceUid);
    });

    this.sdk.on("DeviceDisconnected", function (deviceUid) {
      console.log("Fingerprint reader disconnected: ", deviceUid);
    });

    this.sdk.on("SamplesAcquired", function (samples) {
      const sampleArray = JSON.parse(samples.samples);
      const concatenatedBase64 = sampleArray.join("");
      const base64Png =
        "data:image/png;base64," + Fingerprint.b64UrlTo64(concatenatedBase64);
      console.log("Base64 PNG:", base64Png);

      // Get the <img> element by its id
      const fingerprintImage = document.getElementById("fingerprintImage");

      // Set the src attribute to display the image
      fingerprintImage.src = base64Png;
    });

    this.sdk.on("QualityReported", function (deviceUid, quality) {
      console.log(
        "Fingerprint image quality data has been reported.",
        deviceUid,
        quality
      );
    });

    this.sdk.on("ErrorOccurred", function (deviceUid, error) {
      console.error(
        "An error occurred during fingerprint capture: ",
        deviceUid,
        error
      );
    });

    this.sdk.on("CommunicationFailed", function () {
      console.error("Communication with the U.are.U SDK failed: ");
    });
  };

  return FingerprintSdkTest;
})();