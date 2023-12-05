<template>
      <v-app-bar app color="white">
        <v-toolbar-title>Vue Vuetify Navbar</v-toolbar-title>
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

