import apiInstance from "./api.instance";
enum EQuoteApi {
  QUOTES = "/api/v1/quotes",
}
export const getQuotes = (select = "", startDate: string, endDate: string) => {
  return apiInstance.get(EQuoteApi.QUOTES, {
    params: {
      select,
      startDate,
      endDate,
    },
  });
};
export const saveQuote = (quote: {
  customer: string | undefined;
  quoteItems: {
    rate: number;
    tax: ITax;
    qty: number;
    name: string;
  }[];
  description: string;
  termsAndConditions: string;
}) => {
  return apiInstance.post(EQuoteApi.QUOTES, quote);
};

export const getQuote = (quoteId: string | undefined) => {
  return apiInstance.get(`${EQuoteApi.QUOTES}/${quoteId}`, {
    params: {
      select: "",
    },
  });
};

export const getQuoteItems = (quoteId: string) => {
  return apiInstance.get(`${EQuoteApi.QUOTES}/${quoteId}/items`);
};

export const getFullQuote = (quoteId: string) => {
  return Promise.all([getQuote(quoteId), getQuoteItems(quoteId)]);
};

export const getDownloadableQuote = (quoteId: string) => {
  return apiInstance.get(`${EQuoteApi.QUOTES}/${quoteId}/download`);
};

export const updateQuote = (
  quoteId: string,
  quote: {
    customer: string | undefined;
    quoteItems: {
      rate: number;
      tax: ITax;
      qty: number;
      name: string;
    }[];
    description: string;
    termsAndConditions: string;
  }
) => {
  return apiInstance.patch(`${EQuoteApi.QUOTES}/${quoteId}`, quote);
};
