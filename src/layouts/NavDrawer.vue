<template>
    <div>
        <v-navigation-drawer app color="grey lighten-3">
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
            drawer: true
        }),
        links: [
            { icon: 'mdi-view-dashboard', text: 'Home', route: '/' },
            { icon: 'mdi-folder', text: 'Champions', route: '/champion' },
            { icon: 'mdi-account', text: 'About us', route: '/about' },
        ]
    }
</script>