'use strict';
var earnedIncomeTaxCredit = require('./federal/earned-income-tax-credit');

let publicSupports = {
  federal: {
    earnedIncomeTaxCredit: earnedIncomeTaxCredit
  },
  state: {
    MA: {}
  }
};

module.exports = publicSupports;
