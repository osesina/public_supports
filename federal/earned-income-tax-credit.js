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

/**
 * @description Get number of qualifying children given EITC child rules.
 * @param  {Array<Child>} children     - Child entities
 * @return {Number}          Number of qualifying children
 */
function getQualifyingChildren(children) {
  let qualifyingChildren = children.filter(child => {
    return (child.age < 19) || (child.age < 25 && child.isInSchool) || child.isDisabled;
  });
  return qualifyingChildren.length;
}

/**
 * @description
 * Earned Income Tax Credit
 *
 * Assumptions:
 *   - Both filing taxpayers are U.S. Citizens (not nonresident aliens)
 *   - Investment income < limit
 *   - NOT a: member of the military; clergy; on disability income; children w/disabilities (entail special EITC rules)
 *   - Filer/spouse/child all have Social Security numbers
 *   - No foreign earned income
 *   - Taxpayer has earned income (is working part or full time)
 *
 * Sources:
 *   - https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/do-i-qualify-for-earned-income-tax-credit-eitc
 *
 * @param  {String} filingStatus - applicants filing status
 * @param  {Array<Child>} children     - Child entities
 * @return {Eligibility/Valuation Object}              note: the value is a max value, not gauranteed
 */
module.exports = function (filingStatus, earnedIncome, children) {
  let benefit = {
    eligibile: false,
    value: null
  };

  // TODO: validate inputs & throw errors

  // Check initial eligibility
  if (VALID_FILING_STATUSES.indexOf(filingStatus) === -1) {
    // no further checks needed if your filing status is not eligible
    return benefit;
  }

  let numQualifyingChildren = getQualifyingChildren(children);

  // Get benefit values
  if (filingStatus === 'MARRIED_FILING_JOINTLY') {
    if (numQualifyingChildren === 0 && earnedIncome < BENEFIT_RULES.married.children['0'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.married.children['0'].maxValue;
    }
    if (numQualifyingChildren === 1 && earnedIncome < BENEFIT_RULES.married.children['1'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.married.children['1'].maxValue;
    }
    if (numQualifyingChildren === 2 && earnedIncome < BENEFIT_RULES.married.children['2'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.married.children['2'].maxValue;
    }
    if (numQualifyingChildren > 2 && earnedIncome < BENEFIT_RULES.married.children['3+'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.married.children['3+'].maxValue;
    }
  } else {
    if (numQualifyingChildren === 0 && earnedIncome < BENEFIT_RULES.nonMarried.children['0'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.nonMarried.children['0'].maxValue;
    }
    if (numQualifyingChildren === 1 && earnedIncome < BENEFIT_RULES.nonMarried.children['1'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.nonMarried.children['1'].maxValue;
    }
    if (numQualifyingChildren === 2 && earnedIncome < BENEFIT_RULES.nonMarried.children['2'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.nonMarried.children['2'].maxValue;
    }
    if (numQualifyingChildren > 2 && earnedIncome < BENEFIT_RULES.nonMarried.children['3+'].limit) {
      benefit.eligible = true;
      benefit.value = BENEFIT_RULES.nonMarried.children['3+'].maxValue;
    }
  }

  return benefit;
};
