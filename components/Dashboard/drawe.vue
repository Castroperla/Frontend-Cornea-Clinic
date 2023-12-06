<script>
export default {
  data() {
    return {
      items: [
        { text: 'Home', icon: 'mdi-home-city', route: '/home' },
        { text: 'Appointments', icon: 'mdi mdi-notebook-plus', route: '/citas' },
        { text: 'Patients', icon: 'mdi-account-group-outline', route: '/pacientes' },
        { text: 'Schedule', icon: 'mdi mdi-book-clock', route: '/toDoList' }
      ]
    };
  },
  methods: {
    redirectTo(route) {
      this.$router.push(route)
    }
  }
};
</script>

<template>
  <v-navigation-drawer
    app
    permanent
    left
    width="300"
  >
    <v-list>
      <v-list-item >
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
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.route" link>
        <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="redirectTo(item.route)">
                {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

