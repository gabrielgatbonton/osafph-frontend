// enumerateDevices()
var FingerprintSdkTest = (function () {
  function FingerprintSdkTest() {
    this.sdk = new Fingerprint.WebApi();
  }
  FingerprintSdkTest.prototype.getDeviceList = function () {
    return this.sdk.enumerateDevices();
  };
  return FingerprintSdkTest;
})();
window.onload = function () {
  test = new FingerprintSdkTest();
  var allReaders = test.getDeviceList();
  allReaders.then(
    function (sucessObj) {
      for (i = 0; i < sucessObj.length; i++) {
        console.log(sucessObj[i]);
      }
    },
    function (error) {
      console.log(error.message);
    }
  );
};

//Prints Device Info
var FingerprintSdkTest = (function () {
  function FingerprintSdkTest() {
    this.sdk = new Fingerprint.WebApi();
  }
  FingerprintSdkTest.prototype.getDeviceList = function () {
    return this.sdk.enumerateDevices();
  };
  FingerprintSdkTest.prototype.getDeviceInfoWithID = function (uid) {
    var _instance = this;
    return this.sdk.getDeviceInfo(uid);
  };
  return FingerprintSdkTest;
})();
window.onload = function () {
  test = new FingerprintSdkTest();
  var allReaders = test.getDeviceList();
  allReaders.then(
    function (sucessObj) {
      for (i = 0; i < sucessObj.length; i++) {
        printDeviceInfo(sucessObj[i]);
      }
    },
    function (error) {
      console.log(error.message);
    }
  );
};
function printDeviceInfo(uid) {
  var myDeviceVal = test.getDeviceInfoWithID(uid);
  myDeviceVal.then(
    function (sucessObj) {
      console.log(sucessObj.DeviceID); //A string containing the unique identifier of the fingerprint reader.
      console.log(Fingerprint.DeviceTechnology[sucessObj.eDeviceTech]); // One of the DeviceUidType enumeration values that specifies the type of the unique identifier of the fingerprint reader.
      console.log(Fingerprint.DeviceModality[sucessObj.eDeviceModality]); // One of the DeviceModality enumeration values that specifies the capture process used by the fingerprint reader.
      console.log(Fingerprint.DeviceUidType[sucessObj.eUidType]); // One of the DeviceTechnology enumeration values that specifies the fingerprint reader technology.
    },
    function (error) {
      console.log(error.message);
    }
  );
}

var FingerprintSdkTest = (function () {
  function FingerprintSdkTest() {
    this.sdk = new Fingerprint.WebApi();
  }

  FingerprintSdkTest.prototype.startCapture = function () {
    var _this = this;
    this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(
      function () {
        console.log("You can start capturing !!!");
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  FingerprintSdkTest.prototype.stopCapture = function () {
    var _this = this;
    this.sdk.stopAcquisition().then(
      function () {
        console.log("Capturing stopped !!!");
      },
      function (error) {
        showMessage(error.message);
      }
    );
  };

  // Add event listeners to handle various events
  FingerprintSdkTest.prototype.addEventListeners = function () {
    this.sdk.on("DeviceConnected", function (deviceUid) {
      console.log("Fingerprint reader connected: ", deviceUid);
    });

    this.sdk.on("DeviceDisconnected", function (deviceUid) {
      console.log("Fingerprint reader disconnected: ", deviceUid);
    });

    this.sdk.on("SamplesAcquired", function (samples) {
      //   const converted = samples.samples;
      //   const samplesArray = JSON.parse(converted);
      //   const concatenatedBase64 = samplesArray.join("");
      //   const base64Png = "data:image/png;base64," + concatenatedBase64;
      //   console.log(base64Png);
      //   console.log("Fingerprint data has been captured.", samples);
      //   const rawBase64Png = convertToRawBase64Png(samples.samples);
      //   console.log("Raw Base64 PNG:", rawBase64Png);
      //   const base64Png = convertToBase64Png(samples.samples);
      //   // Now you can use base64Png as a base64-encoded PNG image.
      //   console.log("Base64 PNG:", base64Png);
      // Emit your custom event here or perform other actions.
      //   const base64Png = convertToBase64Png(samples.samples);
      //   // Now you can use base64Png as a base64-encoded PNG image.
      const sampleArray = JSON.parse(samples.samples);
      const concatenatedBase64 = sampleArray.join("");
      const base64Png =
        "data:image/png;base64," + Fingerprint.b64UrlTo64(concatenatedBase64);
      console.log("Base64 PNG:", base64Png);

      //   // Get the <img> element by its id
      //   const fingerprintImage = document.getElementById("fingerprintImage");

      //   // Set the src attribute to display the image
      //   fingerprintImage.src = base64Png;
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

window.onload = function () {
  var test = new FingerprintSdkTest();
  test.addEventListeners();
  test.startCapture();
};

function convertToBase64Png(samples) {
  const sampleArray = JSON.parse(samples[0]);
  const concatenatedBase64 = sampleArray.join("");
  return concatenatedBase64;
}
