<template>
    <v-row>
        <v-row style="text-align: right;">
            <v-row style="margin-bottom: 16px;">
                <p>Doctor > Appointments</p>
                <v-col cols="5"> <span class="mdi mdi-bell"></span> </v-col>
                <v-btn class="register"> Available </v-btn>
            </v-row>
            <v-row class="ma-7"></v-row>
            <v-row style="margin-bottom: 16px;">
                <v-col cols="2" style="text-align: center;">
                    <p class="barra">Show</p> 
                </v-col>
                <v-col cols="2">
                    <v-btn id="registerpat2">Recent <span class="mdi mdi-menu-down"></span> </v-btn>
                </v-col>
                <v-col cols="7">
                    <p class="barra">Appointments</p> 
                </v-col>
            </v-row>
        </v-row>
            <v-row>
                <v-col>
                    <div class="search-wrapper panel-heading col-sm-12" id="cajita" >
                    <input type="text" align="center" v-model="search" placeholder="Search" /> 
                    </div>
                </v-col>
                <v-col>
                    <v-btn id="circulo"> + </v-btn>
                </v-col>
            </v-row>

            
        <v-data-table 
            :headers="headers"
            :items="citas"
            elevation="2"
            class="tabla1"
        >
        <template #[`item.Acciones`]="{ item }">
            <v-tooltip top>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        color="red"
                        icon 
                        @click="deleteAppointment(item.email)"
                        v-bind="attrs"
                        v-on="on"
                    >
                    <v-icon>mdi mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>
                    Eliminar la cita{{ item.name }}
                </span>
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        color="#3e68ff"
                        icon 
                        v-bind="attrs"
                        @click="$event => editAppointment(item)"
                        v-on="on"
                    >
                    <v-icon>mdi mdi-pencil-outline</v-icon>
                    </v-btn>
                </template>
                <span>
                    Editar la cita{{ item.name }}
                </span>
            </v-tooltip>
        </template> 
        </v-data-table>

    <v-dialog
        v-model="dialogEdit"
        max-width="1200"
    >
        <v-card >
            <v-card-text class="contenedor1">
                <v-form ref="frmRegistro" v-model="frmRegistro">
                    <v-row align="center">
                        <v-col cols="12" style="text-align: center;">
                            <p class="formTit">Edit appointment</p>
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <p>Name </p>
                        <input type="text" class="cajas" v-model="editAppointmentData.name">
                    </v-row> 
                        <v-row>
                        <p>Email </p>
                        <input type="email" class="cajas" v-model="editAppointmentData.lastname" >   
                    </v-row>
                    <v-row>
                        <p>Phone</p>
                        <input type="text" class="cajas" v-model="editAppointmentData.phone" >
                    </v-row>
                    <v-row align="center" >
                        <v-col cols="4">
                            <p>Age </p>
                            <input type="number" class="cajasC" v-model="editAppointmentData.age">  
                        </v-col>
                        <v-col cols="4">
                            <p>Gender</p>
                            <v-radio-group  v-model="editAppointmentData.gender">
                                <v-radio
                                    label="Male"
                                    value="Male"
                                ></v-radio>
                                <v-radio
                                    label="Female"
                                    value="Female"
                                ></v-radio>
                                <v-radio
                                    label="Other"
                                    value="Other"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <v-col>
                            <p> Date</p>
                            <input type="date" class="cajasA" v-model="editAppointmentData.date">
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <v-col>
                            <p>Time </p>
                            <input type="time" class="cajasP" v-model="editAppointmentData.time">
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <p>Book and Appointment for: </p>
                            <v-radio
                                    label="Checkoup"
                                    value="Checkoup"
                                ></v-radio>
                                <v-radio
                                    label="Surgery"
                                    value="Surgery"
                                ></v-radio>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            color="green darken-1"
            text
            @click="$event => dialogEdit = false"
            >
            Cancelar
            </v-btn>

            <v-btn
            color="#3e68ff"
            text
            @click="event=>editar()"
            >
            Editar
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialog"
        max-width="290"
    >
        <v-card>
        <v-card-title class="text-h5">
            Borrar citas
        </v-card-title>

        <v-card-text>
            ¿Estás seguro que quieres editar la cita?
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            color="green darken-1"
            text
            @click="$event => dialog = false"
            >
            Cancelar
            </v-btn>

            <v-btn
            color="green darken-1"
            text
            @click="$event =>borrar()"
            >
            Borrar
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    </v-row>
</template>

