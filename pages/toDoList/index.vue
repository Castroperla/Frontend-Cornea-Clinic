<template>
  <div class="ma-1" id="app">
    <to-DoList />
  </div>
</template>

<script>
  import toDoList from '~/components/Users/toDoList.vue'

  export default {
    layout: 'dashboard',
    components:{
      toDoList
    }
  }
</script>

