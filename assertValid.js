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

module.exports = {
    assertValid,
    assertValidEvent: function(data) {
        return assertValid(data, schemaMain)
    }
};