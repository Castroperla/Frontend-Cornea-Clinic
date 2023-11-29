<template>
    <v-row>
        <v-row style="text-align: right;">
            <v-col cols="1" style="text-align: center;">
                <p class="barra">Show</p> 
            </v-col>
            <v-col cols="2">
                <v-btn id="registerpat2">Recent <span class="mdi mdi-menu-down"></span> </v-btn>
            </v-col>
            <v-col cols="2">
                <p class="barra">Patients</p> 
            </v-col>
        </v-row>
            <v-row>
                <v-col>
                    <div class="search-wrapper panel-heading col-sm-12" id="cajita" >
                    <input type="text" align="center" v-model="search" placeholder="Search patients" /> 
                    </div>
                </v-col>
                   
                <v-col>
                    <v-btn id="registerpat">Add New Patient +</v-btn>
                </v-col>
            </v-row>

            
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

    <v-dialog
        v-model="dialogEdit"
        max-width="1200"
    >
        <v-card >
            <v-card-text class="contenedor1">
                <v-form ref="frmRegistro" v-model="frmRegistro">
                    <v-row align="center">
                        <v-col cols="12" style="text-align: center;">
                            <p class="formTit">Edit patient</p>
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <v-col>
                            <p>First name: </p>
                            <input type="text" class="cajas" v-model="editPatientsData.name">
                        </v-col>
                        <v-col>
                            <p>Lastname </p>
                            <input type="text" class="cajas" v-model="editPatientsData.lastname" >
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <p>Email: </p>
                            <input type="email" class="cajas" v-model="editPatientsData.email"> 
                        </v-col>
                        <v-col>
                            <p>Mobile </p>
                            <input type="text" class="cajas" v-model="editPatientsData.phone" >
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <v-col cols="4">
                            <p>Date of birth </p>
                            <input type="date" class="cajasB" v-model="editPatientsData.birthday">
                        </v-col>
                        <v-col cols="4">
                            <p>Age </p>
                            <input type="number" class="cajasC" v-model="editPatientsData.age">  
                        </v-col>
                        <v-col cols="4">
                            <p>Gender</p>
                            <v-radio-group  v-model="editPatientsData.gender">
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
                            <p> Address </p>
                            <input type="text" class="cajasA" v-model="editPatientsData.address">
                        </v-col>
                    </v-row>
                    <v-row align="center" >
                        <v-col>
                            <p>Treatment </p>
                            <input type="text" class="cajasP" v-model="editPatientsData.treatment">
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <p>Blood Type: </p>
                            <input type="text" class="cajas" v-model="editPatientsData.blood">
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
            Borrar Pacientes
        </v-card-title>

        <v-card-text>
            ¿Estás seguro que quieres editar el paciente?
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