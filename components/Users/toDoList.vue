<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <!--CALENDAR AND TO-DO LIST-->
          <v-col cols="7">
              <div>
                <v-calendar v-model="selectedDate" color="#4FB783">
                </v-calendar>
              </div>
              <br>
              <br>
              <div>
                <v-row align="center">
                  <h4 class="text-h5 text-center pb-3 px-5">Pending Tasks</h4>
                </v-row>
                <v-row v-if="tasksSent.length > 0">
                  <ul>
                    <li v-for="(sentTask, index) in tasksSent" :key="index" :class="{ 'task-past': isTaskPast(sentTask), 'task-active': sentTask.active }" style="margin-bottom:10px; padding: 8px; border-radius: 5px;">
                      <span>{{ sentTask.text }}</span> - <span>{{ sentTask.dateStart }} - {{ sentTask.dateEnd }}</span>
                    </li>
                  </ul>
                </v-row>
              </div>
          </v-col>
          <!--TODOLIST-->
          <v-col cols="5" style="height: 670px;">
            <v-card elevation="2" class="pa-2">
              <v-row>
                <h3 class="text-h3 text-center"  style="color: #4FB783!important; margin: 10px; text-align: center!important;"> ToDo List </h3>
              </v-row>
              <v-row>
                <ul class="task-list px-4">
                  <li v-for="(task, index) in tasks" :key="index" :class="{ 'task-past': isTaskPast(task) }" style="margin-bottom: 10px;">
                    <!--<input type="checkbox" :checked="task.completed" @change="toggleTask(index)">-->
                    <span :style="{ textDecoration: isTaskPast(task) ? 'line-through' : 'none' }" style="height: auto;">
                      {{ task.text }}
                    </span>

                    <v-btn icon @click="removeTask(index)">
                      <v-icon class="custom-icon" color="success">mdi mdi-trash-can-outline</v-icon>
                    </v-btn>
                    <v-divider v-if="index !== tasks.length - 1"></v-divider>
                  </li>
                </ul>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>

    <!--MODAL REGISTER TASKS-->
    <v-dialog v-model="modal" max-width="500px">
        <v-card>
          <v-card-title style="text-align: center; justify-content: center;">Welcome to the task log
            <v-icon  @click="modal = false" style="margin-left: 70px; color: rgb(123, 123, 123); background-color: transparent!important;">mdi-close</v-icon>
          </v-card-title>
          <v-card-text style="text-align: center; justify-content: center;">
            <!--MOSTRAR FECHA SELECCIONADA-->
            <div v-if="selectedDate">
              <p style="color:black;">The date selected to record your tasks is:  {{ selectedDate }} </p>
              <p></p>
            </div>
            <br>
            <!--Input for writing the task-->
            <input v-model="newTask.text" @keyup.enter="addTask" placeholder="Add a task" style="width: 400px;">
            <br>
            <br>
            <v-row  style="text-align: center!important; justify-content: center!important;">
              
              <v-col cols="11">
                <!--Registrar hora de comienzo de la tarea -->
                <!--Record task start time -->
                <v-menu ref="menu" v-model="timePicker" :close-on-content-click="false" :nudge-right="40" :return-value.sync="selectedTime" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="selectedTime" label="Select Start Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="timePicker" v-model="selectedTime" full-width @click:minute="$refs.menu.save(selectedTime)" @click:second="$refs.menu.save(selectedTime)"></v-time-picker>
                </v-menu>
                <br>
                <!--Registrar hora de cierre de la tarea -->
                <!--Record task closing time -->
                <v-menu ref="menuEnd" v-model="timePickerEnd" :close-on-content-click="false" :nudge-right="40" :return-value.sync="selectedTimeEnd" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="selectedTimeEnd" label="Select end time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="timePickerEnd" v-model="selectedTimeEnd" full-width @click:minute="$refs.menuEnd.save(selectedTimeEnd)" @click:second="$refs.menuEnd.save(selectedTimeEnd)"></v-time-picker>
                </v-menu>
                <v-btn @click="addTask" style="width: 400px; background-color: #4FB783; color: white;">Agregar Tarea</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
  </v-container>
