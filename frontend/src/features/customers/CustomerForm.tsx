import useCustomerForm from "../../hooks/useCustomerForm";

export default function CustomerForm() {
  const { customer, onChangeCustomerField, onCustomerFormSubmit } =
    useCustomerForm();

  return (
    <form onSubmit={onCustomerFormSubmit} className="max-w-xl grid gap-2">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Name of the Customer ?
        </span>
        <input
          type="text"
          value={customer.name}
          onChange={onChangeCustomerField}
          required
          minLength={3}
          maxLength={80}
          name="name"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Customer name"
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Billing Address
        </span>
        <textarea
          required
          value={customer.billingAddress}
          onChange={onChangeCustomerField}
          minLength={3}
          maxLength={80}
          name="billingAddress"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Billing address"
        />
      </label>
      <label className="flex gap-3">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Is Shipping Address same as Billing address
        </span>
        <input
          onChange={onChangeCustomerField}
          checked={customer.isSASameAsBA}
          type="checkbox"
          name="isSASameAsBA"
          placeholder="Billing address"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          Shipping Address
        </span>
        <textarea
          onChange={onChangeCustomerField}
          disabled={customer.isSASameAsBA}
          value={
            customer.isSASameAsBA
              ? customer.billingAddress
              : customer.shippingAddress
          }
          required
          minLength={3}
          maxLength={80}
          name="shippingAddress"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Shipping address"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          GST Number
        </span>
        <input
          value={customer.gstNo}
          onChange={onChangeCustomerField}
          type="text"
          minLength={15}
          maxLength={15}
          name="gstNo"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="GST Number"
        />
      </label>
      <label className="block">
        <span className=" block text-sm font-medium text-slate-700">
          PAN Number
        </span>
        <input
          type="text"
          value={customer.panNo}
          onChange={onChangeCustomerField}
          minLength={10}
          maxLength={10}
          name="panNo"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="PAN Number"
        />
      </label>
      <button
        type="submit"
        className="bg-emerald-500 p-1 text-sm text-white font-bold rounded"
      >
        Save Customer
      </button>
    </form>
  );
}
