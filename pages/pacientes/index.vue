<template>
    <div class="ma-5">
        <v-row>
        <v-col cols="6">
        </v-col>
        <logo />
        <v-col cols="6">
            <vi-patient/>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="5">
            <pat-register />
        </v-col>
        </v-row>
    </div>
</template>

<script>
import patRegister from '~/components/Users/patRegister.vue';
import ViPatient from '~/components/Users/ViPatient.vue';
import logo from '~/components/Users/logo.vue';
export default {
    layout: 'pacientes',
    components: {
        patRegister, 
        ViPatient, 
        logo
       
    }
}
</script>


