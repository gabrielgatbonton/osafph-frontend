<template>
  <div id="Container">
    <div id="Scores">
      <h5>
        Scan Quality :
        <input
          type="text"
          id="qualityInputBox"
          size="20"
          style="background-color: #dcdcdc; text-align: center"
        />
      </h5>
    </div>
    <div id="content-capture" style="display: none">
      <div id="status"></div>
      <div id="imagediv"></div>
      <div id="contentButtons">
        <table width="70%" align="center">
          <tr>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="clearButton"
                value="Clear"
                onclick="Javascript:onClear()"
              />
            </td>
            <td data-toggle="tooltip" title="Will work with the .png format.">
              <input
                type="button"
                class="btn btn-primary"
                id="save"
                value="Save"
              />
            </td>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="start"
                value="Start"
                onclick="Javascript:onStart()"
              />
            </td>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="stop"
                value="Stop"
                onclick="Javascript:onStop()"
              />
            </td>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="info"
                value="Info"
                onclick="Javascript:onGetInfo()"
              />
            </td>
          </tr>
        </table>
      </div>

      <div id="imageGallery"></div>
      <div id="deviceInfo"></div>

      <div id="saveAndFormats">
        <form name="myForm" style="border: solid grey; padding: 5px">
          <b>Acquire Formats :</b><br />
          <table>
            <tr data-toggle="tooltip" title="Will save data to a .raw file.">
              <td>
                <input
                  type="checkbox"
                  name="Raw"
                  value="1"
                  onclick="checkOnly(this)"
                />
                RAW <br />
              </td>
            </tr>
            <tr
              data-toggle="tooltip"
              title="Will save data to a Intermediate file"
            >
              <td>
                <input
                  type="checkbox"
                  name="Intermediate"
                  value="2"
                  onclick="checkOnly(this)"
                />
                Feature Set<br />
              </td>
            </tr>
            <tr data-toggle="tooltip" title="Will save data to a .wsq file.">
              <td>
                <input
                  type="checkbox"
                  name="Compressed"
                  value="3"
                  onclick="checkOnly(this)"
                />
                WSQ<br />
              </td>
            </tr>
            <tr data-toggle="tooltip" title="Will save data to a .png file.">
              <td>
                <input
                  type="checkbox"
                  name="PngImage"
                  checked="true"
                  value="4"
                  onclick="checkOnly(this)"
                />
                PNG
              </td>
            </tr>
          </table>
        </form>
        <br />
        <input
          type="button"
          class="btn btn-primary"
          id="saveImagePng"
          value="Export"
          onclick="Javascript:onImageDownload()"
        />
      </div>
    </div>

    <div id="content-reader">
      <h4>Select Reader :</h4>
      <select
        class="form-control"
        id="readersDropDown"
        onchange="selectChangeEvent()"
      ></select>
      <div id="readerDivButtons">
        <table width="70%" align="center">
          <tr>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="refreshList"
                value="Refresh List"
                onclick="Javascript:readersDropDownPopulate(false)"
              />
            </td>
            <td>
              <input
                type="button"
                class="btn btn-primary"
                id="capabilities"
                value="Capabilities"
                data-toggle="modal"
                data-target="#myModal"
                onclick="Javascript:populatePopUpModal()"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import './scripts/app.js';
import './scripts/fingerprint.sdk.min.js';
import './scripts/websdk.client.bundle.min.js';
export default {
  name: "BiometricComponent",
  mounted() {
    const fingerprintScript = document.createElement("script");
    fingerprintScript.src = "/path/to/fingerprint.sdk.min.js";
    document.head.appendChild(fingerprintScript);

    const webSdkScript = document.createElement("script");
    webSdkScript.src = "/path/to/websdk.client.bundle.min.js";
    document.head.appendChild(webSdkScript);

    const appScript = document.createElement("script");
    appScript.src = "/path/to/app.js";

    // Wait for the external scripts to load
    appScript.onload = () => {
      // Your code that depends on Fingerprint here
    };

    document.head.appendChild(appScript);
  },
};
</script>

<style scoped>
body {
  font-family: "Segoe UI", sans-serif;
}

span {
  font-style: italic;
}

.container-fluid {
  background-color: #0099cc;
}

#Container {
  margin: 20px auto;
  width: 800px;
  height: 800px;
}

#imagediv {
  padding: 0px;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  overflow: hidden;
  border: 1px solid rgba(51, 122, 183, 0.39);
  display: table;
}

#imagediv img {
  width: 100%;
  height: 500px;
}

#imagediv div {
  text-align: center;
  vertical-align: middle;
  height: 500px;
  background: #d3d3d3;
  display: table-cell;
}

#image {
  width: 100%;
}

#imageGallery {
  padding: 0px;
  margin: 0 auto;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

#imageGallery img {
  float: left;
  width: 20%;
  height: 100%;
}

#deviceInfo {
  padding: 5px;
  margin: 0 auto;
  width: 100%;
  height: 100px;
  text-align: center;
}

#dynamicInfoDivs {
  position: relative;
  left: 30%;
}

#Scores {
  margin: 0 auto;
  width: 500px;
  text-align: center;
  border: 2px solid black;
}

#status {
  min-height: 22px;
  text-align: center;
  margin-bottom: 5px;
  color: red;
}

#contentButtons {
  padding: 5px;
  text-align: center;
  margin-bottom: 5px;
}

#readerDivButtons {
  padding: 5px;
  text-align: center;
  margin-bottom: 5px;
}

#modalContent {
  width: 350px;
  margin: 0 auto;
  padding: 5px;
  text-align: left;
  vertical-align: center;
}

#saveAndFormats {
  position: relative;
  left: 660px;
  top: -750px;
  width: 135px;
}
</style>
