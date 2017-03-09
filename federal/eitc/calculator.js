(function() {
  function eligibility(benefitTable, filingStatus, earnedIncome, qualifyingChildren) {
    return ((filingStatus === 'MARRIED_FILING_JOINTLY') ? ((qualifyingChildren <= 2) ? (earnedIncome < benefitTable.married.children[qualifyingChildren]['limit']) : (earnedIncome < benefitTable.married.children['3+']['limit'])) : ((qualifyingChildren <= 2) ? (earnedIncome < benefitTable.nonMarried.children[qualifyingChildren]['limit']) : (earnedIncome < benefitTable.nonMarried.children['3+']['limit'])));
  }
  eligibility;

  function benefit(benefitTable, filingStatus, earnedIncome, qualifyingChildren) {
    return ((filingStatus === 'MARRIED_FILING_JOINTLY') ? ((qualifyingChildren <= 2) ? benefitTable.married.children[qualifyingChildren]['maxValue'] : benefitTable.married.children['3+']['maxValue']) : ((qualifyingChildren <= 2) ? benefitTable.nonMarried.children[qualifyingChildren]['maxValue'] : benefitTable.nonMarried.children['3+']['maxValue']));
  }
  benefit;

  function eitc(benefitTable, filingStatus, earnedIncome, qualifyingChildren) {
    return (eligibility(benefitTable, filingStatus, earnedIncome, qualifyingChildren) ? benefit(benefitTable, filingStatus, earnedIncome, qualifyingChildren) : 0);
  }
  return module.exports = eitc;
})['call'](this);