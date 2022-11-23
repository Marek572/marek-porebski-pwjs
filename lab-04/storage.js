import Note from "./note.js"
import BulletList from "./bulletList.js"
const mainNotes = document.querySelector('#notes')

export const localStorageToParsedNotes = () =>{
    const localNotes = localStorage.getItem('notes')
        if (localNotes === null) {
            localStorage.setItem('notes', JSON.stringify([]))
            return
        }
        const parsedNotes = JSON.parse(localNotes)

        return parsedNotes
}

//updateParsedNotes?

export const generateMain = (parsedNotes) => {
    if (parsedNotes) {
        parsedNotes.forEach((note) => {
            if(note.content){
                const tmpNote = new Note({
                    title: note.title,
                    content: note.content,
                    tags: note.tags,
                    color: note.color,
                    creationDate: note.creationDate
                })
                mainNotes.appendChild(tmpNote.addNoteToMain())
            }else{
                const tmpBulletList = new BulletList({
                    title: note.title,
                    bulletList: note.bulletList,
                    tags: note.tags,
                    color: note.color,
                    creationDate: note.creationDate
                })
                mainNotes.appendChild(tmpBulletList.addNoteToMain())
            }
        })
    }
}

// addNoteToLocalStorage() {
//     const parsedNotes = localStorageToParsedNotes()
//     parsedNotes.push(this)
//     localStorage.setItem('notes', JSON.stringify(parsedNotes))
// }

export default {localStorageToParsedNotes, generateMain}