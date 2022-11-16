import Note from "./note.js"
// const style = getComputedStyle(document.body)
// //style.getPropertyValue('--yellow')

const mainNotes = document.querySelector('#notes')
let noteList

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteForm = document.querySelector('#noteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormTagList = document.querySelector('#tagList')
const noteFormInputTag = document.querySelector('#inputTag')
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
    const tags = noteFormTags

    const newNote = new Note({
        title,
        content,
        tags,
        color
    })

    newNote.addNoteToLocalStorage()
    const tmp = newNote.addNoteToMain()
    mainNotes.appendChild(tmp)
    noteList = null
    noteList += tmp
}


//TODO: move to tags.js
let noteFormTags = []
const createTag = (label) => {
    const newTag = document.createElement('div')
    newTag.classList.add('tag')
    const newTagSpan = document.createElement('span')
    newTagSpan.innerHTML = label

    newTag.addEventListener('click', () => {
        noteFormTags.splice(noteFormTags.indexOf(label),1)
        newTag.remove()
    })

    newTag.appendChild(newTagSpan)

    return newTag
}

const resetTags = () => {
    document.querySelectorAll('.tag').forEach( (tag) => {
        tag.parentElement.removeChild(tag)
    })
}

const generateTags = () => {
    resetTags()
    noteFormTags.forEach( (tag) => {
        const newTag = createTag(tag)
        noteFormTagList.insertBefore(newTag, noteFormInputTag)
    })
}


noteFormInputTag.addEventListener('keyup', (e) => {
    //TODO: sprawdzanie czy tag nie jest pusty
    if(noteFormInputTag.value === ' ')
        return noteFormInputTag.value = ''
    else if(e.key === 'Enter') {
        noteFormTags.push(noteFormInputTag.value)
        generateTags()
        noteFormInputTag.value = ''
    }
})

noteFormSubmitBtn.addEventListener('click', () => {

    if (noteFormTitle.value && noteFormContent.value) {
        createNote()
        noteForm.classList.toggle('active')
        noteFormTitle.value = ''
        noteFormContent.value = ''
        noteFormTags = []
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
            tags: note.tags,
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

