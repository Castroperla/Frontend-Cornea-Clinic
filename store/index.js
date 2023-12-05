export const state = () => ({
    newPatient: false,
    newCita: false
})

export const mutations = {
    setNewPatient(state, newPatient) {
        state.newPatient = newPatient
    },
    setNewCita(state, newCita) {
        state.newCita = newCita
    }
}

