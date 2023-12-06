<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="custom-color">
          <v-card-title class="headline">Optometrist</v-card-title>
          <v-card-subtitle>Dr. John Doe</v-card-subtitle>
          <v-card-text>
            Experience clear vision and comfort with our range of contact lenses.
            Our optometrists will guide you to the right choice.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="custom-color">
          <v-card-title class="headline">Eyeglasses</v-card-title>
          <v-card-subtitle>Choose Your Style</v-card-subtitle>
          <v-card-text>
            Experience clear vision and comfort with our range of contact lenses.
            Our optometrists will guide you to the right choice.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="custom-color">
          <v-card-title class="headline">Contact Lenses</v-card-title>
          <v-card-subtitle>Comfortable Vision</v-card-subtitle>
          <v-card-text>
            Experience clear vision and comfort with our range of contact lenses.
            Our optometrists will guide you to the right choice.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-2">
          <v-card-title class="text-h2 font-weight-bold mb-4" style="color: #4FB783!important;">Welcome to Cornea Clinic</v-card-title>
          <v-card-subtitle class="mb-4">Offering quality medical care</v-card-subtitle>

          <v-row>
            <v-col cols="12" md="6">
              <v-img :src="require('../../assets/img/medico.png')" alt="Medical Image" class="rounded-lg"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <p class="text-h5 font-weight-bold mb-2">Our mission</p>
                <p class="mb-4">
                  Provide comprehensive and compassionate medical care to our patients, focused on quality and
                  excellence in service.
                </p>
              </v-card-text>
              <v-card-text>
                <p class="text-h5 font-weight-bold mb-2">Our services</p>
                <ul class="mb-4">
                  <li>Medical consultations</li>
                  <li>Diagnostic tests</li>
                  <li>Personalized treatments</li>
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
.custom-color {
  background: #4FB783;
  color: white; 
}
</style>
  