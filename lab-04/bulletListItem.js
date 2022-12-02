export let noteFormBulletList = []
export let noteEditBulletListArray = []

//TODO: usuwanie bulletItemow, bulletItem label przy checkbox checked przekrleslony
export class BulletListItem {

    constructor({ checkbox, value }) {
        this.checkbox = checkbox
        this.value = value
    }

    addBulletItemToArray(list) {
        list.push(this)
    }

    updateBulletItemCheckbox(list) {
        const thisBulletItem = list.find(e => e === this)
        thisBulletItem.checkbox = !thisBulletItem.checkbox
    }

    addBulletItemToList(list) {
        const newBulletItem = document.createElement('div')
        newBulletItem.setAttribute('class', 'bulletItem')
        const newBulletItemCheckbox = document.createElement('input')
        newBulletItemCheckbox.type = 'checkbox'
        if (this.checkbox === true)
            newBulletItemCheckbox.checked = true
        newBulletItemCheckbox.id = this.value
        if (list.id === 'noteLightboxContent')
            newBulletItemCheckbox.disabled = true

        const newBulletItemLabel = document.createElement('label')
        newBulletItemLabel.setAttribute('for', this.value)
        newBulletItemLabel.innerHTML = this.value

        newBulletItem.appendChild(newBulletItemCheckbox)
        newBulletItem.appendChild(newBulletItemLabel)

        newBulletItemCheckbox.addEventListener('change', () => {
            if(list.id === 'newNoteBulletListItems')
                this.updateBulletItemCheckbox(noteFormBulletList)
            if(list.id === 'editNoteBulletListItems')
                this.updateBulletItemCheckbox(noteEditBulletListArray)
        })

        list.appendChild(newBulletItem)
    }

}

export const clearBulletListArray = (list) => {
    if(list.id === 'newNoteBulletListItems')
        noteFormBulletList = []
    if(list.id === 'editNoteBulletListItems')
        noteEditBulletListArray = []
}

export const clearBulletList = (obj) => {
    const allBulletItems = Array.from(obj.querySelectorAll('.bulletItem'))
    allBulletItems.forEach((bulletItem) => {
        bulletItem.remove()
    })
}

export default { BulletListItem, noteFormBulletList, noteEditBulletListArray, clearBulletListArray, clearBulletList}