

const updateNotes = (data, note) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == note.id) {
            data[i] = note
            return data
        }
    }
}

export default updateNotes

