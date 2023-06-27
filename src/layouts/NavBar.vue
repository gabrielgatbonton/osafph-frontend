<template>
    <div>
        <v-app-bar color="grey lighten-3">
        <v-app-bar-title>
            OSAFPH
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-icon large>mdi-account</v-icon>
        </v-app-bar>
    <NavDrawer />
    </div>
    
</template>

<script>
import NavDrawer from '../layouts/NavDrawer.vue'
export default {
    components:{
        NavDrawer
    }
    
}
</script>

<style>
    
</style>