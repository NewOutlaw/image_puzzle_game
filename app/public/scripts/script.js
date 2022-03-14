import TileBrain from "/scripts/TileBrain.js";


var fieldLength = 3;
var rootReadOnly = window.getComputedStyle(document.documentElement);
var root = document.documentElement.style;
root.setProperty('--field-size', fieldLength * parseInt(rootReadOnly.getPropertyValue('--tile-size').split('px')[0]) + 'px');

var fieldSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--field-size');
var tileSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--tile-size');
var fieldSizeCount = extractNumber(fieldSizePx, 'px') / extractNumber(tileSizePx, 'px');
var timestamp = Date.now();

var imgPath = '/img/moonlanding.jpg';
//var imgPath = '/img/starwars.jpg';

var tileBrain = new TileBrain(fieldSizeCount, imgPath);


window.addEventListener("keydown", event => {
    
    if(!isTimingOk())
        return;
    else
        tileBrain.moveTile(event.code);
});

function isTimingOk()
{    
    var transTime = extractNumber(window.getComputedStyle(document.documentElement).getPropertyValue('--trans-time'), 's');

    if(Date.now() - timestamp >= transTime*1000)
    {
        timestamp = Date.now();
        return true;
    }
    else
        return false;
}

function extractNumber(value, appendedUnit)
{
    if(value.includes('.'))
        return parseFloat(value.split(appendedUnit)[0]);
    else
        return parseInt(value.split(appendedUnit)[0]);
}
