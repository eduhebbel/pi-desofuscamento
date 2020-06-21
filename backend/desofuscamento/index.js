ampMap = require('./ampMap');
charMap = require('./charMap');
perMap = require('./perMap');
hexMap = require('./hexMap');

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
na parte de: 
Splitting with a RegExp to include parts of the separator in the result
*/
function decodeAmp(encodedString){
    const rg = /(&[a-zA-z0-9]*;)/;

    return decodeGeneral(encodedString, rg, ampMap);
}

function decodeChar(encodedString){
    const rg = /(char\([0-9]{2,3}\))/;

    return decodeGeneral(encodedString,rg,charMap);
}

function decodePerc(encodedString){
    const rg = /(%[2-7][a-f0-9])/;

    return decodeGeneral(encodedString,rg,perMap);
}

function decodeHex(encodedString){
    const regexExp = /(CaSt\( .* \))/;
    
    const splitedString = encodedString.split(regexExp);

    return decodedSplitedString = splitedString.map(valueFromSplitedString => {
        if (valueFromSplitedString.startsWith('CaSt')) {
            return decodeCaSt(valueFromSplitedString);
        } else {
            return valueFromSplitedString;
        }
    }).join('');
}

function decodeCaSt(valueFromSplitedString){
    //here, it is already validated
    const startIndex = 'CaSt(  0X'.length;
    const endIndex = ' as CHAR )'.length;
    hexString = valueFromSplitedString.slice(startIndex, - endIndex);
    
    const returnArray = [] // could be a string directly
    for (var i = 0; i < hexString.length; i=i+2){
        returnArray.push(hexMap.get(hexString[i]+hexString[i+1]));
    }
    return returnArray.join('');
}

function decodeGeneral(encodedString, regexExp, charSet){
    const splitedString = encodedString.split(regexExp);

    return decodedSplitedString = splitedString.map(valueFromSplitedString => {
        var valueFromMap = charSet.get(valueFromSplitedString);
        if (valueFromMap) {
            return valueFromMap
        } else {
            return valueFromSplitedString
        }
    }).join('');
}

function decodeAll(encodedString){
    // funcList = [decodeAmp, decodeChar, decodePerc, decodeHex];
    // var returnString
    returnString = decodeAmp(encodedString);
    returnString = decodeChar(returnString);
    returnString = decodePerc(returnString);
    returnString = decodeHex(returnString);
    //TODO remover comentarios
    //TODO remover +

    return returnString

}



var stringTest =  '&&&lt;;; nada relacionado&nbsp;&gt;';
console.log(decodeAmp(stringTest));
console.log(decodeAll(stringTest));

stringTest =  '&lt; nada relacionado&nbsp;&gt;';
console.log(decodeAmp(stringTest));
console.log(decodeAll(stringTest));

stringTest =  'char(65)char(108)char(111)';
console.log(decodeChar(stringTest));
console.log(decodePerc(stringTest));
console.log(decodeAll(stringTest));

stringTest =  '%41%6c%6f%5b%5d';
console.log(decodePerc(stringTest));
console.log(decodeAll(stringTest));

stringTest =  'Este e o CaSt(  0X746578746f206f726967696e616c as CHAR ) que foi decodificado';
// stringTest =  'Este e o CaSt(  0Xi746578746f206f726967696e616cf as CHAR ) que foi decodificado';
// stringTest =  'Este e o CaSt(  0X123456 as CHAR ) que foi decodificado';
console.log(decodeHex(stringTest));
console.log(decodeAll(stringTest));

stringTest =  "alfa beta &lt;char(65)char(108)char(111)&gt; celta %5btexto%5d delta"
// stringTest =  'Este e o CaSt(  0Xi746578746f206f726967696e616cf as CHAR ) que foi decodificado';
// stringTest =  'Este e o CaSt(  0X123456 as CHAR ) que foi decodificado';
console.log(decodeHex(stringTest));
console.log(decodeAll(stringTest));
