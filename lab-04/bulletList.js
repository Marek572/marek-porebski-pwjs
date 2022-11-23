export default class BulletList{
    constructor({ title, bulletList, tags, color, creationDate }) {
        this.title = title
        this.bulletList = bulletList
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
    
}