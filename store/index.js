export const state = () => ({
    newPatient: false,
    newAppointment: false
})

export const mutations = {
    setNewPatient(state, newPatient) {
        state.newPatient = newPatient
    },
    setNewAppointment(state, newAppointment) {
        state.newAppointment = newAppointment
    }
}

