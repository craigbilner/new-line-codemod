
'use strict';

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'transform', null, 'formats-object');
defineTest(__dirname, 'transform', null, 'formats-array');
defineTest(__dirname, 'transform', null, 'formats-methods');
defineTest(__dirname, 'transform', null, 'ignores-object-param');
defineTest(__dirname, 'transform', null, 'ignores-array-param');
