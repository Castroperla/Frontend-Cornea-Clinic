<template>
    <div class="ma-1">
        <v-row>
        <v-col cols="12">
            <pat-register/>
        </v-col>
    </v-row>
    </div>
</template>

<script>
import patRegister from '~/components/Users/patRegister.vue';
export default {
    layout: 'dashboard',
    components: {
        patRegister, 
        
       
    }
}
</script>