<template>
    <v-row>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn rounded color="#4FB783" class="mb-2" style="color: white;" v-on="on">Add new cita</v-btn>
            </template>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi mdi-account-search-outline"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
    
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

        <v-dialog v-model="dialogEdit" max-width="600">
        <v-card>
        <v-card-title class="text-h4" style="color:#4FB783;">
            Edit Appointment
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogEdit = false">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-form ref="frmRegistro" v-model="frmRegistro">
            <v-container>
                <v-row>
                <v-col cols="12">
                    <v-text-field label="Name" v-model="editAppointmentData.name"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-text-field label="Email" type="email" v-model="editAppointmentData.lastname"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-text-field label="Phone" v-model="editAppointmentData.phone"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="6">
                    <v-text-field label="Age" type="number" v-model="editAppointmentData.age"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-select label="Gender" v-model="editAppointmentData.gender" :items="['Male', 'Female', 'Other']"></v-select>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-text-field label="Date" type="date" v-model="editAppointmentData.date"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-text-field label="Time" type="time" v-model="editAppointmentData.time"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-radio-group v-model="editAppointmentData.appointmentType">
                    <v-radio label="Checkup" value="Checkup"></v-radio>
                    <v-radio label="Surgery" value="Surgery"></v-radio>
                    </v-radio-group>
                </v-col>
                </v-row>
            </v-container>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="color: white;"
            color="red"
            rounded
            @click="dialogEdit = false">
            Cancelar
            </v-btn>
            <v-btn 
            style="color: white;"
            color="#4FB783"
            rounded
            @click="editar">
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
          const citas = await fetch('http://localhost:5000/get-appointments')
          const data = await citas.json()
          if (data.alert === 'success'){
              this.citas = data.citas
          }
          console.log('@@patients =>', citas, data)
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
          console.log('@@@ patient=>', cita)

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