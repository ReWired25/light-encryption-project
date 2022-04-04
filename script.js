// *************** selectors, variables, alphabets *************** //

let encInput = document.querySelector('.encrypt__input');
let encButton = document.querySelector('.encrypt__button');
let encResult = document.querySelector('.encrypt__result');
let userKey = document.querySelector('.encrypt__key');

let decInput = document.querySelector('.decrypt__input');
let decKey = document.querySelector('.decrypt__key');
let decButton = document.querySelector('.decrypt__button');
let decResult = document.querySelector('.decrypt__result');

let startString = '';

let alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', 'с'
];

// *************** key generate *************** //

let keybase = Math.random();
let result = (keybase * 10).toString();
let key = '';

for (let i = 0; i < result.length; i++) {
        if (result[i] !== '.' && result[i] !== '0') {
        key += result[i];
    }
}

// *************** get encrypt functonal *************** //

encButton.addEventListener('click', () => {
    startString = encInput.value;
    
    let finalStr = genFunc(startString, key);

    encResult.innerHTML = `${finalStr}`;
    userKey.innerHTML = `${key}`;
});

// *************** get decrypt functonal *************** //

decButton.addEventListener('click', () => {
    codeStr = decInput.value;
    codeKey = decKey.value;

    let startString = genFuncReturn(codeStr, codeKey);

    decResult.innerHTML = `${startString}`;
});

// *************** general functions *************** //

function genFunc(stringBase, key) {
    let count = 0;
    let finalArr = '';
    let string = stringBase.toLowerCase();
    let punctuation = [',',';','.','?','!'];

    for (let i = 0; i < string.length; i++) {
        if (punctuation.includes(string[i])) {
            continue;
        }

        let startIndex = alphabet.indexOf(string[i]);
        let increase = +key[count];

        if (string[i] === ' ') {
            startIndex = 26;
        }

        let finalIndex = startIndex + increase;

        if (finalIndex > 26) {
            let diff = (alphabet.length - 1) - startIndex;

            finalIndex = (increase - diff) - 1;
        }

        finalArr += alphabet[finalIndex];

        count++;
        if (key[count] === undefined) {
            count = 0;
        }
    }

    return finalArr;
}

function genFuncReturn(string, key) {
    let count = 0;
    let finalArr = '';

    for (let i = 0; i < string.length; i++) {
        let startIndex = alphabet.indexOf(string[i]);
        let returnSteps = +key[count];

        let finalIndex = startIndex - returnSteps;

        if (finalIndex < 0) {
            finalIndex = (26 + finalIndex) + 1;
        }

        if (finalIndex === 26) {
            finalArr += ' ';
        } else {
            finalArr += alphabet[finalIndex];
        }

        count++;
        if (key[count] === undefined) {
            count = 0;
        }
    }

    return finalArr;
}