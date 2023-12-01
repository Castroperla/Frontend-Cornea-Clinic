<template>
    <div class="ma-10">
        <appointments/>
    </div>
</template>

<script>
import appointments from '~/components/Users/appointments.vue';
export default {
    layout: 'dashboard',
    components: {
        appointments
       
    }
}
</script>


