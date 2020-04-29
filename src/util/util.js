exports.bnNum = (num, komma = false) => {
  const banglaNumber = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  let str = `${num.toLocaleString('bn-BD', { useGrouping: komma })}`;
  for (var x in banglaNumber) {
    str = str.replace(new RegExp(x, 'g'), banglaNumber[x]);
  }
  return str;
};
