import Note from "./note.js"
const style = getComputedStyle(document.body)
//style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormSelectColor = document.querySelector('#selectColor')
const noteFormRadioPinNoteNo = document.querySelector('#radioPinNoteNo')
const noteFormSubmitBtn = document.querySelector('#submitBtn')

const notes = document.querySelectorAll('.note')
const localNotes = localStorage.getItem('notes')
const parsedNotes = JSON.parse(localNotes)

const noteLightboxEdit = document.querySelector('#noteLightboxEdit')
const noteLightboxClose = document.querySelector('#noteIconClose')
const noteLightboxTitle = document.querySelector('#noteLightboxTitle')
const noteLightboxContent = document.querySelector('#noteLightboxContent')


newNoteBtn.addEventListener('click', () => {
    noteForm.classList.add('active')
})

noteFormSelectColor.addEventListener('change', () => {
    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
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
        noteFormTitle.value = ''
        noteFormContent.value = ''
        noteFormSelectColor.value = 'Magenta'
        noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
        noteFormRadioPinNoteNo.checked = true
    } else {
        alert('fill the gaps!')
        throw new Error('Fill the gaps!')
    }
})


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
            <p id="noteDate">${note.creationDate.slice(0,10)}</p>
        `

        newLocalNote.addEventListener('click', (clickedNote) => {
            if(clickedNote.target.id === 'noteIconPin')
                console.log('pin')
            else if(clickedNote.target.id === 'noteIconEdit')
                console.log('edit')
            else if(clickedNote.target.id === 'noteIconThrash')
                console.log('thrash')
            else{
                noteLightbox.classList.add('active')
                const tmp = parsedNotes.find(e => e.creationDate === clickedNote.target.id.slice(4))
                noteLightboxTitle.value = tmp.title
                noteLightboxContent.value = tmp.content
                console.log(tmp)
                noteLightboxEdit.style.color = `var(--${tmp.color})`
                noteLightbox.style.border = `2px solid var(--${tmp.color})`
                noteLightbox.style.boxShadow = `0 0 7px var(--${tmp.color}),
                                                0 0 10px var(--${tmp.color}),
                                                0 0 25px var(--${tmp.color})`
            }
        })
        mainNotes.appendChild(newLocalNote)
    })
}

noteLightboxClose.addEventListener('click', () => {
    noteLightbox.classList.remove('active')
})