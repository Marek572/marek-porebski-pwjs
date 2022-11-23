export default function localStorageToParsedNotes(){
    const localNotes = localStorage.getItem('notes')
        if (localNotes === null) {
            localStorage.setItem('notes', JSON.stringify([]))
            return
        }
        const parsedNotes = JSON.parse(localNotes)

        return parsedNotes
}

// addNoteToLocalStorage() {
//     const parsedNotes = localStorageToParsedNotes()
//     parsedNotes.push(this)
//     localStorage.setItem('notes', JSON.stringify(parsedNotes))
// }