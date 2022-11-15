import Note from "./note.js"
// const style = getComputedStyle(document.body)
// //style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormSelectColor = document.querySelector('#selectColor')
const noteFormCancelBtn = document.querySelector('#cancelBtn')
const noteFormSubmitBtn = document.querySelector('#submitBtn')

const localNotes = localStorage.getItem('notes')
const parsedNotes = JSON.parse(localNotes)

const noteLightboxButtons = document.querySelector('#noteLightboxButtons')
const noteLightboxPin = document.querySelector('#noteLightboxPin')
const noteLightboxEdit = document.querySelector('#noteLightboxEdit')
const noteLightboxThrash = document.querySelector('#noteLightboxThrash')
const noteLightboxClose = document.querySelector('#noteLightboxClose')
const noteLightboxTitle = document.querySelector('#noteLightboxTitle')
const noteLightboxContent = document.querySelector('#noteLightboxContent')


newNoteBtn.addEventListener('click', () => {
    noteForm.classList.add('active')
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
    mainNotes.appendChild(newNote.addNoteToMain())
}
noteFormSubmitBtn.addEventListener('click', () => {

    if (noteFormTitle.value && noteFormContent.value) {
        createNote()
        noteForm.classList.remove('active')
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
    noteForm.classList.remove('active')
    mainNotes.style.display = 'flex'
})


// const updateMainNotes = () => {

// }

let noteLightboxObject
let noteLightboxObjectIndex = parsedNotes.indexOf(noteLightboxObject)
let noteLightboxTarget
if (parsedNotes) {
    parsedNotes.forEach((note) => {

        const newLocalNote = document.createElement('div')
        newLocalNote.id = `note${note.creationDate}`
        newLocalNote.classList.add('note')
        const newLocalNoteColor = note.color
        if (newLocalNoteColor !== 'Magenta')
            newLocalNote.classList.add(`noteColor${newLocalNoteColor}`)

        newLocalNote.innerHTML = `
            <p id="noteTitle">${note.title}</p>
            <p id="noteDate">${note.creationDate.slice(0, 10)}</p>
        `

        newLocalNote.addEventListener('click', (clickedNote) => {
            noteLightbox.classList.add('active')
            noteLightboxObject = parsedNotes.find(e => e.creationDate === clickedNote.target.id.slice(4))
            noteLightboxTarget = clickedNote.target
            noteLightboxTitle.value = noteLightboxObject.title
            noteLightboxContent.value = noteLightboxObject.content
            console.log(noteLightboxObject)
            noteLightboxButtons.style.color = `var(--${noteLightboxObject.color})`
            noteLightbox.style.border = `2px solid var(--${noteLightboxObject.color})`
            noteLightbox.style.boxShadow = `0 0 7px var(--${noteLightboxObject.color}),
                                                0 0 10px var(--${noteLightboxObject.color}),
                                                0 0 25px var(--${noteLightboxObject.color})`
        })
        mainNotes.appendChild(newLocalNote)
    })

    noteLightboxPin.addEventListener('click', () => {
        console.log('click')
        parsedNotes.splice(noteLightboxObjectIndex, 1)
        parsedNotes.splice(0, 0, noteLightboxObject)
        localStorage.setItem('notes', JSON.stringify(parsedNotes))
        //updateMainNotes
        noteLightbox.classList.remove('active')
        noteLightboxTarget.remove()
    })
    noteLightboxThrash.addEventListener('click', () => {
        parsedNotes.splice(noteLightboxObjectIndex, 1)
        localStorage.setItem('notes', JSON.stringify(parsedNotes))
        //updateMainNotes
        noteLightbox.classList.remove('active')
        noteLightboxTarget.remove()
    })
    noteLightboxClose.addEventListener('click', () => {
        noteLightbox.classList.remove('active')
    })
}