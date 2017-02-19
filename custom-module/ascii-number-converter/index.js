var fs = require('fs'),
    readline = require('readline'),
    config = require('./config.json');

// Functions
function convertDigitalFigureToNumber(digitalNumbers) {
    var len = config.lineLength;
    var counter = 0;
    var str = '';
    var finalNumber = '';
    try {
        for (var num = 0; num < len; num++) {
            if (digitalNumbers[0][num]) {
                str += digitalNumbers[0][num];
            } else {
                str += ' ';
            }
            str += digitalNumbers[1][num] +
                digitalNumbers[2][num];
            if (counter == 2) {
                counter = 0;
                finalNumber += getNumber(str);
                str = '';
            } else {
                counter++;
            }
        }
    } catch (e) {
        finalNumber = 'error!';
    }
    if (finalNumber.indexOf(config.invalidSymbol) >= 0) {
        finalNumber += '  ILLEGAL';
    }
    return finalNumber;
}
function getNumber(digitSymbol) {
    if (config[digitSymbol]) {
        return config[digitSymbol];
    } else {
        return config.invalidSymbol;
    }
}

module.exports = function (readStreamObj, callback) {
    var counter = 0;
    var numberListCounter = 0;
    var digitalNumberString = [];
    var resultNumberList = [];
    var tmpBit = {};
    var rd = readline.createInterface({
        input: readStreamObj
    });
    rd.on('line', function (line) {
        if (line.trim() == '') {
            digitalNumberString.push(tmpBit);
            counter = 0;
            numberListCounter++;
            tmpBit = {};
        } else {
            tmpBit[counter] = line;
            counter++;
        }
    });
    rd.on('close', function () {
        digitalNumberString.forEach(function (numSymbol) {
            resultNumberList.push(convertDigitalFigureToNumber(numSymbol || ''));
        });
        return callback(null, resultNumberList);
    });
};


