<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      isValid: false,
      rules: {
        vacio: value => !!value || 'Campo requerído',
        cantidad: value => value.length >= 5 || 'Mínimo 5 caractéres'
      }
    };
  },
  methods: {
    Login () {
      const valid = this.$refs.formLogin.validate() 
      if(valid) {
        //ruta hacia pagina
        this.$router.push('/pacientes')
      } 
      else {
        //alerta 
        alert('Datos incorrectos')
      }
    }
  }
}
</script>

<template>
  <v-app>
    <v-main class="login-page">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="#4FB783">
                <v-toolbar-title class="text-h3 text-center font-weight-bold">
                  Iniciar Sesión
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="isValid" ref="formLogin">
                  <v-text-field
                    v-model="username"
                    name="username"
                    label="Correo Electrónico"
                    type="text"
                    placeholder="Escribe tu correo electrónico"
                    required
                    :rules="[rules.vacio]"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Escribe tu contraseña"
                    required
                    :rules="[rules.cantidad]"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="success" @click="Login">Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
 </template>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>