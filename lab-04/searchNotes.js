//case sensitive!

export default function searchBar(parsedNotes) {
    const searchNotesInput = document.querySelector('#searchNotes')

    searchNotesInput.addEventListener('input', () => {
        const notesInMain = document.querySelectorAll('.note')
        if (searchNotesInput.value.length < 1) {
            notesInMain.forEach((note) => {
                note.style.display = 'flex'
            })
        }
        if (searchNotesInput.value.length >= 1) {
            notesInMain.forEach((note) => {
                note.style.display = 'none'
            })
            parsedNotes.forEach((note) => {
                const ifStatement = note.title.includes(searchNotesInput.value) ||
                    (note.content && note.content.includes(searchNotesInput.value)) ||
                    (note.bulletList && note.bulletList.some(listItem => listItem.value.includes(searchNotesInput.value))) ||
                    note.tags.some(e => e.includes(searchNotesInput.value)) ||
                    note.color.includes(searchNotesInput.value)
                if (ifStatement) {
                    const searchedNote = document.querySelector(`#note${note.creationDate}`)
                    searchedNote.style.display = 'flex'
                }
            })
        }
    })
}