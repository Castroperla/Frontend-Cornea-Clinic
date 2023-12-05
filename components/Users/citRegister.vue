<template >
    <div class="contenedor" style="margin:20px" >
                <v-row >
                    <v-col cols="12" style="text-align: center;">
                        <p class="formTit">Add new appointment</p>
                    </v-col>
                </v-row>
            <v-form ref="frmRegistro" v-model="frmRegistro">
                <v-row align="center" >
                    <v-col>
                        <p>Email: </p>
                        <input type="email" class="cajas" v-model="email" :rules="[reglas.requerido]">
                    </v-col>
                    <v-col>
                        <p> Date </p>
                        <input type="date" class="cajasB" v-model="date">
                    </v-col>
                </v-row>
                <v-row align="center" >
                    <v-col>
                        <p>Time: </p>
                        <input type="time" class="cajasP" v-model="time">
                    </v-col>
                     <v-col>
                    <p>Type of Appointment: </p>
                    <v-radio-group v-model="typeofreservation">
                    <v-radio label="Checkup" value="Checkup"></v-radio>
                    <v-radio label="Surgery" value="Surgery"></v-radio>
                    </v-radio-group>
                     </v-col>
                </v-row>
                <v-row>
                    <v-btn id="btnAppointment"  @click="registraCita"> 
                        <p >Add appointment</p>
                    </v-btn>
                </v-row>
            </v-form>
    </div>
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
#btnAppointments {
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
</style>


<script>
export default {
    data() {
        return{
            frmRegistro: false, 
            name: '',
            email: '', 
            phone:'', 
            age: '', 
            gender: '', 
            date: '', 
            time: '', 
            typeofreservation: '',
            reglas: {
                requerido: value => !!value || 'Campo Requerido'
            }

        }
    }, 
    methods: {
        async registraCita () {
            this.frmRegistro = this.$refs.frmRegistro.validate()

            if (this.frmRegistro) {
                //Registramos cita
                const sendData = {
                    name: this.name,
                    email: this.email, 
                    phone: this.phone, 
                    age: this.age, 
                    gender: this.gender, 
                    date: this.date,
                    time: this.time, 
                    typeofreservation: this.typeofreservation
                }

                const rawResponse = await fetch('http://localhost:5000/new-appointment',{
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
                    this.email='', 
                    this.phone='',
                    this.age='', 
                    this.gender='', 
                    this.date='',
                    this.time='', 
                    this.typeofreservation='',
                    this.$store.commit('setNewAppointment', true)
                } else if (content.alert === 'The appointment already exists') {
                    //Crear alerta cuando existe. 
                }
                console.log('@@ response => ', content)
            } else {
                //No tificaciones de Error 
            }
        }
    }
}
</script>

