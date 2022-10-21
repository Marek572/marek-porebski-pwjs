const radioRecord1 = document.querySelector('#record1')
const radioRecord2 = document.querySelector('#record2')
const radioRecord3 = document.querySelector('#record3')
const radioRecord4 = document.querySelector('#record4') //.checked

let recording1 = []
let recording2 = []
let recording3 = []
let recording4 = []

document.addEventListener('keypress', onKeyPress)


function onKeyPress(event) {
    const key = event.key
    console.log(key)
    let sound =''
    switch(key){
        case 'q': sound = 'boom'; break;
        case 'w': sound = 'clap'; break;
        case 'e': sound = 'hihat'; break;
        case 'r': sound = 'kick'; break;
        case 't': sound = 'openhat'; break;
        case 'y': sound = 'ride'; break;
        case 'u': sound = 'snare'; break;
        case 'i': sound = 'tink'; break; //metronom
        case 'o': sound = 'tom'; break;
        default: sound = 'none'; break;
    }
    playSound(sound)
}

function playSound(sound) {
    if(sound === 'none'){
        return
    }
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
}
// Date.now()

function switchRecording(event){
    if(event.key === recording1){
        onKeyPress()
    }
}