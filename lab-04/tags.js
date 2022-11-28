//FIXME: refactor

export let noteFormTags = []
export let noteEditTags = []

const createTag = (label) => {
    const newTag = document.createElement('div')
    newTag.classList.add('tag')
    const newTagSpan = document.createElement('span')
    newTagSpan.innerHTML = label

    newTag.appendChild(newTagSpan)

    return newTag
}

export const resetTags = (obj) => {
    obj.querySelectorAll('.tag').forEach( (tag) => {
        tag.parentElement.removeChild(tag)
    })
}

export const clearTags = (obj) => {
    resetTags(obj)
    if(obj.id === 'newNoteTagList')
        noteFormTags = []
    if(obj.id === 'editNoteTagList')
        noteEditTags = []
}

export const generateTags = (tagArray, tagList, inputTag) => {
    resetTags(tagList)
    if(inputTag===undefined) {
        tagArray.forEach( (tag) => {
            const newTag = createTag(tag)
            tagList.appendChild(newTag)
        })
    }else{
        if(tagList.id === 'newNoteTagList'){
            tagArray.forEach( (tag) => {
                const newTag = createTag(tag)

                newTag.addEventListener('click', () => {
                    noteFormTags.splice(noteFormTags.indexOf(tag),1)
                    newTag.remove()
                })

                tagList.insertBefore(newTag, inputTag)
            })
        }
        if(tagList.id === 'editNoteTagList'){
            tagArray.forEach( (tag) => {
                const newTag = createTag(tag)

                newTag.addEventListener('click', () => {
                    noteEditTags.splice(noteEditTags.indexOf(tag),1)
                    newTag.remove()
                })

                tagList.insertBefore(newTag, inputTag)
            })
        }
    }
}