<template>
  <v-app-bar app color="white">
    <v-toolbar-title class="font-weight-bold">{{ pageTitle }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon color="black">
      <v-icon>mdi mdi-bell-badge</v-icon>
    </v-btn>
    <v-btn rounded color="#4FB783" elevation="4" density="compact">
      <v-avatar size="32" class="mr-2">
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-avatar>
      <span style="color: white;">Available</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: '',
    };
  },
  watch: {
    $route(to, from) {
      this.updatePageTitle();
    },
  },
  methods: {
    updatePageTitle() {
      const currentPage = this.$route.name;

      switch (currentPage) {
        case 'home':
          this.pageTitle = 'Home';
          break;
        case 'citas':
          this.pageTitle = 'Appointments';
          break;
        case 'pacientes':
          this.pageTitle = 'Patients';
          break;
        case 'toDoList':
          this.pageTitle = 'Schedule';
          break;
        default:
          this.pageTitle = '';
      }
    },
  },
  created() {
    this.updatePageTitle();
  },
};
</script>
