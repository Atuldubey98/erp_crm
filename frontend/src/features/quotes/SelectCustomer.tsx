import AsyncSelect from "react-select/async";
import { searchCustomer } from "../../api/customer.api";
import CustomerPart from "./CustomerPart";

export default function SelectCustomer({
  onSetCustomer,
  customer,
}: {
  onSetCustomer: (newCustomer: ICustomerPart | null) => void;
  customer: ICustomerPart | null;
}) {
  const promiseOptions = (inputValue: string) => {
    return new Promise<ICustomerPart[]>(async (resolve) => {
      const { data } = await searchCustomer(inputValue);
      resolve(data.data);
    });
  };
  return (
    <div className="grid gap-2">
      <label className="block">
        <span className="text-sm font-bold">Customer name</span>
        <AsyncSelect
          required={!customer}
          className="outline-none text-sm"
          defaultOptions={[]}
          onChange={(value) => {
            onSetCustomer(value);
          }}
          loadOptions={promiseOptions}
          getOptionLabel={(quoteCustomer: ICustomerPart) => quoteCustomer.name}
          getOptionValue={(quoteCustomer: ICustomerPart) => quoteCustomer._id}
        />
      </label>
      {customer ? <p className="font-bold">{customer.name}</p> : null}
      {customer ? <CustomerPart customer={customer} /> : null}
    </div>
  );
}
