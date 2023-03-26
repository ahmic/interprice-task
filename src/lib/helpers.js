export const getAvailableCurrencies = items => {
  return items.map(item => {
      return item.Quote?.map(quote => quote.Currency);
    })
    .flat()
    .filter(c => typeof c !== 'undefined')
    .filter((item, i, ar) => ar.indexOf(item) === i);
}

export const getCurrencyYears = (items, selectedCurrency) => {
  return items?.map(item => {
      return item['Quote']?.filter(quote => quote['Currency'] == selectedCurrency);
    })
    .flat()
    .filter(c => typeof c !== 'undefined')
    .map(item => item.Years)
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .sort((a, b) => parseInt(a) > parseInt(b));
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
