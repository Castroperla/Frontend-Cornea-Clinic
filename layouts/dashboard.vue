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
            <v-main>
                <Nuxt />
            </v-main> 
    </v-app>
</template>

<style scoped>

</style>