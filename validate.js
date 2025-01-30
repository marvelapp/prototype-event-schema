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
        trigger: { type: 'user' },
        object: { type: 'scrollContainer' },
        outcome: { type: 'scroll' },
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
        externalId: "123:345"
    },
    require('./triggers/tap.json')
);

assertValid(
    {
        type: 'doubletap',
        coords: [0, 100],
        duration: 100,
        externalId: "123:345"
    },
    require('./triggers/doubletap.json')
);

for (var direction of ['left', 'right', 'up', 'down']) {
    assertValid(
        {
            type: 'swipe',
            externalId: "123:345",
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
            externalId: "123:345",
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

assertValid(
    {
        type: 'user',
    },
    require('./triggers/user.json')
);

assertValid(
    {
        type: 'player',
    },
    require('./triggers/player.json')
);

assertValid(
    {
        type: 'navigation',
    },
    require('./triggers/navigation.json')
);

assertValid(
    {
        type: 'mousemove',
        coords: [100, 200],
        externalId: "123:345",
    },
    require('./triggers/mousemove.json')
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
    for (var reverseAnimation of [false, true]) {
        assertValid(
            {
                type: 'screenTransition',
                screen: 2,
                animation,
                reverseAnimation,
                scrollPosition: [0, 0],
            },
            require('./outcomes/screenTransition.json')
        );
    }
}

for (var animation of transitionAnimations) {
    for (var reverseAnimation of [false, true]) {
        assertValid(
            {
                type: 'overlayTransition',
                screen: 2,
                animation,
                reverseAnimation,
                position: [50, 50],
                scrollPosition: [0, 0],
            },
            require('./outcomes/overlayTransition.json')
        );
    }
}

for (var animation of transitionAnimations) {
    for (var reverseAnimation of [false, true]) {
        assertValid(
            {
                type: 'removeOverlay',
                screen: 2,
                animation,
                reverseAnimation,
            },
            require('./outcomes/removeOverlay.json')
        );
    }
}

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
        type: 'miss',
    },
    require('./outcomes/miss.json')
);

assertValid(
    {
        type: 'resize',
        width: 1200,
        height: 800,
    },
    require('./outcomes/resize.json')
);

assertValid(
    {
        type: 'scroll',
        coords: [30, 200],
        smooth: true,
    },
    require('./outcomes/scroll.json')
);

assertValid(
    {
        type: 'startRecording',
    },
    require('./outcomes/startRecording.json')
);

assertValid(
    {
        type: 'stopRecording',
    },
    require('./outcomes/stopRecording.json')
);

assertValid(
    {
        type: 'goalReached',
    },
    require('./outcomes/goalReached.json')
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

assertValid(
    {
        type: 'scrollContainer',
        id: 1,
    },
    require('./objects/scrollContainer.json')
)