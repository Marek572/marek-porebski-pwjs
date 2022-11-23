import Note from './note.js'

export default class BulletList extends Note{
    constructor({ title, bulletList, tags, color, creationDate }) {
        super(title, tags, color, creationDate)
        this.title = title
        delete this.content
        this.bulletList = bulletList
        this.tags = tags
        this.color = color
        this.creationDate = creationDate === undefined ? Date.now() : creationDate
    }
}