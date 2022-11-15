const noteLightbox = document.querySelector('.noteLightbox')
const noteLightboxButtons = document.querySelector('#noteLightboxButtons')
const noteLightboxTitle = document.querySelector('#noteLightboxTitle')
const noteLightboxContent = document.querySelector('#noteLightboxContent')

const mainNotes = document.querySelector('#notes')

export default class Note {
    constructor({ title, content, color, creationDate }) {
        this.title = title
        this.content = content
        this.color = color
        this.creationDate = creationDate === undefined ? Date.now() : creationDate
    }

    addNoteToLocalStorage() {
        const localNotes = localStorage.getItem('notes')
        if (localNotes === null) {
            localStorage.setItem('notes', JSON.stringify([this]))
            return
        }
        const parsedNotes = JSON.parse(localNotes)
        parsedNotes.push(this)
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
            <p id="noteTitle">${this.title}</p>
            <p id="noteDate">${(new Date(this.creationDate)).toLocaleDateString()}</p>
        `

        newLocalNote.addEventListener('click', (clickedNote) => {
            const localNotes = localStorage.getItem('notes')
            if (localNotes === null) {
                localStorage.setItem('notes', JSON.stringify([this]))
                return
            }
            const parsedNotes = JSON.parse(localNotes)

            noteLightbox.classList.toggle('active')
            mainNotes.style.display = 'none'
            noteLightbox.id = clickedNote.target.id.slice(4)
            const noteLightboxObject = parsedNotes.find(e => e.creationDate == noteLightbox.id)
            noteLightboxTitle.value = noteLightboxObject.title
            noteLightboxContent.value = noteLightboxObject.content
            noteLightboxButtons.style.color = `var(--${noteLightboxObject.color})`
            noteLightbox.style.border = `2px solid var(--${noteLightboxObject.color})`
            noteLightbox.style.boxShadow = `0 0 7px var(--${noteLightboxObject.color}),
                                                        0 0 10px var(--${noteLightboxObject.color}),
                                                        0 0 25px var(--${noteLightboxObject.color})`
        })

        return newLocalNote
    }

}