var assert = require('assert');
var Ajv = require('ajv');
var schemaMain = require('./event');

function assertValid(data, schema) {
    var ajv = new Ajv({
        format: 'full',
        allErrors: true,
    });
    var valid = ajv.validate(schema, data);
    assert(valid, '${data.type}:' + ajv.errorsText(ajv.errors));
}

function assertValidEvent(data) {
    assertValid(data, schemaMain);
    assertValid(data.trigger, require('./triggers/' + data.trigger.type + '.json'));
    assertValid(data.object, require('./objects/' + data.object.type + '.json'));
    assertValid(data.outcome, require('./outcomes/' + data.outcome.type + '.json'));
}

module.exports = {
    assertValid: assertValid,
    assertValidEvent: assertValidEvent
};
