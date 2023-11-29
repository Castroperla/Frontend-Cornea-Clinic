<script>
  export default {
  data() {
  return {
    items: [
      { text: 'Dashboard', icon:'mdi-view-dashboard' },
      { text: 'Appointments', icon:'mdi mdi-notebook-plus' },
      { text: 'Patients', icon:'mdi-account-group-outline' },
      { text: 'Schedule', icon:'mdi mdi-book-clock' }
    ]
  }
}
}
</script>

<template>
  <v-navigation-drawer
    app
    permanent
    left
    width="300" 
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-img :src="require('@/assets/img/clinica.png')"></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-avatar size="128">
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Dr. Perla Castro
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-item v-for="(item, i) in items" :key="i" link>
        <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
                {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
