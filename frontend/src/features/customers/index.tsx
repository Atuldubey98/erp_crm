import { Link } from "react-router-dom";
import useCustomers from "../../hooks/useCustomers";
import LoadMoreBtn from "../common/LoadMoreBtn";
import SkipFilterAddNewSection from "../common/FilterAddNewSection";
import TableData from "../common/TableData";
import PrivateMainLayout from "../layouts/PrivateMainLayout";
import TableRowLayout from "../layouts/TableRowLayout";
import TableWrapper from "../layouts/TableWrapper";

export default function CustomersPage() {
  const {
    customers,
    limitProps,
    searchProps,
    status,
    hasMore,
    skipProps,
    total,
  } = useCustomers();

  const headerRow = ["Name", "Shipping Address", "Billing address"];

  return (
    <PrivateMainLayout>
      <SkipFilterAddNewSection
        status={status}
        searchProps={searchProps}
        limitProps={limitProps}
        placeholder="Search by customer name, address"
        buttonLabel="Add customer"
      />

      <section className="container p-2 grid gap-2">
        <h1 className="text-xl font-bold text-right">{`Total Customers : ${total}`}</h1>
        <TableWrapper headerRow={headerRow}>
          {customers.map((customer) => (
            <TableRowLayout key={customer._id}>
              <td className="border-x-2 border-emerald-500 p-1 text-sm font-semibold text-emerald-600">
                <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
              </td>
              <TableData data={customer.shippingAddress} isMiddleCol={true} />
              <TableData data={customer.billingAddress} isMiddleCol={true} />
            </TableRowLayout>
          ))}
        </TableWrapper>
      </section>
      <div className="flex items-center justify-center">
        {hasMore ? (
          <LoadMoreBtn onClick={skipProps.onIncrementSkip} status={status} />
        ) : null}
      </div>
    </PrivateMainLayout>
  );
}
