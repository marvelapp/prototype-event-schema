# Proto-Viewer Event Schema [![CircleCI](https://circleci.com/gh/marvelapp/prototype-event-schema.svg?style=svg&circle-token=88a10b5a479c4c27990a4ce9cf7412eb1ea28ce4)](https://circleci.com/gh/marvelapp/prototype-event-schema)

This repo defines a set of [json-schema](https://json-schema.org/) (draft v7) files we can use across multiple codebases to validate our prototype-viewer's event schema.

## How to validate event structure

When you receive an event, you should first validate the entire event against the schema in `event.json`. That schema will ensure the basic event structure is correct, and that it has all required top level keys with correct `type` values if appropriate.

If that's valid, you need to take object in the `trigger` key and validate it against the schema in `triggers/:type.json`, where `:type` is the value of the trigger's `type` key. Then you should do the same for the `object` and `outcome` keys.

For example, if you have an event that looks like the following:


```json
{
    "trigger": {
        "type": "timer",
    },
    "object": {
        "type": "screen",
        "id": 1,
        "height": 100,
        "width": 100
    },
    "outcome": {
        "type": "screenTransition",
        "fromScreen": 1,
        "toScreen": 2,
        "animation": "fade"
    },
    "timestamp": 2500,
    "id": "6503601444799647744",
    "prevId": "6503601444803842048"
}
```

After validating the entire event using `event.json`, you'd need to take the `trigger` object and validate against `triggers/timer.json`, use `objects/screen.json` to validate the `object` value and validate the `outcome` with `outcomes/screenTransition.json`

## How to add a new `trigger`, `object` or `outcome`

ProTip: [jsonschema.net](https://www.jsonschema.net/) is a useful tool for creating and updating the schema files

1. Update `event.json` to accept your new `type` value for the `trigger`, `object` or `outcome` keys as appropriate
2. Add a schema file to the `triggers/`, `objects/` or `outcomes/` directory, with the same name as your `type` value. So a `timer` type becomes `timer.json`
3. Add or update at least a basic test in `validate.js`

----


## Things left to figure out

- ~ how exactly should hotspot & overlay positioning work?
- ~ how scroll is going to work? is there a difference between scroll as an outcome of a click and a scroll initiated by a user?
- ~ misclicks
- ~ start/end events
- ~ `eventId` / `prevEventId` attrs


### Start / end / goal events

We should probably have events that signify the beginning and end of a session, as well as a goal being reached (if applicable). That way it's relatively easy for us to figure out the percentage of participants that reach a goal or abandon a test with a database query

### Event ids & previous events

If we give each event an `id` and a reference to the previous event's `id` it becomes easy for us to validate that the event data is complete and in order.
A [flakeid](http://yellerapp.com/posts/2015-02-09-flake-ids.html) might be a good candidate for this `id`.

### How should we define misclicks?

We touched on this slightly in the original [gist](https://gist.github.com/joealcorn/86461c250d61aceddd631d7dd6ecc5c5#gistcomment-2799184).
As far as misclicks go, there are two ways we can reasonably define them.

The first is as a type of outcome itself:

```js
{
    trigger: {},
    object: {},
    outcome: {
        type: 'misclick',
    }
}
```

The second is simply a null outcome:

```js
{
    trigger: {},
    object: {},
    outcome: null
}
```

I'm wondering, is a `null` outcome likely to occur for any other reason?
As it stands I'm leaning towards the second option, because otherwise `misclick` is a bit of a misnomer (because it could be a missed `pinch`, or any trigger other than a click, but w/e we could find a different name) and because a misclick outcome doesn't seem to add much.

However, requiring an `outcome` with a `type` may make the playback system more reliable, as bugs that result in a failure to put an outcome on an event can be caught during validation rather than being misinterpreted as misclicks with no way to detect it.


### Scrolling

When we describe scroll events, we'll probably want them to work by describing the desired end state rather than how to get there (ie, scroll to x rather than scroll down by y). This feels like it should be the more resilient way of handling this of the two.

Some Q's:

- Is there a difference between user scrolling with their scroll wheel and clicking a hotspot to scroll to an anchor?
- How do we describe a user scrolling? a `null` trigger? (same misinterpretation issue mentioned above for misclicks.) a specific type of trigger?
- What do we need to describe in the event data? Is the top-left most pixel sufficient, or do we need to include the entire viewport (in case I'm watching playback on a smaller device than it was recorded on, so we can scale it down appropriately?)


### Hotspot & overlay positioning

There are a few different ways we could describe positioning of elements. Whatever we choose here is what we should use in the API when that eventually supports hotspots & overlays.

Here are a few potential options - which is easiest to work with and least likely to cause issues? (does it make much difference?)

We could describe the position of each boundary:

```javascript
[10, 10, 90, 90] // [left, top, right, bottom]
```

We could describe the top-left and bottom-right points

```javascript
[[10, 10], [90, 90]] // [top left point, bottom right point]
```

We could describe the data as a midpoint and the width/height of the rectangle

```javascript
{
    height: 80,
    width: 80,
    coords: [10, 10]
} // position + height/width
```

We could describe each corner individually. This may allow us to describe more complex paths in the future without breaking the format (complex shapes from easel as hotspots)

```javascript
[
    [10, 10],
    [90, 10],
    [90, 90],
    [10, 90],
] // all 4 (or more) vertices
```
