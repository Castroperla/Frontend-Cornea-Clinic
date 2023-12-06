<template>
  <v-container fluid>
    <v-card elevation="2" class="pa-6">
      <v-row>
          <!--Boton para modal nuevo paciente-->
          <v-dialog v-model="newPatient" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                rounded color="#4FB783" 
                class="mb-2" 
                style="color: white;"
                @click="nuevopaciente()"  
                v-on="on" 
                v-bind="attrs"
              > Add new patient
              </v-btn>
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
              :search="search"
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
                          @click="editPatients(item)"
                          v-on="on"
                      >
                      <v-icon>mdi mdi-pencil-outline</v-icon>
                      </v-btn>
                  </template>
                  <span>
                      Editar el paciente {{ item.name }}
                  </span>
              </v-tooltip>
          </template> 
          </v-data-table>

    <!--MODAL PARA AGREGAR UN NUEVO PACIENTE-->
    <v-dialog 
      v-model="newPatient" 
      max-width="900"
    >
    <v-card>
      <v-card-title>
        <v-row align="center">
          <v-col cols="10">
            <span class="headline">Add new patient</span>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-icon @click="cerrarModal" class="icon-close">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-form ref="pacRegistro" v-model="pacRegistro">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="First name"
                v-model="name"
                outlined
                :rules="[reglas.requerido]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Last name"
                v-model="lastname"
                outlined
                :rules="[reglas.requerido]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                v-model="email"
                outlined
                :rules="[reglas.requerido]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Mobile"
                v-model="phone"
                outlined
                :rules="[reglas.requerido]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                type="date"
                label="Date of birth"
                v-model="birthday"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Age"
                v-model="age"
                outlined
                :rules="[reglas.requerido]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="Gender"
                v-model="gender"
                :items="['Male', 'Female', 'Other']"
                outlined
                :rules="[reglas.requerido]"
              ></v-select>
            </v-col>
          </v-row>

          <v-text-field
            label="Address"
            v-model="address"
            outlined
          ></v-text-field>

          <v-text-field
            label="Treatment"
            v-model="treatment"
            outlined
          ></v-text-field>

          <v-text-field
            label="Blood Type"
            v-model="blood"
            outlined
          ></v-text-field>

          <v-row>
            <v-btn @click="registraPacientes" color="#4FB783" rounded block class="mt-4" style="color:white">
              Add patients
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
    <!--MODAL PARA EDITAR PACIENTE-->
      <v-dialog
        v-model="dialogEdit"
        max-width="800" 
      >
        <v-card>
          <v-card-title class="text-h4" style="color:#4FB783;">
            Edit Patient  
          </v-card-title>
      <!--Editar Paciente-->
          <v-card-text>
          <v-form ref="frmRegistro" v-model="frmRegistro">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field 
                    label="First Name" 
                    v-model="editPatientsData.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field 
                    label="Last Name" 
                    v-model="editPatientsData.lastname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field 
                    label="Email" 
                    type="email" 
                    v-model="editPatientsData.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field 
                    label="Mobile" 
                    v-model="editPatientsData.phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field 
                    label="Date of Birth" 
                    type="date" v-model="editPatientsData.birthday"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field 
                    label="Age" 
                    type="number" 
                    v-model="editPatientsData.age"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select 
                    label="Gender" 
                    v-model="editPatientsData.gender" 
                    :items="['male', 'female', 'other']"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                    label="Address" 
                    v-model="editPatientsData.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field 
                    label="Treatment" 
                    v-model="editPatientsData.treatment"
                  ></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field 
                  label="Blood Type" 
                  v-model="editPatientsData.blood"
                ></v-text-field>
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
              @click="dialogEdit = false"
              >
              Cancel
              </v-btn>

              <v-btn
              style="color: white;"
              color="#4FB783"
              rounded
              @click="editar()"
              >
              Edit
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
              Delete Patient
          </v-card-title>

          <v-card-text>
              Are you sure to eliminate this patient?
          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
              color="red darken-1"
              text
              @click="dialog = false"
              >
              Cancel
              </v-btn>

              <v-btn
              color="green darken-1"
              text
              @click="borrar()"
              >
              Delete
              </v-btn>
          </v-card-actions>
          </v-card>
      </v-dialog>

      </v-row>
    </v-card>
  </v-container>
 </template>
 
 <style>
