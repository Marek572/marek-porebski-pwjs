const addTileBtn = document.querySelector('#addTileBtn');

export class TilesCounter {

    constructor() {
        this.counter = 0;
    }

    counterIncrease = () => {
        this.counter += 1;
    }

    counterDecrease = () => {
        this.counter -= 1;
    }

    counterCheckLimit = () => {
        if (this.counter === 5){
            addTileBtn.style.display = 'none';
        }
    }
}