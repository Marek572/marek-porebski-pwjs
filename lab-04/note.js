export default class Note {
    constructor({ title, content, color, pinNote }) {
        this.title = title
        this.content = content
        this.color = color
        this.pinNote = pinNote
        this.creationDate = new Date().toISOString()
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
        const newNoteElement = document.createElement('div')
        newNoteElement.classList.add('note')
        const newNoteColor = this.color
        if (newNoteColor !== 'Magenta')
            newNoteElement.classList.add(`noteColor${this.color}`)
        newNoteElement.innerHTML = `
        <div id="noteEdit">
            <i id="noteIconPin" class="fa-regular fa-thumbtack noteIcon"></i>
            <i id="noteIconEdit" class="fa-regular fa-pen-to-square noteIcon"></i>
            <i id="noteIconThrash" class="fa-regular fa-trash-can noteIcon"></i>
        </div>
        <p id="noteTitle">${this.title}</p>
        <p id="noteDate">${this.creationDate.toLocaleString()}</p>
        `

        newNoteElement.addEventListener('click', () => {
            noteLightbox.classList.add('active')
        })

        return newNoteElement
    }
}