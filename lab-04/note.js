import { generateTags } from './tags.js'
import { localStorageToParsedNotes } from "./storage.js"
import { BulletListItem } from './bulletListItem.js'

const noteLightbox = document.querySelector('.noteLightbox')
const noteLightboxButtons = document.querySelector('#noteLightboxButtons')
const noteLightboxTitle = document.querySelector('#noteLightboxTitle')
const noteLightboxContent = document.querySelector('#noteLightboxContent')
const noteLightboxTagList = document.querySelector('#noteLightboxTagList')

export default class Note {
    constructor({ title, content, tags, color, creationDate }) {
        this.title = title
        this.content = content
        this.tags = tags
        this.color = color
        this.creationDate = creationDate === undefined ? Date.now() : creationDate
    }

    //storage?
    addNoteToLocalStorage() {
        const parsedNotes = localStorageToParsedNotes()
        parsedNotes.push(this)
        localStorage.setItem('notes', JSON.stringify(parsedNotes))
    }

    updateNoteLocalStorage(index) {
        const parsedNotes = localStorageToParsedNotes()
        parsedNotes.splice(index, 1, this)
        localStorage.setItem('notes', JSON.stringify(parsedNotes))
    }

    addNoteToMain() {
        const newLocalNote = document.createElement('div')
        newLocalNote.id = `note${this.creationDate}`
        newLocalNote.classList.add('note')
        const newLocalNoteColor = this.color
        if (newLocalNoteColor !== 'Magenta')
            newLocalNote.classList.add(`noteColor${newLocalNoteColor}`)

        newLocalNote.innerHTML = `
        <p id="noteTags">${this.tags}</p>
        <p id="noteTitle">${this.title}</p>
        <p id="noteDate">${(new Date(this.creationDate)).toLocaleDateString()}</p>
        `

        //TODO:change if bulletList
        newLocalNote.addEventListener('click', (clickedNote) => {
            const parsedNotes = localStorageToParsedNotes()

            noteLightbox.classList.toggle('active')
            mainContent.style.display = 'none'
            noteLightbox.id = clickedNote.target.id.slice(4)
            const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
            noteLightboxTitle.value = noteLightboxObject.title
            if (noteLightboxObject.content)
                noteLightboxContent.value = noteLightboxObject.content
            console.log(noteLightboxObject.bulletList)
            //TODO: ogarnac printowanie bulletItemow z bulletListy
            // if (noteLightboxObject.bulletList) {
            //     noteLightboxObject.bulletList.forEach((bulletItem) => {
            //         const newBulletItem = new BulletListItem({
            //             checkbox: bulletItem[0],
            //             value: bulletItem[1]
            //         })
            //         console.log(newBulletItem)
            //         // newBulletItem.addBulletItemToList(noteLightboxContent)
            //     })
            // }
            generateTags(noteLightboxObject.tags, noteLightboxTagList)
            noteLightboxButtons.style.color = `var(--${noteLightboxObject.color})`
            noteLightbox.style.border = `2px solid var(--${noteLightboxObject.color})`
            noteLightbox.style.boxShadow = `0 0 7px var(--${noteLightboxObject.color}),
                                                        0 0 10px var(--${noteLightboxObject.color}),
                                                        0 0 25px var(--${noteLightboxObject.color})`

        })


        return newLocalNote
    }

}