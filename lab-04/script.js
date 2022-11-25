import { localStorageToParsedNotes, generateMain } from "./storage.js"
let parsedNotes = localStorageToParsedNotes()

import Note from "./note.js"
import BulletList from "./bulletList.js"
import { BulletListItem, noteFormBulletList, clearBulletListArray} from "./bulletListItem.js"

import searchBar from "./searchNotes.js"
import { addEventNewNoteBtn, addEventsLightboxBtns, switchNoteTypeBtns } from "./buttons.js"
import { noteFormTags, noteEditTags, generateTags, clearTags } from "./tags.js"


const noteFormNoteTypeNoteBtn = document.querySelector('#newNoteTypeNoteBtn')
const noteFormTypeBulletListBtn = document.querySelector('#newNoteTypeBulletListBtn')
const mainContent = document.querySelector('#mainContent')
const mainNotes = document.querySelector('#notes')
const tagLists = document.querySelectorAll('.tagList')
const cancelBtns = document.querySelectorAll('.cancelBtn')
const submitBtns = document.querySelectorAll('.submitBtn')

const newNoteForm = document.querySelector('#newNoteForm')
const noteFormTitle = document.querySelector('#inputTitle')
const noteFormContent = document.querySelector('#inputContent')
const noteFormInputBulletItem = document.querySelector('#newNoteInputBulletItem')
const noteFormBulletListItems = document.querySelector('#newNoteBulletListItems')
const noteFormTagList = document.querySelector('#newNoteTagList')
const noteFormInputTag = document.querySelector('#newNoteInputTag')
const noteFormSelectColor = document.querySelector('#selectColor')
const noteFormCancelBtn = document.querySelector('#newNoteCancelBtn')
const noteFormSubmitBtn = document.querySelector('#newNoteSubmitBtn')

const noteEdit = document.querySelector('.noteEdit')
const noteEditTitle = document.querySelector('#editTitle')
const noteEditContent = document.querySelector('#editContent')
const noteEditTagList = document.querySelector('#editNoteTagList')
const noteEditInputTag = document.querySelector('#editNoteInputTag')
const noteEditSelectColor = document.querySelector('#editColor')
const noteEditCancelBtn = document.querySelector('#editNoteCancelBtn')
const noteEditSaveBtn = document.querySelector('#editSaveBtn')

generateMain(parsedNotes)
addEventNewNoteBtn()
searchBar(parsedNotes)
addEventsLightboxBtns()
switchNoteTypeBtns()


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
    parsedNotes = localStorageToParsedNotes()
    const tmp = newNote.addNoteToMain()
    mainNotes.appendChild(tmp)
    console.log(parsedNotes)
}

const createBulletList = () => {

    const title = document.querySelector('#inputTitle').value
    const bulletList = noteFormBulletList
    const color = document.querySelector('#selectColor').value
    const tags = noteFormTags

    const newBulletList = new BulletList({
        title,
        bulletList,
        tags,
        color
    })

    newBulletList.addNoteToLocalStorage()
    parsedNotes = localStorageToParsedNotes()
    const tmp = newBulletList.addNoteToMain()
    mainNotes.appendChild(tmp)
    console.log(newBulletList)
}

const editNote = (creationDate) => {
    const currentNote = parsedNotes.find(e => e.creationDate == creationDate)
    const currentNoteObj = document.querySelector(`#note${noteEdit.id}`)
    const currentNoteIndex = parsedNotes.indexOf(currentNote)

    const creationDateToDate = new Date(parseInt(creationDate)).getTime()

    const editTitle = document.querySelector('#editTitle').value
    const editContent = document.querySelector('#editContent').value
    const editTags = noteEditTags
    const editColor = document.querySelector('#editColor').value

    const updatedNote = new Note({
        title: editTitle,
        content: editContent,
        tags: editTags,
        color: editColor,
        creationDate: creationDateToDate,
    })

    updatedNote.updateNoteLocalStorage(currentNoteIndex)
    parsedNotes.splice(currentNoteIndex, 1, updatedNote)
    const tmp = updatedNote.addNoteToMain()
    mainNotes.insertBefore(tmp, currentNoteObj)
    currentNoteObj.remove()
}

noteFormInputBulletItem.addEventListener('change', () => {
    const inputValueTrim = noteFormInputBulletItem.value.trim()
    if (inputValueTrim === '') {
        noteFormInputBulletItem.value = ''
        throw new Error('empty tag!')
    }
    const newBulletItem = new BulletListItem({
        checkbox: false,
        value: inputValueTrim
    })
    noteFormInputBulletItem.value = ''
    newBulletItem.addBulletItemToArray()
    newBulletItem.addBulletItemToList(noteFormBulletListItems)
})


