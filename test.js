import test from 'ava';
import publicSupports from '.';

test('earnedIncomeTaxCredit', function (t) {
  var t1 = publicSupports.federal.earnedIncomeTaxCredit('SINGLE', 20000, []);
  t.is(t1.eligible, true);
});

var eitcCalculator = require('./federal/eitc/calculator');

test('earnedIncomeTaxCreditLisp_SINGLE', function (t) {
  var out = eitcCalculator('SINGLE', 20000, 0);
  t.is(out, 510);
});

test('earnedIncomeTaxCreditLisp_MARRIED_FILING_JOINTLY', function (t) {
  var out = eitcCalculator('MARRIED_FILING_JOINTLY', 1000000, 1);
  t.is(out, 0);
});
