<template>
  <v-app>
     <NavComponents />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavComponents from './layouts/NavComponents.vue';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components:{
    NavComponents
  }
};
</script>
