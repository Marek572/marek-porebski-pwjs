import Note from "./note.js"
const style = getComputedStyle(document.body)
//style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const selectColor = document.querySelector('#selectColor')
const submitBtn = document.querySelector('#submitBtn')

const notes = document.querySelectorAll('.note')
const noteLightboxClose = document.querySelector('#noteIconClose')


newNoteBtn.addEventListener('click', () => {
    noteForm.classList.add('active')
})

selectColor.addEventListener('change', () => {
    selectColor.style.border = `2px solid var(--${selectColor.value})`
})

notes.forEach(note => {
    if (note.id !== 'newNoteBtn') {
        note.addEventListener('click', () => {
            noteLightbox.classList.add('active')
        })
    }
})

noteLightboxClose.addEventListener('click', () => {
    noteLightbox.classList.remove('active')
})

const createNote = () => {

    const title = document.querySelector('#inputTitle').value
    const content = document.querySelector('#inputContent').value
    const color = document.querySelector('#selectColor').value
    const pinNote = document.querySelector('input[name="pin"]:checked').value

    const newNote = new Note({
        title,
        content,
        color,
        pinNote
    })

    newNote.addNoteToLocalStorage()
    mainNotes.appendChild(newNote.addNoteToMain())
}
submitBtn.addEventListener('click', () => {
    createNote()
    noteForm.classList.remove('active') //if all required inputs filled
})