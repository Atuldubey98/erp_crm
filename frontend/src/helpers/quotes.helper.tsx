export const saveQuoteItemMapper = (typeOfRequest: "post" | "patch") => {
  return ({ rate, tax, qty, name, ...rest }: ICreateQuotesRowItemDTO) => {
    const { amount, createdAt, updatedAt, hasError, ...restQuoteItem } = rest;
    return {
      ...restQuoteItem,
      _id: typeOfRequest === "post" ? undefined : rest._id,
      rate: parseFloat(rate),
      tax: {
        gstPercentage: tax.gstPercentage,
        gstType: tax.gstType,
      },
      qty: parseFloat(qty),
      name,
    };
  };
};

export const filterQuoteItem = (quoteItem: ICreateQuotesRowItemDTO): boolean =>
  quoteItem.name.length > 3;
