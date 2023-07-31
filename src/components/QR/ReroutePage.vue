<template>
    <div>
      <div>
        <v-img
          class="mx-auto mt-15 slide-down"
          width="300"
          src="../../assets/OSAFPH LOGO.png"
        ></v-img>
      </div>
      <div>
        <div class="text-center my-5 text-subtitle-1 slide-down">Office of the Special Adviser for Flagship Programs for Health</div>
        <div class="text-center my-5 text-h3 slide-down">Official COVID-19 Vaccination Record</div>
      </div>
      <v-container>
        
      </v-container>
    </div>
  </template>
  
  <script>
  export default {

  };
  </script>
  
  <style scoped>
  /* Define the CSS for the slide-down animation */
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  /* Apply the slideDown animation to the .slide-down class */
  .slide-down {
    animation: slideDown 1.5s ease-out;
  }
  </style>
  