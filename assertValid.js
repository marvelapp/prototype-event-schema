const assert = require('assert');
const Ajv = require('ajv');
const schemaMain = require('./event');

const assertValid = function(data, schema) {
    const ajv = new Ajv({
        format: 'full',
        allErrors: true,
    });
    const valid = ajv.validate(schema, data);
    assert(valid, `${data.type}: ${ajv.errorsText(ajv.errors)}`);
};

const assertValidEvent = function(data) {
    assertValid(data, schemaMain);

    assertValid(data.trigger, require('./triggers/' + data.trigger.type + '.json'))
    assertValid(data.object, require('./objects/' + data.object.type + '.json'))
    assertValid(data.outcome, require('./outcomes/' + data.outcome.type + '.json'))
}

module.exports = {
    assertValid,
    assertValidEvent
};