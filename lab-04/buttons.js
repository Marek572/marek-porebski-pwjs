import { localStorageToParsedNotes } from "./storage.js"
let parsedNotes = localStorageToParsedNotes()

import { BulletListItem, noteEditBulletListArray, clearBulletListArray, clearBulletList } from "./bulletListItem.js"
import { noteEditTags, generateTags } from "./tags.js"

const noteFormContent = document.querySelector('#inputContent')

const newNoteBtn = document.querySelector('#newNoteBtn')
const noteEdit = document.querySelector('.noteEdit')
const noteEditTitle = document.querySelector('#editTitle')
const noteEditContentContainer = document.querySelector('#editNoteContent')
const noteEditContent = document.querySelector('#editContent')
const noteEditBulletList = document.querySelector('#editNoteBulletList')
const noteEditBulletListItems = document.querySelector('#editNoteBulletListItems')
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


//FIXME: refactor
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
        noteEdit.id = noteLightboxObject.creationDate
        noteEditTitle.value = noteLightboxObject.title
        if (noteLightboxObject.content)
            noteEditContent.value = noteLightboxObject.content
        if (noteLightboxObject.bulletList) {
            noteEditContentContainer.style.display = 'none'
            noteEditBulletList.style.display = 'flex'
            clearBulletListArray(noteEditBulletListItems)
            clearBulletList(noteEditBulletListItems)
            noteLightboxObject.bulletList.forEach((bulletItem) => {
                const newBulletItem = new BulletListItem({
                    checkbox: bulletItem.checkbox,
                    value: bulletItem.value
                })
                newBulletItem.addBulletItemToArray(noteEditBulletListArray)
                newBulletItem.addBulletItemToList(noteEditBulletListItems)
            })
        }
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

    // submitBtns.forEach((submitBtn) => {
    //     submitBtn.addEventListener('click', (e) => {
    //         if (e.target === noteFormSubmitBtn) {
    //             if (noteFormNoteTypeNoteBtn.style.display !== 'flex') {
    //                 if (noteFormTitle.value && noteFormContent.value) {
    //                     createNote()
    //                     clearTags(noteFormTagList)
    //                     newNoteForm.classList.toggle('active')
    //                     noteFormNoteTypeNoteBtn.click()
    //                     noteFormTitle.value = ''
    //                     noteFormContent.value = ''
    //                     noteFormSelectColor.value = 'Magenta'
    //                     noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //                     mainContent.style.display = 'flex'
    //                     return
    //                 } else {
    //                     alert('fill the gaps!')
    //                     throw new Error('Fill the gaps!')
    //                 }
    //             }
    //             if (noteFormTypeBulletListBtn.style.display !== 'flex') {
    //                 if (noteFormTitle.value && noteFormBulletList.length > 0) {
    //                     createBulletList()
    //                     clearTags(noteFormTagList)
    //                     newNoteForm.classList.toggle('active')
    //                     noteFormNoteTypeNoteBtn.click()
    //                     noteFormTitle.value = ''
    //                     clearBulletList(noteFormBulletListItems)
    //                     clearBulletListArray(noteFormBulletListItems)
    //                     noteFormSelectColor.value = 'Magenta'
    //                     noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //                     mainContent.style.display = 'flex'
    //                     return
    //                 } else {
    //                     alert('fill the gaps!')
    //                     throw new Error('Fill the gaps!')
    //                 }
    //             }
    //         }
    //         if (e.target === noteEditSaveBtn) {
    //             if (noteEditBulletList.style.display !== 'flex') {
    //                 if (noteEditTitle.value && noteEditContent.value) {
    //                     editNote(noteEdit.id)
    //                     clearTags(noteEditTagList)
    //                     noteEdit.classList.toggle('active')
    //                     noteEditTitle.value = ''
    //                     noteEditContent.value = ''
    //                     noteEditSelectColor.value = 'Magenta'
    //                     noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //                     mainContent.style.display = 'flex'
    //                 } else {
    //                     alert('fill the gaps!')
    //                     throw new Error('Fill the gaps!')
    //                 }
    //             }
    //             if (noteEditContentContainer.style.display !== 'flex') {
    //                 if (noteEditTitle.value && noteEditBulletListArray.length > 0) {
    //                     editBulletList(noteEdit.id)
    //                     clearTags(noteEditTagList)
    //                     noteEdit.classList.toggle('active')
    //                     noteEditTitle.value = ''
    //                     clearBulletList(noteEditBulletListItems)
    //                     noteEditSelectColor.value = 'Magenta'
    //                     noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //                     mainContent.style.display = 'flex'
    //                 } else {
    //                     alert('fill the gaps!')
    //                     throw new Error('Fill the gaps!')
    //                 }
    //             }
    //         }
    //     })
    // })

    // cancelBtns.forEach((cancelBtn) => {
    //     cancelBtn.addEventListener('click', (e) => {
    //         if (e.target === noteFormCancelBtn) {
    //             noteFormNoteTypeNoteBtn.click()
    //             newNoteForm.classList.toggle('active')
    //             noteFormTitle.value = ''
    //             noteFormContent.value = ''
    //             clearBulletList(noteFormBulletListItems)
    //             clearBulletListArray(noteFormBulletListItems)
    //             clearTags(noteFormTagList)
    //             noteFormSelectColor.value = 'Magenta'
    //             noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //         }
    //         if (e.target === noteEditCancelBtn) {
    //             noteEdit.classList.toggle('active')
    //             noteEditTitle.value = ''
    //             noteEditContent.value = ''
    //             clearBulletList(noteEditBulletListItems)
    //             clearBulletListArray(noteEditBulletListItems)
    //             noteEditSelectColor.value = 'Magenta'
    //             noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
    //         }
    //         mainContent.style.display = 'flex'
    //     })
    // })
}

export const switchNoteTypeBtns = () => {
    noteFormTypeBulletListBtn.addEventListener('click', () => {
        noteFormTypeBulletListBtn.style.display = 'none'
        noteFormContent.value = ''
        noteFormContentContainer.style.display = 'none'
        noteFormNoteTypeNoteBtn.style.display = 'flex'
        noteFormBulletListContainer.style.display = 'flex'
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
    })
}

export default { addEventNewNoteBtn, addEventsLightboxBtns, switchNoteTypeBtns }