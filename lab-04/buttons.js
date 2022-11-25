import {localStorageToParsedNotes} from "./storage.js"
let parsedNotes = localStorageToParsedNotes()

import { noteEditTags, generateTags } from "./tags.js"

const noteFormContent = document.querySelector('#inputContent')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteEdit = document.querySelector('.noteEdit')
const noteEditTitle = document.querySelector('#editTitle')
const noteEditContent = document.querySelector('#editContent')
const noteEditTagList = document.querySelector('#editNoteTagList')
const noteEditInputTag = document.querySelector('#editNoteInputTag')
const noteEditSelectColor = document.querySelector('#editColor')

const noteFormNoteTypeNoteBtn = document.querySelector('#newNoteTypeNoteBtn')
const noteFormTypeBulletListBtn = document.querySelector('#newNoteTypeBulletListBtn')
const noteFormContentContainer = document.querySelector('#newNoteContent')
const noteFormBulletListContainer = document.querySelector('#newNoteBulletList')

export const addEventNewNoteBtn = () => {
    newNoteBtn.addEventListener('click', () => {
        newNoteForm.classList.toggle('active')
        mainContent.style.display = 'none'
    })
}

export const addEventsLightboxBtns = () => {
    let noteLightbox = document.querySelector('.noteLightbox')
    const noteLightboxPin = document.querySelector('#noteLightboxPin')
    const noteLightboxEdit = document.querySelector('#noteLightboxEdit')
    const noteLightboxThrash = document.querySelector('#noteLightboxThrash')
    const noteLightboxClose = document.querySelector('#noteLightboxClose')

    noteLightboxPin.addEventListener('click', () => {
        parsedNotes = localStorageToParsedNotes()
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
        mainContent.style.display = 'flex'
    })
    noteLightboxEdit.addEventListener('click', () => {
        parsedNotes = localStorageToParsedNotes()
        noteLightbox.classList.toggle('active')
        noteEdit.classList.toggle('active')
        const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
        console.log(parsedNotes.find(e => e.creationDate == noteLightbox.id))
        console.log(noteLightboxObject.creationDate)
        noteEdit.id = noteLightboxObject.creationDate
        noteEditTitle.value = noteLightboxObject.title
        noteEditContent.value = noteLightboxObject.content
        generateTags(noteLightboxObject.tags, noteEditTagList, noteEditInputTag)
        noteLightboxObject.tags.forEach((tag) => noteEditTags.push(tag))
        noteEditSelectColor.value = noteLightboxObject.color
        noteEditSelectColor.style.border = `2px solid var(--${noteEditSelectColor.value})`
    })
    noteEditSelectColor.addEventListener('change', () => {
        noteEditSelectColor.style.border = `2px solid var(--${noteEditSelectColor.value})`
    })
    noteLightboxThrash.addEventListener('click', () => {
        parsedNotes = localStorageToParsedNotes()
        const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
        const noteLightboxObjectIndex = parsedNotes.indexOf(noteLightboxObject)
        parsedNotes.splice(noteLightboxObjectIndex, 1)
        localStorage.setItem('notes', JSON.stringify(parsedNotes))
        noteLightbox = document.querySelector('.noteLightbox')
        const currentNote = document.querySelector(`#note${noteLightbox.id}`)
        currentNote.remove()
        noteLightbox.classList.toggle('active')
        mainContent.style.display = 'flex'
    })
    noteLightboxClose.addEventListener('click', () => {
        noteLightbox.classList.toggle('active')
        mainContent.style.display = 'flex'
    })
}

export const switchNoteTypeBtns = () => {
    noteFormTypeBulletListBtn.addEventListener('click', () => {
        noteFormTypeBulletListBtn.style.display = 'none'
        noteFormContent.value = ''
        noteFormContentContainer.style.display = 'none'
        noteFormNoteTypeNoteBtn.style.display = 'flex'
        noteFormBulletListContainer.style.display = 'flex'
        console.log('bulletList '+noteFormTypeBulletListBtn.style.display)
        console.log('note '+noteFormNoteTypeNoteBtn.style.display)
    })

    noteFormNoteTypeNoteBtn.addEventListener('click', () => {
        noteFormNoteTypeNoteBtn.style.display = 'none'
        const noteFormBulletListItems = document.querySelector('#newNoteBulletListItems')
        const allBulletItems = noteFormBulletListItems.querySelectorAll('.bulletItem')
        allBulletItems.forEach((bulletItem) => {
            bulletItem.remove()
        })
        noteFormBulletListContainer.style.display = 'none'
        noteFormTypeBulletListBtn.style.display = 'flex'
        noteFormContentContainer.style.display = 'flex'
        console.log('bulletList '+noteFormTypeBulletListBtn.style.display)
        console.log('note '+noteFormNoteTypeNoteBtn.style.display)
    })
}

export default {addEventNewNoteBtn, addEventsLightboxBtns, switchNoteTypeBtns}