export let noteFormBulletList = []
// export let noteEditBulletList = []

const noteFormBulletListItems = document.querySelector('#newNoteBulletListItems')

export class BulletListItem {

    constructor({checkbox, value}){
        this.checkbox = checkbox
        this.value = value
    }

    addBulletItemToArray(){
        noteFormBulletList.push(this)
    }

    updateBulletItemCheckbox(){
        const thisBulletItem = noteFormBulletList.find(e => e === this)
        thisBulletItem.checkbox = !thisBulletItem.checkbox
    }

    addBulletItemToList(list){
        const newBulletItem = document.createElement('div')
        newBulletItem.setAttribute('class', 'bulletItem')

        const newBulletItemCheckbox = document.createElement('input')
        newBulletItemCheckbox.type = 'checkbox'
        newBulletItemCheckbox.id = this.value

        const newBulletItemLabel = document.createElement('label')
        newBulletItemLabel.setAttribute('for', this.value)
        newBulletItemLabel.innerHTML = this.value

        newBulletItem.appendChild(newBulletItemCheckbox)
        newBulletItem.appendChild(newBulletItemLabel)

        newBulletItemCheckbox.addEventListener('change', () => {
            this.updateBulletItemCheckbox()
        })

        list.appendChild(newBulletItem)
    }

}

export const clearBulletListArray = () => {
    noteFormBulletList = []
}

export default {BulletListItem, noteFormBulletList, clearBulletListArray}