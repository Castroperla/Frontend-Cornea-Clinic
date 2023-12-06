<template>
    <div class="ma-1">
        <v-row>
        <v-col cols="12">
            <vi-patient/>
        </v-col>
    </v-row>
    </div>
</template>

<script>
import patRegister from '~/components/Users/patRegister.vue';
import ViPatient from '~/components/Users/ViPatient.vue';
export default {
    layout: 'dashboard',
    components: {
        patRegister, 
        ViPatient
       
    }
}
</script>


