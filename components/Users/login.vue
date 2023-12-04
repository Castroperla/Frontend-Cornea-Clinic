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
              <v-btn block color="#4FB783" style="color: white;" @click="ingresarSistema" :loading="loading">Login</v-btn>
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
        vacio: value => !!value || 'Required field',
        cantidad: value => value.length >= 5 || 'Minimum 5 characters'
      }
    }
  },

  methods: {
    async ingresarSistema () {
      if (!this.userEmail || !this.password || this.userEmail.length === 0 || this.password.length === 0) {
        alert('Something is wrong, be sure to complete both fields.');
        return;
      }
      if (this.$refs.formLogin){
        if (this.$refs.formLogin.validate()){
          const sendData = {
          email: this.userEmail,
          password: this.password
          } 
          await this.$auth.loginWith('local', {
            data: sendData
          }).then((res) => {
            if (res.data.alert === 'success'){
              console.log(res)
              this.$router.push('/home')
            } else if (res.data.alert === 'Unregistered mail'){
              console.log(res)
              this.result = 'Unregistered mail'
              this.showResult = true
              setTimeout(() => {
                this.showResult = false
              }, 2000)
            } else if (res.data.alert === 'Incorrect password'){
              console.log(res)
              this.result = 'Incorrect password'
              this.showResult = true
              setTimeout(() => {
                this.showResult = false
              }, 2000)
            }
          }).catch((error) => {
            this.result = 'there was an error'
            this.showResult = true
            setTimeout(() => {
              this.showResult = false
            }, 2000)
            console.log(error)
          })
        } else {
          alert('Something is wrong')
        }
      } else {
        alert('Form not found')
      }
    },
    /*login() {
      const valid = this.$refs.formLogin.validate() 
      if (valid) {
        this.$router.push('/home')
      } else {
        this.error = true;
        this.result = "Campos vacíos o incorrectos.";
        this.showResult = true;
        alert('Datos incorrectos')
      }
    }*/
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
