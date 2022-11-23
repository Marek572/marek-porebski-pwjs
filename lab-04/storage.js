export default function localStorageToParsedNotes(){
    const localNotes = localStorage.getItem('notes')
        if (localNotes === null) {
            localStorage.setItem('notes', JSON.stringify([]))
            return
        }
        const parsedNotes = JSON.parse(localNotes)

        return parsedNotes
}