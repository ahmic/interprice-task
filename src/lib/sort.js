export const applySorting = (items, sortParameter, sortDirection) => {
  const groups = divideItems(items);
  const sorted = groups.map(group => {
    switch (sortParameter) {
      case 'date':
        return sortByDate(group, sortDirection);

      case 'preffered':
        return sortByPreffered(group, sortDirection);

      case 'company':
        return sortByCompanyName(group, sortDirection);
    }
  });


  return sorted.flat(1);

}

const divideItems = items => {
  const nonEmptyQuote = items.filter(company => company.Quote != null && company.Quote.length > 0);
  const emptyQuote = items.filter(company => company.Quote == null || company.Quote.length == 0);

  return [nonEmptyQuote, emptyQuote];
}

const sortByDate = (items, sortDirection) => {
  return items.sort((a, b) => {
    const dateA = new Date(a.DateSent).getTime();
    const dateB = new Date(b.DateSent).getTime();

    if (sortDirection == 'desc') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
}

const sortByPreffered = (items, sortDirection) => {
  return items.sort((a, b) => {
    if (sortDirection == 'asc') {
      return parseInt(a.Preffered) - parseInt(b.Preffered);
    } else {
      return parseInt(b.Preffered) - parseInt(a.Preffered);
    }
  });
};

const sortByCompanyName = (items, sortDirection) => {
  return items.sort((a, b) => {
    if (sortDirection == 'asc') {
      return a.Company.localeCompare(b.Company);
    } else {
      return b.Company.localeCompare(a.Company);
    }
  });
};
