<template>
    <v-container class="mt-16">
        <v-row>
            <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
              <p class="mb-0 mt-10 font-weight-medium text-h4">Learn About Us</p>
            </v-col>
            <v-col cols="12" class="justify-center align-center d-flex pa-0 ma-0">
              <p class="mb-0 text-caption">We are dedicated to serve you best medical facility</p>
            </v-col>
  
            <v-col>
              <v-row>
                <v-col cols="6" ><v-img :src="sideFront" class="rounded-lg"></v-img></v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12" class="mb-0 pa-0">
                            <p class="font-weight-medium text-h6 ma-0 pb-0" >Minalin Dialysis Center</p>
                        </v-col>
                        <v-col cols="12" class="mt-0 pa-0">
                            <p class="ma-0 pa-0" >At Minalin Dialysis Center, located in Minalin, Pampanga, we are proudly driven by the mayor’s initiative to provide advanced and compassionate renal care. Our facility is dedicated to delivering personalized dialysis treatments, ensuring that every patient receives the highest standard of care in a supportive and community-focused environment.</p>
                        </v-col>
                    </v-row>
                </v-col>
              </v-row>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script>
  import sideFront from '@/assets/marketing/front-view.png';
    export default {
      name: "SectionThree",
      data() { 
        return { 
          sideFront,
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>