# osafph-frontend Repository

This web application is developed according to the requests of the clients, **The Office of the Special Adviser for Flagship Programs for Health**.

## Prerequisites

Before setting up the project, make sure you have the following prerequisites installed:

**Download Node.js**

> Download & Install: [Node.js](https://nodejs.org/en)

**Signature Software Development Kit**

> Download & Install: [Signature SDK](https://drive.google.com/file/d/1gUETLaV6gZpb-1YknH-yQzd9sP_F9Q8f/view?usp=sharing)

> If SigWeb SSL Certificate expires, kindly run the following: [SigWeb Certificate Updater](https://drive.google.com/file/d/1fBkmUX8_i0LtnV-yiZBrktPnayvnsTA1/view?usp=sharing)

**Fingerprint Software Development Kit**

> Download, Extract, & Install: [Fingerprint SDK](https://drive.google.com/file/d/1mSXrElGpdWxxCSmoujwi_uy-Kb4vXpcp/view?usp=sharing)

> Next, Download, Extract, & Install [Fingerprint SDK Patch](https://drive.google.com/file/d/1Dzz3BLimGoUbKwcgW8MDdZnMzGvm3PCZ/view?usp=sharing)

### Description

You must download and install the following SDKs to allow the integrated peripherals to communicate with the designated personal computer.

Furthermore, communication with the **osafph-mcg-cares** back-end is crucial for this web application to function properly.

### Reminders

> Make sure you have the correct baseURL configuration which will be given by your back-end repository. The configuration file is located at `main.js`

> Also, set your networkURL to the correct value. This will change baseURL on the generated Quick Reference (QR) codes at the components `PrintCardJavaScript.vue` and `PublicPrintCardJavaScript.vue`

## Project setup

### 1. Install the necessary node modules for development

```
npm install
```

### 2. Compiles and hot-reloads for development

```
npm run serve
```

### [Optional] Compiles and minifies for production

```
npm run build
```

### [Optional] Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
