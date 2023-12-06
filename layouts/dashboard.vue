<script>
   import draweVue from '~/components/Dashboard/drawe.vue';
   import navbarVue from '~/components/Dashboard/navbar.vue';
   
   export default {
    components: {
        draweVue,
        navbarVue
    }, data () {
        return {

        }
    }
}
</script>

<template>
    <v-app>
        <draweVue/>
        <navbarVue/>
        <div style="background: #F5F5F5!important;">
            <v-main>
                <Nuxt />
            </v-main> 
        </div>      
    </v-app>
</template>

<style scoped>

</style>