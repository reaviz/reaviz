import humanFormat from 'human-format';

const humanFormatScale = new humanFormat.Scale({
  k: 1000,
  M: 1000000,
  B: 1000000000
});

const humanFormatMillionScale = new humanFormat.Scale({
  M: 1,
  B: 1000,
  T: 1000000
});

const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;

export const humanFormatBigInteger = (bigInteger) => {
  if (bigInteger.greater(ONE_BILLION)) {
    return humanFormat(bigInteger.divide(ONE_MILLION).toJSNumber(), {
      scale: humanFormatMillionScale
    });
  }
  return humanFormat(bigInteger.toJSNumber(), { scale: humanFormatScale });
};

export const bigIntegerToLocaleString = (bigInteger) => {
  let i = 0;
  let formattedString = '';
  for (const c of bigInteger.toString().split('').reverse()) {
    if (i > 0 && i % 3 === 0) {
      formattedString = ',' + formattedString;
    }
    formattedString = c + formattedString;
    i++;
  }
  return formattedString;
};
