const fs = require('fs');
const assert = require('assert');

const Ajv = new require('ajv');


const assertValid = function(data, schema) {
    const ajv = new Ajv({
        format: 'full',
        allErrors: true,
    });
    const valid = ajv.validate(schema, data);
    assert(valid, `${data.type}: ${ajv.errorsText(ajv.errors)}`);
};

assertValid({
    type: 'tap',
    coords: [0, 100],
    duration: 100,
}, require('./triggers/tap.json'));



for (var direction of ['left', 'right', 'up', 'down']) {
    assertValid({
        type: 'swipe',
        direction: direction,
        startCoords: [50, 50],
        endCoords: [90, 55],
        duration: 100,
    }, require('./triggers/swipe.json'))
}

for (var direction of ['in', 'out']) {
    assertValid({
        type: 'pinch',
        direction: direction,
        coords: [50, 50],
        duration: 100,
    }, require('./triggers/pinch.json'))
}


assertValid({
    type: 'timer',
}, require('./triggers/timer.json'))


// assertValid({
//     type: 'hover',
//     duration: 1250,
// }, require('./triggers/hover.json'))
