# Proto viewer events

> This doc originally lived on [gist.github.com](https://gist.github.com/joealcorn/86461c250d61aceddd631d7dd6ecc5c5). There are some comments there.

- [Trigger types](#trigger-types)
- [Object types](#object-types)
- [Outcome types](#outcome-types)
- [Full examples](#examples)


## Draft event structure

Each event has these keys:

- `trigger` - the trigger of the event. could be a user interacting with a prototype or a timer.
- `object` - the object that was interacted with (??)
- `outcome` - what happened as a result of the event. should give enough detail to allow us to drive the prototype-viewer using these events
- `timestamp` - a timestamp of when the event happened, relative to the start of the prototype-viewer session, in milliseconds

```javascript
event {
    trigger: {},
    object: {},
    outcome: {},
    timestamp: 00000010101,
}
```

The value of these keys can change depending on their type. As an example, two triggers will look different if one is a `hover` and one is a `tap`.

How the different types might look are defined below, along with some unanswered questions.


## Trigger Types

- `tap`
- `doubletap`
- `swipe`
- `hover`
- `pinch`
- `timer`

### `tap` & `doubletap`

```javascript
trigger: {
    type: 'tap', // one of (tap, doubletap)
    coords: [0, 100], // coordinates, with (0, 0) being the top left-most pixel
    duration: 100, // duration in ms
}
```

### `swipe`

```javascript
trigger: {
    type: 'swipe',
    direction: 'left', // one of (up, down, left, right)
    startCoords: [50, 50],
    endCoords: [90, 55],
    duration: 100,
}
```

## `hover`

Some questions remain. Do we need to communicate the bounding box of the item that they hovered over? Otherwise, what good are plain old coordinates, and what would they even represent?

```javascript
trigger: {
    type: 'hover',
    duration: 1250,
}
```

## `pinch`

```javascript
trigger: {
    type: 'pinch',
    direction: 'in', // one of (in, out)
    touchpoint: [50, 50]
    duration: 100,
}
```

## `timer`

```javascript
trigger: {
    type: 'timer',
}
```

## Object types

- `hotspot`
- `screen` (used for timers?)
- easel data (future possibility)

### `hotspot`

Q: How are bounds best represented, in a simple way that is consistent with the rest of our positioning attrs?

Some examples:

```javascript
[10, 10, 90, 90] // [left, top, right, bottom]
[[10, 10], [90, 90]] // [top left point, bottom right point]
[
    [10, 10],
    [90, 10],
    [90, 90],
    [10, 90],
] // all 4 corners

{
    height: 80,
    width: 80,
    coords: [10, 10]
} // position + height/width
```

```javascript
object: {
    type: 'hotspot',
    id: 1,
    bounds: [10, 10, 90, 90],
}
```

### `screen`

```javascript
object: {
    type: 'screen',
    id: 1,
    height: 100,
    width: 100,
}
```


## Outcome types

- `screenTransition`
- `overlay`
- `openUrl`
- `scroll`
- `misclick` (?)


### `screenTransition`

```javascript
outcome: {
    type: 'screenTransition',
    fromScreen: 1,
    toScreen: 2,
    animation: 'fade', // one of (null, fade, push-left, push-right, slide-up, slide-down, slide-left, slide-right, pop, flip, flow, slide-fade...) 
}
```

### `overlay`

Q: What's the best/simplest way to convey the overlay position here? A single coordinate for the centre point of the layer?

```javascript
outcome: {
    type: 'overlay',
    screen: 2, // the screen that is being overlain
    position: [50, 50],
}
```

### `openUrl`

```javascript
outcome: {
    type: 'openUrl',
    url: 'https://blog.marvelapp.com'
    newWindow: true,
}
```

### `scroll`

Q: What's the best way to represent the scroll data? Should position describe what we want to do (ie, scroll until the top of the window is at these coords) or what has been done (ie, scroll x pixels in this direction)

```javascript
outcome: {
    type: 'scroll',
    position: [0, 500],
    
}
```

### `misclick` (?)

Q: should misclick even be an outcome? Or could it be better represented as a tap with a `null` outcome?

```javascript
outcome: {
    type: 'misclick',
    coords: [50, 50],
}
```


-------------

# Examples

#### Tap hotspot navigates to another screen using the fade transition.


```javascript
event {
    trigger: {
        type: 'tap',
        coords: [30, 50],
        duration: 100,
    },
    object: {
        type: 'hotspot',
        id: 34,
        bounds: [10, 10, 90, 90],
    },
    outcome: {
        type: 'screenTransition',
        fromScreen: 1,
        toScreen: 2,
        animation: 'fade',
    },
    timestamp: 100,
}
```


#### Hover over a hotspot with 'stay on target' selected

```javascript
event {
    trigger: {
        type: 'hover',
        duration: 10,
    },
    object: {
        type: 'hotspot',
        id: 34,
        bounds: [10, 10, 90, 90],
    },
    outcome: {
        type: 'screenTransition',
        fromScreen: 1,
        toScreen: 2,
        animation: null,
    },
    timestamp: 100,
}
```


#### Hover over a hotspot to overlay a screen

```javascript
event {
    trigger: {
        type: 'hover',
        duration: 10,
    },
    object: {
        type: 'hotspot',
        id: 34,
        bounds: [10, 10, 90, 90],
    },
    outcome: {
        type: 'overlay',
        screen: 2,
        position: [50, 50],
    },
    timestamp: 100,
}
```


#### Screen transition caused by a timer

```javascript
event {
    trigger: {
        type: 'timer',
    },
    object: {
        type: 'screen',
        id: 1,
        width: 100,
        height: 100,
    },
    outcome: {
        type: 'screenTransition',
        fromScreen: 1,
        toScreen: 2,
        animation: null,
    },
    timestamp: 100,
}
```
