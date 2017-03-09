(function() {
  var eitcData;
  eitcData = require('./data.js');

  function eligibility(filingStatus, earnedIncome, qualifyingChildren) {
    return ((filingStatus === 'MARRIED_FILING_JOINTLY') ? ((qualifyingChildren <= 2) ? (earnedIncome < eitcData.BENEFIT_RULES.married.children[qualifyingChildren]['limit']) : (earnedIncome < eitcData.BENEFIT_RULES.married.children['3+']['limit'])) : ((qualifyingChildren <= 2) ? (earnedIncome < eitcData.BENEFIT_RULES.nonMarried.children[qualifyingChildren]['limit']) : (earnedIncome < eitcData.BENEFIT_RULES.nonMarried.children['3+']['limit'])));
  }
  eligibility;

  function benefit(filingStatus, earnedIncome, qualifyingChildren) {
    return ((filingStatus === 'MARRIED_FILING_JOINTLY') ? ((qualifyingChildren <= 2) ? eitcData.BENEFIT_RULES.married.children[qualifyingChildren]['maxValue'] : eitcData.BENEFIT_RULES.married.children['3+']['maxValue']) : ((qualifyingChildren <= 2) ? eitcData.BENEFIT_RULES.nonMarried.children[qualifyingChildren]['maxValue'] : eitcData.BENEFIT_RULES.nonMarried.children['3+']['maxValue']));
  }
  benefit;

  function eitc(filingStatus, earnedIncome, qualifyingChildren) {
    return (eligibility(filingStatus, earnedIncome, qualifyingChildren) ? benefit(filingStatus, earnedIncome, qualifyingChildren) : 0);
  }
  return module.exports = eitc;
})['call'](this);