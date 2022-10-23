const metronomeOn = document.querySelector('#metronomeOn')
const metronomeOff = document.querySelector('#metronomeOff')
const metronome1 = document.querySelector('#metronome1')
const metronome2 = document.querySelector('#metronome2')

const tiles = document.querySelectorAll('.tile')

const timeOut = 3000
let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
let playBtns = Array.from(document.querySelectorAll('.playSoundBtn'))
let recordBtns = Array.from(document.querySelectorAll('.recordSoundBtn'))

const checkbox1 = document.querySelector('#input1')
const playBtn1 = document.querySelector('#playBtn1')
const recordBtn1 = document.querySelector('#recordBtn1')

const addPath = document.querySelector('#addPath')
let pathIndex = 1

const playAllBtn = document.querySelector('#playAllBtn')

let checkboxesChecked = []
const playSelectedBtn = document.querySelector('#playSelectedBtn')

let recordingTemp = []
let allRecords = []

document.addEventListener('keypress', onKeyPress)

let sound = ''
function onKeyPress(event) {
    const key = event.key
    console.log(key)
    switch (key) {
        case 'q': sound = 'boom'; break;
        case 'w': sound = 'clap'; break;
        case 'e': sound = 'hihat'; break;
        case 'r': sound = 'kick'; break;
        case 't': sound = 'openhat'; break;
        case 'y': sound = 'ride'; break;
        case 'u': sound = 'snare'; break;
        case 'i': sound = 'tom'; break;
        // case 'o': sound = 'tink'; break; //metronom
        default: sound = 'none'; break;
    }
    playSound(sound)
    activeTile(sound)
}

function playSound(sound) {

    if (sound === 'none')
        return
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
    if (switchRec === true)
        recordingTemp.push([Date.now(), sound])
}

function playRecording(recording) {

    const startTimer = recording[1][0]
    let time = 0
    for (i = 1; i < recording.length; i++) {
        time = recording[i][0] - startTimer
        let sound = recording[i][1]
        setTimeout(() => playSound(sound), time)
    }
}

function playAllRecordings() {

    allRecords.forEach((record) => {
        const startTimer = record[1][0]
        let time = 0
        for (i = 1; i < record.length; i++) {
            time = record[i][0] - startTimer
            let sound = record[i][1]
            setTimeout(() => playSound(sound), time)
        }
    })
}

metronomeOn.addEventListener('click', () => {
    metronomeInverval = setInterval(() => {

        if (metronome1.classList.contains('metronomeActive')) {
            metronome1.setAttribute('class', 'metronome')
            metronome2.setAttribute('class', 'metronome metronomeActive')
            playSound('tink')
        } else {
            metronome2.setAttribute('class', 'metronome')
            metronome1.setAttribute('class', 'metronome metronomeActive')
            playSound('tink')
        }
    }, 600)
})

metronomeOff.addEventListener('click', () => {
    clearInterval(metronomeInverval)
})


document.addEventListener('keydown', () => {
    setTimeout(() => {
        tiles.forEach((tile) => {
            tile.style.background = '#02111b'
        })
    }, 10)
})

const activeTile = (sound) => {
    if (sound === 'none') {
        return
    }
    const tile = document.querySelector(`#${sound}Tile`)
    tile.style.background = '#35a7ff'
}


let switchRec = false
const recordSound = () => {
    if (switchRec === false) {
        switchRec = true
        recordingTemp = []
    }
    else if (switchRec === true)
        switchRec = false
    setTimeout(() => {
        switchRec = false
    }, timeOut)
}

const checkboxClick = (checkbox) => {

    const index = parseInt(checkbox.id.slice(5))

    checkbox.addEventListener('click', () => {

        console.log(index)

        if(checkbox.checked === true){
            checkboxesChecked.push(index)
            checkboxesChecked.sort()
        }
        else{
            checkboxesChecked.splice(index-1,1) //TODO: find element index and splice it
        }

    })
}

const playBtnClick = (playBtn) => {

    const index = parseInt(playBtn.id.slice(7)) - 1

    playBtn.addEventListener('click', () => {

        if (allRecords[index] !== undefined) {

            playRecording(allRecords[index])

            playBtn.style.background = '#b9e28c'
            playBtn.style.pointerEvents = 'none'

            setTimeout(() => {
                playBtn.style.background = '#04a777'
                playBtn.style.pointerEvents = 'auto'
            }, timeOut)
        }
    })
}

const recordBtnClick = (recBtn) => {

    recBtn.addEventListener('click', () => {

        const index = parseInt(recBtn.id.slice(9)) - 1

        recordSound()

        playBtns.forEach((playBtn) => {
            playBtn.style.pointerEvents = 'none'
        })

        recBtn.style.background = '#F87060'
        recBtn.style.pointerEvents = 'none'

        setTimeout(() => {

            recBtn.style.background = '#DF2935'
            recBtn.style.pointerEvents = 'auto'

            allRecords.splice(index, 1, recordingTemp)
            allRecords[index].splice(0, 0, index)

            playBtns.forEach((playBtn) => {
                playBtn.style.pointerEvents = 'auto'
            })
        }, timeOut)
    })
}

checkboxClick(checkbox1)
playBtnClick(playBtn1)
recordBtnClick(recordBtn1)


addPath.addEventListener('click', () => {
    pathIndex++

    let newPath = document.createElement('div')
    newPath.setAttribute('class', 'path')
    paths.insertBefore(newPath, addPath)

    let newInput = document.createElement('input')
    newInput.type = 'checkbox'
    newInput.setAttribute('id', `input${pathIndex}`)
    newPath.appendChild(newInput)
    checkboxes.push(newInput)

    let newPlayBtn = document.createElement('button')
    newPlayBtn.setAttribute('class', 'playSoundBtn btn')
    newPlayBtn.setAttribute('id', `playBtn${pathIndex}`)
    newPath.appendChild(newPlayBtn)
    playBtns.push(newPlayBtn)

    let newRecordBtn = document.createElement('button')
    newRecordBtn.setAttribute('class', 'recordSoundBtn btn')
    newRecordBtn.setAttribute('id', `recordBtn${pathIndex}`)
    newPath.appendChild(newRecordBtn)
    recordBtns.push(newRecordBtn)

    checkboxClick(newInput)
    playBtnClick(newPlayBtn)
    recordBtnClick(newRecordBtn)
})

playAllBtn.addEventListener('click', playAllRecordings)