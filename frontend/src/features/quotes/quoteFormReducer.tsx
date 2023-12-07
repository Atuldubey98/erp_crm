export default function quoteFormReducer(
  state: ICreateQuoteState,
  action: ICreateQuoteActions
): ICreateQuoteState {
  switch (action.type) {
    case "ADD:QUOTE_ITEM":
      return { ...state, quoteItems: [...state.quoteItems, action.payload] };
    case "REMOVE:QUOTE_ITEM":
      return {
        ...state,
        quoteItems: state.quoteItems.filter(
          (quoteItem) => quoteItem._id !== action.payload
        ),
      };
    case "SET:CUSTOMER":
      return { ...state, customer: action.payload };
    case "SET:QUOTE_ITEM":
      return {
        ...state,
        quoteItems: state.quoteItems.map((quoteItem) =>
          quoteItem._id === action.payload._id ? action.payload : quoteItem
        ),
      };
    case "SET:DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET:TERMS_AND_CONDTIONS":
      return { ...state, termsAndConditions: action.payload };
    case "SET:DATE":
      return { ...state, date: action.payload };
    case "SET:QUOTE":
      return { ...state, ...action.payload };
    case "SET:QUOTE_ITEMS":
      return { ...state, quoteItems: action.payload };
    default:
      return state;
  }
}