.p {
    font-family: Open;
    font-size: 14px; 
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.28px;
    color: #000;
    margin-bottom: 25px;
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

.radio {
    color: #000;
    width: 20px;
    height: 20px;
    fill:var(--text-white, #FFF); 
    stroke-width: 1px;
    stroke: var(--primary-green, #4fb783);
}

.cajas{
    width: 400px;
    height: 50px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasA{
    width: 870px;
    height: 96px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasP{
    width: 870px;
    height: 70px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasB{
    width: 185px;
    height: 40px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
.cajasC{
    width: 120px;
    height: 40px;
    border-radius: 15px;
    border: 1px solid var(--gray-light-gray, #DDD);
    background: var(--gray-whte, #FFF);
}
#btnPatients {
    align-content: center;
    border-radius: 15px;
    background: var(--primary-green, #4fb783);
    width: 870px;
    height: 60px; 
    flex-shrink: 0; 
    text-transform: none;
    color: var(--gray-whte, #FFF);
    /* paragraph/t2-reg h1 */
    font-family: Open Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 135% */
    letter-spacing: 0.4px;
}
.contenedor{
    width: 1050px;
    height: 1200px;
    border: 1px solid #000;
    padding: 70px;
}
.titulo{
    width: 1200px;
    height: 1000px;
    border-radius: 15px;
    background: var(--gray-whte, #FFF);
    padding: 70px;
    border: 1px solid #000;
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
 
 <!--SCRIPT-->
 <script>
 export default {
  layout: 'dashboard',
  data() {
    return{
      newPatient: false,
      name: '',
      lastname: '', 
      email: '', 
      phone:'', 
      birthday: '', 
      age: '', 
      gender: '', 
      address: '',
      treatment: '', 
      blood: '', 
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
      frmRegistro: false,
      pacRegistro: false,  
      search: '', 
    }
   }, 
  watch: {
    newPatient () {
          return this.$store.state.newPatient
      }
  }, 
  computed: {

  },
  mounted () {
    this.loadUsers()
  },
   methods: {
      nuevopaciente(){
        this.newPatient = true;
      },
      cerrarModal() {
        this.newPatient = false;
      },
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
         }, 
         async registraPacientes () {
             const valid = this.pacRegistro = this.$refs.pacRegistro.validate()
             if (valid) {
                 if (this.pacRegistro) {
                     //Registramos usuario
                     const sendData = {
                         name: this.name,
                         lastname: this.lastname, 
                         email: this.email, 
                         phone: this.phone, 
                         birthday: this.birthday, 
                         age: this.age, 
                         gender: this.gender, 
                         address: this.address,
                         treatment: this.treatment, 
                         blood: this.blood
                     }
                     const rawResponse = await fetch('http://localhost:5000/new-patient',{
                         method: 'POST', 
                         headers: {
                             'Accept': 'application/json', 
                             'Content-Type': 'application/json'
                         }, 
                         body: JSON.stringify(sendData)
                     })
                     const content = await rawResponse.json()
                     if (content.alert === 'success'){
                         this.name = '',
                         this.lastname= '', 
                         this.email='', 
                         this.phone='', 
                         this.birthday='', 
                         this.age='', 
                         this.gender='', 
                         this.address='',
                         this.treatment='', 
                         this.blood='',
                         this.newPatient = false,
                         this.loadUsers(),
                         this.$store.commit('setNewPatient', true)
                     } else if (content.alert === 'The patient already exists') {
                         //Crear alerta cuando existe. 
                     }
                     console.log('@@ response => ', content)
                 } else {
                     //Notificaciones de Error 
                 }
             }
         }
     }
 }
 </script>