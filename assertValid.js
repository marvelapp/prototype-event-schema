const assert = require('assert');
const Ajv = require('ajv');
import schemaMain from './event';

export const assertValid = function(data, schema) {
    const ajv = new Ajv({
        format: 'full',
        allErrors: true,
    });
    const valid = ajv.validate(schema, data);
    assert(valid, `${data.type}: ${ajv.errorsText(ajv.errors)}`);
};

export const assertValidEvent = function(data) {
    return assertValid(data, schemaMain)
};
