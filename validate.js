const fs = require('fs');
const assert = require('assert');

const Validator = require('jsonschema').Validator;
const v = new Validator();

const assertValid = function(data, schema) {
    const res = v.validate(data, schema);
    assert(res.errors.length === 0);
};

assertValid({
    type: 'tap',
    coords: [0, 100],
    duration: 100,
}, require('./triggers/tap.json'));
