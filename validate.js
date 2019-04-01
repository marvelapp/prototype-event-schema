const FlakeId = require('flakeid').default;
const flake = new FlakeId();

const assertValid = require('./assertValid').assertValid;

assertValid(
    {
        trigger: { type: 'tap' },
        object: { type: 'hotspot' },
        outcome: { type: 'screenTransition' },
        timestamp: 650,
        prevId: flake.gen(),
        id: flake.gen(),
    },
    require('./event.json')
);

assertValid(
    {
        type: 'tap',
        coords: [0, 100],
        duration: 100,
    },
    require('./triggers/tap.json')
);

assertValid(
    {
        type: 'doubletap',
        coords: [0, 100],
        duration: 100,
    },
    require('./triggers/doubletap.json')
);

for (var direction of ['left', 'right', 'up', 'down']) {
    assertValid(
        {
            type: 'swipe',
            direction: direction,
            startCoords: [50, 50],
            endCoords: [90, 55],
            duration: 100,
        },
        require('./triggers/swipe.json')
    );
}

for (var direction of ['in', 'out']) {
    assertValid(
        {
            type: 'pinch',
            direction: direction,
            coords: [50, 50],
            duration: 100,
        },
        require('./triggers/pinch.json')
    );
}

assertValid(
    {
        type: 'timer',
    },
    require('./triggers/timer.json')
);

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
];
for (var animation of transitionAnimations) {
    assertValid(
        {
            type: 'screenTransition',
            toScreen: 2,
            animation: animation,
            scrollPosition: [0, 0],
        },
        require('./outcomes/screenTransition.json')
    );
}

assertValid(
    {
        type: 'overlayTransition',
        screen: 2,
        position: [50, 50],
        scrollPosition: [0, 0],
    },
    require('./outcomes/overlayTransition.json')
);

assertValid(
    {
        type: 'openUrl',
        url: 'https://blog.marvelapp.com',
        newWindow: true,
    },
    require('./outcomes/openUrl.json')
);

assertValid(
    {
        type: 'screen',
        id: 1,
        height: 100,
        width: 100,
    },
    require('./objects/screen.json')
);
