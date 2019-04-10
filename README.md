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
