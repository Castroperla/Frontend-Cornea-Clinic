<template>
  <v-app id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="../../assets/img/clinica.png" alt="clinica logo" width="300" height="auto">
                <h1 class="flex my-4" style="color: #4FB783!important;">CORNEA Clinic</h1>
              </div>
              <v-form 
                v-model="isValid" 
                ref="formLogin"
                >
                <v-text-field
                  append-icon="mdi mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="userEmail"
                  :error="error"
                  :rules="[rules.vacio]"/>
                <v-text-field
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
                  name="password"
                  label="Password"
                  id="password"
                  :rules="[rules.cantidad]"
                  v-model="password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="#4FB783" style="color: white;" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="showResult"
      :timeout="2000"
      top>
      {{ result }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      userEmail: '',
      password: '',
      isValid: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        vacio: value => !!value || 'Campo requerído',
        cantidad: value => value.length >= 5 || 'Mínimo 5 caractéres'
      }
    }
  },

  methods: {
    login() {
      const valid = this.$refs.formLogin.validate() 
      if (valid) {
        this.$router.push('/home')
      } else {
        this.error = true;
        this.result = "Campos vacíos o incorrectos.";
        this.showResult = true;
      }
    }
  }
}
</script>

<style scoped >
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>