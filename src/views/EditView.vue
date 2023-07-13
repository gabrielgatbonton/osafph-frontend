<template>
    <div>
        <v-container fluid class="ma-1">
            <v-row>
                <v-col cols="auto">
                    <!-- <v-icon left>mdi-account-box-multiple</v-icon> -->
                    <span class="title">Edit Registrant</span>
                </v-col>
            </v-row>
        </v-container>
        <v-divider class="mx-3"></v-divider>
        <FormFormat 
        :id="routeID"
        :loading="loading" 
        />
    </div>
</template>

<script>
import FormFormat from '@/components/FormFormat .vue'
export default {
    data: () => ({
        routeID: null,
        loading: false,
    }),
    components: {
        FormFormat,
    },
    methods: {
        async submit() {

        },
        assignId(){
            const id = this.$route.params.id;
            this.routeID = id;
        }
    },
    created(){
        this.assignId();
    }
}   
</script>
