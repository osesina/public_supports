'use strict';

const VALID_FILING_STATUSES = [
  'MARRIED_FILING_JOINTLY',
  'HEAD_OF_HOUSEHOLD',
  'WIDOW',
  'SINGLE'
];

const BENEFIT_RULES = {
  married: {
    children: {
      0: {
        limit: 14880,
        maxValue: 510
      },
      1: {
        limit: 39296,
        maxValue: 3400
      },
      2: {
        limit: 44648,
        maxValue: 5616
      },
      '3+': {
        limit: 47955,
        maxValue: 6318
      }
    }
  },
  nonMarried: {
    children: {
      0: {
        limit: 20430,
        maxValue: 510
      },
      1: {
        limit: 44846,
        maxValue: 3400
      },
      2: {
        limit: 50198,
        maxValue: 5616
      },
      '3+': {
        limit: 53505,
        maxValue: 6318
      }
    }
  }
};

module.exports = {
  BENEFIT_RULES: BENEFIT_RULES,
  VALID_FILING_STATUSES: VALID_FILING_STATUSES
};
