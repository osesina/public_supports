import test from 'ava';
import publicSupports from '.';

test('earnedIncomeTaxCredit', function (t) {
  var t1 = publicSupports.federal.earnedIncomeTaxCredit('SINGLE', 20000, []);
  t.is(t1.eligible, true);
});
