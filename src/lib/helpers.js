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

  console.log(currencies);


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
