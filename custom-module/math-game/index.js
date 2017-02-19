function printMarkoPolo(){
    var elementInOneLine = 1000,
        finalLength = 1000000,
        numberOfLines = [];
    var result = [];
    for (var i = 1; i <=  finalLength; i=i+elementInOneLine) {
        result = markoPolo(i, i+elementInOneLine-1, 4, 7);
        numberOfLines.push(result.join(','));
    }
    return numberOfLines;
}

function markoPolo(i, length, fizzNumber, buzzNumber){
    var output;
    var lineArray = [];
    for(i; i<=length; i++){
        output = '';
        if(i%fizzNumber === 0){
            output+='marko';
        }
        if(i%buzzNumber === 0){
            output+='polo';
        }
        if(i%fizzNumber !== 0 && i%buzzNumber !== 0) {
            output=i;
        }
        lineArray.push(output);
    }
    return lineArray
}

module.exports = {
    printMarkoPolo: printMarkoPolo
};