<style>
#circulo {
    width: 35px; /* Ajusta el tamaño según tus necesidades */
    height: 40px; /* Ajusta el tamaño según tus necesidades */
    border-radius: 50%; /* Hace que el botón sea redondo */
    border: 0.834px solid var(--primary-green, #4FB783);
    background: var(--secondary-lightest-green, #EBFFF5);
    color: #000; /* Cambia el color del texto según tus necesidades */
    cursor: pointer;
    outline: none; /* Elimina el contorno al hacer clic */
    font-size: 16px; 
    font-family: Open Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: 0.32px;
}
#registerpat {
    display: inline-flex;
    padding: 7.505px 16.678px;
    align-items: flex-start;
    gap: 8.339px;
    border-radius: 12.508px;
    border: 0.834px solid var(--primary-green, #4FB783);
    background: var(--secondary-lightest-green, #EBFFF5);
    text-transform: none;
    color: #000;
    text-align: center;

    /* body/t2-reg h1 */
    font-family: Open Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: 0.32px;
}

#registerpat2 {
    display: inline-flex;
    padding: 6.505px 16.678px;
    align-items: flex-start;
    gap: 8.339px;
    border-radius: 12.508px;
    border: 0.834px solid var(--primary-green, #4FB783);
    background: var(--secondary-lightest-green, #EBFFF5);
    text-transform: none;
    color: #000;
    text-align: center;

    /* body/t2-reg h1 */
    font-family: Open Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: 0.32px;
}
#cajita {
    width: 400px;
    height: 35px;   
    top: 10px;
    left: 15px;
    border: 0.50px solid var(--primary-green, #4FB783);
    border-radius: 12.508px;
}
.contenedor{
    width: 1011px;
    height: 897px;
    border: 1px solid #000;
    padding: 70px;
}

#tarjeta{
    width: 1011px;
    height: 897px;
    flex-shrink: 0;
    border-radius: 15px;
    border: 2px solid var(--primary-green, #4FB783);
    background: var(--gray-whte, #FFF);
}

.tabla1{
    width: 850px;
    height: 749px;
    flex-shrink: 0;
    color: #000;
    text-align: center;

    /* body/t2-reg h1 
    font-family: Open;*/
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: 0.32px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.contenedor1 {
    width: 1139px;
    height: 1002px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* O ajusta la altura según tus necesidades */
}
.formularioT {
    font-family: Open;
    font-size: 16px; 
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.32px;
    color: #000;
    text-align: center;
}

.barra {
    color: #000;
    text-align: center;

    /* body/t2-reg h1 */
    font-family: Open Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: 0.32px;
    }
    .formTit {
    font-family: Open;
    font-size: 20px; 
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.4px;
    color: #000;
    justify-content: center;
}
</style>

<script>
export default {
    layout: 'dashboard',
  data() {
      return{
          headers: [
              { text: 'Name', align: 'center', sortable: true, value: 'name'}, 
              { text: 'Mobile', align: 'center', sortable: false, value: 'phone'},
              { text: 'Email', align: 'center', sortable: true, value: 'email'},
              { text: 'Date', align: 'center', sortable: true, value: 'date'},
              { text: 'Time', align: 'center', sortable: true, value: 'time'},
              { text: 'Status', align: 'center', sortable: false, value: 'Acciones'}
          ], 
          citas: [], 
          dialog: false, 
          email: null,
          editAppointmentData: {}, 
          dialogEdit: false,
          search: '', // Declaración de la propiedad "search"
          searchResults: [],
          reglas: {
              requerido: value => !!value || 'Campo Requerido'
          }, 
          frmRegistro: false
      }
  }, 
  watch: {
      newAppointment() {
          if(this.newAppointment){
              this.citas = []
              this.loadUsers()
              this.$store.commit('setNewAppointment', false)
          }
      }
  }, 
  computed: {
      newAppointment () {
          return this.$store.state.newAppointment
      }
  },
  mounted () {
      this.loadUsers()
  },
  methods: {
      async loadUsers () {
          const citas = await fetch('http://localhost:5000/get-appointment')
          const data = await appointment.json()
          if (data.alert === 'success'){
              this.appointment = data.appointment
          }
          console.log('@@patients =>', appointment, data)
      }, 
      deleteappointment (email)  {
          this.email = email
          this.dialog = true 
      }, 
      async borrar() {
          const sendData = {
              email: this.email
          } 
          const rawResponse = await fetch('http://localhost:5000/delete-appointment', {
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(sendData)
          })
          const res = await rawResponse.json()
          if( res.alert === 'success') {
              this.loadUsers()
          } 
          this.dialog = false
         // console.log('@@@ respuesta => ', rawResponse)
      }, 
      editAppointment (cita) {
          console.log('@@@ patient=>', appointment)

          this.editAppointmentData.name = cita.name
          this.editAppointmentData.lastname = cita.lastname
          this.editAppointmentData.email = cita.email
          this.editAppointmentData.phone= cita.phone
          this.editAppointmentData.birthday= cita.birthday
          this.editAppointmentData.age = cita.age
          this.editAppointmentData.gender = cita.gender
          this.editAppointmentData.address = cita.address
          this.editAppointmentData.treatment = cita.treatment
          this.editAppointmentData.blood = cita.blood
          this.dialogEdit = true
      }, 
      async editar () {
          const valid = this.$refs.frmRegistro.validate()
          if (valid) {
              console.log('@@@ editPatientsData', this.editAppointmentData)
              const rawResponse = await fetch('http://localhost:5000/edit-appointment',{
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(this.editAppointmentData)
          })
          const res = await rawResponse.json()
          this.loadUsers()
          console.log('res =>', res)
          }
          this.dialogEdit = false
        }
    }
}
</script>