</template>


<script>
  export default {
      layout: 'dashboard',
      data() {
        return {
            selectedDate: null,
            selectedTime: null,
            selectedTimeEnd: null,
            modal: false,
            tasks: [],
            newTask: { text: '' },
            tasksSent: [],
            timePicker: false,  
            timePickerEnd: false,
        }
      },
      watch: {
      selectedDate(newVal) {
          if (newVal) {
          this.modal = true
          }
        }
      },
      mounted(){
        const  savedTasks = localStorage.getItem('tasksSent')
        if(savedTasks) {
          this.tasksSent = JSON.parse(savedTasks)
          this.tasks = this.tasksSent
        }
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
        this.handleVisibilityChange()
      },
      destroyed(){
        document.removeEventListener('visibilitychange', this.handleVisibilityChange)
      },
      methods: {
        handleVisibilityChange() {
          if (document.visibilityState === 'visible') {
            this.checkTasksDateTime()
          }
        },
        addTask() {
          if (
              this.newTask.text.trim() !== '' && 
              this.selectedDate !== null && 
              this.selectedTime !== null && 
              this.selectedTimeEnd !== null
            ) {
                const currentDate = new Date(this.selectedDate).toISOString().split('T')[0]
                const dateTimeStart = `${currentDate} ${this.selectedTime}`
                const dateTimeEnd = `${currentDate} ${this.selectedTimeEnd}`
    
                this.tasksSent.push({ text: this.newTask.text.trim(), dateStart: dateTimeStart, dateEnd: dateTimeEnd })
                this.newTask.text = ''

                this.tasksSent.sort((a, b) => {
                  return new Date(a.dateStart) - new Date(b.dateStart)
                })
                this.tasks = this.tasksSent
              }
              localStorage.setItem('tasksSent', JSON.stringify(this.tasksSent))
          },
        removeTask(index) {
          this.tasksSent.splice(index, 1)
          localStorage.setItem('tasksSent', JSON.stringify(this.tasksSent));
        },
        toggleTask(index) {
            this.tasks[index].completed = !this.tasks[index].completed
        },
        isTaskPast(task) {
          if (task.dateEnd) {
            const taskEndDateTime = new Date(task.dateEnd).getTime()
            const currentDateTime = new Date().getTime()
            console.log('Fecha de finalización de la tarea:', new Date(task.dateEnd))
            console.log('Fecha y hora actual:', new Date(currentDateTime))
            console.log('¿La tarea está pasada?', taskEndDateTime < currentDateTime)
            return taskEndDateTime < currentDateTime
          }
          return false
        },
        checkTasksDateTime() {
          const currentDateTime = new Date().getTime()
          this.tasksSent.forEach((task, index) => {
            if (task.dateStart && task.dateEnd) {
              const taskStartDateTime = new Date(task.dateStart).getTime()
              const taskEndDateTime = new Date(task.dateEnd).getTime()
              
              if (taskStartDateTime <= currentDateTime && taskEndDateTime >= currentDateTime) {
                this.$set(this.tasksSent, index, { ...task, active: true })
              } else {
                this.$set(this.tasksSent, index, { ...task, active: false })
              }
            }
          })
        },
      }
  };
</script>


<style>
.completed {
  background-color: #EDF8F3;
  color: darkgrey;
}
.task-list {
  list-style-type: none;
  padding-left: 0;
}
.custom-icon {
  color: #4FB783 !important;
}
.v-calendar .v-date-picker-table--active .v-date-picker-table__date--active {
  background-color: #EDF8F3 !important;
}
.task-past {
  text-decoration: line-through;
  color: darkgrey;
}
.task-active {
  background-color: #4FB783;
  color: white;
}
</style>

