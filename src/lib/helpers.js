export const getAvailableCurrencies = items => {
  return items.map(item => {
      return item.Quote?.map(quote => quote.Currency);
    })
    .flat()
    .filter(c => typeof c !== 'undefined')
    .filter((item, i, ar) => ar.indexOf(item) === i);
}

export const getCurrencyYears = (items, selectedCurrency) => {
  const currencies = [];
  items?.forEach(item => {
      item.Quote?.forEach(quote => {

        if (quote.Currency == selectedCurrency && currencies.indexOf(quote.Years) < 0) {
          currencies.push(quote.Years);
        }
      });
    });

  return currencies;
}

export const dateFormatter = input => {
  if (input == null) {
    return '';
  } else {
    const date = new Date(input);
    const month = date.toLocaleString('en-us',{month:'short'});
    return `${date.getDate()}-${month}-${date.getFullYear().toString().substr(-2)}`;
  }
}

export const filterItems = (items, currency, years) => {
  const itemsCopy = JSON.parse(JSON.stringify(items));
  const filtered = itemsCopy.map(company => {
    company.Quote = company.Quote?.filter(quote => quote.Currency == currency && years.indexOf(quote.Years) >= 0);
    return company;
  });

  return filtered;
}

export const getMinValuesPerYear = (items, years, selectedDisplaySwitcher) => {
  const itemsCopy = JSON.parse(JSON.stringify(items));
  const quotes = itemsCopy.map(i => i.Quote).flat();
  const minValues = [];

  years.forEach(year => {
    const minForYear = quotes.filter(q => q?.Years == year && q?.CouponType == 'FIX')
      .map(q => q[selectedDisplaySwitcher])
      .filter(v => v != null);

      minValues[year] = Math.min(...minForYear);
  });

  return minValues;
}

export const getAvgValuesPerYear = (items, years, selectedDisplaySwitcher) => {
  const itemsCopy = JSON.parse(JSON.stringify(items));
  const quotes = itemsCopy.map(i => i.Quote).flat();
  const avgValues = [];

  years.forEach(year => {
    const valuesFix = quotes.filter(q => q?.Years == year && q?.CouponType == 'FIX')
      .map(q => q[selectedDisplaySwitcher])
      .filter(v => v != null);

    avgValues.push({year: year, type: 'FIX', value: valuesFix.reduce((a, b) => a + b, 0) / valuesFix.length || null});

    const valuesFrn = quotes.filter(q => q?.Years == year && q?.CouponType == 'FRN')
      .map(q => q[selectedDisplaySwitcher])
      .filter(v => v != null);

    avgValues.push({year: year, type: 'FRN', value: valuesFrn.reduce((a, b) => a + b, 0) / valuesFrn.length || null});
  });

  return avgValues;
}
