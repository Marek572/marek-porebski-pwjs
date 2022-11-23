export let noteFormBulletList = []
export let noteEditBulletList = []

export default class BulletListItem {

    constructor({checkbox, value}){
        this.checkbox = checkbox
        this.value = value
    }

    addBuletItemToList(){
        noteFormBulletList.push(this)
    }

    updateBuletItemCheckbox(){
        const thisBulletItem = noteFormBulletList.find(e => e === this)
        thisBulletItem.checkbox = !thisBulletItem.checkbox
    }
}



const createBulletItem = (e) => {
    const newBulletItem = document.createElement('div')
    newBulletItem.setAttribute('class', 'bulletItem')
    const newCheckbox = document.createElement('input')
    newCheckbox.type = 'checkbox'
    const newTagSpan = document.createElement('span')
    newTagSpan.innerHTML = e[1]

    newBulletItem.appendChild(newCheckbox)
    newBulletItem.appendChild(newTagSpan)

    return newBulletItem
}

export const resetBulletList = (obj) => {
    obj.querySelectorAll('.bulletItem').forEach((bulletItem) => {
        bulletItem.parentElement.removeChild(bulletItem)
    })
}

export const clearBulletList = (obj) => {
    resetBulletList(obj)
    if (obj.id === 'newNoteBulletListItems')
        noteFormBulletItems = []
    // if(obj.id === 'editNoteTagList')
    //     noteEditBulletItems = []
}

export const generateBulletList = (bulletListArray, bulletList) => {
    resetBulletList(bulletList)
    if (bulletList.id === 'newNoteBulletListItems') {
        bulletListArray.forEach((bulletItem) => {
            const newBulletItem = createBulletItem(bulletItem)
            const newCheckbox = newBulletItem.children[0]

            newCheckbox.addEventListener('click', () => {
                const thisBulletItem = bulletListArray.find(e => e === bulletItem)
                thisBulletItem[0] = !thisBulletItem[0]
            })

            //TODO: delete

            bulletList.appendChild(newBulletItem)
        })
    }
    // if(tagList.id === 'editNoteTagList'){
    //     tagArray.forEach( (tag) => {
    //         const newTag = createTag(tag)

    //         newTag.addEventListener('click', () => {
    //             noteEditTags.splice(noteEditTags.indexOf(tag),1)
    //             newTag.remove()
    //         })

    //         tagList.insertBefore(newTag, inputTag)
    //     })
    // }
}