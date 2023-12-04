import useSingleCustomer from "../../hooks/useSingleCustomer";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import OptionsDropDown from "./OptionsDropDown";
import Timestamp from "./Timestamp";

export default function CustomerPage() {
  const { customer, status, onDeleteCustomer, onEditCustomerClick } =
    useSingleCustomer();
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (!customer) {
    return <h1>No customer found</h1>;
  }
  const timestamp = {
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
  const dropdDownList = [
    { onClick: onEditCustomerClick, label: "Edit" },
    { onClick: onDeleteCustomer, label: "Delete" },
  ];
  return (
    <PrivateMainLayout>
      <section className="container p-2">
        {customer ? (
          <div className="container leading-10">
            <div className="flex justify-end">
              <OptionsDropDown dropDownList={dropdDownList} />
            </div>
            <h2 className="text-2xl font-semibold">{customer.name}</h2>
            <address className="text-md">
              Billing Address : {customer.billingAddress}
            </address>
            {customer.shippingAddress ? (
              <address className="text-md">
                Shipping Address : {customer.shippingAddress}
              </address>
            ) : null}
            {customer.gstNo ? (
              <div>
                <span>GST Number : </span>
                <code>{customer.gstNo}</code>
              </div>
            ) : null}
            <div>
              <span>PAN Number : </span>
              <code>{customer.panNo}</code>
            </div>
            <Timestamp {...timestamp} />
          </div>
        ) : null}
      </section>
    </PrivateMainLayout>
  );
}
