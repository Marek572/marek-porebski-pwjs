export default class Note {
    constructor({ title, content, color, pinNote }) {
        this.title = title
        this.content = content
        this.color = color
        this.pinNote = pinNote
        this.creationDate = new Date()
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
        newNoteElement.id = `note${this.creationDate.toISOString()}`
        newNoteElement.classList.add('note')
        const newNoteColor = this.color
        if (newNoteColor !== 'Magenta')
            newNoteElement.classList.add(`noteColor${newNoteColor}`)
        newNoteElement.innerHTML = `
            <p id="noteTitle">${this.title}</p>
            <p id="noteDate">${this.creationDate.toLocaleString().slice(0,9)}</p>
        `

        newNoteElement.addEventListener('click', () => {
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

        return newNoteElement
    }
}