tagLists.forEach((tagList) => {
    tagList.addEventListener('change', () => {
        if (tagList.id === 'newNoteTagList') {
            const inputValueTrim = noteFormInputTag.value.trim()
            if (inputValueTrim === '') {
                noteFormInputTag.value = ''
                throw new Error('empty tag!')
            }
            if (noteFormTags.length === 3)
                throw new Error('max3 tags!')
            if (noteFormTags.length < 3) {
                if (noteFormTags.find(e => e === inputValueTrim))
                    throw new Error('tag already added')
                noteFormTags.push(inputValueTrim)
                noteFormTags.filter(tag => tag)
                generateTags(noteFormTags, noteFormTagList, noteFormInputTag)
                noteFormInputTag.value = ''
            }
        }

        if (tagList.id === 'editNoteTagList') {
            const editValueTrim = noteEditInputTag.value.trim()
            if (editValueTrim === '') {
                noteEditInputTag.value = ''
                throw new Error('empty tag!')
            }
            if (noteEditTags.length === 3)
                throw new Error('max3 tags!')
            if (noteEditTags.length < 3) {
                if (noteEditTags.find(e => e === noteEditInputTag.value))
                    throw new Error('tag already added')
                noteEditTags.push(noteEditInputTag.value)
                noteEditTags.filter(tag => tag)
                generateTags(noteEditTags, noteEditTagList, noteEditInputTag)
                noteEditInputTag.value = ''
            }
        }
    })
})

submitBtns.forEach((submitBtn) => {
    submitBtn.addEventListener('click', (e) => {
        if (e.target === noteFormSubmitBtn) {
            if (noteFormNoteTypeNoteBtn.style.display !== 'flex') {
                if (noteFormTitle.value && noteFormContent.value) {
                    createNote()
                    clearTags(noteFormTagList)
                    newNoteForm.classList.toggle('active')
                    noteFormNoteTypeNoteBtn.click()
                    noteFormTitle.value = ''
                    noteFormContent.value = ''
                    noteFormSelectColor.value = 'Magenta'
                    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
                    mainContent.style.display = 'flex'
                    return
                } else {
                    alert('fill the gaps!')
                    throw new Error('Fill the gaps!')
                }
            }
            if (noteFormTypeBulletListBtn.style.display !== 'flex') {
                if (noteFormTitle.value && noteFormBulletList.length>0) {
                    createBulletList()
                    clearTags(noteFormTagList)
                    newNoteForm.classList.toggle('active')
                    noteFormNoteTypeNoteBtn.click()
                    noteFormTitle.value = ''
                    const allBulletItems = noteFormBulletListItems.querySelectorAll('.bulletItem')
                    allBulletItems.forEach((bulletItem) => {
                        bulletItem.remove()
                    })
                    clearBulletListArray()
                    noteFormSelectColor.value = 'Magenta'
                    noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
                    mainContent.style.display = 'flex'
                    return
                } else {
                    alert('fill the gaps!')
                    throw new Error('Fill the gaps!')
                }
            }
        }
        if (e.target === noteEditSaveBtn) {
            if (noteEditTitle.value && noteEditContent.value) {
                editNote(noteEdit.id)
                clearTags(noteEditTagList)
                noteEdit.classList.toggle('active')
                noteEditTitle.value = ''
                noteEditContent.value = ''
                noteEditSelectColor.value = 'Magenta'
                noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
                mainContent.style.display = 'flex'
            } else {
                alert('fill the gaps!')
                throw new Error('Fill the gaps!')
            }
        }
    })
})

cancelBtns.forEach((cancelBtn) => {
    cancelBtn.addEventListener('click', (e) => {
        if (e.target === noteFormCancelBtn) {
            noteFormNoteTypeNoteBtn.click()
            newNoteForm.classList.toggle('active')
            noteFormTitle.value = ''
            noteFormContent.value = ''
            const allBulletItems = noteFormBulletListItems.querySelectorAll('.bulletItem')
            allBulletItems.forEach((bulletItem) => {
                bulletItem.remove()
            })
            clearTags(noteFormTagList)
            noteFormSelectColor.value = 'Magenta'
            noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
        }
        if (e.target === noteEditCancelBtn) {
            noteEdit.classList.toggle('active')
            noteEditTitle.value = ''
            noteEditContent.value = ''
            noteEditSelectColor.value = 'Magenta'
            noteFormSelectColor.style.border = `2px solid var(--${noteFormSelectColor.value})`
        }
        mainContent.style.display = 'flex'
    })
})