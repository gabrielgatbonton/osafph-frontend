<template>
    <div>
        <v-navigation-drawer v-model="drawer" app color="grey lighten-4">
            <v-container class="grey lighten-3">
                <v-row justify="center">
                    <v-col align-self="center" cols="auto">
                        <div class="title py-1">OSAFPH IMAGE</div>
                    </v-col>
                </v-row>
            </v-container>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data: () => ({
            drawer: true,
            links: [
            { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
            { icon: 'mdi-folder', text: 'Citizens', route: '/citizens' },
            { icon: 'mdi-account', text: 'Management', route: '/management' },
            ]
        }),
    }
</script>