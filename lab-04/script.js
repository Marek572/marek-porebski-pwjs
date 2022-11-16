import Note from "./note.js"
// const style = getComputedStyle(document.body)
// //style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')
let noteList

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormSelectColor = document.querySelector('#selectColor')
const noteFormCancelBtn = document.querySelector('#cancelBtn')
const noteFormSubmitBtn = document.querySelector('#submitBtn')

const localNotes = localStorage.getItem('notes')
const parsedNotes = JSON.parse(localNotes)

let noteLightbox = document.querySelector('.noteLightbox')
const noteLightboxPin = document.querySelector('#noteLightboxPin')
const noteLightboxEdit = document.querySelector('#noteLightboxEdit')
const noteLightboxThrash = document.querySelector('#noteLightboxThrash')
const noteLightboxClose = document.querySelector('#noteLightboxClose')

newNoteBtn.addEventListener('click', () => {
    noteForm.classList.toggle('active')
    mainNotes.style.display = 'none'
})

noteFormSelectColor.addEventListener('change', () => {
    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
})

const createNote = () => {

    const title = document.querySelector('#inputTitle').value
    const content = document.querySelector('#inputContent').value
    const color = document.querySelector('#selectColor').value

    const newNote = new Note({
        title,
        content,
        color
    })

    newNote.addNoteToLocalStorage()
    const tmp = newNote.addNoteToMain()
    mainNotes.appendChild(tmp)
    noteList = null
    noteList += tmp
}

noteFormSubmitBtn.addEventListener('click', () => {

    if (noteFormTitle.value && noteFormContent.value) {
        createNote()
        noteForm.classList.toggle('active')
        noteFormTitle.value = ''
        noteFormContent.value = ''
        noteFormSelectColor.value = 'Magenta'
        noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
        mainNotes.style.display = 'flex'
    } else {
        alert('fill the gaps!')
        throw new Error('Fill the gaps!')
    }
})

noteFormCancelBtn.addEventListener('click', () => {
    noteForm.classList.toggle('active')
    noteFormTitle.value = ''
    noteFormContent.value = ''
    noteFormSelectColor.value = 'Magenta'
    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    mainNotes.style.display = 'flex'
})


if (parsedNotes) {
    parsedNotes.forEach((note) => {

        const tmp = new Note({
            title: note.title,
            content: note.content,
            color: note.color,
            creationDate: note.creationDate
        })

        mainNotes.appendChild(tmp.addNoteToMain())
    })
    noteList = document.querySelectorAll('.note')
}

//function?
noteLightboxPin.addEventListener('click', () => {
    const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
    const noteLightboxObjectIndex = parsedNotes.indexOf(noteLightboxObject)
    parsedNotes.splice(noteLightboxObjectIndex, 1)
    parsedNotes.splice(0, 0, noteLightboxObject)
    localStorage.setItem('notes', JSON.stringify(parsedNotes))
    noteLightbox = document.querySelector('.noteLightbox')
    const currentNote = document.querySelector(`#note${noteLightbox.id}`)
    const cloneCurrentNote = currentNote
    currentNote.remove()
    newNoteBtn.after(cloneCurrentNote)
    noteLightbox.classList.toggle('active')
    mainNotes.style.display = 'flex'
})
noteLightboxEdit.addEventListener('click', () => {
    
})
noteLightboxThrash.addEventListener('click', () => {
    const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
    const noteLightboxObjectIndex = parsedNotes.indexOf(noteLightboxObject)
    parsedNotes.splice(noteLightboxObjectIndex, 1)
    localStorage.setItem('notes', JSON.stringify(parsedNotes))
    noteLightbox = document.querySelector('.noteLightbox')
    const currentNote = document.querySelector(`#note${noteLightbox.id}`)
    currentNote.remove()
    noteLightbox.classList.toggle('active')
    mainNotes.style.display = 'flex'
})
noteLightboxClose.addEventListener('click', () => {
    noteLightbox.classList.toggle('active')
    mainNotes.style.display = 'flex'
})