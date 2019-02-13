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

assertValid({
    type: 'doubletap',
    coords: [0, 100],
    duration: 100,
}, require('./triggers/doubletap.json'));


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


assertValid({
    type: 'hover',
    duration: 1250,
}, require('./triggers/hover.json'))


const transitionAnimations = [
    null,
    'fade',
    'push-left',
    'push-right',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'pop',
    'flip',
    'flow',
    'slide-fade',
]
for (var animation of transitionAnimations) {
    assertValid({
        type: 'screenTransition',
        fromScreen: 1,
        toScreen: 2,
        animation: animation
    }, require('./outcomes/screenTransition.json'))
}

assertValid({
    type: 'overlay',
    screen: 2,
    position: [50, 50],
}, require('./outcomes/overlay.json'))


assertValid({
    type: 'openUrl',
    url: 'https://blog.marvelapp.com',
    newWindow: true,
}, require('./outcomes/openUrl.json'))


assertValid({
    type: 'screen',
    id: 1,
    height: 100,
    width: 100,
}, require('./objects/screen.json'))
