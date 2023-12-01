<template>
   <v-container fluid>
    <v-row>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn @click="agregarPatient" rounded color="#4FB783" class="mb-2" style="color: white;" v-on="on">Add new patient</v-btn>
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
            :items="patients"
            elevation="2"
            class="tabla1"
        >
        <template #[`item.Acciones`]="{ item }">
            <v-tooltip top>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        color="red"
                        icon 
                        @click="deletePatients(item.email)"
                        v-bind="attrs"
                        v-on="on"
                    >
                    <v-icon>mdi mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
                <span>
                    Eliminar el paciente{{ item.name }}
                </span>
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        color="#3e68ff"
                        icon 
                        v-bind="attrs"
                        @click="$event => editPatients(item)"
                        v-on="on"
                    >
                    <v-icon>mdi mdi-pencil-outline</v-icon>
                    </v-btn>
                </template>
                <span>
                    Editar el pacientes {{ item.name }}
                </span>
            </v-tooltip>
        </template> 
        </v-data-table>

        <!--MODAL PARA EDITAR PACIENTE-->
    <v-dialog
        v-model="dialogEdit"
        max-width="800"
    >
    <v-card>
      <v-card-title class="text-h4" style="color:#4FB783;">
        Edit Patient
      </v-card-title>

      <v-card-text>
        <v-form ref="frmRegistro" v-model="frmRegistro">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="First Name" v-model="editPatientsData.name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Last Name" v-model="editPatientsData.lastname"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Email" type="email" v-model="editPatientsData.email"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Mobile" v-model="editPatientsData.phone"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Date of Birth" type="date" v-model="editPatientsData.birthday"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Age" type="number" v-model="editPatientsData.age"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select label="Gender" v-model="editPatientsData.gender" :items="['Male', 'Female', 'Other']"></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Address" v-model="editPatientsData.address"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Treatment" v-model="editPatientsData.treatment"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Blood Type" v-model="editPatientsData.blood"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            style="color: white;"
            color="red"
            rounded
            @click="$event => dialogEdit = false"
            >
            Cancelar
            </v-btn>

            <v-btn
            style="color: white;"
            color="#4FB783"
            rounded
            @click="event=>editar()"
            >
            Editar
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
         <!--MODAL PARA ELIMINAR PACIENTE-->
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
        <v-card>
        <v-card-title class="text-h5">
            Eliminar Paciente
        </v-card-title>

        <v-card-text>
            ¿Estás seguro que quieres eliminar el paciente?
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            color="red darken-1"
            text
            @click="$event => dialog = false"
            >
            Cancelar
            </v-btn>

            <v-btn
            color="green darken-1"
            text
            @click="$event=>borrar()"
            >
            Borrar
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    </v-row>
   </v-container>
</template>

<style>
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

</style>

<script>
export default {
    layout: 'dashboard',
  data() {
      return{
          search: '',
          headers: [
              { text: 'Name', align: 'center', sortable: true, value: 'name'}, 
              { text: 'Mobile', align: 'center', sortable: false, value: 'phone'},
              { text: 'Email', align: 'center', sortable: true, value: 'email'},
              { text: 'Age', align: 'center', sortable: true, value: 'age'},
              { text: 'Treatment', align: 'center', sortable: true, value: 'treatment'},
              { text: 'Acciones', align: 'center', sortable: false, value: 'Acciones'}
          ], 
          patients: [], 
          dialog: false, 
          email: null,
          editPatientsData: {}, 
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
      newPatient() {
          if(this.newPatient){
              this.patients = []
              this.loadUsers()
              this.$store.commit('setNewPatient', false)
          }
      }
  }, 
  computed: {
      newPatient () {
          return this.$store.state.newPatient
      }
  },
  mounted () {
      this.loadUsers()
  },
  methods: {
      async loadUsers () {
          const patients = await fetch('http://localhost:5000/get-patients')
          const data = await patients.json()
          if (data.alert === 'success'){
              this.patients = data.patients
          }
          console.log('@@patients =>', patients, data)
      }, 
      deletePatients (email)  {
          this.email = email
          this.dialog = true 
      }, 
      async borrar() {
          const sendData = {
              email: this.email
          } 
          const rawResponse = await fetch('http://localhost:5000/delete-patients', {
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
      editPatients (patient) {
          console.log('@@@ patient=>', patient)

          this.editPatientsData.name = patient.name
          this.editPatientsData.lastname = patient.lastname
          this.editPatientsData.email = patient.email
          this.editPatientsData.phone= patient.phone
          this.editPatientsData.birthday= patient.birthday
          this.editPatientsData.age = patient.age
          this.editPatientsData.gender = patient.gender
          this.editPatientsData.address = patient.address
          this.editPatientsData.treatment = patient.treatment
          this.editPatientsData.blood = patient.blood
          this.dialogEdit = true
      }, 
      async editar () {
          const valid = this.$refs.frmRegistro.validate()
          if (valid) {
              console.log('@@@ editPatientsData', this.editPatientsData)
              const rawResponse = await fetch('http://localhost:5000/edit-patient',{
                  method: 'POST', 
                  headers: {
                      'Accept': 'application/json', 
                      'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(this.editPatientsData)
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