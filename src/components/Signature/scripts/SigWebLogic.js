/* eslint-disable */
import "./SigWebTablet";
import { IsSigWebInstalled, GetSigWebVersion, GetDaysUntilCertificateExpires } from "@/components/Signature/scripts/SigWebTablet";
import { SetDisplayXSize, SetDisplayYSize, SetTabletState, SetJustifyMode, ClearTablet } from "@/components/Signature/scripts/SigWebTablet";
import { SetSigCompressionMode, SetImageXSize, SetImageYSize, SetImagePenWidth, GetSigImageB64, GetSigString, NumberOfTabletPoints } from "@/components/Signature/scripts/SigWebTablet";
import { Reset, ClearSigWindow } from "@/components/Signature/scripts/SigWebTablet";
var tmr;

var resetIsSupported = false;
var SigWeb_1_6_4_0_IsInstalled = false; //SigWeb 1.6.4.0 and above add the Reset() and GetSigWebVersion functions
var SigWeb_1_7_0_0_IsInstalled = false; //SigWeb 1.7.0.0 and above add the GetDaysUntilCertificateExpires() function

export function initSigWeb () {
  return new Promise((resolve, reject) => {
    var data = {
      version: "",
      expiry: "",
    };
    
  if (IsSigWebInstalled()) {
    var sigWebVer = "";
    try {
      sigWebVer = GetSigWebVersion();
    } catch (err) {
      console.log("Unable to get SigWeb Version: " + err.message);
    }

    if (sigWebVer != "") {
      try {
        SigWeb_1_7_0_0_IsInstalled = isSigWeb_1_7_0_0_Installed(sigWebVer);
      } catch (err) {
        console.log(err.message);
      }
      //if SigWeb 1.7.0.0 is installed, then enable corresponding functionality
      if (SigWeb_1_7_0_0_IsInstalled) {
        resetIsSupported = true;
        try {
          var daysUntilCertExpires = GetDaysUntilCertificateExpires();
          data.expiry = "SigWeb Certificate expires in " + daysUntilCertExpires + " days.";
        } catch (err) {
          console.log(err.message);
        }
        data.version = "SigWeb 1.7.0 installed"
        
      } else {
        try {
          SigWeb_1_6_4_0_IsInstalled = isSigWeb_1_6_4_0_Installed(sigWebVer);
          //if SigWeb 1.6.4.0 is installed, then enable corresponding functionality
        } catch (err) {
          console.log(err.message);
        }
        if (SigWeb_1_6_4_0_IsInstalled) {
          resetIsSupported = true;
          var sigweb_link = document.createElement("a");
          sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
          sigweb_link.innerHTML =
            "https://www.topazsystems.com/software/sigweb.exe";

          var note = document.getElementById("sigWebVrsnNote");
          note.innerHTML =
            "SigWeb 1.6.4 is installed. Install the newer version of SigWeb from the following link: ";
          note.appendChild(sigweb_link);
        } else {
          var sigweb_link = document.createElement("a");
          sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
          sigweb_link.innerHTML =
            "https://www.topazsystems.com/software/sigweb.exe";

          var note = document.getElementById("sigWebVrsnNote");
          note.innerHTML =
            "A newer version of SigWeb is available. Please uninstall the currently installed version of SigWeb and then install the new version of SigWeb from the following link: ";
          note.appendChild(sigweb_link);
        }
      }
    } else {
      //Older version of SigWeb installed that does not support retrieving the version of SigWeb (Version 1.6.0.2 and older)
      var sigweb_link = document.createElement("a");
      sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
      sigweb_link.innerHTML =
        "https://www.topazsystems.com/software/sigweb.exe";

      var note = document.getElementById("sigWebVrsnNote");
      note.innerHTML =
        "A newer version of SigWeb is available. Please uninstall the currently installed version of SigWeb and then install the new version of SigWeb from the following link: ";
      note.appendChild(sigweb_link);
    }
    resolve(data);
  } else {
    alert(
      "Unable to communicate with SigWeb. Please confirm that SigWeb is installed and running on this PC."
    );
    reject();
  }
 });
};

function isSigWeb_1_6_4_0_Installed(sigWebVer) {
  var minSigWebVersionResetSupport = "1.6.4.0";

  if (isOlderSigWebVersionInstalled(minSigWebVersionResetSupport, sigWebVer)) {
    console.log("SigWeb version 1.6.4.0 or higher not installed.");
    return false;
  }
  return true;
}

function isSigWeb_1_7_0_0_Installed(sigWebVer) {
  var minSigWebVersionGetDaysUntilCertificateExpiresSupport = "1.7.0.0";

  if (
    isOlderSigWebVersionInstalled(
      minSigWebVersionGetDaysUntilCertificateExpiresSupport,
      sigWebVer
    )
  ) {
    console.log("SigWeb version 1.7.0.0 or higher not installed.");
    return false;
  }
  return true;
}

function isOlderSigWebVersionInstalled(cmprVer, sigWebVer) {
  return isOlderVersion(cmprVer, sigWebVer);
}

function isOlderVersion(oldVer, newVer) {
  const oldParts = oldVer.split(".");
  const newParts = newVer.split(".");
  for (var i = 0; i < newParts.length; i++) {
    const a = parseInt(newParts[i]) || 0;
    const b = parseInt(oldParts[i]) || 0;
    if (a < b) return true;
    if (a > b) return false;
  }
  return false;
}

export function onSign(ctx, tmr) {
  return new Promise((resolve, reject) => {
    if (IsSigWebInstalled()) {
      SetDisplayXSize(500);
      SetDisplayYSize(100);
      SetTabletState(0, tmr);
      SetJustifyMode(0);
      ClearTablet();
      if (tmr == null) {
        tmr = SetTabletState(1, ctx, 50);
      } else {
        SetTabletState(0, tmr);
        tmr = null;
        tmr = SetTabletState(1, ctx, 50);
      }
      resolve(tmr); // Resolve the promise when the operation is complete
    } else {
      reject(new Error("Unable to communicate with SigWeb."));
    }
  });
}


export function onClear() {
  ClearTablet();
}

export function onDone(tmr) {
  return new Promise((resolve, reject) => {
    if (NumberOfTabletPoints() === 0) {
      alert("Please sign before continuing");
      reject(new Error("No signature points"));
    } else {

      SetTabletState(0, tmr);

      // Set up signature data
      SetSigCompressionMode(1);
      const bioSigData = GetSigString();
      // Get the signature image as base64 URL
      const canvas = document.getElementById("cnv"); // Replace with your canvas ID
      const sigImageData = canvas.toDataURL("image/jpeg", 1.0);

      resolve({ bioSigData, sigImageData });
    }
  });
}

function SigImageCallback(str) {
  document.FORM1.sigImageData.value = str;
}

function endDemo() {
  ClearTablet();
}

function close() {
  if (resetIsSupported) {
    Reset();
  } else {
    endDemo();
  }
}

//Perform the following actions on
//	1. Browser Closure
//	2. Tab Closure
//	3. Tab Refresh
window.onbeforeunload = function (evt) {
  close();
  clearInterval(tmr);
  evt.preventDefault(); //For Firefox, needed for browser closure
};
