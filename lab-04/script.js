import Note from "./note.js"
const style = getComputedStyle(document.body)
//style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormSelectColor = document.querySelector('#selectColor')
const noteFormSubmitBtn = document.querySelector('#submitBtn')

const notes = document.querySelectorAll('.note')
const localNotes = localStorage.getItem('notes')
const parsedNotes = JSON.parse(localNotes)

const noteLightboxClose = document.querySelector('#noteIconClose')


newNoteBtn.addEventListener('click', () => {
    noteForm.classList.add('active')
})

noteFormSelectColor.addEventListener('change', () => {
    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
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
noteFormSubmitBtn.addEventListener('click', () => {

    if (noteFormTitle.value && noteFormContent.value) {
        createNote()
        noteForm.classList.remove('active')
    } else {
        alert('fill the gaps!')
        throw new Error('Fill the gaps!')
    }
})

parsedNotes.forEach((note) => {

    const newLocalNote = document.createElement('div')
    newLocalNote.classList.add('note')
    const newLocalNoteColor = note.color
    console.log(newLocalNoteColor)
    if (newLocalNoteColor !== 'Magenta')
        newLocalNote.classList.add(`noteColor${newLocalNoteColor}`)
    newLocalNote.innerHTML = `
        <div id="noteEdit">
            <i id="noteIconPin" class="fa-regular fa-thumbtack noteIcon"></i>
            <i id="noteIconEdit" class="fa-regular fa-pen-to-square noteIcon"></i>
            <i id="noteIconThrash" class="fa-regular fa-trash-can noteIcon"></i>
        </div>
        <p id="noteTitle">${note.title}</p>
        <p id="noteDate">${note.creationDate.toLocaleString()}</p>
        `

    newLocalNote.addEventListener('click', () => {
        noteLightbox.classList.add('active')
    })

    mainNotes.appendChild(newLocalNote)

    console.log(note)
})