<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-2">
          <v-card-title class="text-h2 font-weight-bold mb-4" style="color: #4FB783!important;">Bienvenido a Cornea Clinic</v-card-title>
          <v-card-subtitle class="mb-4">Ofreciendo atención médica de calidad</v-card-subtitle>

          <v-row>
            <v-col cols="12" md="6">
              <v-img :src="require('../../assets/img/medico.png')" alt="Medical Image" class="rounded-lg"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <p class="text-h5 font-weight-bold mb-2">Nuestra Misión</p>
                <p class="mb-4">
                  Brindar atención médica integral y compasiva a nuestros pacientes, centrada en la calidad y la
                  excelencia en el servicio.
                </p>
              </v-card-text>
              <v-card-text>
                <p class="text-h5 font-weight-bold mb-2">Nuestros Servicios</p>
                <ul class="mb-4">
                  <li>Consultas médicas</li>
                  <li>Exámenes diagnósticos</li>
                  <li>Tratamientos personalizados</li>
                  <li>Cirugías y procedimientos</li>
                </ul>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

  
  <script>
  export default {
    layout: 'dashboard',
    data() {
        return {}
        }
    }
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  