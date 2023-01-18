export const removeTileEvent = (city) => {
    const tile = document.querySelector(`#${city}`);
    tile.remove();
}

export const strRemoveSpaces = (str) => {
    if(str.includes(' ')) return str.replaceAll(' ','');
    else return str;
}

export const cityNameRemoveBrackets = (str) => {
    if(str.includes('(')){
        let indexOfFirstBracket = str.indexOf('(');
        return str.substring(0,indexOfFirstBracket);
    }else
        return str;
}
