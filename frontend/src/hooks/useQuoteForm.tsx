import { isAxiosError } from "axios";
import { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { saveQuote } from "../api/quote.api";
import quoteFormReducer from "../features/quotes/quoteFormReducer";
import { filterQuoteItem, saveQuoteItemMapper } from "../helpers/quotes.helper";

export default function useQuoteForm() {
  const { quoteId } = useParams();
  const initial = {
    customer: null,
    quoteItems: [],
    _id: "",
    description: "",
    date: new Date(Date.now()).toISOString().split("T")[0],
    termsAndConditons: "",
  };
  const [state, dispatch] = useReducer(quoteFormReducer, initial);
  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET:DATE", payload: e.currentTarget.value });
  };
  const onChangeTermsAndCondtion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "SET:TERMS_AND_CONDTIONS",
      payload: e.currentTarget.value,
    });
  };
  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "SET:DESCRIPTION",
      payload: e.currentTarget.value,
    });
  };
  const onRemoveQuoteItem = (quoteId: string) => {
    dispatch({ type: "REMOVE:QUOTE_ITEM", payload: quoteId });
  };

  const onAddQuoteItem = useCallback(() => {
    dispatch({
      type: "ADD:QUOTE_ITEM",
      payload: {
        unit: "",
        _id: "_" + Math.random().toString(36).substring(2, 9),
        name: "",
        code: "",
        hasError: false,
        qty: "",
        rate: "",
        tax: {
          gstPercentage: "0",
          gstType: "NONE",
        },
      },
    });
  }, []);
  useEffect(() => {
    onAddQuoteItem();
    if (quoteId) {
      (async () => {})();
    }
  }, [onAddQuoteItem, quoteId]);
  const onSetCustomer = (newCustomer: ICustomerPart | null) => {
    dispatch({ type: "SET:CUSTOMER", payload: newCustomer });
  };
  const customerProps = {
    onSetCustomer,
    customer: state.customer,
  };
  const onChangeUnit =
    (quoteItem: ICreateQuotesRowItemDTO) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: "SET:QUOTE_ITEM",
        payload: {
          ...quoteItem,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      });
    };
  const onChangeCodeOrName = (quoteItem: ICreateQuotesRowItemDTO) =>
    function (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      dispatch({
        type: "SET:QUOTE_ITEM",
        payload: {
          ...quoteItem,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      });
    };
  const onChangeQty = (quoteItem: ICreateQuotesRowItemDTO) =>
    function (e: ChangeEvent<HTMLInputElement>) {
      const newQty = isNaN(parseFloat(e.currentTarget.value))
        ? ""
        : parseFloat(e.currentTarget.value).toFixed(2);
      dispatch({
        type: "SET:QUOTE_ITEM",
        payload: {
          ...quoteItem,
          qty: newQty,
        },
      });
    };
  const onChangeRate = (quoteItem: ICreateQuotesRowItemDTO) =>
    function (e: ChangeEvent<HTMLInputElement>) {
      const newRate = isNaN(parseFloat(e.currentTarget.value))
        ? ""
        : parseFloat(e.currentTarget.value).toFixed(2);
      dispatch({
        type: "SET:QUOTE_ITEM",
        payload: {
          ...quoteItem,
          rate: newRate,
        },
      });
    };
  const onChangeTax = (quoteItem: ICreateQuotesRowItemDTO) =>
    function (e: ChangeEvent<HTMLSelectElement>) {
      const gstType = e.currentTarget.value.split(":")[0] as IGSTTypes;
      const gstPercentage = e.currentTarget.value.split(":")[1];
      dispatch({
        type: "SET:QUOTE_ITEM",
        payload: {
          ...quoteItem,
          tax: { gstPercentage, gstType },
        },
      });
    };

  const changeNewQuoteItem = (quoteItem: ICreateQuotesRowItemDTO) => {
    return {
      code: onChangeCodeOrName(quoteItem),
      name: onChangeCodeOrName(quoteItem),
      qty: onChangeQty(quoteItem),
      rate: onChangeRate(quoteItem),
      tax: onChangeTax(quoteItem),
      unit: onChangeUnit(quoteItem),
    };
  };
  const newQuoteItemProps = {
    changeNewQuoteItem,
    quoteItems: state.quoteItems,
    onAddQuoteItem,
    onRemoveQuoteItem,
  };
  const quoteFooterProps = {
    onChangeDescription,
    onChangeTermsAndCondtion,
    description: state.description,
    termsAndCondtions: state.termsAndConditons,
  };
  const dateProps = {
    onChangeDate,
    date: state.date,
  };
  const navigate = useNavigate();
  const submitForm = async () => {
    try {
      if (state._id) {
        console.log(state);
      } else {
        const quote = {
          customer: state.customer?._id,
          quoteItems: state.quoteItems
            .filter(filterQuoteItem)
            .map(saveQuoteItemMapper),
          termsAndConditions: state.termsAndConditons,
          description: state.description,
        };
        const { data } = await saveQuote(quote);
        navigate(`/quotes/${data.data._id}`);
        toast.success("Quotation saved");
      }
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data.message : "Error occured"
      );
    }
  };
  return {
    customerProps,
    newQuoteItemProps,
    dateProps,
    quoteFooterProps,
    submitForm,
  };
}
